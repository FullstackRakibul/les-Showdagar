<template>
  <div>
    <!-- Placeholder notice — visible, not just a code comment -->
    <div
      v-if="showPlaceholderNotice"
      class="flex items-start gap-2.5 rounded-md border border-border bg-muted/50 px-4 py-3 mb-6 text-sm"
      role="note"
    >
      <HugeiconsIcon :icon="resolveIcon('InformationCircleIcon')" :size="16" class="shrink-0 mt-0.5 text-muted-foreground" />
      <p class="text-muted-foreground">
        Pricing for paid tiers is not final. Figures shown are placeholders.
      </p>
    </div>

    <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start" role="list">
      <li
        v-for="tier in tiers"
        :key="tier.id"
        class="relative flex flex-col h-full rounded-lg border bg-card/80 backdrop-blur-sm p-6 transition-all duration-300 tier-card"
        :class="tier.recommended
          ? 'border-primary/50 ring-2 ring-primary/20 lg:-mt-2 lg:pb-8'
          : 'border-border/60 hover:border-primary/30'"
      >
        <!-- Recommended ribbon -->
        <div
          v-if="tier.recommended"
          class="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-md bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider whitespace-nowrap"
        >
          Recommended
        </div>

        <!-- Name + price -->
        <div class="mb-4">
          <h3 class="text-lg font-bold text-foreground">{{ tier.name }}</h3>
          <div class="flex items-baseline gap-1.5 mt-2">
            <span class="text-3xl font-bold text-foreground">{{ tier.price }}</span>
            <span v-if="tier.period" class="text-sm text-muted-foreground">{{ tier.period }}</span>
          </div>
          <p class="text-sm text-muted-foreground leading-relaxed mt-2">{{ tier.description }}</p>
        </div>

        <!-- Features -->
        <ul class="flex-1 space-y-2.5 mb-6 border-t border-border/60 pt-4" role="list">
          <li
            v-for="feature in tier.features"
            :key="feature.label"
            class="flex items-start gap-2.5 text-sm"
            :class="feature.included === false ? 'text-muted-foreground/60' : 'text-foreground'"
          >
            <HugeiconsIcon
              :icon="resolveIcon(feature.included === false ? 'Cancel01Icon' : 'CheckmarkCircle01Icon')"
              :size="15"
              class="shrink-0 mt-0.5"
              :class="feature.included === false ? 'text-muted-foreground/40' : 'text-nextstop-500'"
            />
            <span :class="feature.included === false ? 'line-through' : ''">{{ feature.label }}</span>
          </li>
        </ul>

        <!-- CTA -->
        <NuxtLink
          :to="tier.cta.link"
          class="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-md text-sm font-semibold active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          :class="tier.recommended
            ? 'bg-primary text-primary-foreground hover:opacity-90'
            : 'border border-border bg-background text-foreground hover:bg-secondary'"
        >
          {{ tier.cta.label }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import { resolveIcon } from '@/composables/useContentIcons'
import type { TierContent } from '@/types/content'

const props = withDefaults(defineProps<{
  tiers: TierContent[]
  /** Set false once real pricing lands to drop the placeholder notice. */
  showNotice?: boolean
}>(), {
  showNotice: true,
})

const showPlaceholderNotice = computed(() =>
  props.showNotice && props.tiers.some(t => t.placeholder)
)
</script>

<style scoped>
.tier-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px -14px rgb(0 0 0 / 0.2);
}

@media (prefers-reduced-motion: reduce) {
  .tier-card {
    transition: none !important;
  }
  .tier-card:hover {
    transform: none;
  }
}
</style>
