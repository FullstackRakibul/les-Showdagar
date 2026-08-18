/**
 * Lists installed Ollama models for the model picker.
 *
 * Proxied rather than fetched from the browser for the same reason as chat: the
 * Ollama host is server-side config. Returns an empty list instead of erroring so
 * a missing Ollama degrades the picker rather than breaking the chat panel.
 */
export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const ollamaUrl = (config.ollamaApiUrl as string).replace(/\/$/, '')

  try {
    const res = await $fetch<{ models?: { name: string; size?: number }[] }>(`${ollamaUrl}/api/tags`, {
      timeout: 4000,
    })
    return { models: res.models ?? [] }
  } catch {
    return { models: [] }
  }
})
