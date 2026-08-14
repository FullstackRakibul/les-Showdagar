<template>
  <!-- Empty state -->
  <div
    v-if="!events.length"
    class="flex flex-col items-center justify-center gap-4 py-16 rounded-lg border border-dashed border-border bg-card/50"
  >
    <div class="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
      <HugeiconsIcon :icon="resolveIcon('Calendar03Icon')" :size="24" class="text-muted-foreground/60" />
    </div>
    <div class="text-center">
      <h3 class="font-semibold text-foreground">{{ emptyTitle }}</h3>
      <p class="text-sm text-muted-foreground mt-1">{{ emptyMessage }}</p>
    </div>
    <NuxtLink
      v-if="emptyCta"
      :to="emptyCta.link"
      class="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border bg-background text-foreground text-sm font-medium hover:bg-secondary active:scale-[0.98] transition-all"
    >
      {{ emptyCta.label }}
    </NuxtLink>
  </div>

  <!-- Event cards -->
  <ul v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" role="list">
    <li
      v-for="event in events"
      :key="event.id"
      class="group flex flex-col rounded-lg border border-border/60 bg-card/80 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-primary/30 event-card"
      :class="past ? 'opacity-70' : ''"
    >
      <div class="flex items-start gap-4 p-5 flex-1">
        <!-- Date badge -->
        <div
          class="shrink-0 w-14 rounded-md border border-border/60 bg-muted/50 overflow-hidden text-center"
          :aria-label="fullDate(event.date)"
        >
          <div class="bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider py-0.5">
            {{ month(event.date) }}
          </div>
          <div class="text-lg font-bold text-foreground py-1 leading-none">
            {{ day(event.date) }}
          </div>
        </div>

        <div class="min-w-0 flex-1">
          <div v-if="event.category || event.club" class="flex flex-wrap gap-1.5 mb-1.5">
            <FeaturePill v-if="event.club" :label="clubName(event.club)" :club="event.club" active />
            <FeaturePill v-if="event.category" :label="event.category" />
          </div>

          <h3 class="font-semibold text-foreground leading-snug">{{ event.title }}</h3>
          <p class="text-sm text-muted-foreground leading-relaxed mt-1">{{ event.description }}</p>

          <div class="flex flex-wrap gap-x-4 gap-y-1 mt-2.5 text-xs text-muted-foreground">
            <span v-if="event.time" class="inline-flex items-center gap-1">
              <HugeiconsIcon :icon="resolveIcon('Clock01Icon')" :size="12" />
              {{ event.time }}
            </span>
            <span v-if="event.location" class="inline-flex items-center gap-1">
              <HugeiconsIcon :icon="resolveIcon('Location01Icon')" :size="12" />
              {{ event.location }}
            </span>
          </div>
        </div>
      </div>

      <div v-if="event.cta && !past" class="px-5 pb-5">
        <NuxtLink
          :to="event.cta.link"
          class="inline-flex items-center justify-center gap-2 w-full py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all"
        >
          {{ event.cta.label }}
        </NuxtLink>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { HugeiconsIcon } from '@hugeicons/vue'
import { resolveIcon } from '@/composables/useContentIcons'
import FeaturePill from '@/components/content/FeaturePill.vue'
import type { EventContent, ClubId, CtaContent } from '@/types/content'

withDefaults(defineProps<{
  events: EventContent[]
  /** Dims cards and hides the register CTA for events already held. */
  past?: boolean
  emptyTitle?: string
  emptyMessage?: string
  emptyCta?: CtaContent
}>(), {
  past: false,
  emptyTitle: 'Stay tuned for upcoming events',
  emptyMessage: 'Club events are being planned. Check back soon.',
})

const CLUB_NAMES: Record<ClubId, string> = {
  quantum: 'Quantum',
  elegance: 'Elegance',
  nextstop: 'NextStop',
}

const clubName = (id: ClubId) => CLUB_NAMES[id]

// Parsed as UTC from the ISO date so the rendered day cannot drift by timezone.
const parse = (iso: string) => new Date(`${iso}T00:00:00Z`)

const month = (iso: string) =>
  parse(iso).toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' })

const day = (iso: string) =>
  parse(iso).toLocaleDateString('en-US', { day: 'numeric', timeZone: 'UTC' })

const fullDate = (iso: string) =>
  parse(iso).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
  })
</script>

<style scoped>
.event-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 28px -12px rgb(0 0 0 / 0.18);
}

@media (prefers-reduced-motion: reduce) {
  .event-card {
    transition: none !important;
  }
  .event-card:hover {
    transform: none;
  }
}
</style>
