<template>
  <section class="relative py-16 sm:py-10 overflow-hidden bg-background">

    <!-- Background orbs -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div class="orb orb--a" />
      <div class="orb orb--b" />
      <div class="orb orb--c" />
    </div>

    <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">

      <!-- Section label -->
      <div ref="sectionEl" class="section-reveal text-center mb-10" :class="{ 'is-visible': sectionVisible }">
        <div class="flex items-center justify-center gap-3 mb-4">
          <div class="h-px w-6 bg-border" />
          <p class="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Product Sourcing
          </p>
          <div class="h-px w-6 bg-border" />
        </div>
      </div>

      <!-- Card with tri-color spinning border -->
      <div ref="cardEl" class="card-reveal" :class="{ 'is-visible': cardVisible }">
        <div class="card-wrap">

          <!-- Card body -->
          <div class="card-body">

            <!-- Header -->
            <div class="text-center mb-8">
              <div class="icon-ring mx-auto mb-5">
                <HugeiconsIcon :icon="Search01Icon" :size="26" class="icon-svg" />
              </div>
              <h2 class="text-2xl sm:text-3xl font-bold text-foreground mb-3 text-balance leading-tight">
                Can't Find What<br class="hidden sm:block" />
                You're Looking For?
              </h2>
              <p class="text-muted-foreground text-sm sm:text-base max-w-sm mx-auto leading-relaxed">
                Submit a request and we'll source it from our global network across all three clubs.
              </p>
            </div>

            <!-- Divider -->
            <div class="divider-gradient mb-8" aria-hidden="true" />

            <!-- Form -->
            <form @submit.prevent="handleSubmit" class="space-y-5">

              <!-- Product name -->
              <div class="field-group">
                <label class="field-label">
                  Product Name
                  <span class="text-destructive ml-0.5">*</span>
                </label>
                <div class="field-wrap" :class="{ 'field-wrap--active': form.productName.length > 0 }">
                  <HugeiconsIcon :icon="PackageIcon" :size="17" class="field-icon" />
                  <input v-model="form.productName" type="text" placeholder="e.g., iPhone 16 Pro Max, Sony WH-1000XM6"
                    class="field-input" required />
                </div>
              </div>

              <!-- Reference link -->
              <div class="field-group">
                <label class="field-label">
                  Reference Link
                  <span class="optional-tag">Optional</span>
                </label>
                <div class="field-wrap" :class="{ 'field-wrap--active': form.referenceLink.length > 0 }">
                  <HugeiconsIcon :icon="Link02Icon" :size="17" class="field-icon" />
                  <input v-model="form.referenceLink" type="url" placeholder="https://example.com/product"
                    class="field-input" />
                </div>
              </div>

              <!-- Notes -->
              <div class="field-group">
                <label class="field-label">
                  Additional Notes
                  <span class="optional-tag">Optional</span>
                </label>
                <div class="field-wrap field-wrap--textarea" :class="{ 'field-wrap--active': form.notes.length > 0 }">
                  <textarea v-model="form.notes" rows="4" maxlength="500"
                    placeholder="Specific color, model, quantity, budget range, delivery timeline..."
                    class="field-input field-textarea" />
                </div>
                <div class="flex justify-end mt-1.5">
                  <span class="text-[11px] text-muted-foreground tabular-nums">
                    {{ form.notes.length }}<span class="opacity-50">/500</span>
                  </span>
                </div>
              </div>

              <!-- Submit -->
              <button type="submit" class="submit-btn" :class="{ 'submit-btn--loading': isSubmitting }"
                :disabled="isSubmitting">
                <span class="submit-shimmer" aria-hidden="true" />
                <span class="relative inline-flex items-center gap-2">
                  <template v-if="isSubmitting">
                    <svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                      <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Submitting…
                  </template>
                  <template v-else>
                    <HugeiconsIcon :icon="SentIcon" :size="16" class="submit-icon" />
                    Submit Request
                  </template>
                </span>
              </button>
            </form>

            <!-- Success state -->
            <Transition enter-active-class="transition-all duration-500 ease-out"
              enter-from-class="opacity-0 translate-y-3" enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition-all duration-250 ease-in" leave-from-class="opacity-100"
              leave-to-class="opacity-0">
              <div v-if="isSubmitted" class="success-box mt-6">
                <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="26" class="text-nextstop-500 animate-bounce" />
                <div>
                  <p class="text-sm font-semibold text-foreground">Request submitted!</p>
                  <p class="text-xs text-muted-foreground mt-0.5">We'll get back to you within 24 hours.</p>
                </div>
              </div>
            </Transition>

            <!-- Trust badges -->
            <div class="trust-row mt-8 pt-6 border-t border-border/40">
              <div v-for="badge in badges" :key="badge.label" class="trust-badge">
                <HugeiconsIcon :icon="badge.icon" :size="13" class="text-muted-foreground" />
                <span>{{ badge.label }}</span>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Search01Icon,
  SentIcon,
  CheckmarkCircle01Icon,
  PackageIcon,
  Link02Icon,
  ClockIcon,
  ShieldIcon,
  GlobalIcon,
} from '@hugeicons/core-free-icons'
import { useScrollReveal } from '@/composables/useScrollReveal'

