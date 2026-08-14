<template>
  <div class="bg-background">
    <header class="border-b border-border">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <NuxtLink
          to="/clubs"
          class="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <HugeiconsIcon :icon="resolveIcon('ArrowLeft01Icon')" :size="14" />
          Back to the Club
        </NuxtLink>

        <p class="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-3">
          The Club
        </p>
        <h1 class="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">Events</h1>
        <p class="text-lg text-muted-foreground leading-relaxed mt-4 max-w-2xl">
          Gatherings, launches, and experiences across Quantum, Elegance, and NextStop.
        </p>
      </div>
    </header>

    <section class="max-w-5xl mx-auto px-4 sm:px-6 py-14">
      <!-- Club filter -->
      <div v-if="content.events.length" class="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter events by club">
        <button
          type="button"
          class="px-3 py-1 rounded-md text-xs font-medium border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          :class="activeClub === null
            ? 'bg-primary/10 text-primary border-primary/30'
            : 'bg-muted text-muted-foreground border-transparent hover:text-foreground'"
          :aria-pressed="activeClub === null"
          @click="activeClub = null"
        >
          All
        </button>
        <button
          v-for="club in content.clubs"
          :key="club.id"
          type="button"
          class="px-3 py-1 rounded-md text-xs font-medium border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          :class="activeClub === club.id
            ? [getClubBgClass(club.id, true), getClubTextClass(club.id), getClubBorderClass(club.id)]
            : ['bg-muted', 'text-muted-foreground', 'border-transparent', 'hover:text-foreground']"
          :aria-pressed="activeClub === club.id"
          @click="activeClub = activeClub === club.id ? null : club.id"
        >
          {{ club.name }}
        </button>
      </div>

      <!-- Upcoming -->
      <h2 v-if="content.events.length" class="text-lg font-semibold text-foreground mb-4">Upcoming</h2>
      <ClubEventsList
        :events="filteredUpcoming"
        :empty-cta="{ label: 'Browse Products', link: '/products' }"
      />

      <!-- Past -->
      <template v-if="filteredPast.length">
        <h2 class="text-lg font-semibold text-foreground mt-12 mb-4">Past events</h2>
        <ClubEventsList :events="filteredPast" past />
      </template>
    </section>

    <ClubCTA v-if="ctaSection" :section="ctaSection" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import { useContentStore } from '@/stores/contentStore'
import { useTheme } from '@/composables/useTheme'
import { resolveIcon } from '@/composables/useContentIcons'
import type { SectionContent, ClubId } from '@/types/content'

const content = useContentStore()
const { load, getClubTextClass, getClubBgClass, getClubBorderClass } = useTheme()

onMounted(load)

const activeClub = ref<ClubId | null>(null)

const byClub = (list: { club?: ClubId }[]) =>
  activeClub.value === null ? list : list.filter(e => e.club === activeClub.value)

const filteredUpcoming = computed(() => byClub(content.upcomingEvents) as typeof content.upcomingEvents)
const filteredPast = computed(() => byClub(content.pastEvents) as typeof content.pastEvents)

const ctaSection: SectionContent = {
  id: 'events-cta',
  title: 'Never miss what happens next.',
  subtitle: 'Stay in the loop',
  description: 'Events are being planned across all three clubs. Explore the collection while you wait.',
  cta: { label: 'Explore the Clubs', link: '/clubs' },
  secondaryCta: { label: 'Browse Products', link: '/products' },
}

useHead({
  title: 'Club Events | RH Business Club',
  meta: [
    {
      name: 'description',
      content: 'Upcoming gatherings, launches, and experiences across the Quantum, Elegance, and NextStop clubs.',
    },
  ],
})
</script>
