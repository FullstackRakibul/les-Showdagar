<template>
  <section class="py-20 sm:py-24 bg-background overflow-x-clip">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">

      <!-- Section header -->
      <div
        ref="headerEl"
        class="header-reveal text-center mb-14"
        :class="{ 'is-visible': headerVisible }"
      >
        <div class="flex items-center justify-center gap-3 mb-4">
          <div class="h-px w-8 bg-border" />
          <p class="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Business Ecosystem
          </p>
          <div class="h-px w-8 bg-border" />
        </div>
        <h2 class="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-4 text-balance">
          Three Specialized Clubs.<br class="hidden sm:block" />
          One Unified Platform.
        </h2>
        <p class="text-muted-foreground max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
          Each club carries its own identity, expertise, and curated product ecosystem —
          united under the RH Business Club umbrella.
        </p>
      </div>

      <!-- Cards grid / mobile carousel -->
      <div class="clubs-grid">
        <ClubCard
          v-for="(club, i) in clubs"
          :key="club.ctaRoute"
          v-bind="club"
          :animation-delay="i * 130"
          @navigate="router.push"
        />
      </div>

      <!-- Mobile swipe hint (auto-fades) -->
      <p class="swipe-hint" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
        Swipe to explore
      </p>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { HugeiconsIcon } from '@hugeicons/vue'
import { CpuIcon, DiamondIcon, Airplane01Icon } from '@hugeicons/core-free-icons'
import ClubCard from '@/components/index/ClubCard.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const router = useRouter()

const headerEl = ref<HTMLElement | null>(null)
const { isVisible: headerVisible } = useScrollReveal(headerEl, 0.2)

const clubs = [
  {
    title: 'Quantum Club',
    subtitle: 'Tech-Inspired Quality',
    tagline: '#TechRedefined',
    description:
      'Latest high-quality innovative technology goods, gadgets, and smart solutions built for the modern professional.',
    icon: CpuIcon,
    colorPrimary: 'oklch(0.55 0.18 220)',
    metrics: ['500+ Products', '120+ Brands', 'AI & IoT'],
    ctaText: 'Explore Tech',
    ctaRoute: '/products?club=quantum',
  },
  {
    title: 'Elegance Club',
    subtitle: 'Premium Fashion & Lifestyle',
    tagline: '#WearYourStory',
    description:
      'Curated premium designer fashion, accessories, and luxury lifestyle items for the discerning taste.',
    icon: DiamondIcon,
    colorPrimary: 'oklch(0.55 0.22 300)',
    metrics: ['200+ Brands', 'Luxury Picks', 'Seasonal Drops'],
    ctaText: 'Explore Fashion',
    ctaRoute: '/products?club=elegance',
  },
  {
    title: 'NextStop Club',
    subtitle: 'Travel & Visa Services',
    tagline: '#MoveFreely',
    description:
      'Comprehensive global travel solutions, logistics, and immigration consultation for seamless journeys.',
    icon: Airplane01Icon,
    colorPrimary: 'oklch(0.55 0.20 160)',
    metrics: ['50+ Destinations', 'Visa Support', '24/7 Help'],
    ctaText: 'Get Consultation',
    ctaRoute: '/products?club=nextstop',
  },
]
</script>

<style scoped>
/* Desktop: 3-column grid */
.clubs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  align-items: stretch;
}

/* Tablet: 2-col + third card centered */
@media (max-width: 1023px) and (min-width: 640px) {
  .clubs-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }
  .clubs-grid > :last-child {
    grid-column: 1 / -1;
    max-width: 420px;
    margin-inline: auto;
    width: 100%;
  }
}

/* Mobile: horizontal snap carousel */
@media (max-width: 639px) {
  .clubs-grid {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    padding: 0.5rem 1rem 1.25rem;
    margin-inline: -1rem;
    scrollbar-width: none;
  }
  .clubs-grid::-webkit-scrollbar { display: none; }
  .clubs-grid > * {
    flex: 0 0 84%;
    scroll-snap-align: center;
  }
}

/* Swipe hint — mobile only, auto-fades */
.swipe-hint {
  display: none;
}
@media (max-width: 639px) {
  .swipe-hint {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-top: 0.75rem;
    font-size: 0.75rem;
    color: var(--muted-foreground);
    opacity: 0;
    animation: fade-hint 3.5s ease-in-out 0.8s forwards;
  }
}
@keyframes fade-hint {
  0%   { opacity: 0; }
  20%  { opacity: 1; }
  75%  { opacity: 1; }
  100% { opacity: 0; }
}

/* Header scroll reveal */
.header-reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.65s ease, transform 0.65s ease;
}
.header-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .header-reveal { transition: none; opacity: 1; transform: none; }
  .swipe-hint { animation: none; opacity: 1; }
}
</style>