const sectionEl = ref<HTMLElement | null>(null)
const cardEl = ref<HTMLElement | null>(null)
const { isVisible: sectionVisible } = useScrollReveal(sectionEl, 0.3)
const { isVisible: cardVisible } = useScrollReveal(cardEl, 0.1)

const form = reactive({ productName: '', referenceLink: '', notes: '' })
const isSubmitting = ref(false)
const isSubmitted = ref(false)

const badges = [
  { icon: ClockIcon, label: '24h response' },
  { icon: ShieldIcon, label: 'Secure sourcing' },
  { icon: GlobalIcon, label: 'Global network' },
]

const handleSubmit = async () => {
  if (!form.productName.trim()) return
  isSubmitting.value = true
  await new Promise(resolve => setTimeout(resolve, 1500))
  isSubmitting.value = false
  isSubmitted.value = true
  form.productName = ''
  form.referenceLink = ''
  form.notes = ''
  setTimeout(() => { isSubmitted.value = false }, 5000)
}
</script>

<style scoped>
/* Background orbs */
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(72px);
  pointer-events: none;
}

.orb--a {
  width: 420px;
  height: 420px;
  top: -160px;
  right: -120px;
  background: radial-gradient(circle, oklch(0.55 0.18 220 / 0.06), transparent 70%);
  animation: drift 18s ease-in-out infinite;
}

.orb--b {
  width: 380px;
  height: 380px;
  bottom: -140px;
  left: -100px;
  background: radial-gradient(circle, oklch(0.55 0.22 300 / 0.05), transparent 70%);
  animation: drift 22s ease-in-out infinite reverse;
}

.orb--c {
  width: 280px;
  height: 280px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, oklch(0.55 0.20 160 / 0.04), transparent 70%);
  animation: drift 16s ease-in-out infinite 4s;
}

@keyframes drift {

  0%,
  100% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(20px, -30px);
  }
}

/* Scroll reveals */
.section-reveal,
.card-reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.section-reveal.is-visible,
.card-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.card-reveal {
  transition-delay: 0.1s;
}

/* Card */
.card-wrap {
  position: relative;
  border-radius: 20px;
}

/* Card body */
.card-body {
  position: relative;
  border-radius: 20px;
  background: var(--background);
  padding: 2rem;
}

@media (min-width: 640px) {
  .card-body {
    padding: 2.5rem 3rem;
  }
}

/* Header icon */
.icon-ring {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: linear-gradient(135deg,
      oklch(0.55 0.18 220 / 0.12),
      oklch(0.55 0.22 300 / 0.12),
      oklch(0.55 0.20 160 / 0.12));
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-radius 0.4s ease, transform 0.4s ease, box-shadow 0.4s ease;
}

