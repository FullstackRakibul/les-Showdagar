<template>
  <component
    :is="card.link ? 'NuxtLink' : 'div'"
    :to="card.link"
    class="group relative flex flex-col rounded-lg border bg-card/80 backdrop-blur-sm overflow-hidden transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    :class="[
      accentBorderClass,
      card.link ? 'cursor-pointer card-interactive' : '',
      featured ? 'sm:flex-row' : '',
    ]"
  >
    <!-- Image -->
    <div
      v-if="card.image"
      class="relative overflow-hidden bg-muted shrink-0"
      :class="featured ? 'sm:w-2/5 aspect-video sm:aspect-auto' : 'aspect-video'"
    >
      <img
        :src="card.image"
        :alt="card.title"
        loading="lazy"
        decoding="async"
        class="w-full h-full object-cover transition-transform duration-500 card-image"
      />
    </div>

    <div class="flex flex-col flex-1 p-5 gap-3">
      <!-- Icon + badge row -->
      <div v-if="card.icon || card.badge" class="flex items-start justify-between gap-3">
        <div
          v-if="card.icon"
          class="w-10 h-10 rounded-md flex items-center justify-center shrink-0 transition-colors"
          :class="[accentSoftBgClass, accentTextClass]"
        >
          <HugeiconsIcon :icon="resolveIcon(card.icon)" :size="19" />
        </div>
        <span
          v-if="card.badge"
          class="ml-auto text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md border shrink-0"
          :class="[accentSoftBgClass, accentTextClass, accentBorderSoftClass]"
        >
          {{ card.badge }}
        </span>
      </div>

      <!-- Title + description -->
      <div class="flex-1">
        <h3 class="font-semibold text-foreground leading-snug" :class="featured ? 'text-lg' : 'text-base'">
          {{ card.title }}
        </h3>
        <p class="text-sm text-muted-foreground leading-relaxed mt-1.5">
          {{ card.description }}
        </p>
      </div>

      <!-- Bullet items -->
      <ul v-if="card.items?.length" class="flex flex-wrap gap-1.5" role="list">
        <li v-for="item in card.items" :key="item">
          <FeaturePill :label="item" :club="resolvedClub ?? undefined" />
        </li>
      </ul>

      <!-- Link affordance -->
      <div
        v-if="card.link"
        class="flex items-center gap-1.5 text-sm font-medium mt-1 transition-colors"
        :class="accentTextClass"
      >
        {{ linkLabel }}
        <HugeiconsIcon
          :icon="resolveIcon('ArrowRight01Icon')"
          :size="14"
          class="shrink-0 transition-transform duration-300 card-arrow"
        />
      </div>
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import { useTheme } from '@/composables/useTheme'
import { resolveIcon } from '@/composables/useContentIcons'
import { useResolvedClub } from '@/composables/useContentContext'
import FeaturePill from './FeaturePill.vue'
import type { CardContent, ClubId } from '@/types/content'

const props = withDefaults(defineProps<{
  card: CardContent
  club?: ClubId
  /** Wider layout with the image beside the copy instead of above it. */
  featured?: boolean
  linkLabel?: string
}>(), {
  featured: false,
  linkLabel: 'Learn more',
})

const { getClubTextClass, getClubBgClass, getClubBorderClass } = useTheme()

// The card's own `club` field wins, then an explicit prop, then section context.
const resolvedClub = useResolvedClub(() => props.card.club ?? props.club)

const accentTextClass = computed(() =>
  resolvedClub.value ? getClubTextClass(resolvedClub.value) : 'text-primary'
)

const accentSoftBgClass = computed(() =>
  resolvedClub.value ? getClubBgClass(resolvedClub.value, true) : 'bg-primary/10'
)

const accentBorderSoftClass = computed(() =>
  resolvedClub.value ? getClubBorderClass(resolvedClub.value) : 'border-primary/30'
)

// Written as full literals — Tailwind scans source text, so an interpolated
// `hover:${...}` would never be generated.
const HOVER_BORDER: Record<ClubId, string> = {
  quantum: 'hover:border-quantum-500/40',
  elegance: 'hover:border-elegance-500/40',
  nextstop: 'hover:border-nextstop-500/40',
}

const accentBorderClass = computed(() =>
  resolvedClub.value
    ? `border-border/60 ${HOVER_BORDER[resolvedClub.value]}`
    : 'border-border/60 hover:border-primary/30'
)
</script>

<style scoped>
.card-interactive:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px -8px rgb(0 0 0 / 0.15);
}

.card-interactive:hover .card-image {
  transform: scale(1.04);
}

.card-interactive:hover .card-arrow {
  transform: translateX(3px);
}

@media (prefers-reduced-motion: reduce) {
  .card-interactive,
  .card-image,
  .card-arrow {
    transition: none !important;
  }
  .card-interactive:hover {
    transform: none;
  }
  .card-interactive:hover .card-image,
  .card-interactive:hover .card-arrow {
    transform: none;
  }
}
</style>
