<template>
  <div class="max-w-5xl mx-auto px-4 py-8">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-foreground">Checkout</h1>
      <div class="flex items-center gap-2 text-xs text-muted-foreground mt-1">
        <NuxtLink to="/cart" class="hover:text-foreground transition-colors">Cart</NuxtLink>
        <span>›</span>
        <span class="font-medium text-foreground">Checkout</span>
        <span>›</span>
        <span>Confirmation</span>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left: Form -->
      <div class="lg:col-span-2">
        <CheckoutForm />

        <!-- Error -->
        <div v-if="checkoutStore.paymentError"
          class="mt-4 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-sm text-destructive">
          {{ checkoutStore.paymentError }}
        </div>
      </div>

      <!-- Right: Summary -->
      <div class="lg:col-span-1">
        <div class="bg-card border border-border rounded-2xl p-5 sticky top-20 space-y-4">
          <h2 class="font-semibold text-foreground">Order Summary</h2>

          <!-- Items preview -->
          <div class="max-h-52 overflow-y-auto space-y-3">
            <div v-for="item in cartStore.items" :key="`${item.productId}-${item.selectedColor}`"
              class="flex items-center gap-3">
              <img :src="item.productImage" :alt="item.productName" class="w-12 h-12 object-cover rounded-lg shrink-0" />
              <div class="min-w-0 flex-1">
                <p class="text-xs font-medium text-foreground line-clamp-1">{{ item.productName }}</p>
                <p class="text-xs text-muted-foreground">Qty: {{ item.quantity }}</p>
              </div>
              <span class="text-xs font-semibold text-foreground">৳{{ (item.price * item.quantity).toFixed(2) }}</span>
            </div>
          </div>

          <div class="border-t border-border pt-3 space-y-2 text-sm">
            <div class="flex justify-between"><span class="text-muted-foreground">Subtotal</span><span>৳{{ subtotal.toFixed(2) }}</span></div>
            <div class="flex justify-between"><span class="text-muted-foreground">Shipping</span><span>৳{{ shipping.toFixed(2) }}</span></div>
            <div class="flex justify-between"><span class="text-muted-foreground">Tax</span><span>৳{{ tax.toFixed(2) }}</span></div>
          </div>
          <div class="border-t border-border pt-3 flex justify-between">
            <span class="font-semibold text-foreground">Total</span>
            <span class="text-lg font-bold text-foreground">৳{{ grandTotal.toFixed(2) }}</span>
          </div>

          <!-- Place order -->
          <button @click="handleSubmit" :disabled="checkoutStore.isProcessing || cartStore.items.length === 0 || !canSubmit"
            class="w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            <svg v-if="checkoutStore.isProcessing" class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>
            <svg v-else class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <span>{{ checkoutStore.isProcessing ? 'Processing…' : placeOrderLabel }}</span>
          </button>

          <p class="text-center text-[10px] text-muted-foreground">🔒 Secured with SSL encryption</p>
        </div>
      </div>
    </div>

    <PaymentModal />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ ssr: false })

import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useCheckoutStore } from '@/stores/checkout'

const router = useRouter()
const cartStore = useCartStore()
const checkoutStore = useCheckoutStore()

if (import.meta.client && cartStore.items.length === 0) router.replace('/cart')

const subtotal = computed(() => cartStore.total)
const shipping = computed(() => subtotal.value > 1000 ? 0 : 99)
const tax = computed(() => subtotal.value * 0.08)
const grandTotal = computed(() => subtotal.value + shipping.value + tax.value)

const canSubmit = computed(() => {
  const s = checkoutStore.shippingInfo
  return !!(s.name && s.phone && s.street && s.thana && s.zillah)
})

const placeOrderLabel = computed(() => ({
  cash:  'Place Order (Cash on Delivery)',
  bkash: 'Place Order (bKash)',
  card:  'Place Order (Card)',
}[checkoutStore.paymentInfo.method]))

async function handleSubmit() {
  try {
    await checkoutStore.processOrder(cartStore.items, {
      subtotal: subtotal.value,
      shipping: shipping.value,
      tax: tax.value,
      total: grandTotal.value,
    })
    cartStore.clearCart()
  } catch {}
}
</script>
