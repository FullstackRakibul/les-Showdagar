<template>
  <div ref="root" class="relative">
    <button
      class="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
      :aria-expanded="open"
      aria-haspopup="listbox"
      @click="open = !open"
    >
      <span class="font-medium">{{ store.model || 'Loading…' }}</span>
      <HugeiconsIcon :icon="ArrowDown01Icon" :size="14" :class="['transition-transform', open && 'rotate-180']" />
    </button>

    <Transition name="dropdown">
      <ul
        v-if="open"
        role="listbox"
        class="absolute left-0 top-full mt-1.5 z-50 min-w-45 max-h-60 overflow-y-auto rounded-lg border border-border bg-popover text-popover-foreground shadow-lg py-1"
      >
        <li v-if="!models.length" class="px-3 py-2 text-xs text-muted-foreground">
          No models found. Is Ollama running?
        </li>
        <li v-for="m in models" :key="m.name">
          <button
            role="option"
            :aria-selected="m.name === store.model"
            class="w-full flex items-center justify-between gap-2 px-3 py-1.5 text-xs text-left hover:bg-accent hover:text-accent-foreground transition-colors"
            @click="select(m.name)"
          >
            <span class="truncate">{{ m.name }}</span>
            <HugeiconsIcon v-if="m.name === store.model" :icon="Tick01Icon" :size="14" class="text-primary shrink-0" />
          </button>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useRabbITic, type RabbITicModel } from '@/composables/useRabbITic'
import { useRabbITicStore } from '@/stores/rabbitic'
import { HugeiconsIcon } from '@hugeicons/vue'
import { ArrowDown01Icon, Tick01Icon } from '@hugeicons/core-free-icons'

const { getModels } = useRabbITic()
const store = useRabbITicStore()

const root = ref<HTMLElement | null>(null)
const open = ref(false)
const models = ref<RabbITicModel[]>([])

onClickOutside(root, () => { open.value = false })

function select(name: string) {
  store.setModel(name)
  open.value = false
}

/** Embedding models are listed by Ollama but cannot hold a conversation. */
const isChatModel = (name: string) => !/embed/i.test(name)

onMounted(async () => {
  // Only offer models that can actually chat, so the picker cannot strand the
  // user on an embedding model that returns nothing.
  models.value = (await getModels()).filter(m => isChatModel(m.name))
  if (!models.value.length) return

  const configured = store.model
  const exact = models.value.find(m => m.name === configured)
  // Ollama reports `llama3:latest`, but people configure plain `llama3`.
  const tagged = models.value.find(m => m.name === `${configured}:latest`)

  if (!exact) store.setModel((tagged ?? models.value[0]!).name)
})
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
