<template>
  <article
    class="group flex flex-col h-full rounded-lg border border-border/60 bg-card/80 backdrop-blur-sm p-5 transition-all duration-300 hover:border-primary/30 category-card"
    :style="{ animationDelay: `${(index ?? 0) * 80}ms` }"
    :aria-labelledby="`support-${category.id}`"
  >
    <div
      class="w-11 h-11 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0 mb-4 transition-transform duration-300 group-hover:scale-110"
      aria-hidden="true"
    >
      <HugeiconsIcon :icon="resolveIcon(category.icon)" :size="20" />
    </div>

    <h3 :id="`support-${category.id}`" class="font-semibold text-foreground leading-snug">
      {{ category.title }}
    </h3>

    <p class="text-sm text-muted-foreground leading-relaxed mt-2 flex-1">
      {{ category.description }}
    </p>

    <button
      type="button"
      class="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-primary rounded-md transition-colors hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring self-start"
      @click="emit('select', category)"
    >
      {{ category.cta.label }}
      <HugeiconsIcon
        :icon="resolveIcon('ArrowRight01Icon')"
        :size="14"
        class="shrink-0 transition-transform duration-300 category-arrow"
      />
    </button>
  </article>
</template>

<script setup lang="ts">
import { HugeiconsIcon } from '@hugeicons/vue'
import { resolveIcon } from '@/composables/useContentIcons'
import type { SupportCategoryContent } from '@/types/content'

defineProps<{
  category: SupportCategoryContent
  /** Drives the staggered entrance delay. */
  index?: number
}>()

const emit = defineEmits<{ select: [category: SupportCategoryContent] }>()
</script>

<style scoped>
.category-card {
  animation: fadeInUp 0.5s ease-out both;
}

.category-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px -14px rgb(0 0 0 / 0.2);
}

.category-card:hover .category-arrow {
  transform: translateX(3px);
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: none; }
}

@media (prefers-reduced-motion: reduce) {
  .category-card {
    animation: none;
    opacity: 1;
    transition: none !important;
  }
  .category-card:hover {
    transform: none;
  }
  .category-arrow {
    transition: none !important;
  }
}
</style>
