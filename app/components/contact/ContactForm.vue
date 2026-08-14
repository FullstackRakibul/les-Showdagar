<template>
  <div class="rounded-lg border border-border/60 bg-card/80 backdrop-blur-sm overflow-hidden">
    <!-- Accent strip -->
    <div class="h-1 w-full bg-primary" aria-hidden="true" />

    <div class="p-6 sm:p-8">
      <!-- Success state -->
      <div
        v-if="form.isSubmitted.value"
        ref="successEl"
        class="flex flex-col items-center text-center py-10 success-panel"
        tabindex="-1"
        role="status"
        aria-live="polite"
      >
        <div class="w-16 h-16 rounded-full bg-nextstop-500/10 text-nextstop-500 flex items-center justify-center mb-5 success-icon">
          <HugeiconsIcon :icon="resolveIcon('CheckmarkCircle02Icon')" :size="30" />
        </div>
        <h3 class="text-lg font-bold text-foreground">
          {{ config.successTitle ?? 'Message sent' }}
        </h3>
        <p class="text-sm text-muted-foreground leading-relaxed mt-2 max-w-sm">
          {{ config.successMessage }}
        </p>
        <p v-if="form.reference.value" class="text-xs text-muted-foreground mt-3">
          Reference:
          <span class="font-mono font-medium text-foreground">{{ form.reference.value }}</span>
        </p>
        <button
          type="button"
          class="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border bg-background text-foreground text-sm font-medium hover:bg-secondary active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          @click="form.resetForm()"
        >
          Send another message
        </button>
      </div>

      <!-- Form -->
      <form v-else novalidate @submit.prevent="onSubmit">
        <header class="mb-6">
          <p v-if="config.subtitle" class="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2">
            {{ config.subtitle }}
          </p>
          <h2 class="text-xl font-bold text-foreground">{{ config.title }}</h2>
          <p v-if="config.description" class="text-sm text-muted-foreground leading-relaxed mt-2">
            {{ config.description }}
          </p>
        </header>

        <!-- Submit-level error -->
        <div
          v-if="form.submitError.value"
          class="flex items-start gap-2.5 rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 mb-5"
          role="alert"
        >
          <HugeiconsIcon :icon="resolveIcon('Alert02Icon')" :size="16" class="shrink-0 mt-0.5 text-destructive" />
          <p class="text-sm text-destructive">{{ form.submitError.value }}</p>
        </div>

        <div class="space-y-4">
          <div
            v-for="field in config.fields"
            :key="field.id"
            :class="field.type === 'textarea' ? '' : 'sm:max-w-md'"
          >
            <label
              :for="`contact-${field.id}`"
              class="block text-sm font-medium text-foreground mb-1.5"
            >
              {{ field.label }}
              <span v-if="field.required" class="text-destructive" aria-hidden="true">*</span>
              <span v-if="field.required" class="sr-only">(required)</span>
            </label>

            <textarea
              v-if="field.type === 'textarea'"
              :id="`contact-${field.id}`"
              v-model="form.formData[field.id as FieldKey]"
              :placeholder="field.placeholder"
              :rows="field.rows ?? 5"
              :maxlength="field.maxLength"
              :required="field.required"
              :aria-required="field.required || undefined"
              :aria-invalid="fieldError(field.id) ? 'true' : undefined"
              :aria-describedby="describedBy(field)"
              class="w-full px-3.5 py-2.5 rounded-md bg-background border text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors resize-y focus:ring-2 focus:ring-ring focus:border-transparent"
              :class="fieldError(field.id) ? 'border-destructive' : 'border-border'"
              @blur="form.touch(field.id as FieldKey)"
            />

            <input
              v-else
              :id="`contact-${field.id}`"
              v-model="form.formData[field.id as FieldKey]"
              :type="field.type"
              :placeholder="field.placeholder"
              :maxlength="field.maxLength"
              :required="field.required"
              :autocomplete="field.autocomplete"
              :aria-required="field.required || undefined"
              :aria-invalid="fieldError(field.id) ? 'true' : undefined"
              :aria-describedby="describedBy(field)"
              class="w-full px-3.5 py-2.5 rounded-md bg-background border text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:ring-2 focus:ring-ring focus:border-transparent"
              :class="fieldError(field.id) ? 'border-destructive' : 'border-border'"
              @blur="form.touch(field.id as FieldKey)"
            />

            <!-- Character counter for the message -->
            <div v-if="field.type === 'textarea' && field.maxLength" class="flex justify-end mt-1">
              <span class="text-[11px] text-muted-foreground tabular-nums">
                {{ String(form.formData[field.id as FieldKey] ?? '').length }} / {{ field.maxLength }}
              </span>
            </div>

            <!-- Help text -->
            <p
              v-if="field.help && !fieldError(field.id)"
              :id="`contact-${field.id}-help`"
              class="text-xs text-muted-foreground mt-1.5"
            >
              {{ field.help }}
            </p>

            <!-- Field error -->
            <p
              v-if="fieldError(field.id)"
              :id="`contact-${field.id}-error`"
              class="flex items-center gap-1.5 text-xs text-destructive mt-1.5"
            >
              <HugeiconsIcon :icon="resolveIcon('Alert02Icon')" :size="12" class="shrink-0" />
              {{ fieldError(field.id) }}
            </p>

            <!-- Keyword suggestions under the message field -->
            <TransitionGroup
              v-if="field.id === 'message'"
              name="suggestion"
              tag="div"
              class="space-y-2 mt-3"
            >
              <aside
                v-for="s in suggestions.matches.value"
                :key="s.id"
                class="flex items-start gap-2.5 rounded-md border border-border bg-muted/50 px-3.5 py-3"
              >
                <HugeiconsIcon
                  :icon="resolveIcon('InformationCircleIcon')"
                  :size="15"
                  class="shrink-0 mt-0.5 text-muted-foreground"
                />
                <div class="min-w-0 flex-1">
                  <p class="text-xs font-semibold text-foreground">{{ s.title }}</p>
                  <p class="text-xs text-muted-foreground leading-relaxed mt-0.5">{{ s.description }}</p>
                  <NuxtLink
                    v-if="s.cta"
                    :to="s.cta.link"
                    class="inline-flex items-center gap-1 text-xs font-medium text-primary mt-1.5 hover:opacity-80 transition-opacity"
                  >
                    {{ s.cta.label }}
                    <HugeiconsIcon :icon="resolveIcon('ArrowRight01Icon')" :size="11" />
                  </NuxtLink>
                </div>
              </aside>
            </TransitionGroup>
          </div>

          <!--
            Honeypot. Hidden from sight and from assistive tech; only automated
            submitters fill it, and the server discards those silently.
          -->
          <div class="hidden" aria-hidden="true">
            <label for="contact-website">Website</label>
            <input
              id="contact-website"
              v-model="form.formData.website"
              type="text"
              tabindex="-1"
              autocomplete="off"
            />
          </div>
        </div>

        <!-- Submit -->
        <div class="mt-7">
          <button
            type="submit"
            :disabled="form.isSubmitting.value"
            class="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <HugeiconsIcon
              :icon="resolveIcon(form.isSubmitting.value ? 'Loading03Icon' : 'SentIcon')"
              :size="16"
              :class="form.isSubmitting.value ? 'animate-spin' : ''"
            />
            {{ form.isSubmitting.value ? (config.submittingLabel ?? 'Sending...') : config.submitLabel }}
          </button>

          <p v-if="config.footnote" class="text-xs text-muted-foreground mt-3">
            {{ config.footnote }}
          </p>
        </div>

        <!-- Screen-reader status for validation failures -->
        <p class="sr-only" role="status" aria-live="polite">
          {{ statusMessage }}
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import { resolveIcon } from '@/composables/useContentIcons'
import { useContactForm } from '@/composables/useContactForm'
import { useMessageSuggestions } from '@/composables/useMessageSuggestions'
import type {
  ContactFormContent,
  ContactFieldContent,
  MessageSuggestionContent,
} from '@/types/content'
import type { ContactPayload } from '~~/shared/contact-validation'

