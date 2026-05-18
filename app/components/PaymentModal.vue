<template>
  <Transition name="modal">
    <div v-if="checkoutStore.showSuccessModal"
      class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div class="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-sm p-8 text-center">
        <!-- Success icon -->
        <div class="w-16 h-16 rounded-full bg-nextstop-500/10 flex items-center justify-center mx-auto mb-5">
          <svg class="w-8 h-8 text-nextstop-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>

        <h2 class="text-lg font-bold text-foreground mb-1">Order Confirmed!</h2>
        <p class="text-sm text-muted-foreground mb-1">
          Order <span class="font-mono font-medium text-foreground">{{ checkoutStore.currentOrder?.id }}</span>
        </p>
        <p class="text-xs text-muted-foreground mb-6">
          {{ paymentLabel }} · ৳{{ checkoutStore.currentOrder?.total.toFixed(2) }}
        </p>

        <div class="space-y-2">
          <NuxtLink
            v-if="checkoutStore.currentOrder"
            :to="`/order-confirmation/${checkoutStore.currentOrder.id}`"
            @click="checkoutStore.closeSuccessModal()"
            class="flex items-center justify-center w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
            View Order Details
          </NuxtLink>
          <button @click="handleClose"
            class="w-full py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCheckoutStore } from '@/stores/checkout'
import { useRouter } from 'vue-router'

const checkoutStore = useCheckoutStore()
const router = useRouter()

const paymentLabel = computed(() => ({
  cash: 'Cash on Delivery',
  bkash: 'bKash',
  card: 'Card Payment',
}[checkoutStore.currentOrder?.paymentMethod ?? 'cash']))

function handleClose() {
  checkoutStore.closeSuccessModal()
  router.push('/')
}
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: all 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-from > div, .modal-leave-to > div { transform: scale(0.95); }
</style>
