import { computed } from 'vue'
import { useRuntimeConfig } from '#app'
import { useRabbITicAuth } from './useRabbITicAuth'

export interface RabbITicMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface RabbITicConversation {
  id: string
  title: string
  createdAt: string
}

export interface RabbITicModel {
  name: string
  size?: number
}

export interface StreamHandlers {
  onToken: (token: string) => void
  onComplete: (conversationId: string | null) => void
  onError: (error: RabbITicError) => void
}

export interface RabbITicError {
  kind: 'network' | 'unauthorized' | 'rate-limit' | 'unavailable' | 'empty' | 'unknown'
  message: string
  retryable: boolean
}

/** Keeps the prompt inside the model's context window on long conversations. */
const MAX_HISTORY = 20

function toError(status: number | undefined, raw?: string): RabbITicError {
  if (status === 401) return { kind: 'unauthorized', message: 'Your session expired. Please sign in again.', retryable: false }
  if (status === 429) return { kind: 'rate-limit', message: 'Too many requests. Please wait a moment.', retryable: true }
  if (status === 503 || status === 502) return { kind: 'unavailable', message: 'AI service unavailable. Please try later.', retryable: true }
  if (status && status >= 500) return { kind: 'unavailable', message: raw || 'The AI service failed. Please try again.', retryable: true }
  return { kind: 'network', message: raw || 'Connection lost. Please try again.', retryable: true }
}

export function useRabbITic() {
  const config = useRuntimeConfig()
  const backendUrl = config.public.rabbiticApiUrl as string
  const { token } = useRabbITicAuth()

  const authHeaders = computed<Record<string, string>>(() =>
    token.value ? { Authorization: `Bearer ${token.value}` } : {},
  )

  /** Conversation endpoints live on the .NET backend; they no-op without one. */
  const hasBackend = computed(() => !!backendUrl)

  async function getModels(): Promise<RabbITicModel[]> {
    try {
      const res = await $fetch<{ models: RabbITicModel[] }>('/api/rabbitic/models')
      return res.models ?? []
    } catch {
      return []
    }
  }

  async function getConversations(): Promise<RabbITicConversation[]> {
    if (!hasBackend.value) return []
    try {
      return await $fetch<RabbITicConversation[]>(`${backendUrl}/conversations`, { headers: authHeaders.value })
    } catch {
      return []
    }
  }

  async function getConversation(id: string): Promise<RabbITicMessage[]> {
    if (!hasBackend.value) return []
    try {
      return await $fetch<RabbITicMessage[]>(`${backendUrl}/conversations/${id}`, { headers: authHeaders.value })
    } catch {
      return []
    }
  }

  async function deleteConversation(id: string): Promise<boolean> {
    if (!hasBackend.value) return true
    try {
      await $fetch(`${backendUrl}/conversations/${id}`, { method: 'DELETE', headers: authHeaders.value })
      return true
    } catch {
      return false
    }
  }

  /**
   * Streams a reply token-by-token.
   *
   * Talks to the Nuxt route rather than Ollama directly: the system prompt is
   * assembled server-side and the browser never needs CORS access to the model
   * host. The route replies with newline-delimited JSON — one `{token}` per
   * chunk, then a final `{done:true}`.
   *
   * Returns the AbortController so the caller can cancel an in-flight reply.
   */
  function sendMessageStream(
    message: string,
    model: string,
    conversationId: string | null,
    history: RabbITicMessage[],
    systemPrompt: string,
    handlers: StreamHandlers,
  ): AbortController {
    const controller = new AbortController()

    ;(async () => {
      let received = 0

      try {
        const res = await fetch('/api/rabbitic/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...authHeaders.value },
          signal: controller.signal,
          body: JSON.stringify({
            message,
            model,
            conversationId,
            systemPrompt,
            history: history.slice(-MAX_HISTORY),
          }),
        })

        if (!res.ok) {
          const text = await res.text().catch(() => '')
          handlers.onError(toError(res.status, text.slice(0, 200) || undefined))
          return
        }

        if (!res.body) {
          handlers.onError({ kind: 'empty', message: 'No response received. Please try again.', retryable: true })
          return
        }

        const finalId = res.headers.get('X-Conversation-Id') || conversationId
        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        let buffer = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })

          // A chunk can split mid-line, so keep the trailing partial in the buffer.
          const lines = buffer.split('\n')
          buffer = lines.pop() ?? ''

          for (const line of lines) {
            const trimmed = line.trim()
            if (!trimmed) continue
            try {
              const evt = JSON.parse(trimmed)
              if (evt.error) {
                handlers.onError({ kind: 'unavailable', message: evt.error, retryable: true })
                return
              }
              if (evt.token) {
                received += evt.token.length
                handlers.onToken(evt.token)
              }
            } catch {
              // Ignore malformed lines rather than killing a working stream.
            }
          }
        }

        if (received === 0) {
          handlers.onError({ kind: 'empty', message: 'No response received. Please try again.', retryable: true })
          return
        }

        handlers.onComplete(finalId)
      } catch (e: any) {
        if (e?.name === 'AbortError') return // User cancelled — not an error.
        handlers.onError(toError(undefined, e?.message))
      }
    })()

    return controller
  }

  return {
    hasBackend,
    getModels,
    getConversations,
    getConversation,
    deleteConversation,
    sendMessageStream,
  }
}
