<template>
  <div class="flex flex-col h-full bg-background text-foreground">

    <!-- Header -->
    <header class="flex items-center justify-between gap-2 px-4 py-3 border-b border-border shrink-0">
      <div class="flex items-center gap-2.5 min-w-0">
        <div class="size-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
          <HugeiconsIcon :icon="AiChat01Icon" :size="18" class="text-primary" />
        </div>
        <div class="min-w-0">
          <h2 class="text-sm font-semibold leading-tight truncate">RabbITic</h2>
          <RabbITicModelSelector />
        </div>
      </div>

      <div class="flex items-center gap-0.5 shrink-0">
        <button
          class="size-8 rounded-md flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          title="Conversations" aria-label="Conversations"
          @click="showConversations = !showConversations"
        >
          <HugeiconsIcon :icon="Menu01Icon" :size="16" />
        </button>
        <button
          class="size-8 rounded-md flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          title="New chat" aria-label="New chat"
          @click="startNew"
        >
          <HugeiconsIcon :icon="PlusSignIcon" :size="16" />
        </button>
        <button
          class="size-8 rounded-md flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          title="Close" aria-label="Close chat"
          @click="$emit('close')"
        >
          <HugeiconsIcon :icon="Cancel01Icon" :size="16" />
        </button>
      </div>
    </header>

    <!-- Conversations drawer -->
    <RabbITicConversations
      v-if="showConversations"
      class="border-b border-border shrink-0 max-h-56 overflow-y-auto"
      @select="loadConversation"
      @close="showConversations = false"
    />

    <!-- Messages -->
    <div ref="scroller" class="flex-1 overflow-y-auto px-4 py-4 space-y-4" @scroll="onScroll">

      <!-- Empty state -->
      <div v-if="!store.hasMessages" class="h-full flex flex-col items-center justify-center text-center gap-4 py-8">
        <div class="size-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
          <HugeiconsIcon :icon="AiChat01Icon" :size="26" class="text-primary" />
        </div>
        <div>
          <p class="font-semibold text-sm">Your intelligent shopping companion</p>
          <p class="text-xs text-muted-foreground mt-1">Ask about products, your cart, or which club fits you.</p>
        </div>
        <div class="flex flex-wrap justify-center gap-2 pt-1">
          <button
            v-for="s in suggestions" :key="s"
            class="px-3 py-1.5 rounded-full border border-border text-xs text-muted-foreground hover:border-primary/40 hover:text-foreground hover:bg-primary/5 transition-colors"
            @click="send(s)"
          >{{ s }}</button>
        </div>
      </div>

      <!-- Message list -->
      <div
        v-for="msg in store.messages" :key="msg.id"
        :class="['flex gap-2.5', msg.role === 'user' ? 'justify-end' : 'justify-start']"
      >
        <div v-if="msg.role === 'assistant'" class="size-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
          <HugeiconsIcon :icon="AiChat01Icon" :size="14" class="text-primary" />
        </div>

        <div :class="['group relative max-w-[80%] min-w-0', msg.role === 'user' ? 'order-first' : '']">
          <div
            :class="[
              'px-3.5 py-2.5 text-sm whitespace-pre-wrap break-words rounded-2xl',
              msg.role === 'user'
                ? 'bg-primary text-primary-foreground rounded-br-sm'
                : msg.failed
                  ? 'bg-destructive/10 text-destructive border border-destructive/25 rounded-bl-sm'
                  : 'bg-muted border border-border rounded-bl-sm',
            ]"
          >{{ msg.content }}<span v-if="isLastAssistant(msg) && store.isStreaming" class="caret" /></div>

          <!-- Per-message actions -->
          <div v-if="msg.role === 'assistant' && msg.content && !store.isStreaming"
            class="flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
            <button
              class="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors"
              @click="copy(msg.content, msg.id)"
            >
              <HugeiconsIcon :icon="copiedId === msg.id ? Tick01Icon : Copy01Icon" :size="11" />
              {{ copiedId === msg.id ? 'Copied' : 'Copy' }}
            </button>
            <button
              v-if="msg.failed"
              class="flex items-center gap-1 text-[10px] text-destructive hover:underline"
              @click="retry"
            >
              <HugeiconsIcon :icon="Refresh01Icon" :size="11" /> Retry
            </button>
          </div>
        </div>
      </div>

      <!-- Typing indicator: only before the first token lands -->
      <div v-if="store.isStreaming && !lastAssistantHasContent" class="flex gap-2.5">
        <div class="size-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
          <HugeiconsIcon :icon="AiChat01Icon" :size="14" class="text-primary" />
        </div>
        <div class="flex items-center gap-1 px-4 py-3 rounded-2xl rounded-bl-sm bg-muted border border-border">
          <span class="dot" /><span class="dot" /><span class="dot" />
        </div>
      </div>
    </div>

    <!-- Jump to latest -->
    <Transition name="fade">
      <button
        v-if="!pinnedToBottom"
        class="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 px-3 py-1.5 rounded-full bg-card border border-border shadow-md text-xs flex items-center gap-1 hover:bg-accent transition-colors"
        @click="scrollToBottom(true)"
      >
        <HugeiconsIcon :icon="ArrowDown01Icon" :size="13" /> Latest
      </button>
    </Transition>

    <!-- Composer -->
    <footer class="p-3 border-t border-border shrink-0">
      <div class="flex items-end gap-2 rounded-xl border border-border bg-card px-3 py-2 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/15 transition-all">
        <textarea
          ref="input"
          v-model="draft"
          rows="1"
          :maxlength="MAX_CHARS"
          :disabled="store.isStreaming"
          placeholder="Ask RabbITic…"
          aria-label="Message RabbITic"
          class="flex-1 bg-transparent text-sm resize-none outline-none py-1 max-h-20 placeholder:text-muted-foreground/60 disabled:opacity-60"
          @input="autoResize"
          @keydown.enter.exact.prevent="send()"
        />

        <button
          v-if="store.isStreaming"
          class="size-8 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center shrink-0 hover:bg-destructive/20 transition-colors"
          title="Stop generating" aria-label="Stop generating"
          @click="stop"
        >
          <HugeiconsIcon :icon="StopCircleIcon" :size="16" />
        </button>
        <button
          v-else
          class="size-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shrink-0 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          :disabled="!draft.trim()"
          title="Send" aria-label="Send message"
          @click="send()"
        >
          <HugeiconsIcon :icon="Sent02Icon" :size="16" />
        </button>
      </div>

      <div class="flex items-center justify-between mt-1.5 px-1">
        <span v-if="store.error" class="text-[10px] text-destructive truncate">{{ store.error }}</span>
        <span v-else class="text-[10px] text-muted-foreground/60">Enter to send · Shift+Enter for newline</span>
        <span :class="['text-[10px] tabular-nums shrink-0 ml-2', draft.length > MAX_CHARS * 0.9 ? 'text-destructive' : 'text-muted-foreground/60']">
          {{ draft.length }}/{{ MAX_CHARS }}
        </span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'
