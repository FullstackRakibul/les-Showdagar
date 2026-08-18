<template>
  <aside class="h-full bg-card border-l border-border flex flex-col">
    <!-- Header -->
    <div class="flex items-center justify-between p-4 border-b border-border">
      <div class="flex items-center gap-2">
        <HugeiconsIcon :icon="ShoppingCart01Icon" :size="18" class="text-foreground" />
        <h2 class="font-semibold text-foreground text-sm">Cart ({{ cartStore.count }})</h2>
      </div>
      <div class="flex items-center gap-2">
        <button v-if="cartStore.items.length > 0" @click="cartStore.clearCart"
          class="text-xs text-muted-foreground hover:text-destructive transition-colors">
          Clear
        </button>
        <button v-if="isMobile" @click="layoutStore.closeRightSidebar()"
          class="p-1 rounded-lg hover:bg-muted transition-colors">
          <HugeiconsIcon :icon="Cancel01Icon" :size="18" class="text-muted-foreground" />
        </button>
      </div>
    </div>

    <!-- Empty -->
    <div v-if="cartStore.items.length === 0" class="flex-1 flex flex-col items-center justify-center gap-3 p-8 text-center">
      <HugeiconsIcon :icon="ShoppingCart01Icon" :size="40" class="text-muted-foreground/40" />
      <p class="text-sm text-muted-foreground">Your cart is empty</p>
      <NuxtLink to="/browse" @click="layoutStore.closeRightSidebar()"
        class="text-xs font-medium text-foreground underline underline-offset-2">
        Browse products
      </NuxtLink>
    </div>

    <!-- Items -->
    <div v-else class="flex-1 overflow-y-auto divide-y divide-border">
      <div v-for="item in cartStore.items" :key="`${item.productId}-${item.selectedColor}-${item.selectedSize}`"
        class="p-4 flex items-center gap-3">
        <img :src="item.productImage" :alt="item.productName" class="w-14 h-14 object-cover rounded-xl shrink-0" />
        <div class="min-w-0 flex-1">
          <p class="text-sm font-medium text-foreground line-clamp-1">{{ item.productName }}</p>
          <div class="flex gap-1 mt-0.5">
            <span v-if="item.selectedColor" class="text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground">{{ item.selectedColor }}</span>
            <span v-if="item.selectedSize" class="text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground">{{ item.selectedSize }}</span>
          </div>
          <div class="flex items-center justify-between mt-2">
            <!-- Qty stepper -->
            <div class="flex items-center gap-1">
              <button @click="cartStore.updateQuantity(item.productId, item.quantity - 1, item.selectedColor, item.selectedSize)"
                class="w-5 h-5 rounded-full bg-muted hover:bg-secondary flex items-center justify-center text-xs font-bold transition-colors">−</button>
              <span class="text-xs font-medium w-5 text-center">{{ item.quantity }}</span>
              <button @click="cartStore.updateQuantity(item.productId, item.quantity + 1, item.selectedColor, item.selectedSize)"
                class="w-5 h-5 rounded-full bg-muted hover:bg-secondary flex items-center justify-center text-xs font-bold transition-colors">+</button>
            </div>
            <Price :amount="item.price * item.quantity" class="text-sm font-semibold text-foreground" />
          </div>
        </div>
        <button @click="cartStore.removeItem(item.productId, item.selectedColor, item.selectedSize)"
          class="shrink-0 text-muted-foreground hover:text-destructive transition-colors">
          <HugeiconsIcon :icon="Delete01Icon" :size="16" />
        </button>
      </div>
    </div>

    <!-- Footer -->
    <div v-if="cartStore.items.length > 0" class="p-4 border-t border-border space-y-3">
      <div class="flex items-center justify-between text-sm">
        <span class="text-muted-foreground">Subtotal</span>
        <Price :amount="cartStore.total" class="font-semibold text-foreground" />
      </div>
      <div class="grid grid-cols-2 gap-2">
        <NuxtLink to="/cart" @click="layoutStore.closeRightSidebar()"
          class="flex items-center justify-center py-2 px-3 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors">
          View Cart
        </NuxtLink>
        <NuxtLink to="/checkout" @click="layoutStore.closeRightSidebar()"
          class="flex items-center justify-center py-2 px-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-colors">
          Checkout
        </NuxtLink>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useLayoutStore } from '@/stores/layout'
import { HugeiconsIcon } from '@hugeicons/vue'
import { ShoppingCart01Icon, Delete01Icon, Cancel01Icon } from '@hugeicons/core-free-icons'

const cartStore = useCartStore()
const layoutStore = useLayoutStore()
const isMobile = computed(() => layoutStore.isMobile)
</script>
