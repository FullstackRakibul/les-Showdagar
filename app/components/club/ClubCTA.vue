<template>
  <section
    :id="section.id"
    class="relative overflow-hidden border-y border-border scroll-mt-24"
    :aria-labelledby="`${section.id}-title`"
  >
    <!-- Tri-club gradient wash -->
    <div class="absolute inset-0 cta-gradient" aria-hidden="true" />

    <div class="relative max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-24 text-center">
      <p
        v-if="section.subtitle"
        class="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-4"
      >
        {{ section.subtitle }}
      </p>

      <h2
        :id="`${section.id}-title`"
        class="text-3xl sm:text-4xl font-bold text-foreground tracking-tight leading-tight"
      >
        {{ section.title }}
      </h2>

      <p v-if="section.description" class="text-muted-foreground leading-relaxed mt-4 max-w-2xl mx-auto">
        {{ section.description }}
      </p>

      <div v-if="section.cta || section.secondaryCta" class="flex justify-center mt-9">
        <ContentCTA :primary="section.cta" :secondary="section.secondaryCta" align="center" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ContentCTA from '@/components/content/ContentCTA.vue'
import type { SectionContent } from '@/types/content'

defineProps<{ section: SectionContent }>()
</script>

<style scoped>
.cta-gradient {
  background:
    radial-gradient(ellipse 60% 80% at 15% 50%, oklch(0.55 0.18 220 / 0.09), transparent 70%),
    radial-gradient(ellipse 50% 80% at 50% 50%, oklch(0.55 0.22 300 / 0.08), transparent 70%),
    radial-gradient(ellipse 60% 80% at 85% 50%, oklch(0.55 0.2 160 / 0.09), transparent 70%);
}
</style>
