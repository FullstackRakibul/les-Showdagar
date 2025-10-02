<template>
  <div class="relative" ref="cartDropdown">
    <!-- Cart Button -->
    <button @click="toggleCart"
      class="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
      title="Shopping Cart">
      <ShoppingCart class="w-5 h-5 text-gray-700 dark:text-gray-300" />
      <span v-if="productStore.cartItemsCount > 0"
        class="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
        {{ productStore.cartItemsCount > 9 ? "9+" : productStore.cartItemsCount }}
      </span>
    </button>

    <!-- Cart Modal -->
    <teleport to="body">
      <transition name="modal">
        <div v-if="isOpen" class="fixed inset-0 z-[9999] overflow-y-auto">
          <div class="flex items-center justify-center min-h-screen px-4">
            <!-- Backdrop -->
            <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="closeCart"></div>

            <!-- Modal Content -->
            <div
              class="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[85vh] overflow-hidden">
              <!-- Header -->
              <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                  Shopping Cart
                </h3>
                <button @click="closeCart"
                  class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                  <X class="w-5 h-5" />
                </button>
              </div>

              <!-- Cart Items -->
              <div class="overflow-y-auto" style="max-height: calc(85vh - 200px)">
                <!-- Empty State -->
                <div v-if="productStore.cart.length === 0" class="text-center py-12">
                  <ShoppingCart class="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <p class="text-gray-500 dark:text-gray-400 mb-4">Your cart is empty</p>
                  <button @click="closeCart"
                    class="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium">
                    Continue Shopping
                  </button>
                </div>

                <!-- Cart Items List -->
                <div v-else class="p-6 space-y-4">
                  <div v-for="item in productStore.cart"
                    :key="`${item.product.id}-${item.selectedColor}-${item.selectedSize}`"
                    class="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <!-- Product Image -->
                    <img :src="item.product.image" :alt="item.product.name" class="w-16 h-16 object-cover rounded-lg" />

                    <!-- Product Details -->
                    <div class="flex-1 min-w-0">
                      <h4 class="font-medium text-gray-900 dark:text-white truncate">
                        {{ item.product.name }}
                      </h4>
                      <p class="text-sm text-gray-500 dark:text-gray-400">
                        ${{ item.product.price }}
                      </p>

                      <!-- Variants -->
                      <div class="flex items-center space-x-2 mt-1">
                        <span v-if="item.selectedColor" class="text-xs bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">
                          {{ item.selectedColor }}
                        </span>
                        <span v-if="item.selectedSize" class="text-xs bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">
                          {{ item.selectedSize }}
                        </span>
                      </div>

                      <!-- Quantity Controls -->
                      <div class="flex items-center space-x-2 mt-2">
                        <button @click="decreaseQuantity(item)"
                          class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 flex items-center justify-center transition-colors">
                          <Minus class="w-3 h-3" />
                        </button>
                        <span class="font-medium text-gray-900 dark:text-white min-w-[2rem] text-center">
                          {{ item.quantity }}
                        </span>
                        <button @click="increaseQuantity(item)"
                          class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 flex items-center justify-center transition-colors">
                          <Plus class="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <!-- Price and Remove -->
                    <div class="text-right">
                      <p class="font-semibold text-gray-900 dark:text-white">
                        ${{ (item.product.price * item.quantity).toFixed(2) }}
                      </p>
                      <button @click="removeItem(item)"
                        class="text-red-500 hover:text-red-700 text-sm mt-1 transition-colors">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Footer with Total and Checkout -->
              <div v-if="productStore.cart.length > 0" class="border-t border-gray-200 dark:border-gray-700 p-6">
                <div class="flex justify-between items-center mb-4">
                  <span class="text-lg font-semibold text-gray-900 dark:text-white">Total:</span>
                  <span class="text-xl font-bold text-gray-900 dark:text-white">
                    ${{ productStore.cartTotal.toFixed(2) }}
                  </span>
                </div>
                <button @click="proceedToCheckout"
                  class="w-full bg-primary text-white py-3 px-4 rounded-xl hover:bg-primary-dark transition-colors font-semibold text-center">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ShoppingCart, X, Minus, Plus } from 'lucide-vue-next'
import { useProductStore } from '@/stores/products'
import { navigateTo } from '#app'

const productStore = useProductStore()
const isOpen = ref(false)
const cartDropdown = ref(null)

const toggleCart = () => {
  isOpen.value = !isOpen.value
}

const closeCart = () => {
  isOpen.value = false
}

const decreaseQuantity = (item) => {
  productStore.updateCartQuantity(
    item.product.id,
    item.quantity - 1,
    item.selectedColor,
    item.selectedSize
  )
}

const increaseQuantity = (item) => {
  productStore.updateCartQuantity(
    item.product.id,
    item.quantity + 1,
    item.selectedColor,
    item.selectedSize
  )
}

const removeItem = (item) => {
  productStore.removeFromCart(
    item.product.id,
    item.selectedColor,
    item.selectedSize
  )
}

const proceedToCheckout = () => {
  closeCart()
  navigateTo('/checkout')
}

const handleClickOutside = (event) => {
  if (cartDropdown.value && !cartDropdown.value.contains(event.target)) {
    closeCart()
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
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Custom scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

.dark .overflow-y-auto::-webkit-scrollbar-thumb {
  background: #4b5563;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

.dark .overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style>