<template>
  <section
    :id="section.id"
    class="relative overflow-hidden scroll-mt-24"
    :class="section.muted ? 'bg-muted/30' : 'bg-background'"
    :aria-labelledby="`${section.id}-title`"
  >
    <!-- Background image -->
    <div v-if="section.backgroundImage" class="absolute inset-0" aria-hidden="true">
      <img
        :src="section.backgroundImage"
        alt=""
        class="w-full h-full object-cover"
        loading="eager"
        fetchpriority="high"
      />
      <div class="absolute inset-0 bg-background/70 dark:bg-background/80" />
    </div>

    <!-- Ambient accent orbs -->
    <div v-else class="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div class="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-[0.07]" :class="orbOneClass" />
      <div class="absolute -bottom-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-[0.07]" :class="orbTwoClass" />
    </div>

    <div
      class="relative max-w-6xl mx-auto px-4 sm:px-6"
      :class="compact ? 'py-14 sm:py-20' : 'py-20 sm:py-28'"
    >
      <div :class="split ? 'grid lg:grid-cols-2 gap-12 items-center' : 'max-w-3xl'">
        <div :class="centered && !split ? 'mx-auto text-center' : ''">

          <!-- Eyebrow -->
          <div
            v-if="section.subtitle"
            class="flex items-center gap-2 mb-5"
            :class="centered && !split ? 'justify-center' : ''"
          >
            <div class="h-px w-8" :class="ruleClass" />
            <p class="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              {{ section.subtitle }}
            </p>
            <div v-if="centered && !split" class="h-px w-8" :class="ruleClass" />
          </div>

          <!-- Title -->
          <h1
            :id="`${section.id}-title`"
            class="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-tight"
          >
            {{ section.title }}
          </h1>

          <!-- Description -->
          <p
            v-if="section.description"
            class="text-lg text-muted-foreground leading-relaxed mt-5"
            :class="centered && !split ? 'mx-auto max-w-2xl' : 'max-w-2xl'"
          >
            {{ section.description }}
          </p>

          <p
            v-for="(para, i) in section.body"
            :key="i"
            class="text-muted-foreground leading-relaxed mt-3"
            :class="centered && !split ? 'mx-auto max-w-2xl' : 'max-w-2xl'"
          >
            {{ para }}
          </p>

          <!-- CTAs -->
          <ContentCTA
            v-if="section.cta || section.secondaryCta"
            :primary="section.cta"
            :secondary="section.secondaryCta"
            :club="club"
            :align="centered && !split ? 'center' : 'start'"
            class="mt-8"
          />
        </div>

        <!-- Optional side slot for split layout -->
        <div v-if="split" class="min-w-0">
          <slot name="aside" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ContentCTA from './ContentCTA.vue'
import { provideContentContext } from '@/composables/useContentContext'
import { useTheme } from '@/composables/useTheme'
import type { SectionContent, ClubId } from '@/types/content'

const props = withDefaults(defineProps<{
  section: SectionContent
  club?: ClubId
  centered?: boolean
  /** Reduced vertical padding — for heroes that are not the page opener. */
  compact?: boolean
  /** Two-column layout exposing the `aside` slot. */
  split?: boolean
}>(), {
  centered: false,
  compact: false,
  split: false,
})

provideContentContext(() => props.club, () => props.section.id)

const { getClubBgClass } = useTheme()

const ruleClass = computed(() =>
  props.club ? getClubBgClass(props.club) : 'bg-primary/60'
)

const orbOneClass = computed(() =>
  props.club ? getClubBgClass(props.club) : 'bg-quantum-500'
)

const orbTwoClass = computed(() =>
  props.club ? getClubBgClass(props.club) : 'bg-elegance-500'
)
</script>
