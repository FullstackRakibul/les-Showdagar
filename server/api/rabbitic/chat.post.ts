/**
 * Streaming bridge between the browser and Ollama.
 *
 * The browser posts here instead of calling Ollama directly: the model host stays
 * server-side (no CORS, no exposed URL) and the system prompt is assembled here so
 * the catalog grounding cannot be edited from the client.
 *
 * Ollama replies with newline-delimited JSON; this re-emits a narrower NDJSON
 * protocol — `{"token":"..."}` per chunk, `{"done":true}` at the end,
 * `{"error":"..."}` if generation dies mid-stream.
 */
interface ChatBody {
  message: string
  model?: string
  conversationId?: string | null
  systemPrompt?: string
  history?: { role: 'user' | 'assistant'; content: string }[]
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody<ChatBody>(event)

  if (!body?.message?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Message is required' })
  }

  const model = body.model || (config.public.rabbiticModel as string) || 'llama3.2:3b'
  const ollamaUrl = (config.ollamaApiUrl as string).replace(/\/$/, '')

  const messages = [
    ...(body.systemPrompt ? [{ role: 'system', content: body.systemPrompt }] : []),
    ...(body.history ?? []),
    { role: 'user', content: body.message },
  ]

  let upstream: Response
  try {
    upstream = await fetch(`${ollamaUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, messages, stream: true }),
    })
  } catch {
    throw createError({ statusCode: 503, statusMessage: 'AI service unavailable. Please try later.' })
  }

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => '')
    throw createError({
      statusCode: upstream.status === 404 ? 503 : upstream.status,
      statusMessage: detail.slice(0, 200) || 'AI service unavailable. Please try later.',
    })
  }

  setResponseHeaders(event, {
    'Content-Type': 'application/x-ndjson; charset=utf-8',
    'Cache-Control': 'no-cache, no-transform',
    'X-Conversation-Id': body.conversationId || `local-${Date.now()}`,
  })

  const decoder = new TextDecoder()
  const encoder = new TextEncoder()
  const reader = upstream.body.getReader()

  // A read can end mid-line, so the trailing fragment is held here until the
  // next read completes it. Without this, tokens are silently dropped.
  let buffer = ''

  return new ReadableStream({
    async pull(controller) {
      try {
        const { done, value } = await reader.read()
        if (done) {
          controller.enqueue(encoder.encode(JSON.stringify({ done: true }) + '\n'))
          controller.close()
          return
        }

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''

        for (const line of lines) {
          const trimmed = line.trim()
          if (!trimmed) continue
          try {
            const token = JSON.parse(trimmed)?.message?.content
            if (token) controller.enqueue(encoder.encode(JSON.stringify({ token }) + '\n'))
          } catch {
            // Not valid JSON even as a whole line — skip it.
          }
        }
      } catch {
        controller.enqueue(encoder.encode(JSON.stringify({ error: 'Stream interrupted.' }) + '\n'))
        controller.close()
      }
    },
    cancel() {
      reader.cancel().catch(() => {})
    },
  })
})
