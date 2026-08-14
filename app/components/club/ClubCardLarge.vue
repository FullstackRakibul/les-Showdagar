<template>
  <article
    ref="cardEl"
    class="group relative flex flex-col h-full rounded-lg border bg-card/80 backdrop-blur-sm overflow-hidden club-card"
    :class="[borderClass, isActive ? activeRingClass : '']"
    :aria-labelledby="`club-lg-${club.id}`"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
  >
    <!-- Accent strip -->
    <div
      class="absolute inset-x-0 top-0 h-0.5 transition-opacity duration-300"
      :class="[bgClass, isActive ? 'opacity-100' : 'opacity-40 group-hover:opacity-100']"
      aria-hidden="true"
    />

    <!-- Corner glow -->
    <div
      class="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-[0.12] transition-all duration-500 group-hover:opacity-25 group-hover:scale-125"
      :class="bgClass"
      aria-hidden="true"
    />

    <div class="relative flex flex-col flex-1 p-6 gap-4">
      <!-- Icon + name -->
      <div class="flex items-center gap-3">
        <div
          class="w-12 h-12 rounded-md flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
          :class="[softBgClass, textClass]"
        >
          <HugeiconsIcon :icon="resolveIcon(club.icon)" :size="23" />
        </div>
        <div class="min-w-0">
          <p class="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            {{ club.category }}
          </p>
          <h3 :id="`club-lg-${club.id}`" class="text-xl font-bold text-foreground leading-tight">
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

      <p class="text-sm font-semibold" :class="textClass">{{ club.tagline }}</p>

      <div class="flex-1 space-y-2">
        <p class="text-sm text-muted-foreground leading-relaxed">{{ club.description }}</p>
        <p v-for="(para, i) in club.body" :key="i" class="text-sm text-muted-foreground leading-relaxed">
          {{ para }}
        </p>
      </div>

      <!-- Feature pills -->
      <ul v-if="club.features.length" class="flex flex-wrap gap-1.5" role="list">
        <li v-for="feature in club.features.slice(0, featureLimit)" :key="feature">
          <FeaturePill :label="feature" :club="club.id" />
        </li>
      </ul>

      <!-- CTA -->
      <div class="flex items-center gap-3 pt-1">
        <NuxtLink
          :to="club.cta.link"
          class="inline-flex items-center gap-1.5 text-sm font-semibold rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          :class="textClass"
        >
          Enter {{ club.name }}
          <HugeiconsIcon
            :icon="resolveIcon('ArrowRight01Icon')"
            :size="14"
            class="shrink-0 transition-transform duration-300 club-arrow"
          />
        </NuxtLink>

        <button
          v-if="!isActive"
          type="button"
          class="ml-auto text-xs text-muted-foreground hover:text-foreground transition-colors rounded-md px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          @click="setAccentByClub(club.id)"
        >
          Use this theme
        </button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import { useTheme } from '@/composables/useTheme'
import { useCardTilt } from '@/composables/useCardTilt'
import { resolveIcon } from '@/composables/useContentIcons'
import FeaturePill from '@/components/content/FeaturePill.vue'
import type { ClubContent, ClubId } from '@/types/content'

const props = withDefaults(defineProps<{
  club: ClubContent
  variant?: 'default' | 'featured'
}>(), {
  variant: 'default',
})

const cardEl = ref<HTMLElement | null>(null)
const { onMouseMove, onMouseLeave } = useCardTilt(cardEl, 4)

const { getClubTextClass, getClubBgClass, getClubBorderClass, isClubActive, setAccentByClub } = useTheme()

const isActive = computed(() => isClubActive(props.club.id))
const textClass = computed(() => getClubTextClass(props.club.id))
const bgClass = computed(() => getClubBgClass(props.club.id))
const softBgClass = computed(() => getClubBgClass(props.club.id, true))
const borderSoftClass = computed(() => getClubBorderClass(props.club.id))

const featureLimit = computed(() => props.variant === 'featured' ? 6 : 4)

// Full literals — Tailwind scans source text and cannot see interpolated names.
const HOVER_BORDER: Record<ClubId, string> = {
  quantum: 'hover:border-quantum-500/50',
  elegance: 'hover:border-elegance-500/50',
  nextstop: 'hover:border-nextstop-500/50',
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
.club-card {
  transition: transform 0.25s ease, box-shadow 0.35s ease, border-color 0.3s ease;
  will-change: transform;
}

.club-card:hover {
  box-shadow: 0 18px 44px -16px rgb(0 0 0 / 0.22);
}

.club-card:hover .club-arrow {
  transform: translateX(4px);
}

@media (prefers-reduced-motion: reduce) {
  .club-card,
  .club-arrow {
    transition: none !important;
    transform: none !important;
  }
}
</style>
