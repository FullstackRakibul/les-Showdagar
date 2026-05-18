<template>
  <div class="max-w-4xl mx-auto px-4 py-8 space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-foreground">Shopping Cart</h1>
        <p class="text-sm text-muted-foreground mt-0.5">{{ cartStore.count }} item{{ cartStore.count !== 1 ? 's' : '' }}
        </p>
      </div>
      <button v-if="cartStore.items.length > 0" @click="cartStore.clearCart()"
        class="text-xs text-destructive hover:opacity-80 transition-opacity font-medium">
        Clear cart
      </button>
    </div>

    <div v-if="cartStore.items.length === 0" class="py-20 text-center space-y-4">
      <HugeiconsIcon :icon="ShoppingCart01Icon" :size="56" class="text-muted-foreground/30 mx-auto" />
      <h3 class="text-lg font-semibold text-muted-foreground">Your cart is empty</h3>
      <NuxtLink to="/browse"
        class="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
        Browse Products
      </NuxtLink>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-3">
        <div v-for="item in cartStore.items" :key="`${item.productId}-${item.selectedColor}-${item.selectedSize}`"
          class="bg-card border border-border rounded-2xl p-4 flex items-center gap-4">
          <img :src="item.productImage" :alt="item.productName" class="w-20 h-20 object-cover rounded-xl shrink-0" />
          <div class="flex-1 min-w-0">
            <NuxtLink :to="`/product/${getSlug(item.productId)}`"
              class="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors line-clamp-2">
              {{ item.productName }}
            </NuxtLink>
            <div class="flex gap-1.5 mt-1">
              <span v-if="item.selectedColor"
                class="text-[10px] bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{{ item.selectedColor
                }}</span>
              <span v-if="item.selectedSize"
                class="text-[10px] bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{{ item.selectedSize
                }}</span>
            </div>
          </div>
          <div class="shrink-0 flex flex-col items-end gap-3">
            <span class="text-base font-bold text-foreground">৳{{ (item.price * item.quantity).toFixed(2) }}</span>
            <div class="flex items-center gap-2">
              <button
                @click="cartStore.updateQuantity(item.productId, item.quantity - 1, item.selectedColor, item.selectedSize)"
                class="w-7 h-7 rounded-full bg-muted hover:bg-secondary flex items-center justify-center text-sm font-bold transition-colors">−</button>
              <span class="text-sm font-medium w-6 text-center">{{ item.quantity }}</span>
              <button
                @click="cartStore.updateQuantity(item.productId, item.quantity + 1, item.selectedColor, item.selectedSize)"
                class="w-7 h-7 rounded-full bg-muted hover:bg-secondary flex items-center justify-center text-sm font-bold transition-colors">+</button>
              <button @click="cartStore.removeItem(item.productId, item.selectedColor, item.selectedSize)"
                class="ml-1 text-muted-foreground hover:text-destructive transition-colors">
                <HugeiconsIcon :icon="Delete01Icon" :size="16" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:col-span-1">
        <div class="bg-card border border-border rounded-2xl p-5 sticky top-20 space-y-4">
          <h2 class="font-semibold text-foreground">Order Summary</h2>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between"><span class="text-muted-foreground">Subtotal</span><span
                class="font-medium">৳{{ cartStore.total.toFixed(2) }}</span></div>
            <div class="flex justify-between"><span class="text-muted-foreground">Shipping</span><span
                class="font-medium">৳{{ shipping.toFixed(2) }}</span></div>
            <div class="flex justify-between"><span class="text-muted-foreground">Tax (8%)</span><span
                class="font-medium">৳{{ tax.toFixed(2) }}</span></div>
          </div>
          <div class="border-t border-border pt-3 flex justify-between">
            <span class="font-semibold text-foreground">Total</span>
            <span class="text-lg font-bold text-foreground">৳{{ grandTotal.toFixed(2) }}</span>
          </div>
          <NuxtLink to="/checkout"
            class="flex items-center justify-center w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
            Proceed to Checkout
          </NuxtLink>
          <NuxtLink to="/browse"
            class="flex items-center justify-center w-full py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors">
            Continue Shopping
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useProductStore } from '@/stores/products'
import { HugeiconsIcon } from '@hugeicons/vue'
import { ShoppingCart01Icon, Delete01Icon } from '@hugeicons/core-free-icons'

const cartStore = useCartStore()
const productStore = useProductStore()

onMounted(async () => {
  await productStore.fetchProducts()
})

const shipping = computed(() => cartStore.total > 1000 ? 0 : 99)
const tax = computed(() => cartStore.total * 0.08)
const grandTotal = computed(() => cartStore.total + shipping.value + tax.value)

function getSlug(productId: number): string {
  return productStore.products.find(p => p.id === productId)?.slug ?? String(productId)
}
</script>