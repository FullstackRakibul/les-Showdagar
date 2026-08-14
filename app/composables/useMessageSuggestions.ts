import { computed, type Ref } from 'vue'
import type { MessageSuggestionContent } from '@/types/content'

/**
 * Matches what the user is typing against keyword sets and surfaces a relevant
 * hint. Runs entirely in the browser — the message text is never sent anywhere
 * for this, and nothing about the match is recorded.
 */
export function useMessageSuggestions(
  message: Ref<string> | (() => string),
  suggestions: Ref<MessageSuggestionContent[]> | (() => MessageSuggestionContent[]),
  { minLength = 12, limit = 2 }: { minLength?: number; limit?: number } = {},
) {
  const text = computed(() =>
    (typeof message === 'function' ? message() : message.value).toLowerCase()
  )

  const pool = computed(() =>
    typeof suggestions === 'function' ? suggestions() : suggestions.value
  )

  const matches = computed<MessageSuggestionContent[]>(() => {
    const body = text.value.trim()
    if (body.length < minLength) return []

    return pool.value
      .map(suggestion => ({
        suggestion,
        hits: suggestion.keywords.filter(k => body.includes(k)).length,
      }))
      .filter(({ hits }) => hits > 0)
      .sort((a, b) => b.hits - a.hits)
      .slice(0, limit)
      .map(({ suggestion }) => suggestion)
  })

  const hasMatches = computed(() => matches.value.length > 0)

  return { matches, hasMatches }
}
