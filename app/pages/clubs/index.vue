<template>
  <div class="bg-background">

    <!-- 1 — Hero -->
    <ClubHero v-if="content.clubHero" :section="content.clubHero" />

    <!-- Section jump nav -->
    <nav
      class="sticky top-20 z-30 border-y border-border bg-background/85 backdrop-blur-md"
      aria-label="Club sections"
    >
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <ul class="flex gap-1 overflow-x-auto py-2 no-scrollbar" role="list" data-lenis-prevent>
          <li v-for="link in sectionLinks" :key="link.id">
            <button
              type="button"
              class="px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              :class="activeSection === link.id
                ? 'text-foreground bg-muted'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'"
              :aria-current="activeSection === link.id ? 'true' : undefined"
              @click="scrollTo(link.id)"
            >
              {{ link.label }}
            </button>
          </li>
        </ul>
      </div>
    </nav>

    <!-- 2 — Three clubs -->
    <section id="clubs" class="scroll-mt-32 bg-background">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <header class="text-center mb-10">
          <p class="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-3">
            Three identities, one destination
          </p>
          <h2 class="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Shop by Club</h2>
          <p class="text-muted-foreground leading-relaxed mt-3 max-w-2xl mx-auto">
            Every product belongs to a club — a point of view about what's worth owning.
          </p>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <ClubCardLarge v-for="club in content.clubs" :key="club.id" :club="club" />
        </div>
      </div>
    </section>

    <!-- 3 — Why join -->
    <section id="why" class="scroll-mt-32 bg-muted/30 border-y border-border">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <header class="text-center mb-10">
          <h2 class="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Why Join the Club?</h2>
          <p class="text-muted-foreground leading-relaxed mt-3 max-w-2xl mx-auto">
            More than a catalogue — a way of finding things worth having.
          </p>
        </header>
        <ContentGrid :cards="content.valueProps" :columns="4" />
      </div>
    </section>

    <!-- 4 — Benefits -->
    <section id="benefits" class="scroll-mt-32 bg-background">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <header class="text-center mb-10">
          <h2 class="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Club Benefits</h2>
          <p class="text-muted-foreground leading-relaxed mt-3 max-w-2xl mx-auto">
            What being part of RH Business Club gives you. Select a benefit to read more.
          </p>
        </header>

        <ClubBenefitsGrid :benefits="content.benefits" expandable />

        <div class="flex justify-center mt-10">
          <ContentCTA
            :primary="{ label: 'Become a Member', link: '/club/membership' }"
            :secondary="{ label: 'All Benefits', link: '/club/benefits' }"
            align="center"
          />
        </div>
      </div>
    </section>

    <!-- 5 — Events -->
    <section id="events" class="scroll-mt-32 bg-muted/30 border-y border-border">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <header class="text-center mb-10">
          <h2 class="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Upcoming Events</h2>
          <p class="text-muted-foreground leading-relaxed mt-3 max-w-2xl mx-auto">
            Gatherings, launches, and experiences across the Club.
          </p>
        </header>

        <ClubEventsList
          :events="content.upcomingEvents"
          :empty-cta="{ label: 'Browse Products', link: '/products' }"
        />
      </div>
    </section>

    <!-- 6 — Membership tiers -->
    <section id="membership" class="scroll-mt-32 bg-background">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <header class="text-center mb-10">
          <h2 class="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Membership</h2>
          <p class="text-muted-foreground leading-relaxed mt-3 max-w-2xl mx-auto">
            Start free. Paid tiers with early access and members-only offers are on the way.
          </p>
        </header>

        <ClubMembershipTiers :tiers="content.tiers" />
      </div>
    </section>

    <!-- 7 — Testimonials -->
    <section id="community" class="scroll-mt-32 bg-muted/30 border-y border-border">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <header class="text-center mb-10">
          <h2 class="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">From the Community</h2>
        </header>
        <ClubTestimonials :testimonials="content.testimonials" />
      </div>
    </section>

    <!-- 8 — FAQ -->
    <section id="faq" class="scroll-mt-32 bg-background">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <header class="text-center mb-10">
          <h2 class="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Questions</h2>
          <p class="text-muted-foreground leading-relaxed mt-3">
            Membership, benefits, events, and how the Club works.
          </p>
        </header>
        <ClubFAQ :faqs="content.faqs" />
      </div>
    </section>

    <!-- 9 — Closing CTA -->
    <ClubCTA v-if="content.clubCta" :section="content.clubCta" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useNuxtApp } from '#app'
import { useContentStore } from '@/stores/contentStore'
import { useTheme } from '@/composables/useTheme'
import ContentGrid from '@/components/content/ContentGrid.vue'
import ContentCTA from '@/components/content/ContentCTA.vue'

const content = useContentStore()
const { load } = useTheme()
const { $lenis } = useNuxtApp()

const sectionLinks = [
  { id: 'clubs', label: 'The Clubs' },
  { id: 'why', label: 'Why Join' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'events', label: 'Events' },
  { id: 'membership', label: 'Membership' },
  { id: 'community', label: 'Community' },
  { id: 'faq', label: 'FAQ' },
]

const activeSection = ref('clubs')

/** Scrolls through Lenis so the jump respects smooth-scroll easing. */
function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if ($lenis?.value) {
    $lenis.value.scrollTo(el, { offset: -120 })
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

let observer: IntersectionObserver | null = null

onMounted(() => {
  load()

  // Highlights the jump-nav entry for whichever section owns the upper viewport.
  observer = new IntersectionObserver(
    entries => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible?.target.id) activeSection.value = visible.target.id
    },
    { rootMargin: '-140px 0px -55% 0px', threshold: 0 }
  )

  for (const link of sectionLinks) {
    const el = document.getElementById(link.id)
    if (el) observer.observe(el)
  }
})

onUnmounted(() => observer?.disconnect())

useHead({
  title: 'The Clubs | RH Business Club',
  meta: [
    {
      name: 'description',
      content: 'Quantum, Elegance, and NextStop — three curated clubs covering technology, fashion, and travel. Explore benefits, events, and membership at RH Business Club.',
    },
    { property: 'og:title', content: 'The Clubs | RH Business Club' },
    {
      property: 'og:description',
      content: 'A club built around discovery, value, lifestyle, and experiences.',
    },
    { property: 'og:type', content: 'website' },
  ],
})
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  scrollbar-width: none;
}
</style>
