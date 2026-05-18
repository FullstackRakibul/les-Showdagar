<template>
  <div class="bg-card border border-border rounded-2xl shadow-2xl p-6 w-full max-w-sm">
    <!-- Header -->
    <div class="flex items-center justify-between mb-5">
      <div>
        <h2 class="text-base font-semibold text-foreground">Theme</h2>
        <p class="text-xs text-muted-foreground mt-0.5">Customize your experience</p>
      </div>
      <button
        @click="$emit('close')"
        class="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
      >
        <X class="w-4 h-4" />
      </button>
    </div>

    <!-- Mode Toggle -->
    <div class="mb-5">
      <p class="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
        Mode
      </p>
      <div class="flex gap-2">
        <button
          @click="setDark(false)"
          :class="[
            'flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-sm font-medium border transition-colors',
            !isDark
              ? 'bg-primary text-primary-foreground border-transparent'
              : 'bg-muted text-muted-foreground border-border hover:bg-secondary hover:text-foreground'
          ]"
        >
          <Sun class="w-4 h-4" />
          Light
        </button>
        <button
          @click="setDark(true)"
          :class="[
            'flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-sm font-medium border transition-colors',
            isDark
              ? 'bg-primary text-primary-foreground border-transparent'
              : 'bg-muted text-muted-foreground border-border hover:bg-secondary hover:text-foreground'
          ]"
        >
          <Moon class="w-4 h-4" />
          Dark
        </button>
      </div>
    </div>

    <!-- Divider -->
    <div class="border-t border-border mb-5" />

    <!-- Accent Color -->
    <div class="mb-5">
      <p class="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
        Accent Color
      </p>
      <div class="flex gap-3">
        <button
          v-for="club in clubs"
          :key="club.hue"
          @click="setAccent(club.hue)"
          :title="club.label"
          :style="{ backgroundColor: club.color }"
          :class="[
            'flex-1 h-9 rounded-xl border-2 transition-all duration-150 flex items-center justify-center',
            accentHue === club.hue
              ? 'border-foreground shadow-md scale-105'
              : 'border-transparent hover:scale-105'
          ]"
        >
          <Check v-if="accentHue === club.hue" class="w-3.5 h-3.5 text-white drop-shadow" />
        </button>
      </div>
      <div class="flex justify-between mt-1.5 px-0.5">
        <span v-for="club in clubs" :key="club.hue" class="flex-1 text-center text-[10px] text-muted-foreground">
          {{ club.label }}
        </span>
      </div>
    </div>

    <!-- Divider -->
    <div class="border-t border-border mb-4" />

    <!-- Status -->
    <div class="flex items-center justify-between text-xs text-muted-foreground">
      <span>Current theme</span>
      <div class="flex items-center gap-1.5">
        <div
          class="w-3 h-3 rounded-full border border-border"
          :style="{ backgroundColor: activeClub?.color }"
        />
        <span class="font-medium text-foreground">
          {{ activeClub?.label }} · {{ isDark ? 'Dark' : 'Light' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { Sun, Moon, Check, X } from 'lucide-vue-next'
import { useTheme } from '@/composables/useTheme'

defineEmits(['close'])

const { isDark, accentHue, setDark, setAccent, load } = useTheme()

const clubs = [
  { label: 'Quantum',  hue: 220, color: 'oklch(0.55 0.18 220)' },
  { label: 'Elegance', hue: 300, color: 'oklch(0.55 0.22 300)' },
  { label: 'NextStop', hue: 160, color: 'oklch(0.55 0.20 160)' },
]

const activeClub = computed(() => clubs.find(c => c.hue === accentHue.value) ?? clubs[0])

onMounted(load)
</script>
