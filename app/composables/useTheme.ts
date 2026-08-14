import { ref, computed } from 'vue'
import type { ClubId } from '@/types/content'

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

const CLUB_HUES: Record<ClubId, number> = {
  quantum: 220,
  elegance: 300,
  nextstop: 160,
}

// Tailwind class fragments per club. Written as complete literals rather than
// interpolated strings so Tailwind's scanner can see them.
const CLUB_CLASSES: Record<ClubId, {
  text: string
  bg: string
  bgSoft: string
  border: string
  ring: string
  gradient: string
}> = {
  quantum: {
    text: 'text-quantum-500',
    bg: 'bg-quantum-500',
    bgSoft: 'bg-quantum-500/10',
    border: 'border-quantum-500/30',
    ring: 'ring-quantum-500/40',
    gradient: 'from-quantum-400 to-quantum-600',
  },
  elegance: {
    text: 'text-elegance-500',
    bg: 'bg-elegance-500',
    bgSoft: 'bg-elegance-500/10',
    border: 'border-elegance-500/30',
    ring: 'ring-elegance-500/40',
    gradient: 'from-elegance-400 to-elegance-600',
  },
  nextstop: {
    text: 'text-nextstop-500',
    bg: 'bg-nextstop-500',
    bgSoft: 'bg-nextstop-500/10',
    border: 'border-nextstop-500/30',
    ring: 'ring-nextstop-500/40',
    gradient: 'from-nextstop-400 to-nextstop-600',
  },
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

  /** The club whose hue is currently the active accent, if any. */
  const activeClub = computed<ClubId | null>(() => {
    const entry = (Object.entries(CLUB_HUES) as [ClubId, number][])
      .find(([, hue]) => hue === accentHue.value)
    return entry?.[0] ?? null
  })

  function getClubHue(club: ClubId): number {
    return CLUB_HUES[club]
  }

  /** Raw oklch value — for inline gradients where a class won't do. */
  function getClubColor(club: ClubId): string {
    return CLUBS[CLUB_HUES[club]] ?? CLUBS[220]!
  }

  function getClubTextClass(club: ClubId): string {
    return CLUB_CLASSES[club].text
  }

  function getClubBgClass(club: ClubId, soft = false): string {
    return soft ? CLUB_CLASSES[club].bgSoft : CLUB_CLASSES[club].bg
  }

  function getClubBorderClass(club: ClubId): string {
    return CLUB_CLASSES[club].border
  }

  function getClubGradientClass(club: ClubId): string {
    return CLUB_CLASSES[club].gradient
  }

  /** True when `club` matches the user's chosen accent — drives the highlight. */
  function isClubActive(club: ClubId): boolean {
    return CLUB_HUES[club] === accentHue.value
  }

  /** Switches the global accent to a club's hue. */
  function setAccentByClub(club: ClubId) {
    setAccent(CLUB_HUES[club])
  }

  return {
    isDark,
    accentHue,
    activeClub,
    toggleDark,
    setDark,
    setAccent,
    setAccentByClub,
    load,
    getClubHue,
    getClubColor,
    getClubTextClass,
    getClubBgClass,
    getClubBorderClass,
    getClubGradientClass,
    isClubActive,
  }
}
