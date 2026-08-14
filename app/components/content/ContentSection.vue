<template>
  <section
    :id="section.id"
    class="scroll-mt-24"
    :class="section.muted ? 'bg-muted/30 border-y border-border' : 'bg-background'"
    :aria-labelledby="section.title ? `${section.id}-title` : undefined"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-16">

      <!-- Header -->
      <header v-if="section.title || section.description" :class="headerAlignClass">
        <p
          v-if="section.subtitle"
          class="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-3"
        >
          {{ section.subtitle }}
        </p>

        <h2
          v-if="section.title"
          :id="`${section.id}-title`"
          class="text-2xl sm:text-3xl font-bold text-foreground tracking-tight"
        >
          {{ section.title }}
        </h2>

        <p
          v-if="section.description"
          class="text-muted-foreground leading-relaxed mt-3"
          :class="centered ? 'max-w-2xl mx-auto' : 'max-w-2xl'"
        >
          {{ section.description }}
        </p>

        <p
          v-for="(para, i) in section.body"
          :key="i"
          class="text-muted-foreground leading-relaxed mt-2"
          :class="centered ? 'max-w-2xl mx-auto' : 'max-w-2xl'"
        >
          {{ para }}
        </p>
      </header>

      <!-- Body: slot wins over `section.cards` -->
      <div :class="hasHeader ? 'mt-10' : ''">
        <slot :section="section">
          <ContentGrid
            v-if="section.cards?.length"
            :cards="section.cards"
            :layout="section.layout"
            :columns="section.columns"
            :club="club"
          />
        </slot>
      </div>

      <!-- Footer CTA -->
      <div v-if="section.cta || section.secondaryCta" class="mt-10" :class="centered ? 'flex justify-center' : ''">
        <ContentCTA
          :primary="section.cta"
          :secondary="section.secondaryCta"
          :club="club"
          :align="centered ? 'center' : 'start'"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ContentGrid from './ContentGrid.vue'
import ContentCTA from './ContentCTA.vue'
import { provideContentContext } from '@/composables/useContentContext'
import type { SectionContent, ClubId } from '@/types/content'

const props = withDefaults(defineProps<{
  section: SectionContent
  /** Scopes every nested card, pill, and CTA to this club's accent. */
  club?: ClubId
  /** Centres the header and CTA. Defaults on for grid layouts. */
  centered?: boolean
}>(), {
  centered: undefined,
})

// Nested components inherit the club without needing it threaded through props.
provideContentContext(() => props.club, () => props.section.id)

const centered = computed(() =>
  props.centered ?? (props.section.layout === 'grid' || props.section.layout === 'carousel')
)

const hasHeader = computed(() => Boolean(props.section.title || props.section.description))

const headerAlignClass = computed(() => centered.value ? 'text-center' : '')
</script>
