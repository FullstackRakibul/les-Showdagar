<template>
  <section
    :id="section.id"
    class="relative overflow-hidden bg-background scroll-mt-24"
    :aria-labelledby="`${section.id}-title`"
  >
    <!-- Animated gradient orbs -->
    <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div class="orb orb--a" />
      <div class="orb orb--b" />
      <div class="orb orb--c" />
    </div>

    <div class="relative max-w-6xl mx-auto px-4 sm:px-6 py-24 sm:py-32 text-center">
      <!-- Eyebrow -->
      <div v-if="section.subtitle" class="flex items-center justify-center gap-2 mb-6">
        <div class="h-px w-8 bg-quantum-500/60" />
        <p class="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          {{ section.subtitle }}
        </p>
        <div class="h-px w-8 bg-nextstop-500/60" />
      </div>

      <h1
        :id="`${section.id}-title`"
        class="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-transparent bg-clip-text hero-gradient"
      >
        {{ section.title }}
      </h1>

      <p v-if="section.description" class="text-lg text-muted-foreground leading-relaxed mt-6 max-w-2xl mx-auto">
        {{ section.description }}
      </p>

      <p
        v-for="(para, i) in section.body"
        :key="i"
        class="text-muted-foreground leading-relaxed mt-3 max-w-2xl mx-auto"
      >
        {{ para }}
      </p>

      <div v-if="section.cta || section.secondaryCta" class="flex justify-center mt-10">
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
.hero-gradient {
  background-image: linear-gradient(
    100deg,
    var(--foreground) 0%,
    var(--foreground) 30%,
    oklch(0.55 0.18 220) 55%,
    oklch(0.55 0.22 300) 75%,
    oklch(0.55 0.2 160) 100%
  );
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.16;
  animation: orbFloat 22s ease-in-out infinite;
}

.orb--a {
  width: 520px;
  height: 520px;
  background: oklch(0.55 0.18 220);
  top: -180px;
  left: -120px;
}

.orb--b {
  width: 460px;
  height: 460px;
  background: oklch(0.55 0.22 300);
  top: 30%;
  right: -140px;
  animation-delay: -8s;
}

.orb--c {
  width: 380px;
  height: 380px;
  background: oklch(0.55 0.2 160);
  bottom: -140px;
  left: 35%;
  animation-delay: -15s;
}

@keyframes orbFloat {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(28px, -34px) scale(1.05); }
  66% { transform: translate(-22px, 26px) scale(0.96); }
}

@media (prefers-reduced-motion: reduce) {
  .orb { animation: none; }
}
</style>
