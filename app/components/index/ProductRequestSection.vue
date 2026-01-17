<template>
  <section class="py-20 bg-gradient-to-b from-background to-card/50">
    <div class="max-w-3xl mx-auto px-4 sm:px-6">
      <Card class="border-border">
        <CardContent class="p-8 sm:p-12">
          <!-- Header -->
          <div class="text-center mb-8">
            <div class="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
              <HugeiconsIcon :icon="Search01Icon" :size="28" class="text-muted-foreground" />
            </div>
            <h2 class="text-2xl font-semibold text-foreground mb-2">
              Can't Find What You're Looking For?
            </h2>
            <p class="text-muted-foreground">
              Submit a product request and we'll source it for you
            </p>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleSubmit" class="space-y-5">
            <div>
              <label class="block text-sm font-medium text-foreground mb-2">
                Product Name
              </label>
              <Input v-model="form.productName" placeholder="e.g., iPhone 16 Pro Max" required />
            </div>

            <div>
              <label class="block text-sm font-medium text-foreground mb-2">
                Reference Link (Optional)
              </label>
              <Input v-model="form.referenceLink" type="url" placeholder="https://example.com/product" />
            </div>

            <div>
              <label class="block text-sm font-medium text-foreground mb-2">
                Additional Notes (Optional)
              </label>
              <textarea v-model="form.notes" rows="3"
                class="w-full px-3 py-2 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                placeholder="Specific color, model, quantity, etc." />
            </div>

            <Button type="submit" class="w-full" :disabled="isSubmitting">
              <HugeiconsIcon v-if="!isSubmitting" :icon="SentIcon" :size="16" class="mr-2" />
              <span v-if="isSubmitting">Submitting...</span>
              <span v-else>Submit Request</span>
            </Button>
          </form>

          <!-- Success Message -->
          <div v-if="isSubmitted"
            class="mt-6 p-4 bg-nextstop-500/10 border border-nextstop-500/20 rounded-lg text-center">
            <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="24" class="text-nextstop-500 mx-auto mb-2" />
            <p class="text-sm text-foreground">
              Request submitted! We'll get back to you within 24 hours.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Search01Icon,
  SentIcon,
  CheckmarkCircle01Icon,
} from '@hugeicons/core-free-icons'

const form = reactive({
  productName: '',
  referenceLink: '',
  notes: '',
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true

  await new Promise(resolve => setTimeout(resolve, 1500))

  isSubmitting.value = false
  isSubmitted.value = true

  form.productName = ''
  form.referenceLink = ''
  form.notes = ''

  setTimeout(() => {
    isSubmitted.value = false
  }, 5000)
}
</script>