.icon-ring:hover {
  border-radius: 50%;
  transform: scale(1.08) rotate(5deg);
  box-shadow:
    0 0 0 6px oklch(0.55 0.18 220 / 0.08),
    0 8px 24px oklch(0.55 0.18 220 / 0.15);
}

.icon-svg {
  background: linear-gradient(135deg, oklch(0.55 0.18 220), oklch(0.55 0.22 300));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: oklch(0.55 0.18 220);
  /* fallback */
}

/* Gradient divider */
.divider-gradient {
  height: 1px;
  background: linear-gradient(to right,
      transparent,
      oklch(0.55 0.18 220 / 0.4),
      oklch(0.55 0.22 300 / 0.4),
      oklch(0.55 0.20 160 / 0.4),
      transparent);
}

/* Form fields */
.field-group {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.field-label {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--foreground);
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.optional-tag {
  font-size: 10px;
  font-weight: 400;
  color: var(--muted-foreground);
  background: var(--muted);
  padding: 1px 6px;
  border-radius: 9999px;
}

.field-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 0.875rem;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 12px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.field-wrap:focus-within {
  border-color: var(--ring);
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--ring) 15%, transparent);
}

.field-wrap--active {
  border-color: color-mix(in oklch, var(--ring) 50%, var(--border));
}

.field-wrap--textarea {
  align-items: flex-start;
  padding: 0.75rem 0.875rem;
}

.field-icon {
  color: var(--muted-foreground);
  flex-shrink: 0;
  transition: color 0.2s ease;
}

.field-wrap:focus-within .field-icon,
.field-wrap--active .field-icon {
  color: var(--ring);
}

.field-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-size: 0.875rem;
  color: var(--foreground);
  min-width: 0;
}

.field-input::placeholder {
  color: var(--muted-foreground);
}

.field-textarea {
  resize: none;
  line-height: 1.6;
}

/* Submit button */
.submit-btn {
  position: relative;
  width: 100%;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-size: 0.9375rem;
  font-weight: 600;
  color: oklch(0.98 0 0);
  background: linear-gradient(135deg,
      oklch(0.55 0.18 220),
      oklch(0.55 0.22 300) 50%,
      oklch(0.55 0.20 160));
  background-size: 200% 100%;
  overflow: hidden;
  transition: transform 0.18s ease, box-shadow 0.18s ease, background-position 0.4s ease;
}

.submit-btn:hover:not(:disabled) {
  transform: scale(1.015);
  background-position: 100% 0;
  box-shadow: 0 8px 28px oklch(0.55 0.18 220 / 0.35);
}

.submit-btn:active:not(:disabled) {
  transform: scale(0.985);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.submit-shimmer {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, oklch(1 0 0 / 0.18), transparent);
  transform: translateX(-100%);
  transition: transform 0.7s ease;
}

.submit-btn:hover .submit-shimmer {
  transform: translateX(100%);
}

.submit-icon {
  transition: transform 0.25s ease;
}

.submit-btn:hover .submit-icon {
  transform: translateX(2px) translateY(-2px);
}

/* Success state */
.success-box {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 1rem 1.25rem;
  background: color-mix(in oklch, oklch(0.55 0.20 160) 10%, transparent);
  border: 1px solid color-mix(in oklch, oklch(0.55 0.20 160) 30%, transparent);
  border-radius: 14px;
}

/* Trust badges */
.trust-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.trust-badge {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.75rem;
  color: var(--muted-foreground);
  padding: 0.25rem 0.625rem;
  border-radius: 9999px;
  background: var(--muted);
  transition: color 0.2s ease;
}

.trust-badge:hover {
  color: var(--foreground);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {

  .section-reveal,
  .card-reveal,
  .orb,
  .icon-ring,
  .submit-btn,
  .submit-shimmer,
  .submit-icon {
    animation: none !important;
    transition: none !important;
  }

  .section-reveal,
  .card-reveal {
    opacity: 1;
    transform: none;
  }
}
</style>