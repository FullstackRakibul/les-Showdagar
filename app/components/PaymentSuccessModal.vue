<template>
  <teleport to="body">
    <transition name="modal">
      <div v-if="showModal" class="fixed inset-0 z-[9999] overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen px-4 py-4">
          <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" @click="closeModal"></div>

          <div class="relative bg-background rounded-2xl shadow-2xl max-w-md w-full p-12 text-center border border-border">
            <!-- Success Icon -->
            <div class="mb-6">
              <div class="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <HugeiconsIcon :icon="CheckCircleIcon" :size="48" class="text-accent" />
              </div>
              <h2 class="text-4xl font-bold mb-3">Welcome to Calcifer</h2>
              <p class="text-muted-foreground text-lg">Your pre-order is confirmed</p>
            </div>

            <!-- Order Details -->
            <div class="bg-muted/50 rounded-xl p-6 mb-6 text-left border border-border/50">
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-muted-foreground text-sm">Order Number</span>
                  <span class="font-mono font-semibold">{{ orderNumber }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-muted-foreground text-sm">Total Amount</span>
                  <span class="font-bold text-lg">${{ totalAmount.toFixed(2) }}</span>
                </div>
                <div class="border-t border-border pt-3">
                  <p class="text-muted-foreground text-sm mb-1">Estimated Delivery</p>
                  <p class="font-semibold">{{ estimatedDelivery }}</p>
                </div>
              </div>
            </div>

            <!-- Ecosystem Message -->
            <div class="mb-6 p-4 bg-accent/10 rounded-xl border border-accent/20">
              <p class="text-sm text-foreground/80 leading-relaxed">
                You're joining an exclusive ecosystem of audio enthusiasts. Get ready to experience sound like never before.
              </p>
            </div>

            <!-- Action Buttons -->
            <div class="space-y-3">
              <Button @click="goHome" class="w-full" size="lg">
                <HugeiconsIcon :icon="HomeIcon" :size="20" class="mr-2" />
                Back to Home
              </Button>
              <Button @click="closeModal" variant="outline" class="w-full" size="lg">
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { HugeiconsIcon } from '@hugeicons/vue'
import { CheckCircleIcon, HomeIcon } from '@hugeicons/core-free-icons'

const router = useRouter()
const showModal = ref(false)
const orderNumber = ref('')
const totalAmount = ref(0)
const estimatedDelivery = ref('')

const closeModal = () => {
  showModal.value = false
}

const goHome = () => {
  closeModal()
  router.push('/')
}

const handleShowSuccess = (event: CustomEvent) => {
  const { orderNumber: order, total, estimatedDelivery: delivery } = event.detail
  orderNumber.value = order || Math.random().toString(36).substring(2, 11).toUpperCase()
  totalAmount.value = total || 0
  estimatedDelivery.value = delivery || 'Q2 2026'
  showModal.value = true
}

onMounted(() => {
  document.addEventListener('show-success-modal', handleShowSuccess as EventListener)
})

onUnmounted(() => {
  document.removeEventListener('show-success-modal', handleShowSuccess as EventListener)
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
