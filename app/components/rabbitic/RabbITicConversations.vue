<template>
  <div class="bg-card/50">
    <div class="flex items-center justify-between px-4 py-2 border-b border-border/60">
      <span class="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Conversations</span>
      <button
        class="text-xs text-muted-foreground hover:text-foreground transition-colors"
        @click="$emit('close')"
      >Done</button>
    </div>

    <p v-if="loading" class="px-4 py-4 text-xs text-muted-foreground">Loading…</p>

    <p v-else-if="!hasBackend" class="px-4 py-4 text-xs text-muted-foreground">
      History needs the RabbITic backend. This chat is saved locally only.
    </p>

    <p v-else-if="!items.length" class="px-4 py-4 text-xs text-muted-foreground">
      No saved conversations yet.
    </p>

    <ul v-else class="py-1">
      <li v-for="c in items" :key="c.id">
        <div
          :class="[
            'group flex items-center gap-2 px-4 py-2 cursor-pointer transition-colors',
            c.id === store.conversationId ? 'bg-primary/10' : 'hover:bg-accent',
          ]"
          @click="$emit('select', c.id)"
        >
          <div class="min-w-0 flex-1">
            <p :class="['text-xs truncate', c.id === store.conversationId ? 'text-primary font-medium' : 'text-foreground']">
              {{ c.title || 'Untitled' }}
            </p>
            <p class="text-[10px] text-muted-foreground">{{ formatDate(c.createdAt) }}</p>
          </div>

          <button
            :class="[
              'size-6 rounded flex items-center justify-center shrink-0 transition-all',
              confirmId === c.id
                ? 'text-destructive bg-destructive/10'
                : 'text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-destructive',
            ]"
            :title="confirmId === c.id ? 'Click again to delete' : 'Delete'"
            :aria-label="`Delete ${c.title}`"
            @click.stop="remove(c.id)"
          >
            <HugeiconsIcon :icon="confirmId === c.id ? Tick01Icon : Delete02Icon" :size="13" />
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRabbITic, type RabbITicConversation } from '@/composables/useRabbITic'
import { useRabbITicStore } from '@/stores/rabbitic'
import { HugeiconsIcon } from '@hugeicons/vue'
import { Delete02Icon, Tick01Icon } from '@hugeicons/core-free-icons'

const emit = defineEmits<{ (e: 'select', id: string): void; (e: 'close'): void }>()

const { getConversations, deleteConversation, hasBackend } = useRabbITic()
const store = useRabbITicStore()

const items = ref<RabbITicConversation[]>([])
const loading = ref(true)
/** Two-step delete: first click arms, second confirms. Avoids a modal. */
const confirmId = ref<string | null>(null)
let confirmTimer: ReturnType<typeof setTimeout> | null = null

function formatDate(iso: string) {
  if (!iso) return ''
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

async function remove(id: string) {
  if (confirmId.value !== id) {
    confirmId.value = id
    if (confirmTimer) clearTimeout(confirmTimer)
    confirmTimer = setTimeout(() => { confirmId.value = null }, 3000)
    return
  }

  confirmId.value = null
  if (await deleteConversation(id)) {
    items.value = items.value.filter(c => c.id !== id)
    // Deleting the open conversation leaves the panel showing orphaned messages.
    if (store.conversationId === id) store.newConversation()
  }
}

onMounted(async () => {
  items.value = await getConversations()
  loading.value = false
})
</script>