import { useRuntimeConfig } from '#app'
import { useRabbITic } from '@/composables/useRabbITic'
import { useRabbITicContext } from '@/composables/useRabbITicContext'
import { useRabbITicStore, type ChatMessage } from '@/stores/rabbitic'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  AiChat01Icon, Cancel01Icon, PlusSignIcon, Menu01Icon, Sent02Icon,
  Copy01Icon, Tick01Icon, Refresh01Icon, StopCircleIcon, ArrowDown01Icon,
} from '@hugeicons/core-free-icons'

defineEmits<{ (e: 'close'): void }>()

const MAX_CHARS = 2000

const config = useRuntimeConfig()
const { sendMessageStream, getConversation } = useRabbITic()
const { buildSystemPrompt } = useRabbITicContext()
const store = useRabbITicStore()

const draft = ref('')
const input = ref<HTMLTextAreaElement | null>(null)
const scroller = ref<HTMLElement | null>(null)
const showConversations = ref(false)
const copiedId = ref<string | null>(null)
const pinnedToBottom = ref(true)
let controller: AbortController | null = null

const suggestions = [
  'Find wireless headphones',
  "What's in my cart?",
  'Which club is right for me?',
]

const lastAssistantHasContent = computed(() => {
  const last = store.messages[store.messages.length - 1]
  return last?.role === 'assistant' && last.content.length > 0
})

