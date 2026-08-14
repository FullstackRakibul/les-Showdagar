import * as HugeIcons from '@hugeicons/core-free-icons'

/**
 * Content JSON stores icons by name (`"CpuIcon"`) rather than by value, so the
 * files stay serialisable and CMS-portable. This resolves those names back to
 * the icon objects `HugeiconsIcon` expects.
 */

type IconRecord = Record<string, unknown>

const ICONS = HugeIcons as unknown as IconRecord

/** Rendered when a name is missing so a typo degrades to a placeholder. */
const FALLBACK_ICON_NAME = 'CircleIcon'

const warned = new Set<string>()

export function resolveIcon(name?: string): unknown {
  if (!name) return ICONS[FALLBACK_ICON_NAME]

  const icon = ICONS[name]
  if (icon) return icon

  if (import.meta.dev && !warned.has(name)) {
    warned.add(name)
    console.warn(`[content] Unknown icon "${name}" — falling back to ${FALLBACK_ICON_NAME}.`)
  }
  return ICONS[FALLBACK_ICON_NAME]
}

export function useContentIcons() {
  return { resolveIcon }
}
