import { provide, inject, computed, type ComputedRef, type InjectionKey } from 'vue'
import type { ClubId } from '@/types/content'

/**
 * Lets a section declare which club it belongs to so nested cards, pills, and
 * CTAs inherit that accent without every component taking a `club` prop.
 *
 * A component's own explicit `club` prop always wins over the injected value.
 */

export interface ContentContext {
  clubId: ComputedRef<ClubId | null>
  sectionId: ComputedRef<string | null>
}

export const ContentContextKey: InjectionKey<ContentContext> = Symbol('contentContext')

const EMPTY: ContentContext = {
  clubId: computed(() => null),
  sectionId: computed(() => null),
}

export function provideContentContext(
  clubId: () => ClubId | null | undefined,
  sectionId: () => string | null | undefined,
) {
  const ctx: ContentContext = {
    clubId: computed(() => clubId() ?? null),
    sectionId: computed(() => sectionId() ?? null),
  }
  provide(ContentContextKey, ctx)
  return ctx
}

export function useContentContext(): ContentContext {
  return inject(ContentContextKey, EMPTY)
}

/** Resolves an explicit club prop against the surrounding context. */
export function useResolvedClub(explicit?: () => ClubId | null | undefined) {
  const ctx = useContentContext()
  return computed<ClubId | null>(() => explicit?.() ?? ctx.clubId.value ?? null)
}
