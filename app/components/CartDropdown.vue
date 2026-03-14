<template>
  <div class="relative" ref="dropdownRef">
    <Button variant="ghost" size="icon" class="relative" @click="toggleDropdown">
      <HugeiconsIcon :icon="ShoppingCart01Icon" :size="20" />
      <span v-if="cartQuantity > 0"
        class="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent rounded-full text-[10px] font-medium text-white flex items-center justify-center">
        {{ cartQuantity > 9 ? '9+' : cartQuantity }}
      </span>
    </Button>

    <!-- Dropdown -->
    <Transition name="dropdown">
      <div v-if="isOpen"
        class="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden">
        <!-- Header -->
        <div class="px-4 py-3 border-b border-border bg-muted/50">
          <h3 class="font-medium text-foreground">Your Order</h3>
        </div>

        <!-- Item -->
        <div class="p-4">
          <div v-if="cartQuantity === 0" class="py-8 text-center">
            <HugeiconsIcon :icon="ShoppingCart01Icon" :size="40" class="text-muted-foreground/30 mx-auto mb-3" />
            <p class="text-sm text-muted-foreground">Cart is empty</p>
            <p class="text-xs text-muted-foreground/70 mt-1">Add Calcifer to get started</p>
          </div>
          <div v-else class="space-y-4">
            <div class="flex gap-3">
              <img :src="product.heroImage" :alt="product.name" class="w-16 h-16 object-cover rounded-lg" />
              <div class="flex-1">
                <p class="font-medium text-foreground">{{ product.name }}</p>
                <p class="text-sm text-muted-foreground mt-0.5">{{ product.tagline }}</p>
                <p class="text-sm font-semibold text-foreground mt-2">${{ product.price }}</p>
              </div>
            </div>

            <!-- Quantity Control -->
            <div class="flex items-center gap-2 bg-muted rounded-lg p-2">
              <button @click="decreaseQuantity" class="p-1 hover:bg-muted-foreground/10 rounded transition-colors">
                <HugeiconsIcon :icon="Minus01Icon" :size="16" />
              </button>
              <span class="flex-1 text-center text-sm font-medium">{{ cartQuantity }}</span>
              <button @click="increaseQuantity" class="p-1 hover:bg-muted-foreground/10 rounded transition-colors">
                <HugeiconsIcon :icon="Plus01Icon" :size="16" />
              </button>
            </div>

            <!-- Total -->
            <div class="border-t border-border pt-3">
              <div class="flex items-center justify-between mb-3">
                <span class="text-sm text-muted-foreground">Subtotal</span>
                <span class="font-semibold text-foreground">${{ cartTotal.toFixed(2) }}</span>
              </div>
              <Button class="w-full" @click="goToCheckout">
                Proceed to Checkout
              </Button>
            </div>
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
import { ShoppingCart01Icon, Minus01Icon, Plus01Icon } from '@hugeicons/core-free-icons'

const router = useRouter()
const productStore = useProductStore()

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const product = computed(() => productStore.product)
const cartQuantity = computed(() => productStore.cartQuantity)
const cartTotal = computed(() => productStore.cartTotal)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const increaseQuantity = () => {
  productStore.addToCart(1)
}

const decreaseQuantity = () => {
  if (cartQuantity.value > 0) {
    productStore.removeFromCart(1)
  }
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
