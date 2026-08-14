<template>
  <div class="relative" ref="dropdownRef">

    <!-- Cart trigger button -->
    <button
      class="relative p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
      aria-label="Open cart"
      @click="isOpen = !isOpen"
    >
      <HugeiconsIcon :icon="ShoppingCart01Icon" :size="18" />
      <Transition name="badge-pop">
        <span
          v-if="cartStore.count > 0"
          class="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center leading-none"
        >
          {{ cartStore.count > 99 ? '99+' : cartStore.count }}
        </span>
      </Transition>
    </button>

    <!-- Dropdown panel -->
    <Transition name="dropdown">
      <div
        v-if="isOpen"
        class="absolute right-0 top-full mt-2 w-80 rounded-lg border border-border bg-card shadow-xl z-50 overflow-hidden"
      >
        <!-- Header -->
        <div class="flex items-center justify-between px-4 py-3 border-b border-border">
          <div class="flex items-center gap-2">
            <HugeiconsIcon :icon="ShoppingCart01Icon" :size="15" class="text-muted-foreground" />
            <h3 class="text-sm font-semibold text-foreground">
              Cart
              <span class="text-muted-foreground font-normal ml-1">({{ cartStore.count }})</span>
            </h3>
          </div>
          <button
            v-if="cartStore.items.length > 0"
            class="text-[10px] text-muted-foreground hover:text-destructive transition-colors"
            @click="cartStore.clearCart()"
          >
            Clear all
          </button>
        </div>

        <!-- Items list -->
        <div class="max-h-64 overflow-y-auto overscroll-contain" data-lenis-prevent>
          <!-- Empty state -->
          <div v-if="cartStore.items.length === 0" class="py-12 flex flex-col items-center gap-3">
            <HugeiconsIcon :icon="ShoppingCart01Icon" :size="36" class="text-muted-foreground/30" />
            <p class="text-xs text-muted-foreground">Your cart is empty</p>
            <NuxtLink
              to="/products"
              class="text-xs font-medium text-foreground underline underline-offset-2 hover:text-muted-foreground transition-colors"
              @click="isOpen = false"
            >
              Browse products
            </NuxtLink>
          </div>

          <!-- Cart items -->
          <TransitionGroup v-else name="cart-item" tag="div" class="divide-y divide-border">
            <div
              v-for="item in cartStore.items"
              :key="`${item.productId}-${item.selectedColor}-${item.selectedSize}`"
              class="flex items-center gap-3 p-3"
            >
              <img
                :src="item.productImage"
                :alt="item.productName"
                class="w-12 h-12 object-cover rounded-md shrink-0 bg-muted"
              />
              <div class="flex-1 min-w-0">
                <p class="text-xs font-medium text-foreground line-clamp-1">{{ item.productName }}</p>
                <p class="text-xs text-muted-foreground mt-0.5">
                  ৳{{ item.price }} × {{ item.quantity }}
                </p>
                <div class="flex gap-1 mt-1">
                  <span v-if="item.selectedColor" class="text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground">{{ item.selectedColor }}</span>
                  <span v-if="item.selectedSize" class="text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground">{{ item.selectedSize }}</span>
                </div>
              </div>
              <div class="shrink-0 flex flex-col items-end gap-2">
                <span class="text-xs font-semibold text-foreground">
                  ৳{{ (item.price * item.quantity).toFixed(2) }}
                </span>
                <button
                  class="text-muted-foreground hover:text-destructive transition-colors"
                  aria-label="Remove item"
                  @click="cartStore.removeItem(item.productId, item.selectedColor, item.selectedSize)"
                >
                  <HugeiconsIcon :icon="Delete01Icon" :size="13" />
                </button>
              </div>
            </div>
          </TransitionGroup>
        </div>

        <!-- Footer -->
        <div v-if="cartStore.items.length > 0" class="px-4 py-3 border-t border-border space-y-3 bg-muted/30">
          <div class="flex items-center justify-between text-sm">
            <span class="text-muted-foreground">Subtotal</span>
            <span class="font-semibold text-foreground">৳{{ cartStore.total.toFixed(2) }}</span>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <button
              class="py-2 rounded-md border border-border text-xs font-medium text-foreground hover:bg-muted transition-colors active:scale-[0.98]"
              @click="goToCart"
            >
              View Cart
            </button>
            <button
              class="py-2 rounded-md bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity active:scale-[0.98]"
              @click="goToCheckout"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { HugeiconsIcon } from '@hugeicons/vue'
import { ShoppingCart01Icon, Delete01Icon } from '@hugeicons/core-free-icons'

const router = useRouter()
const cartStore = useCartStore()
const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const goToCart = () => {
  isOpen.value = false
  router.push('/cart')
}

const goToCheckout = () => {
  isOpen.value = false
  router.push('/checkout')
}

const onClickOutside = (e: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
}

.badge-pop-enter-active {
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.15s ease;
}
.badge-pop-leave-active {
  transition: transform 0.15s ease, opacity 0.15s ease;
}
.badge-pop-enter-from,
.badge-pop-leave-to {
  transform: scale(0);
  opacity: 0;
}

.cart-item-enter-active {
  transition: all 0.2s ease;
}
.cart-item-leave-active {
  transition: all 0.18s ease;
  position: absolute;
  width: 100%;
}
.cart-item-enter-from {
  opacity: 0;
  transform: translateX(-12px);
}
.cart-item-leave-to {
  opacity: 0;
  transform: translateX(12px);
}
.cart-item-move {
  transition: transform 0.2s ease;
}
</style>
