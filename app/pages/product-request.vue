<template>
  <div class="bg-background">
    <header class="relative overflow-hidden border-b border-border">
      <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div class="absolute -top-32 -left-24 w-96 h-96 rounded-full bg-quantum-500 blur-3xl opacity-[0.08]" />
        <div class="absolute -bottom-32 -right-24 w-80 h-80 rounded-full bg-nextstop-500 blur-3xl opacity-[0.07]" />
      </div>

      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
        <div class="flex items-center justify-center gap-2 mb-5">
          <div class="h-px w-8 bg-quantum-500/60" />
          <p class="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            Product Request
          </p>
          <div class="h-px w-8 bg-nextstop-500/60" />
        </div>

        <h1 class="text-3xl sm:text-4xl font-bold text-foreground leading-tight tracking-tight">
          Can't Find What You're Looking For?
        </h1>
        <p class="text-lg text-muted-foreground leading-relaxed mt-5 max-w-2xl mx-auto">
          Sometimes the product you're looking for simply isn't in the catalogue yet.
          Tell us what you're searching for and we'll do our best to find it.
        </p>
        <p class="text-sm text-muted-foreground mt-4">
          Your request could help shape what we offer next.
        </p>
      </div>
    </header>

    <!-- How it works -->
    <section class="bg-muted/30 border-b border-border">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 py-14">
        <h2 class="text-center text-xl font-bold text-foreground tracking-tight mb-8">How it works</h2>
        <ol class="grid grid-cols-1 sm:grid-cols-3 gap-5" role="list">
          <li
            v-for="(step, i) in steps"
            :key="step.title"
            class="rounded-lg border border-border/60 bg-card/80 backdrop-blur-sm p-5"
          >
            <div class="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold mb-3">
              {{ i + 1 }}
            </div>
            <h3 class="font-semibold text-foreground">{{ step.title }}</h3>
            <p class="text-sm text-muted-foreground leading-relaxed mt-1.5">{{ step.description }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- Request form — reuses the contact form with a request-shaped config -->
    <section id="request-form" class="scroll-mt-24">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <ContactForm :config="requestFormConfig" :suggestion-source="[]" />
      </div>
    </section>

    <!-- Closing -->
    <ClubCTA :section="ctaSection" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTheme } from '@/composables/useTheme'
import type { ContactFormContent, SectionContent } from '@/types/content'

const { load } = useTheme()
onMounted(load)

const steps = [
  {
    title: 'Tell us what you want',
    description: 'Describe the product — brand, model, specifications, or just what it needs to do.',
  },
  {
    title: 'We look into it',
    description: 'Our team checks availability, pricing, and how quickly we could source it.',
  },
  {
    title: 'We get back to you',
    description: "We'll reply within one business day with what we found.",
  },
]

/**
 * Same component as the contact form, given request-specific copy. Submissions
 * go to the same `/api/contact` endpoint — the subject line distinguishes them.
 */
const requestFormConfig: ContactFormContent = {
  title: 'Request a Product',
  subtitle: "Tell us what you're looking for",
  description: 'The more detail you give, the better our chances of finding the right thing.',
  fields: [
    {
      id: 'name',
      type: 'text',
      label: 'Name',
      placeholder: 'Your full name',
      required: true,
      maxLength: 100,
      autocomplete: 'name',
    },
    {
      id: 'email',
      type: 'email',
      label: 'Email Address',
      placeholder: 'you@example.com',
      required: true,
      maxLength: 254,
      autocomplete: 'email',
      help: "We'll only use this to reply about your request.",
    },
    {
      id: 'phone',
      type: 'tel',
      label: 'Phone Number',
      placeholder: '01XXXXXXXXX',
      required: false,
      maxLength: 20,
      autocomplete: 'tel',
      help: 'Optional.',
    },
    {
      id: 'subject',
      type: 'text',
      label: 'Product',
      placeholder: 'What product are you looking for?',
      required: true,
      maxLength: 150,
    },
    {
      id: 'message',
      type: 'textarea',
      label: 'Details',
      placeholder: 'Brand, model, specifications, quantity, budget, or anything else that helps us find it...',
      required: true,
      rows: 6,
      maxLength: 2000,
    },
  ],
  submitLabel: 'Send Request',
  submittingLabel: 'Sending...',
  successTitle: 'Request received',
  successMessage: "Thanks — we'll look into it and get back to you within one business day.",
  footnote: 'We use your details only to respond to this request.',
}

const ctaSection: SectionContent = {
  id: 'request-cta',
  title: 'Meanwhile, explore the collection.',
  subtitle: 'While you wait',
  description: 'There may already be something close to what you need across the three clubs.',
  cta: { label: 'Browse Products', link: '/products' },
  secondaryCta: { label: 'Explore the Clubs', link: '/clubs' },
}

useHead({
  title: 'Request a Product | RH Business Club',
  meta: [
    {
      name: 'description',
      content: "Can't find what you're looking for? Tell RH Business Club what product you need and we'll do our best to source it.",
    },
  ],
})
</script>
