<template>
  <section
    :id="hero.id"
    class="relative overflow-hidden bg-background scroll-mt-24"
    :aria-labelledby="`${hero.id}-title`"
  >
    <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div class="orb orb--a" />
      <div class="orb orb--b" />
    </div>

    <!-- pt accounts for the fixed header running over this hero. -->
    <div class="relative max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-20 sm:pt-40 sm:pb-28 text-center reveal">
      <div v-if="hero.subtitle" class="flex items-center justify-center gap-2 mb-5">
        <div class="h-px w-8 bg-quantum-500/60" />
        <p class="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          {{ hero.subtitle }}
        </p>
        <div class="h-px w-8 bg-nextstop-500/60" />
      </div>

      <h1
        :id="`${hero.id}-title`"
        class="text-4xl sm:text-5xl font-bold text-foreground leading-tight tracking-tight"
      >
        {{ hero.title }}
      </h1>

      <p v-if="hero.description" class="text-lg text-muted-foreground leading-relaxed mt-5 max-w-2xl mx-auto">
        {{ hero.description }}
      </p>

      <p
        v-for="(para, i) in hero.body"
        :key="i"
        class="text-muted-foreground leading-relaxed mt-3 max-w-2xl mx-auto"
      >
        {{ para }}
      </p>

      <div v-if="hero.cta || hero.secondaryCta" class="flex justify-center mt-9">
        <div class="flex flex-col sm:flex-row gap-3">
          <button
            v-if="hero.cta"
            type="button"
            class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            @click="emit('jump', hero.cta.link)"
          >
            {{ hero.cta.label }}
            <HugeiconsIcon :icon="resolveIcon('ArrowDown01Icon')" :size="15" />
          </button>

          <button
            v-if="hero.secondaryCta"
            type="button"
            class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md border border-border bg-background text-foreground text-sm font-semibold hover:bg-secondary active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            @click="emit('jump', hero.secondaryCta.link)"
          >
            {{ hero.secondaryCta.label }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { HugeiconsIcon } from '@hugeicons/vue'
import { resolveIcon } from '@/composables/useContentIcons'
import type { SectionContent } from '@/types/content'

defineProps<{ hero: SectionContent }>()

const emit = defineEmits<{ jump: [target: string] }>()
</script>

<style scoped>
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.14;
  animation: orbFloat 20s ease-in-out infinite;
}

.orb--a {
  width: 480px;
  height: 480px;
  background: oklch(0.55 0.18 220);
  top: -180px;
  left: -100px;
}

.orb--b {
  width: 420px;
  height: 420px;
  background: oklch(0.55 0.2 160);
  bottom: -180px;
  right: -100px;
  animation-delay: -9s;
}

@keyframes orbFloat {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(26px, -30px) scale(1.05); }
}

.reveal {
  animation: fadeInUp 0.6s ease-out both;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: none; }
}

@media (prefers-reduced-motion: reduce) {
  .orb { animation: none; }
  .reveal { animation: none; opacity: 1; transform: none; }
}
</style>