type FieldKey = keyof ContactPayload

const props = withDefaults(defineProps<{
  config: ContactFormContent
  suggestionSource?: MessageSuggestionContent[]
}>(), {
  suggestionSource: () => [],
})

const form = useContactForm()
const successEl = ref<HTMLElement | null>(null)
const statusMessage = ref('')

const suggestions = useMessageSuggestions(
  () => form.formData.message,
  () => props.suggestionSource,
)

const fieldError = (id: string) => form.visibleErrors.value[id as FieldKey]

/** Points aria-describedby at whichever of help/error/counter is showing. */
function describedBy(field: ContactFieldContent): string | undefined {
  const ids: string[] = []
  if (fieldError(field.id)) ids.push(`contact-${field.id}-error`)
  else if (field.help) ids.push(`contact-${field.id}-help`)
  return ids.length ? ids.join(' ') : undefined
}

async function onSubmit() {
  const result = await form.submitForm()

  if (result) {
    statusMessage.value = props.config.successMessage
    // Move focus to the success panel so screen-reader users land on the
    // confirmation rather than staying on a now-removed submit button.
    await nextTick()
    successEl.value?.focus()
    return
  }

  const count = form.errorCount.value
  statusMessage.value = count
    ? `Form has ${count} error${count === 1 ? '' : 's'}. Please review the highlighted fields.`
    : (form.submitError.value ?? '')

  // Focus the first invalid field.
  await nextTick()
  const firstBad = props.config.fields.find(f => fieldError(f.id))
  if (firstBad) {
    document.getElementById(`contact-${firstBad.id}`)?.focus()
  }
}

/** Lets the page pre-fill the subject from a support-category CTA. */
defineExpose({
  prefillSubject: (subject: string) => {
    // Returning from the success panel so the user can act on the new subject.
    if (form.isSubmitted.value) form.resetForm()
    form.prefillSubject(subject)
  },
  focusFirstField: () => {
    document.getElementById(`contact-${props.config.fields[0]?.id}`)?.focus()
  },
})
</script>

<style scoped>
.success-panel {
  animation: slideUp 0.35s ease-out both;
  outline: none;
}

.success-icon {
  animation: pop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  animation-delay: 0.1s;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: none; }
}

@keyframes pop {
  from { transform: scale(0.4); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.suggestion-enter-active,
.suggestion-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.suggestion-enter-from,
.suggestion-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

@media (prefers-reduced-motion: reduce) {
  .success-panel,
  .success-icon {
    animation: none;
    opacity: 1;
    transform: none;
  }
  .suggestion-enter-active,
  .suggestion-leave-active {
    transition: none;
  }
  .animate-spin {
    animation: none !important;
  }
}
</style>
