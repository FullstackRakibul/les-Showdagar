<template>
  <Transition name="modal">
    <div v-if="checkoutStore.showSuccessModal"
      class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">

      <div class="bg-card border border-border rounded-lg shadow-2xl w-full max-w-sm overflow-hidden">

        <!-- Top accent strip -->
        <div class="h-1 w-full bg-primary" />

        <!-- Body -->
        <div class="px-6 pt-7 pb-5">

          <!-- Success icon -->
          <div class="flex justify-center mb-5">
            <div class="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
              <svg class="w-7 h-7 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
          </div>

          <!-- Title -->
          <div class="text-center mb-5">
            <h2 class="text-base font-semibold text-foreground mb-1">Order Confirmed</h2>
            <p class="text-xs text-muted-foreground">
              Your order has been placed successfully.
            </p>
          </div>

          <!-- Order summary card -->
          <div class="bg-muted rounded-md px-4 py-3 mb-5 space-y-2">
            <div class="flex items-center justify-between text-xs">
              <span class="text-muted-foreground">Order ID</span>
              <span class="font-mono font-medium text-foreground">{{ checkoutStore.currentOrder?.id }}</span>
            </div>
            <div class="border-t border-border" />
            <div class="flex items-center justify-between text-xs">
              <span class="text-muted-foreground">Payment</span>
              <span class="font-medium text-foreground">{{ paymentLabel }}</span>
            </div>
            <div class="border-t border-border" />
            <div class="flex items-center justify-between text-xs">
              <span class="text-muted-foreground">Total</span>
              <Price v-if="checkoutStore.currentOrder" :amount="checkoutStore.currentOrder.total" class="font-semibold text-foreground text-sm" />
            </div>
          </div>

          <!-- Actions -->
          <div class="space-y-2">
            <!-- Buy Now -->
            <NuxtLink to="/checkout" @click="checkoutStore.closeSuccessModal()"
              class="flex items-center justify-center gap-2 w-full py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 active:scale-[0.98] transition-all">
              <ShoppingBag class="w-4 h-4" />
              Buy Now
            </NuxtLink>

            <!-- View Order Details -->
            <NuxtLink v-if="checkoutStore.currentOrder"
              :to="`/order-confirmation/${checkoutStore.currentOrder.id}`"
              @click="checkoutStore.closeSuccessModal()"
              class="flex items-center justify-center gap-2 w-full py-2.5 rounded-md border border-border text-sm font-medium text-foreground hover:bg-secondary active:scale-[0.98] transition-all">
              <Receipt class="w-4 h-4 text-muted-foreground" />
              View Order Details
            </NuxtLink>

            <!-- Continue Shopping -->
            <button @click="handleClose"
              class="w-full py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
              Continue Shopping
            </button>
          </div>
        </div>

      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { ShoppingBag, Receipt } from 'lucide-vue-next'
import { useCheckoutStore } from '@/stores/checkout'
import { useTheme } from '@/composables/useTheme'
import { useRouter } from 'vue-router'

const checkoutStore = useCheckoutStore()
const router = useRouter()
const { load } = useTheme()

onMounted(load)

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
.modal-enter-active, .modal-leave-active { transition: all 0.25s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-from > div, .modal-leave-to > div { transform: scale(0.96) translateY(4px); }
</style>
