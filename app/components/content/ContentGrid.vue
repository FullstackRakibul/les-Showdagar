<template>
  <!-- Grid / list -->
  <div
    v-if="layout !== 'carousel'"
    class="grid gap-5"
    :class="gridClass"
    role="list"
  >
    <div v-for="(card, i) in cards" :key="card.id" role="listitem">
      <ContentCard
        :card="card"
        :club="club"
        :featured="featuredFirst && i === 0"
        :link-label="linkLabel"
      />
    </div>
  </div>

  <!-- Carousel: horizontal scroll with snap, keyboard-reachable -->
  <div
    v-else
    class="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4 scroll-smooth carousel"
    role="list"
    tabindex="0"
    :aria-label="`${cards.length} items, scroll horizontally`"
    data-lenis-prevent
  >
    <div
      v-for="card in cards"
      :key="card.id"
      role="listitem"
      class="snap-start shrink-0 w-[280px] sm:w-[320px]"
    >
      <ContentCard :card="card" :club="club" :link-label="linkLabel" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ContentCard from './ContentCard.vue'
import type { CardContent, ClubId, SectionLayout } from '@/types/content'

const props = withDefaults(defineProps<{
  cards: CardContent[]
  layout?: SectionLayout
  columns?: 2 | 3 | 4
  club?: ClubId
  /** Renders the first card in the wider `featured` variant. */
  featuredFirst?: boolean
  linkLabel?: string
}>(), {
  layout: 'grid',
  columns: 3,
  featuredFirst: false,
})

// Static literals per column count — Tailwind cannot see interpolated classes.
const COLUMN_CLASS: Record<2 | 3 | 4, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
}

const gridClass = computed(() => {
  if (props.layout === 'list') return 'grid-cols-1'
  return `grid-cols-1 ${COLUMN_CLASS[props.columns]}`
})
</script>

<style scoped>
.carousel {
  scrollbar-width: thin;
}
.carousel::-webkit-scrollbar {
  height: 6px;
}
.carousel::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 3px;
}

@media (prefers-reduced-motion: reduce) {
  .carousel {
    scroll-behavior: auto;
  }
}
</style>
