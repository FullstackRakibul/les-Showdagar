import { ref } from 'vue'

const PERSIST_KEY = 'rh-theme'

// Singleton state — shared across all composable calls
const isDark = ref(false)
const accentHue = ref<number>(220)

// Per-club chroma values so --ring/--primary are accurate
const CLUBS: Record<number, string> = {
  220: 'oklch(0.55 0.18 220)',
  300: 'oklch(0.55 0.22 300)',
  160: 'oklch(0.55 0.20 160)',
}

function applyDark() {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('dark', isDark.value)
}

function applyAccent() {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  const color = CLUBS[accentHue.value]

  if (color) {
    // Override --primary and --ring with the chosen club color
    root.style.setProperty('--primary', color)
    root.style.setProperty('--primary-foreground', 'oklch(0.98 0 0)')
    root.style.setProperty('--ring', color)
  } else {
    // Unknown hue — remove overrides and let CSS handle it
    root.style.removeProperty('--primary')
    root.style.removeProperty('--primary-foreground')
    root.style.removeProperty('--ring')
  }
}

function persist() {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(PERSIST_KEY, JSON.stringify({ dark: isDark.value, accentHue: accentHue.value }))
}

export function useTheme() {
  function toggleDark() {
    isDark.value = !isDark.value
    applyDark()
    persist()
  }

  function setDark(value: boolean) {
    isDark.value = value
    applyDark()
    persist()
  }

  function setAccent(hue: number) {
    accentHue.value = hue
    applyAccent()
    persist()
  }

  // Call in onMounted() — restores persisted preference and applies all CSS vars
  function load() {
    if (!import.meta.client) return
    try {
      const raw = localStorage.getItem(PERSIST_KEY)
      if (raw) {
        const saved = JSON.parse(raw)
        if (typeof saved.dark === 'boolean') isDark.value = saved.dark
        if (typeof saved.accentHue === 'number') accentHue.value = saved.accentHue
      }
    } catch {}
    applyDark()
    applyAccent()
  }

  return { isDark, accentHue, toggleDark, setDark, setAccent, load }
}
