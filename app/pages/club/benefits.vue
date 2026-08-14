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
          Membership
        </p>
        <h1 class="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">Club Benefits</h1>
        <p class="text-lg text-muted-foreground leading-relaxed mt-4 max-w-2xl">
          What being part of RH Business Club gives you — from how you discover products to how they reach your door.
        </p>
      </div>
    </header>

    <section class="max-w-5xl mx-auto px-4 sm:px-6 py-14">
      <ClubBenefitsGrid :benefits="content.benefits" expandable />
    </section>

    <ClubCTA v-if="ctaSection" :section="ctaSection" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import { useContentStore } from '@/stores/contentStore'
import { useTheme } from '@/composables/useTheme'
import { resolveIcon } from '@/composables/useContentIcons'
import type { SectionContent } from '@/types/content'

const content = useContentStore()
const { load } = useTheme()

onMounted(load)

const ctaSection: SectionContent = {
  id: 'benefits-cta',
  title: 'Ready to start?',
  subtitle: 'Become a member',
  description: 'Browsing, saving, and ordering are free. Start exploring the collection today.',
  cta: { label: 'View Membership', link: '/club/membership' },
  secondaryCta: { label: 'Browse Products', link: '/products' },
}

useHead({
  title: 'Club Benefits | RH Business Club',
  meta: [
    {
      name: 'description',
      content: 'Curated discovery, selected offers, your own collection, order visibility, product requests, and reliable delivery across Bangladesh.',
    },
  ],
})
</script>