function isLastAssistant(msg: ChatMessage) {
  return store.messages[store.messages.length - 1]?.id === msg.id && msg.role === 'assistant'
}

function autoResize() {
  const el = input.value
  if (!el) return
  el.style.height = 'auto'
  el.style.height = `${Math.min(el.scrollHeight, 80)}px`
}

function onScroll() {
  const el = scroller.value
  if (!el) return
  pinnedToBottom.value = el.scrollHeight - el.scrollTop - el.clientHeight < 60
}

async function scrollToBottom(force = false) {
  if (!force && !pinnedToBottom.value) return
  await nextTick()
  const el = scroller.value
  if (el) el.scrollTop = el.scrollHeight
  pinnedToBottom.value = true
}

async function send(preset?: string) {
  const text = (preset ?? draft.value).trim()
  if (!text || store.isStreaming) return

  store.error = null
  store.addMessage('user', text)
  draft.value = ''
  autoResize()
  await scrollToBottom(true)

  await stream(text)
}

async function stream(text: string) {
  store.isStreaming = true
  // History excludes the message being answered — it is passed separately.
  const history = store.messages.slice(0, -1).map(m => ({ role: m.role, content: m.content }))
  store.addMessage('assistant', '')
  await scrollToBottom(true)

  controller = sendMessageStream(
    text,
    store.model,
    store.conversationId,
    history,
    buildSystemPrompt(),
    {
      onToken: (token) => {
        store.appendToLast(token)
        scrollToBottom()
      },
      onComplete: (conversationId) => {
        store.isStreaming = false
        controller = null
        if (conversationId) store.conversationId = conversationId
        store.persist()
      },
      onError: (err) => {
        store.isStreaming = false
        controller = null
        store.error = err.message
        store.markLastFailed(err.message)
        store.persist()
      },
    },
  )
}

function stop() {
  controller?.abort()
  controller = null
  store.isStreaming = false
  store.persist()
}

/** Drops the failed reply and re-sends the question that produced it. */
async function retry() {
  const lastUser = [...store.messages].reverse().find(m => m.role === 'user')
  if (!lastUser) return
  store.messages.pop()
  store.error = null
  await stream(lastUser.content)
}

function startNew() {
  stop()
  store.newConversation()
  showConversations.value = false
}

async function loadConversation(id: string) {
  stop()
  const messages = await getConversation(id)
  store.messages = messages.map((m, i) => ({ ...m, id: `${id}-${i}` }))
  store.conversationId = id
  store.persist()
  showConversations.value = false
  await scrollToBottom(true)
}

async function copy(text: string, id: string) {
  try {
    await navigator.clipboard.writeText(text)
    copiedId.value = id
    setTimeout(() => { if (copiedId.value === id) copiedId.value = null }, 1500)
  } catch { /* clipboard blocked — nothing useful to show */ }
}

onMounted(() => {
  store.hydrate(config.public.rabbiticModel as string)
  scrollToBottom(true)
  input.value?.focus()
})

onUnmounted(() => {
  controller?.abort()
  controller = null
})
</script>

<style scoped>
.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--muted-foreground);
  opacity: 0.6;
  animation: bounce 1.2s infinite ease-in-out;
}
.dot:nth-child(2) { animation-delay: 0.15s; }
.dot:nth-child(3) { animation-delay: 0.3s; }

@keyframes bounce {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
  30% { transform: translateY(-4px); opacity: 1; }
}

/* Blinking caret trailing the streaming reply */
.caret {
  display: inline-block;
  width: 2px;
  height: 0.9em;
  margin-left: 2px;
  vertical-align: text-bottom;
  background: currentColor;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

@media (prefers-reduced-motion: reduce) {
  .dot, .caret { animation: none; }
}
</style>
