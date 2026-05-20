<template>
  <div
    ref="wrapperEl"
    class="card-reveal"
    :class="{ 'is-visible': isVisible }"
    :style="{ transitionDelay: `${animationDelay ?? 0}ms` }"
  >
    <div class="card-border-wrap" :style="cssVars">
      <!-- Spinning gradient border layer -->
      <div class="border-spin" aria-hidden="true" />

      <!-- Card -->
      <article
        ref="cardEl"
        class="club-card"
        @mousemove="onMouseMove"
        @mouseleave="onMouseLeave"
      >
        <!-- Top-right decorative orb -->
        <div class="orb" aria-hidden="true" />

        <!-- Icon -->
        <div class="icon-wrap">
          <HugeiconsIcon :icon="icon" :size="22" class="icon-svg" />
        </div>

        <!-- Body -->
        <div class="flex flex-col flex-1 mt-5 gap-3 min-w-0">
          <div>
            <h3 class="text-base font-semibold text-foreground leading-snug">{{ title }}</h3>
            <p class="club-label mt-0.5">{{ subtitle }}</p>
            <p class="club-label mt-0.5 opacity-55 text-[10px]">{{ tagline }}</p>
          </div>

          <p class="text-sm text-muted-foreground leading-relaxed">{{ description }}</p>

          <!-- Metrics -->
          <div class="flex flex-wrap gap-1.5">
            <span v-for="m in metrics" :key="m" class="metric-pill">{{ m }}</span>
          </div>

          <!-- CTA -->
          <button class="cta-btn mt-1" @click="emit('navigate', ctaRoute)">
            <span class="cta-label">{{ ctaText }}</span>
            <HugeiconsIcon :icon="ArrowRight01Icon" :size="14" class="cta-arrow" />
          </button>
        </div>

        <!-- Bottom accent bar -->
        <div class="bottom-bar" aria-hidden="true" />
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import { ArrowRight01Icon } from '@hugeicons/core-free-icons'
import { useCardTilt } from '@/composables/useCardTilt'
import { useScrollReveal } from '@/composables/useScrollReveal'

const props = defineProps<{
  title: string
  subtitle: string
  tagline: string
  description: string
  icon: object
  colorPrimary: string
  metrics: string[]
  ctaText: string
  ctaRoute: string
  animationDelay?: number
}>()

const emit = defineEmits<{ navigate: [route: string] }>()

const wrapperEl = ref<HTMLElement | null>(null)
const cardEl = ref<HTMLElement | null>(null)

const { isVisible } = useScrollReveal(wrapperEl)
const { onMouseMove, onMouseLeave } = useCardTilt(cardEl, 5)

const cssVars = computed(() => ({ '--cc': props.colorPrimary }))
</script>

<style scoped>
/* Scroll reveal */
.card-reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.55s ease, transform 0.55s ease;
  height: 100%;
}
.card-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Gradient border wrapper */
.card-border-wrap {
  position: relative;
  border-radius: 16px;
  padding: 1px;
  background: var(--border);
  height: 100%;
}

/* The spinning element that creates the gradient border */
.border-spin {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  overflow: hidden;
  opacity: 0;
  transition: opacity 0.35s ease;
  pointer-events: none;
  z-index: 0;
}
.border-spin::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300%;
  height: 300%;
  transform: translate(-50%, -50%);
  background: conic-gradient(
    var(--cc) 0deg,
    transparent 80deg,
    transparent 180deg,
    var(--cc) 260deg,
    transparent 340deg
  );
}
.card-border-wrap:hover .border-spin {
  opacity: 1;
}
.card-border-wrap:hover .border-spin::after {
  animation: spin-border 4s linear infinite;
}
@keyframes spin-border {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to   { transform: translate(-50%, -50%) rotate(360deg); }
}

/* Card */
.club-card {
  position: relative;
  z-index: 1;
  border-radius: 15px;
  background: var(--card);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  transition: transform 0.22s ease, box-shadow 0.35s ease;
  will-change: transform;
}
.club-card:hover {
  box-shadow: 0 20px 56px color-mix(in oklch, var(--cc) 18%, transparent);
}

/* Decorative orb */
.orb {
  position: absolute;
  top: -36px;
  right: -36px;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background: color-mix(in oklch, var(--cc) 12%, transparent);
  pointer-events: none;
  transition: width 0.5s ease, height 0.5s ease, background 0.5s ease;
}
.club-card:hover .orb {
  width: 150px;
  height: 150px;
  background: color-mix(in oklch, var(--cc) 20%, transparent);
}

/* Icon */
.icon-wrap {
  width: 46px;
  height: 46px;
  border-radius: 12px;
  background: color-mix(in oklch, var(--cc) 14%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: border-radius 0.4s ease, background 0.4s ease,
    transform 0.35s ease, box-shadow 0.35s ease;
}
.club-card:hover .icon-wrap {
  border-radius: 50%;
  background: color-mix(in oklch, var(--cc) 22%, transparent);
  transform: scale(1.08) rotate(4deg);
  box-shadow: 0 8px 22px color-mix(in oklch, var(--cc) 28%, transparent);
}
.icon-svg {
  color: var(--cc);
  transition: transform 0.3s ease;
}
.club-card:hover .icon-svg {
  transform: scale(1.1);
}

/* Labels */
.club-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--cc);
}

/* Metric pills */
.metric-pill {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 9999px;
  font-size: 10px;
  font-weight: 500;
  background: color-mix(in oklch, var(--cc) 12%, transparent);
  color: var(--cc);
}

/* CTA button */
.cta-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--cc);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  width: fit-content;
}
.cta-btn::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1.5px;
  background: var(--cc);
  border-radius: 1px;
  transition: width 0.3s ease;
}
.cta-btn:hover::after { width: 100%; }
.cta-arrow { transition: transform 0.3s ease; }
.cta-btn:hover .cta-arrow { transform: translateX(5px); }
.cta-btn:focus-visible {
  outline: 2px solid var(--cc);
  outline-offset: 4px;
  border-radius: 3px;
}

/* Bottom accent bar */
.bottom-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: 0;
  background: linear-gradient(to right, var(--cc), color-mix(in oklch, var(--cc) 50%, transparent));
  transition: width 0.5s ease;
  pointer-events: none;
}
.club-card:hover .bottom-bar { width: 100%; }

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .card-reveal,
  .club-card,
  .icon-wrap,
  .orb,
  .cta-arrow,
  .bottom-bar,
  .border-spin {
    transition: none !important;
    animation: none !important;
  }
  .card-reveal { opacity: 1; transform: none; }
}
</style>
