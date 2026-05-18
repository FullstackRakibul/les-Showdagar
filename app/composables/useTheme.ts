import { ref } from 'vue'

const PERSIST_KEY = 'rh-theme'

// Singleton state — shared across all composable calls
const isDark = ref(false)
const accentHue = ref(220) // 220=quantum 300=elegance 160=nextstop

function applyDark() {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('dark', isDark.value)
}

function applyAccent() {
  if (typeof document === 'undefined') return
  const c = accentHue.value
  const root = document.documentElement
  root.style.setProperty('--ring', `oklch(0.55 0.18 ${c})`)
  root.style.setProperty('--accent-hue', String(c))
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

  function setAccent(hue: 220 | 300 | 160 | number) {
    accentHue.value = hue
    applyAccent()
    persist()
  }

  // Call in onMounted() — restores persisted preference and applies classes
  function load() {
    if (typeof localStorage === 'undefined') return
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
