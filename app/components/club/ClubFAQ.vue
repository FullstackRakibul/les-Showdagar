<template>
  <!--
    Built on native <details>/<summary> rather than a JS accordion: keyboard
    operation, screen-reader semantics, and find-in-page all work without any
    ARIA wiring or extra dependency. `name` makes them mutually exclusive in
    supporting browsers and degrades to independent toggles elsewhere.
  -->
  <div class="divide-y divide-border rounded-lg border border-border/60 bg-card/80 backdrop-blur-sm overflow-hidden">
    <details
      v-for="faq in faqs"
      :key="faq.id"
      :name="exclusive ? 'club-faq' : undefined"
      class="group faq-item"
    >
      <summary
        class="flex items-center gap-3 px-5 py-4 cursor-pointer list-none transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
      >
        <h3 class="flex-1 text-sm font-medium text-foreground">{{ faq.question }}</h3>
        <HugeiconsIcon
          :icon="resolveIcon('PlusSignIcon')"
          :size="16"
          class="shrink-0 text-muted-foreground transition-transform duration-300 faq-icon"
          aria-hidden="true"
        />
      </summary>
      <div class="px-5 pb-4 -mt-1">
        <p class="text-sm text-muted-foreground leading-relaxed">{{ faq.answer }}</p>
      </div>
    </details>
  </div>
</template>

<script setup lang="ts">
import { HugeiconsIcon } from '@hugeicons/vue'
import { resolveIcon } from '@/composables/useContentIcons'
import type { FaqContent } from '@/types/content'

withDefaults(defineProps<{
  faqs: FaqContent[]
  /** Only one answer open at a time. */
  exclusive?: boolean
}>(), {
  exclusive: true,
})
</script>

<style scoped>
.faq-item[open] .faq-icon {
  transform: rotate(45deg);
}

.faq-item summary::-webkit-details-marker {
  display: none;
}

@media (prefers-reduced-motion: reduce) {
  .faq-icon {
    transition: none !important;
  }
}
</style>
