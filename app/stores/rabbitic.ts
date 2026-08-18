import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { RabbITicMessage } from '@/composables/useRabbITic'

const STORAGE_KEY = 'rabbitic-chat'

export interface ChatMessage extends RabbITicMessage {
  id: string
  /** Set when the reply failed, so the bubble can offer a retry. */
  failed?: boolean
}

interface Persisted {
  messages: ChatMessage[]
  conversationId: string | null
  model: string
}

function load(): Persisted {
  const empty: Persisted = { messages: [], conversationId: null, model: '' }
  if (typeof localStorage === 'undefined') return empty
  try {
    return { ...empty, ...JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') }
  } catch {
    return empty
  }
}

export const useRabbITicStore = defineStore('rabbitic', () => {
  const isOpen = ref(false)
  const isStreaming = ref(false)
  const messages = ref<ChatMessage[]>([])
  const conversationId = ref<string | null>(null)
  const model = ref('')
  const error = ref<string | null>(null)

  const hasMessages = computed(() => messages.value.length > 0)

  function persist() {
    if (typeof localStorage === 'undefined') return
    const data: Persisted = {
      // Cap the stored transcript so localStorage cannot grow without bound.
      messages: messages.value.slice(-50),
      conversationId: conversationId.value,
      model: model.value,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }

  /** Call from onMounted — reads localStorage, so it must not run during SSR. */
  function hydrate(defaultModel: string) {
    const saved = load()
    messages.value = saved.messages
    conversationId.value = saved.conversationId
    model.value = saved.model || defaultModel
  }

  function addMessage(role: 'user' | 'assistant', content: string): ChatMessage {
    const msg: ChatMessage = { id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, role, content }
    messages.value.push(msg)
    return msg
  }

  function appendToLast(token: string) {
    const last = messages.value[messages.value.length - 1]
    if (last) last.content += token
  }

  function markLastFailed(message: string) {
    const last = messages.value[messages.value.length - 1]
    if (!last) return
    last.failed = true
    if (!last.content) last.content = message
  }

  function newConversation() {
    messages.value = []
    conversationId.value = null
    error.value = null
    persist()
  }

  function setModel(next: string) {
    model.value = next
    persist()
  }

  function open() { isOpen.value = true }
  function close() { isOpen.value = false }
  function toggle() { isOpen.value = !isOpen.value }

  return {
    isOpen, isStreaming, messages, conversationId, model, error, hasMessages,
    hydrate, persist, addMessage, appendToLast, markLastFailed,
    newConversation, setModel, open, close, toggle,
  }
})
