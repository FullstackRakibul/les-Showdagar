<template>
  <div>
    <!-- Placeholder notice -->
    <div
      v-if="showPlaceholderNotice"
      class="flex items-start gap-2.5 rounded-md border border-border bg-muted/50 px-4 py-3 mb-6 text-sm"
      role="note"
    >
      <HugeiconsIcon :icon="resolveIcon('InformationCircleIcon')" :size="16" class="shrink-0 mt-0.5 text-muted-foreground" />
      <p class="text-muted-foreground">
        These quotes are illustrative placeholders, not real member feedback. Replace before launch.
      </p>
    </div>

    <ul class="grid grid-cols-1 md:grid-cols-3 gap-5" role="list">
      <li
        v-for="item in testimonials"
        :key="item.id"
        class="relative flex flex-col rounded-lg border border-border/60 bg-card/80 backdrop-blur-sm p-6 transition-all duration-300 hover:border-primary/30 testimonial-card"
      >
        <!-- Decorative quote mark -->
        <div
          class="absolute top-4 right-5 text-5xl leading-none font-serif select-none opacity-15"
          :class="item.club ? getClubTextClass(item.club) : 'text-primary'"
          aria-hidden="true"
        >&rdquo;</div>

        <blockquote class="flex-1">
          <p class="text-sm text-foreground leading-relaxed relative">{{ item.quote }}</p>
        </blockquote>

        <figcaption class="flex items-center gap-3 mt-5 pt-4 border-t border-border/60">
          <div
            class="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
            :class="item.club
              ? [getClubBgClass(item.club, true), getClubTextClass(item.club)]
              : ['bg-primary/10', 'text-primary']"
            aria-hidden="true"
          >
            {{ initials(item.author) }}
          </div>
          <div class="min-w-0">
            <p class="text-sm font-semibold text-foreground truncate">{{ item.author }}</p>
            <p v-if="item.role" class="text-xs text-muted-foreground truncate">{{ item.role }}</p>
          </div>
        </figcaption>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import { useTheme } from '@/composables/useTheme'
import { resolveIcon } from '@/composables/useContentIcons'
import type { TestimonialContent } from '@/types/content'

const props = withDefaults(defineProps<{
  testimonials: TestimonialContent[]
  showNotice?: boolean
}>(), {
  showNotice: true,
})

const { getClubTextClass, getClubBgClass } = useTheme()

const showPlaceholderNotice = computed(() =>
  props.showNotice && props.testimonials.some(t => t.placeholder)
)

const initials = (name: string) =>
  name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
</script>

<style scoped>
.testimonial-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 28px -12px rgb(0 0 0 / 0.18);
}

@media (prefers-reduced-motion: reduce) {
  .testimonial-card {
    transition: none !important;
  }
  .testimonial-card:hover {
    transform: none;
  }
}
</style>
