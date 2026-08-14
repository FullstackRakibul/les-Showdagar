<template>
  <div
    v-if="primary || secondary"
    class="flex flex-col sm:flex-row gap-3"
    :class="alignClass"
  >
    <NuxtLink
      v-if="primary"
      :to="primary.link"
      :target="primary.external ? '_blank' : undefined"
      :rel="primary.external ? 'noopener noreferrer' : undefined"
      class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold text-primary-foreground hover:opacity-90 active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      :class="primaryBgClass"
    >
      {{ primary.label }}
      <HugeiconsIcon :icon="resolveIcon('ArrowRight01Icon')" :size="15" class="shrink-0" />
    </NuxtLink>

    <NuxtLink
      v-if="secondary"
      :to="secondary.link"
      :target="secondary.external ? '_blank' : undefined"
      :rel="secondary.external ? 'noopener noreferrer' : undefined"
      class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md border border-border bg-background text-foreground text-sm font-semibold hover:bg-secondary active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {{ secondary.label }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import { useTheme } from '@/composables/useTheme'
import { resolveIcon } from '@/composables/useContentIcons'
import { useResolvedClub } from '@/composables/useContentContext'
import type { CtaContent, ClubId } from '@/types/content'

const props = withDefaults(defineProps<{
  primary?: CtaContent
  secondary?: CtaContent
  club?: ClubId
  align?: 'start' | 'center' | 'end'
  /** Stretch buttons to fill the row on mobile. */
  block?: boolean
}>(), {
  align: 'start',
  block: true,
})

const { getClubBgClass } = useTheme()
const club = useResolvedClub(() => props.club)

const primaryBgClass = computed(() =>
  club.value ? getClubBgClass(club.value) : 'bg-primary'
)

const alignClass = computed(() => {
  const align = {
    start: 'sm:justify-start',
    center: 'sm:justify-center items-center',
    end: 'sm:justify-end',
  }[props.align]
  return [align, props.block ? '' : 'sm:inline-flex'].join(' ')
})
</script>
