<template>
  <div class="max-w-2xl mx-auto px-4 py-12 text-center space-y-6">
    <!-- Success icon -->
    <div class="w-20 h-20 rounded-full bg-nextstop-500/10 flex items-center justify-center mx-auto">
      <svg class="w-10 h-10 text-nextstop-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    </div>

    <div>
      <h1 class="text-2xl font-bold text-foreground">Thank you for your order!</h1>
      <p class="text-muted-foreground mt-2 text-sm">Order <span class="font-mono font-semibold text-foreground">{{ orderId }}</span> has been placed successfully.</p>
    </div>

    <!-- Order summary card -->
    <div v-if="order" class="bg-card border border-border rounded-2xl p-6 text-left space-y-4">
      <h2 class="font-semibold text-foreground text-sm">Order Details</h2>

      <div class="space-y-3">
        <div v-for="item in order.items" :key="`${item.productId}`" class="flex items-center gap-3">
          <img :src="item.productImage" :alt="item.productName" class="w-12 h-12 object-cover rounded-xl shrink-0" />
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-foreground line-clamp-1">{{ item.productName }}</p>
            <p class="text-xs text-muted-foreground">Qty: {{ item.quantity }}</p>
          </div>
          <Price :amount="item.price * item.quantity" class="text-sm font-semibold text-foreground" />
        </div>
      </div>

      <div class="border-t border-border pt-4 space-y-1.5 text-sm">
        <div class="flex justify-between"><span class="text-muted-foreground">Subtotal</span><Price v-if="order.subtotal != null" :amount="order.subtotal" /></div>
        <div class="flex justify-between"><span class="text-muted-foreground">Shipping</span><Price v-if="order.shipping != null" :amount="order.shipping" /></div>
        <div class="flex justify-between"><span class="text-muted-foreground">Tax</span><Price v-if="order.tax != null" :amount="order.tax" /></div>
        <div class="flex justify-between font-bold text-base pt-1 border-t border-border">
          <span class="text-foreground">Total</span>
          <Price v-if="order.total != null" :amount="order.total" class="text-foreground" />
        </div>
      </div>

      <!-- Delivery info -->
      <div v-if="order.shippingInfo" class="border-t border-border pt-4 space-y-1 text-sm">
        <h3 class="font-medium text-foreground mb-2">Delivery to</h3>
        <p class="text-muted-foreground">{{ order.shippingInfo.name }}</p>
        <p class="text-muted-foreground">{{ order.shippingInfo.phone }}</p>
        <p class="text-muted-foreground">{{ order.shippingInfo.street }}, {{ order.shippingInfo.thana }}, {{ order.shippingInfo.zillah }}</p>
      </div>

      <!-- Payment badge -->
      <div class="flex items-center justify-between border-t border-border pt-4">
        <span class="text-xs text-muted-foreground">Payment</span>
        <span class="text-xs font-semibold bg-muted px-2 py-0.5 rounded-full text-foreground capitalize">
          {{ order.paymentMethod === 'cash' ? 'Cash on Delivery' : order.paymentMethod === 'bkash' ? 'bKash' : 'Card' }}
        </span>
      </div>
    </div>

    <!-- Fallback when order data not in memory -->
    <div v-else class="bg-muted rounded-2xl p-6 text-sm text-muted-foreground">
      Order details not available in this session. Check your email for confirmation.
    </div>

    <div class="flex gap-3 justify-center">
      <NuxtLink to="/browse"
        class="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
        Continue Shopping
      </NuxtLink>
      <NuxtLink to="/orders"
        class="px-5 py-2.5 border border-border rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors">
        My Orders
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCheckoutStore } from '@/stores/checkout'

const route = useRoute()
const orderId = route.params.id as string
const checkoutStore = useCheckoutStore()

const order = computed(() =>
  checkoutStore.orders.find(o => o.id === orderId) ?? checkoutStore.currentOrder,
)

useHead(() => ({ title: `Order ${orderId} — RH Business Club` }))
</script>
