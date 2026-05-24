<template>
  <div v-if="!layoutStore.leftSidebarOpen && !layoutStore.rightSidebarOpen" class="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
    <!-- Mini Panel -->
    <Transition enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-2 scale-95" enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition-all duration-150 ease-in" leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-2 scale-95">
      <div v-if="open" class="bg-card border border-border rounded-2xl shadow-xl p-3 w-52 origin-bottom-right">
        <!-- Mode Row -->
        <p class="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2 px-1">
          Mode
        </p>
        <div class="flex gap-1.5 mb-3">
          <button @click="setDark(false)" :class="[
            'flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium transition-colors',
            !isDark
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-secondary hover:text-foreground'
          ]">
            <Sun class="w-3.5 h-3.5" />
            Light
          </button>
          <button @click="setDark(true)" :class="[
            'flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium transition-colors',
            isDark
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-secondary hover:text-foreground'
          ]">
            <Moon class="w-3.5 h-3.5" />
            Dark
          </button>
        </div>

        <!-- Divider -->
        <div class="border-t border-border mb-3" />

        <!-- Accent Row -->
        <p class="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2 px-1">
          Accent
        </p>
        <div class="flex items-center gap-2 px-1">
          <button v-for="club in clubs" :key="club.hue" @click="setAccent(club.hue)" :title="club.label"
            :style="{ backgroundColor: club.color }" :class="[
              'w-7 h-7 rounded-full border-2 transition-all duration-150',
              accentHue === club.hue
                ? 'border-foreground scale-110 shadow-md'
                : 'border-transparent hover:scale-105'
            ]">
            <span class="sr-only">{{ club.label }} accent</span>
          </button>
          <!-- Neutral accent -->
          <button @click="setAccent(260)" title="Neutral" :class="[
            'w-7 h-7 rounded-full border-2 transition-all duration-150 bg-foreground',
            accentHue === 260
              ? 'border-foreground scale-110 shadow-md'
              : 'border-transparent hover:scale-105 opacity-60'
          ]">
            <span class="sr-only">Neutral accent</span>
          </button>
        </div>
      </div>
    </Transition>

    <!-- Toggle Button -->
    <button @click="open = !open" :title="open ? 'Close theme' : 'Theme settings'" :class="[
        'w-10 h-10 rounded-full shadow-lg border border-border flex items-center justify-center transition-all duration-200',
        'bg-card hover:bg-secondary text-foreground',
        open ? 'rotate-180' : 'rotate-0'
      ]">
      <Palette v-if="!open" class="w-4 h-4" />
      <X v-else class="w-4 h-4" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Sun, Moon, Palette, X } from 'lucide-vue-next'
import { useTheme } from '@/composables/useTheme'
import { useLayoutStore } from '@/stores/layout'

const { isDark, accentHue, setDark, setAccent, load } = useTheme()
const layoutStore = useLayoutStore()
const open = ref(false)

const clubs = [
  { label: 'Quantum (Tech)', hue: 220, color: 'oklch(0.55 0.18 220)' },
  { label: 'Elegance (Fashion)', hue: 300, color: 'oklch(0.55 0.22 300)' },
  { label: 'NextStop (Travel)', hue: 160, color: 'oklch(0.55 0.20 160)' },
]

onMounted(load)
</script>