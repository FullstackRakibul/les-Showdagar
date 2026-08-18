<template>
  <div class="min-h-[80vh] bg-background">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 py-10">

      <!-- Page heading -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-2xl font-bold text-foreground tracking-tight">Shopping Cart</h1>
          <p class="text-sm text-muted-foreground mt-0.5">
            {{ cartStore.count }} item{{ cartStore.count !== 1 ? 's' : '' }}
          </p>
        </div>
        <button
          v-if="cartStore.items.length > 0"
          class="text-xs font-medium text-destructive hover:opacity-70 transition-opacity"
          @click="cartStore.clearCart()"
        >
          Clear cart
        </button>
      </div>

      <!-- Empty state -->
      <Transition name="fade-up" appear>
        <div v-if="cartStore.items.length === 0" class="flex flex-col items-center justify-center py-24 gap-5">
          <div class="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
            <HugeiconsIcon :icon="ShoppingCart01Icon" :size="36" class="text-muted-foreground/50" />
          </div>
          <div class="text-center">
            <h3 class="text-lg font-semibold text-foreground mb-1">Your cart is empty</h3>
            <p class="text-sm text-muted-foreground">Add some items to get started.</p>
          </div>
          <NuxtLink
            to="/products"
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all"
          >
            <HugeiconsIcon :icon="AppStoreIcon" :size="15" />
            Browse Products
          </NuxtLink>
        </div>
      </Transition>

      <!-- Cart content -->
      <Transition name="fade-up" appear>
        <div v-if="cartStore.items.length > 0" class="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <!-- Items column -->
          <div class="lg:col-span-2 space-y-3">
            <TransitionGroup name="cart-item" tag="div" class="space-y-3">
              <div
                v-for="item in cartStore.items"
                :key="`${item.productId}-${item.selectedColor}-${item.selectedSize}`"
                class="flex items-center gap-4 rounded-lg border border-border bg-card p-4"
              >
                <!-- Image -->
                <div class="w-20 h-20 rounded-md overflow-hidden shrink-0 bg-muted">
                  <img
                    :src="item.productImage"
                    :alt="item.productName"
                    class="w-full h-full object-cover"
                  />
                </div>

                <!-- Info -->
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-foreground line-clamp-2 leading-snug">
                    {{ item.productName }}
                  </p>
                  <div class="flex flex-wrap gap-1 mt-1.5">
                    <span v-if="item.selectedColor" class="text-[10px] bg-muted px-2 py-0.5 rounded text-muted-foreground">{{ item.selectedColor }}</span>
                    <span v-if="item.selectedSize" class="text-[10px] bg-muted px-2 py-0.5 rounded text-muted-foreground">{{ item.selectedSize }}</span>
                  </div>
                  <p class="text-xs text-muted-foreground mt-1.5 flex items-center gap-0.5"><Price :amount="item.price" /> each</p>
                </div>

                <!-- Qty + price + remove -->
                <div class="shrink-0 flex flex-col items-end gap-3">
                  <Price :amount="item.price * item.quantity" class="text-base font-bold text-foreground" />
                  <div class="flex items-center gap-1.5">
                    <button
                      class="w-6 h-6 rounded-full bg-muted hover:bg-secondary flex items-center justify-center text-sm font-bold transition-colors active:scale-90"
                      @click="cartStore.updateQuantity(item.productId, item.quantity - 1, item.selectedColor, item.selectedSize)"
                    >−</button>
                    <span class="text-sm font-medium w-6 text-center tabular-nums">{{ item.quantity }}</span>
                    <button
                      class="w-6 h-6 rounded-full bg-muted hover:bg-secondary flex items-center justify-center text-sm font-bold transition-colors active:scale-90"
                      @click="cartStore.updateQuantity(item.productId, item.quantity + 1, item.selectedColor, item.selectedSize)"
                    >+</button>
                    <button
                      class="ml-1 text-muted-foreground hover:text-destructive transition-colors active:scale-90"
                      aria-label="Remove"
                      @click="cartStore.removeItem(item.productId, item.selectedColor, item.selectedSize)"
                    >
                      <HugeiconsIcon :icon="Delete01Icon" :size="15" />
                    </button>
                  </div>
                </div>
              </div>
            </TransitionGroup>

            <!-- Continue shopping -->
            <NuxtLink
              to="/products"
              class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mt-2"
            >
              <HugeiconsIcon :icon="ArrowLeft01Icon" :size="14" />
              Continue shopping
            </NuxtLink>
          </div>

          <!-- Summary column -->
          <div class="lg:col-span-1">
            <div class="rounded-lg border border-border bg-card p-5 sticky top-24 space-y-4">
              <h2 class="font-semibold text-foreground text-sm">Order Summary</h2>

              <div class="space-y-2 text-sm">
                <div class="flex justify-between text-muted-foreground">
                  <span>Subtotal ({{ cartStore.count }} items)</span>
                  <Price :amount="cartStore.total" class="text-foreground font-medium" />
                </div>
                <div class="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span class="font-medium" :class="shipping === 0 ? 'text-nextstop-500' : 'text-foreground'">
                    <template v-if="shipping === 0">Free</template>
                    <Price v-else :amount="shipping" />
                  </span>
                </div>
                <div class="flex justify-between text-muted-foreground">
                  <span>Tax (8%)</span>
                  <Price :amount="tax" class="text-foreground font-medium" />
                </div>
              </div>

              <div class="border-t border-border pt-3 flex justify-between items-center">
                <span class="font-semibold text-foreground">Total</span>
                <Price :amount="grandTotal" class="text-xl font-bold text-foreground" />
              </div>

              <div v-if="shipping > 0" class="text-xs text-muted-foreground bg-muted/50 rounded-md px-3 py-2">
                Add <Price :amount="1000 - cartStore.total" /> more for free shipping
              </div>

              <NuxtLink
                to="/checkout"
                class="flex items-center justify-center w-full py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all"
              >
                Proceed to Checkout
              </NuxtLink>

              <!-- Trust badges -->
              <div class="grid grid-cols-3 gap-2 pt-1">
                <div v-for="badge in trustBadges" :key="badge.label" class="flex flex-col items-center gap-1 text-center">
                  <HugeiconsIcon :icon="badge.icon" :size="16" class="text-muted-foreground" />
                  <span class="text-[10px] text-muted-foreground leading-tight">{{ badge.label }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  ShoppingCart01Icon,
  Delete01Icon,
  AppStoreIcon,
  ArrowLeft01Icon,
  ShieldCheck,
  DeliveryTruck01Icon,
  CustomerSupportIcon,
} from '@hugeicons/core-free-icons'

const cartStore = useCartStore()

const shipping = computed(() => cartStore.total > 1000 ? 0 : 99)
const tax = computed(() => cartStore.total * 0.08)
const grandTotal = computed(() => cartStore.total + shipping.value + tax.value)

const trustBadges = [
  { icon: ShieldCheck, label: 'Secure checkout' },
  { icon: DeliveryTruck01Icon, label: 'Fast delivery' },
  { icon: CustomerSupportIcon, label: '24/7 support' },
]
</script>

<style scoped>
.fade-up-enter-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-up-enter-from {
  opacity: 0;
  transform: translateY(16px);
}

.cart-item-enter-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}
.cart-item-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
  position: absolute;
  width: 100%;
}
.cart-item-enter-from {
  opacity: 0;
  transform: translateX(-16px);
}
.cart-item-leave-to {
  opacity: 0;
  transform: translateX(16px) scale(0.97);
}
.cart-item-move {
  transition: transform 0.22s ease;
}
</style>
