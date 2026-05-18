<template>
  <div class="relative" ref="dropdownRef">
    <button class="relative p-2 rounded-lg hover:bg-muted transition-colors" data-cart-target @click="isOpen = !isOpen">
      <HugeiconsIcon :icon="ShoppingCart01Icon" :size="20" class="text-foreground" />
      <span v-if="cartStore.count > 0"
        class="absolute -top-0.5 -right-0.5 w-4 h-4 bg-quantum-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center">
        {{ cartStore.count > 9 ? '9+' : cartStore.count }}
      </span>
    </button>

    <Transition name="dropdown">
      <div v-if="isOpen"
        class="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden">
        <div class="px-4 py-3 border-b border-border flex items-center justify-between">
          <h3 class="text-sm font-semibold text-foreground">Cart ({{ cartStore.count }})</h3>
          <button v-if="cartStore.items.length > 0" @click="cartStore.clearCart()"
            class="text-[10px] text-muted-foreground hover:text-destructive transition-colors">Clear all</button>
        </div>

        <div class="max-h-72 overflow-y-auto">
          <div v-if="cartStore.items.length === 0" class="py-10 text-center">
            <HugeiconsIcon :icon="ShoppingCart01Icon" :size="36" class="text-muted-foreground/40 mx-auto mb-2" />
            <p class="text-xs text-muted-foreground">Your cart is empty</p>
          </div>
          <div v-else class="divide-y divide-border">
            <div v-for="item in cartStore.items" :key="`${item.productId}-${item.selectedColor}-${item.selectedSize}`"
              class="p-3 flex items-center gap-3">
              <img :src="item.productImage" :alt="item.productName" class="w-12 h-12 object-cover rounded-lg shrink-0" />
              <div class="min-w-0 flex-1">
                <p class="text-xs text-foreground line-clamp-1 font-medium">{{ item.productName }}</p>
                <p class="text-xs text-muted-foreground mt-0.5">৳{{ item.price }} × {{ item.quantity }}</p>
              </div>
              <button @click="cartStore.removeItem(item.productId, item.selectedColor, item.selectedSize)"
                class="shrink-0 text-muted-foreground hover:text-destructive transition-colors">
                <HugeiconsIcon :icon="Delete01Icon" :size="14" />
              </button>
            </div>
          </div>
        </div>

        <div v-if="cartStore.items.length > 0" class="p-3 border-t border-border space-y-2.5">
          <div class="flex justify-between text-sm">
            <span class="text-muted-foreground">Subtotal</span>
            <span class="font-semibold text-foreground">৳{{ cartStore.total.toFixed(2) }}</span>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <button @click="go('/cart')"
              class="py-2 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-muted transition-colors">
              View Cart
            </button>
            <button @click="go('/checkout')"
              class="py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity">
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

function go(path: string) { isOpen.value = false; router.push(path) }

function outside(e: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) isOpen.value = false
}

onMounted(() => document.addEventListener('click', outside))
onUnmounted(() => document.removeEventListener('click', outside))
</script>

<style scoped>
.dropdown-enter-active, .dropdown-leave-active { transition: all 0.15s ease; }
.dropdown-enter-from, .dropdown-leave-to { opacity: 0; transform: translateY(-6px); }
</style>
