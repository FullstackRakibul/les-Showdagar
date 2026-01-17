<template>
  <div class="relative" ref="dropdownRef">
    <Button variant="ghost" size="icon" class="relative" @click="toggleDropdown">
      <HugeiconsIcon :icon="ShoppingCart01Icon" :size="20" />
      <span v-if="cartCount > 0"
        class="absolute -top-0.5 -right-0.5 w-4 h-4 bg-quantum-500 rounded-full text-[10px] font-medium text-white flex items-center justify-center">
        {{ cartCount > 9 ? '9+' : cartCount }}
      </span>
    </Button>

    <!-- Dropdown -->
    <Transition name="dropdown">
      <div v-if="isOpen"
        class="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden">
        <!-- Header -->
        <div class="px-4 py-3 border-b border-border">
          <h3 class="font-medium text-foreground">Cart ({{ cartCount }})</h3>
        </div>

        <!-- Items -->
        <div class="max-h-80 overflow-y-auto">
          <div v-if="cartItems.length === 0" class="py-8 text-center">
            <HugeiconsIcon :icon="ShoppingCart01Icon" :size="40" class="text-muted-foreground/50 mx-auto mb-2" />
            <p class="text-sm text-muted-foreground">Your cart is empty</p>
          </div>
          <div v-else class="divide-y divide-border">
            <div v-for="item in cartItems" :key="item.product.id" class="p-4 flex items-center gap-3">
              <img :src="item.product.image" :alt="item.product.name" class="w-14 h-14 object-cover rounded-lg" />
              <div class="min-w-0 flex-1">
                <p class="text-sm text-foreground truncate">{{ item.product.name }}</p>
                <p class="text-xs text-muted-foreground mt-0.5">
                  ৳{{ item.product.price }} × {{ item.quantity }}
                </p>
              </div>
              <button class="text-muted-foreground hover:text-red-500 transition-colors" @click="removeItem(item)">
                <HugeiconsIcon :icon="Delete01Icon" :size="16" />
              </button>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div v-if="cartItems.length > 0" class="p-4 border-t border-border space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-sm text-muted-foreground">Subtotal</span>
            <span class="font-medium text-foreground">৳{{ cartTotal }}</span>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" @click="goToCart">
              View Cart
            </Button>
            <Button size="sm" @click="goToCheckout">
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/products'
import { Button } from '@/components/ui/button'

import { HugeiconsIcon } from '@hugeicons/vue'
import {
  ShoppingCart01Icon,
  Delete01Icon,
} from '@hugeicons/core-free-icons'

const router = useRouter()
const productStore = useProductStore()

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const cartItems = computed(() => productStore.cart)
const cartCount = computed(() => productStore.cartItemsCount)
const cartTotal = computed(() => productStore.cartTotal)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const removeItem = (item: any) => {
  productStore.removeFromCart(item.product.id, item.selectedColor, item.selectedSize)
}

const goToCart = () => {
  isOpen.value = false
  router.push('/cart')
}

const goToCheckout = () => {
  isOpen.value = false
  router.push('/checkout')
}

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.15s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>