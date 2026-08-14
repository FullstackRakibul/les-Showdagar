<template>
  <div v-if="content" class="bg-background">

    <!-- Hero -->
    <ContactHero :hero="content.hero" @jump="jumpTo" />

    <!-- Support categories -->
    <section id="support" class="bg-muted/30 border-y border-border scroll-mt-24">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <header class="text-center mb-10">
          <h2 class="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            What can we help with?
          </h2>
          <p class="text-muted-foreground leading-relaxed mt-3 max-w-2xl mx-auto">
            Pick the closest match and we'll start your message with the right subject.
          </p>
        </header>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ContactSupportCategory
            v-for="(category, i) in content.supportCategories"
            :key="category.id"
            :category="category"
            :index="i"
            @select="onCategorySelect"
          />
        </div>
      </div>
    </section>

    <!-- Form + company info -->
    <section id="contact-form" class="scroll-mt-24">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div class="lg:col-span-2">
            <ContactForm
              ref="formRef"
              :config="content.contactForm"
              :suggestion-source="content.suggestions"
            />
          </div>

          <div class="lg:col-span-1 lg:sticky lg:top-24 space-y-4">
            <ContactCompanyInfo :info="content.companyInfo" />

            <!-- Product request nudge -->
            <div class="rounded-lg border border-border/60 bg-card/80 backdrop-blur-sm p-6">
              <h3 class="font-semibold text-foreground leading-snug">
                {{ content.productRequest.title }}
              </h3>
              <p class="text-sm text-muted-foreground leading-relaxed mt-2">
                {{ content.productRequest.description }}
              </p>
              <p
                v-for="(para, i) in content.productRequest.body"
                :key="i"
                class="text-sm text-muted-foreground leading-relaxed mt-2"
              >
                {{ para }}
              </p>
              <NuxtLink
                v-if="content.productRequest.cta"
                :to="content.productRequest.cta.link"
                class="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-primary hover:opacity-80 transition-opacity rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {{ content.productRequest.cta.label }}
                <HugeiconsIcon :icon="resolveIcon('ArrowRight01Icon')" :size="14" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section id="faq" class="bg-muted/30 border-y border-border scroll-mt-24">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <header class="text-center mb-10">
          <h2 class="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            Frequently asked
          </h2>
          <p class="text-muted-foreground leading-relaxed mt-3">
            Quick answers to the questions we hear most.
          </p>
        </header>
        <ContactFAQ :faqs="content.faqs" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useNuxtApp } from '#app'
import { HugeiconsIcon } from '@hugeicons/vue'
import { useContentStore } from '@/stores/contentStore'
import { useTheme } from '@/composables/useTheme'
import { resolveIcon } from '@/composables/useContentIcons'
import type { SupportCategoryContent } from '@/types/content'

const store = useContentStore()
const { load } = useTheme()
const { $lenis } = useNuxtApp()

const content = computed(() => store.contact)
const formRef = ref<{
  prefillSubject: (s: string) => void
  focusFirstField: () => void
} | null>(null)

/** Scrolls through Lenis so in-page jumps keep the smooth-scroll easing. */
function jumpTo(target: string) {
  const id = target.startsWith('#') ? target.slice(1) : target
  const el = document.getElementById(id)
  if (!el) return
  if ($lenis?.value) $lenis.value.scrollTo(el, { offset: -100 })
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function onCategorySelect(category: SupportCategoryContent) {
  formRef.value?.prefillSubject(category.subject ?? category.title)
  jumpTo(category.cta.link)
  // Focus lands on the form only after the scroll has had time to settle,
  // otherwise the browser cancels the smooth scroll to reveal the field.
  window.setTimeout(() => formRef.value?.focusFirstField(), 600)
}

onMounted(load)

useHead(() => ({
  title: content.value?.title ?? 'Contact | RH Business Club',
  meta: [
    { name: 'description', content: content.value?.metaDescription ?? '' },
    { property: 'og:title', content: content.value?.title ?? 'Contact' },
    { property: 'og:description', content: content.value?.metaDescription ?? '' },
    { property: 'og:type', content: 'website' },
  ],
}))
</script>
