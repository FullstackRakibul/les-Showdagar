import { ref, computed, reactive } from 'vue'
import {
  validateContact,
  EMPTY_CONTACT,
  type ContactPayload,
  type ContactErrors,
} from '~~/shared/contact-validation'

export interface ContactSubmitResult {
  success: boolean
  message: string
  reference: string | null
}

export function useContactForm() {
  const formData = reactive<ContactPayload>({ ...EMPTY_CONTACT })

  const errors = ref<ContactErrors>({})
  const touched = ref<Set<keyof ContactPayload>>(new Set())
  const isSubmitting = ref(false)
  const isSubmitted = ref(false)
  const submitError = ref<string | null>(null)
  const reference = ref<string | null>(null)

  /** Errors are only surfaced for fields the user has actually left. */
  const visibleErrors = computed<ContactErrors>(() => {
    const out: ContactErrors = {}
    for (const [field, message] of Object.entries(errors.value)) {
      if (touched.value.has(field as keyof ContactPayload)) {
        out[field as keyof ContactPayload] = message
      }
    }
    return out
  })

  const isValid = computed(() => Object.keys(validateContact(formData)).length === 0)
  const errorCount = computed(() => Object.keys(errors.value).length)

  function revalidate() {
    errors.value = validateContact(formData)
  }

  function touch(field: keyof ContactPayload) {
    touched.value.add(field)
    revalidate()
  }

  /** Marks every field touched so a failed submit reveals all errors at once. */
  function touchAll() {
    for (const key of Object.keys(formData) as (keyof ContactPayload)[]) {
      touched.value.add(key)
    }
  }

  function resetForm() {
    Object.assign(formData, EMPTY_CONTACT)
    errors.value = {}
    touched.value = new Set()
    isSubmitted.value = false
    submitError.value = null
    reference.value = null
  }

  /** Pre-fills the subject — used by the support-category CTAs. */
  function prefillSubject(subject: string) {
    formData.subject = subject
  }

  async function submitForm(): Promise<ContactSubmitResult | null> {
    revalidate()
    touchAll()

    if (!isValid.value) {
      submitError.value = 'Please check the highlighted fields and try again.'
      return null
    }

    isSubmitting.value = true
    submitError.value = null

    try {
      const result = await $fetch<ContactSubmitResult>('/api/contact', {
        method: 'POST',
        body: { ...formData },
      })

      isSubmitted.value = true
      reference.value = result.reference
      return result
    } catch (err: any) {
      // Surface per-field errors the server found that the client missed.
      const serverErrors = err?.data?.data?.errors as ContactErrors | undefined
      if (serverErrors) {
        errors.value = serverErrors
        touchAll()
      }
      submitError.value =
        err?.data?.data?.message
        || err?.data?.message
        || 'Something went wrong sending your message. Please try again, or email us directly.'
      return null
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    formData,
    errors,
    visibleErrors,
    touched,
    isSubmitting,
    isSubmitted,
    submitError,
    reference,
    isValid,
    errorCount,
    submitForm,
    resetForm,
    revalidate,
    touch,
    touchAll,
    prefillSubject,
  }
}
