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
        <h1 class="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">Membership</h1>
        <p class="text-lg text-muted-foreground leading-relaxed mt-4 max-w-2xl">
          Start free and browse everything. Paid tiers with early access and members-only offers are on the way.
        </p>
      </div>
    </header>

    <!-- Tiers -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 py-14">
      <ClubMembershipTiers :tiers="content.tiers" />
    </section>

    <!-- What's included -->
    <section class="bg-muted/30 border-y border-border">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <header class="text-center mb-10">
          <h2 class="text-2xl font-bold text-foreground tracking-tight">What every member gets</h2>
          <p class="text-muted-foreground leading-relaxed mt-3 max-w-2xl mx-auto">
            These benefits are included from the moment you start browsing — no tier required.
          </p>
        </header>
        <ClubBenefitsGrid :benefits="content.benefits" />
      </div>
    </section>

    <!-- Membership FAQ -->
    <section class="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      <header class="text-center mb-10">
        <h2 class="text-2xl font-bold text-foreground tracking-tight">Membership questions</h2>
      </header>
      <ClubFAQ :faqs="membershipFaqs" />
    </section>

    <ClubCTA v-if="ctaSection" :section="ctaSection" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import { useContentStore } from '@/stores/contentStore'
import { useTheme } from '@/composables/useTheme'
import { resolveIcon } from '@/composables/useContentIcons'
import type { SectionContent } from '@/types/content'

const content = useContentStore()
const { load } = useTheme()

onMounted(load)

const MEMBERSHIP_FAQ_IDS = ['faq-cost', 'faq-tiers', 'faq-pick-club', 'faq-what-is-club']

const membershipFaqs = computed(() =>
  MEMBERSHIP_FAQ_IDS
    .map(id => content.faqs.find(f => f.id === id))
    .filter((f): f is NonNullable<typeof f> => Boolean(f))
)

const ctaSection: SectionContent = {
  id: 'membership-cta',
  title: 'Start with the collection.',
  subtitle: 'No sign-up required',
  description: 'Browsing, saving products, and placing orders are free today. Explore what the Club has to offer.',
  cta: { label: 'Browse Products', link: '/products' },
  secondaryCta: { label: 'Explore the Clubs', link: '/clubs' },
}

useHead({
  title: 'Membership | RH Business Club',
  meta: [
    {
      name: 'description',
      content: 'Membership at RH Business Club. Start free with full browsing, wishlist, order tracking, and product requests across all three clubs.',
    },
  ],
})
</script>
