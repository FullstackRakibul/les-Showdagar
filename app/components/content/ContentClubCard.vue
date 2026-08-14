<template>
  <article
    class="group relative flex flex-col rounded-lg border bg-card/80 backdrop-blur-sm overflow-hidden transition-all duration-300 club-card"
    :class="[
      borderClass,
      isActive ? activeRingClass : '',
      expanded ? 'sm:flex-row' : '',
    ]"
    :aria-labelledby="`club-${club.id}-name`"
  >
    <!-- Accent strip -->
    <div class="absolute inset-x-0 top-0 h-0.5 transition-opacity duration-300" :class="[bgClass, isActive ? 'opacity-100' : 'opacity-40 group-hover:opacity-100']" />

    <!-- Hero image -->
    <div
      v-if="club.heroImage"
      class="relative overflow-hidden bg-muted shrink-0"
      :class="expanded ? 'sm:w-2/5 aspect-video sm:aspect-auto' : 'aspect-[16/9]'"
    >
      <img
        :src="club.heroImage"
        :alt="`${club.name} — ${club.category}`"
        loading="lazy"
        decoding="async"
        class="w-full h-full object-cover transition-transform duration-500 club-image"
      />
    </div>

    <div class="flex flex-col flex-1 p-6 gap-4">
      <!-- Icon + category -->
      <div class="flex items-center gap-3">
        <div
          class="w-11 h-11 rounded-md flex items-center justify-center shrink-0"
          :class="[softBgClass, textClass]"
        >
          <HugeiconsIcon :icon="resolveIcon(club.icon)" :size="21" />
        </div>
        <div class="min-w-0">
          <p class="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            {{ club.category }}
          </p>
          <h3 :id="`club-${club.id}-name`" class="text-xl font-bold text-foreground leading-tight">
            {{ club.name }}
          </h3>
        </div>
        <span
          v-if="isActive"
          class="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-md border shrink-0"
          :class="[softBgClass, textClass, borderSoftClass]"
        >
          Active
        </span>
      </div>

      <!-- Tagline -->
      <p class="text-sm font-semibold" :class="textClass">{{ club.tagline }}</p>

      <!-- Description -->
      <div class="flex-1 space-y-2">
        <p class="text-sm text-muted-foreground leading-relaxed">{{ club.description }}</p>
        <p
          v-for="(para, i) in club.body"
          :key="i"
          class="text-sm text-muted-foreground leading-relaxed"
        >
          {{ para }}
        </p>
      </div>

      <!-- Feature pills -->
      <ul v-if="club.features.length" class="flex flex-wrap gap-1.5" role="list">
        <li v-for="feature in club.features" :key="feature">
          <FeaturePill :label="feature" :club="club.id" />
        </li>
      </ul>

      <!-- Categories (expanded only) -->
      <div v-if="expanded && club.categories.length" class="pt-1">
        <p class="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
          Categories
        </p>
        <ul class="flex flex-wrap gap-x-3 gap-y-1" role="list">
          <li
            v-for="category in club.categories"
            :key="category"
            class="text-xs text-muted-foreground"
          >
            {{ category }}
          </li>
        </ul>
      </div>

      <!-- CTA -->
      <div class="flex flex-wrap items-center gap-3 pt-1">
        <NuxtLink
          :to="club.cta.link"
          class="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
          :class="textClass"
        >
          {{ club.cta.label }}
          <HugeiconsIcon
            :icon="resolveIcon('ArrowRight01Icon')"
            :size="14"
            class="shrink-0 transition-transform duration-300 club-arrow"
          />
        </NuxtLink>

        <button
          v-if="selectable && !isActive"
          type="button"
          class="text-xs text-muted-foreground hover:text-foreground transition-colors ml-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md px-1"
          @click="setAccentByClub(club.id)"
        >
          Use this theme
        </button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import { useTheme } from '@/composables/useTheme'
import { resolveIcon } from '@/composables/useContentIcons'
import FeaturePill from './FeaturePill.vue'
import type { ClubContent, ClubId } from '@/types/content'

const props = withDefaults(defineProps<{
  club: ClubContent
  /** Side-by-side layout showing the full category list. */
  expanded?: boolean
  /** Shows a "Use this theme" control that switches the global accent. */
  selectable?: boolean
}>(), {
  expanded: false,
  selectable: true,
})

const {
  getClubTextClass,
  getClubBgClass,
  getClubBorderClass,
  isClubActive,
  setAccentByClub,
} = useTheme()

const isActive = computed(() => isClubActive(props.club.id))

const textClass = computed(() => getClubTextClass(props.club.id))
const bgClass = computed(() => getClubBgClass(props.club.id))
const softBgClass = computed(() => getClubBgClass(props.club.id, true))
const borderSoftClass = computed(() => getClubBorderClass(props.club.id))

// Full literals so Tailwind's scanner can see every variant.
const HOVER_BORDER: Record<ClubId, string> = {
  quantum: 'hover:border-quantum-500/40',
  elegance: 'hover:border-elegance-500/40',
  nextstop: 'hover:border-nextstop-500/40',
}

const ACTIVE_RING: Record<ClubId, string> = {
  quantum: 'ring-2 ring-quantum-500/30 border-quantum-500/40',
  elegance: 'ring-2 ring-elegance-500/30 border-elegance-500/40',
  nextstop: 'ring-2 ring-nextstop-500/30 border-nextstop-500/40',
}

const borderClass = computed(() => `border-border/60 ${HOVER_BORDER[props.club.id]}`)
const activeRingClass = computed(() => ACTIVE_RING[props.club.id])
</script>

<style scoped>
.club-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px -12px rgb(0 0 0 / 0.18);
}

.club-card:hover .club-image {
  transform: scale(1.04);
}

.club-card:hover .club-arrow {
  transform: translateX(3px);
}

@media (prefers-reduced-motion: reduce) {
  .club-card,
  .club-image,
  .club-arrow {
    transition: none !important;
  }
  .club-card:hover,
  .club-card:hover .club-image,
  .club-card:hover .club-arrow {
    transform: none;
  }
}
</style>
