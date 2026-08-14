<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" role="list">
    <component
      :is="expandable ? 'details' : 'div'"
      v-for="benefit in benefits"
      :key="benefit.id"
      role="listitem"
      class="group rounded-lg border border-border/60 bg-card/80 backdrop-blur-sm p-5 transition-all duration-300 hover:border-primary/30 benefit-card"
      :name="expandable ? 'club-benefit' : undefined"
    >
      <component
        :is="expandable ? 'summary' : 'div'"
        class="flex items-start gap-3"
        :class="expandable ? 'cursor-pointer list-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md' : ''"
      >
        <div class="w-10 h-10 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
          <HugeiconsIcon :icon="resolveIcon(benefit.icon)" :size="19" />
        </div>
        <div class="min-w-0 flex-1">
          <h3 class="font-semibold text-foreground leading-snug">{{ benefit.title }}</h3>
          <p class="text-sm text-muted-foreground leading-relaxed mt-1">{{ benefit.description }}</p>
        </div>
        <HugeiconsIcon
          v-if="expandable && benefit.detail"
          :icon="resolveIcon('ArrowDown01Icon')"
          :size="15"
          class="shrink-0 mt-1 text-muted-foreground transition-transform duration-300 benefit-chevron"
          aria-hidden="true"
        />
      </component>

      <p
        v-if="expandable && benefit.detail"
        class="text-sm text-muted-foreground leading-relaxed mt-3 pt-3 border-t border-border/60"
      >
        {{ benefit.detail }}
      </p>
    </component>
  </div>
</template>

<script setup lang="ts">
import { HugeiconsIcon } from '@hugeicons/vue'
import { resolveIcon } from '@/composables/useContentIcons'
import type { BenefitContent } from '@/types/content'

withDefaults(defineProps<{
  benefits: BenefitContent[]
  /** Renders each card as a native <details> so the extra copy is disclosable. */
  expandable?: boolean
}>(), {
  expandable: false,
})
</script>

<style scoped>
.benefit-card[open] .benefit-chevron {
  transform: rotate(180deg);
}

/* Hide the default disclosure marker across engines. */
.benefit-card summary::-webkit-details-marker {
  display: none;
}

@media (prefers-reduced-motion: reduce) {
  .benefit-card,
  .benefit-chevron {
    transition: none !important;
  }
}
</style>
