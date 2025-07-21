<template>
  <header class="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
    <div class="px-4 sm:px-6">
      <div class="flex items-center justify-between h-16">
        <!-- Left Section: Sidebar Toggle & Logo -->
        <div class="flex items-center space-x-3">
          <!-- Left Sidebar Toggle -->
          <button @click="toggleLeftSidebar" class="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            :class="{ 'text-blue-600': leftSidebarOpen, 'text-gray-500': !leftSidebarOpen }">
            <i class="fas fa-bars text-lg"></i>
          </button>

          <!-- Logo -->
          <NuxtLink to="/" class="text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
            Les Showdagar
          </NuxtLink>
        </div>

        <!-- Middle Section: Search Bar -->
        <div class="flex-1 mx-6 max-w-lg hidden sm:block">
          <div class="relative">
            <input v-model="searchQuery" placeholder="Search products..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>

        <!-- Right Section: Actions & Right Sidebar Toggle -->
        <div class="flex items-center space-x-2">
          <!-- Mobile Search Toggle -->
          <button class="sm:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-500"
            @click="showMobileSearch = !showMobileSearch">
            <i class="fas fa-search text-lg"></i>
          </button>

          <!-- Cart Button -->
          <button @click="showCartModal = true"
            class="relative p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors">
            <i class="fas fa-shopping-cart text-lg"></i>
            <span v-if="cartItemsCount > 0"
              class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
              {{ cartItemsCount }}
            </span>
          </button>

          <!-- User Menu -->
          <button class="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors">
            <i class="fas fa-user text-lg"></i>
          </button>

          <!-- Right Sidebar Toggle (Hidden on mobile) -->
          <button @click="toggleRightSidebar" class="hidden xl:block p-2 rounded-lg hover:bg-gray-100 transition-colors"
            :class="{ 'text-blue-600': rightSidebarOpen, 'text-gray-500': !rightSidebarOpen }">
            <i class="fas fa-th-list text-lg"></i>
          </button>
        </div>
      </div>

      <!-- Mobile Search Bar -->
      <transition name="fade">
        <div v-if="showMobileSearch" class="sm:hidden pb-4">
          <div class="relative">
            <input v-model="searchQuery" placeholder="Search products..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>
      </transition>
    </div>

    <!-- Cart Modal -->
    <transition name="modal">
      <div v-if="showCartModal" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen px-4">
          <div class="fixed inset-0 bg-black bg-opacity-50" @click="showCartModal = false"></div>

          <div class="relative bg-white rounded-xl shadow-xl max-w-md w-full max-h-[80vh] overflow-hidden">
            <!-- Cart Header -->
            <div class="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900">Shopping Cart</h3>
              <button @click="showCartModal = false"
                class="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600">
                <i class="fas fa-times text-lg"></i>
              </button>
            </div>

            <!-- Cart Content -->
            <div class="overflow-y-auto max-h-96">
              <div v-if="cart.length === 0" class="text-center py-12">
                <i class="fas fa-shopping-cart text-4xl text-gray-300 mb-4"></i>
                <p class="text-gray-500 mb-4">Your cart is empty</p>
                <button @click="showCartModal = false"
                  class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Continue Shopping
                </button>
              </div>

              <div v-else class="p-6 space-y-4">
                <div v-for="item in cart" :key="item.product.id"
                  class="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50">
                  <img :src="item.product.image" :alt="item.product.name" class="w-16 h-16 object-cover rounded-lg" />
                  <div class="flex-1">
                    <h4 class="font-medium text-gray-900">{{ item.product.name }}</h4>
                    <p class="text-sm text-gray-500">${{ item.product.price }}</p>
                    <div class="flex items-center mt-2">
                      <span class="text-sm text-gray-600">Qty: {{ item.quantity }}</span>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="font-semibold text-gray-900">${{ (item.product.price * item.quantity).toFixed(2) }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Cart Footer -->
            <div v-if="cart.length > 0" class="border-t border-gray-200 p-6">
              <div class="flex justify-between items-center mb-4">
                <span class="text-lg font-semibold text-gray-900">Total:</span>
                <span class="text-xl font-bold text-gray-900">${{ cartTotal.toFixed(2) }}</span>
              </div>
              <NuxtLink to="/checkout" @click="showCartModal = false"
                class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center block">
                Proceed to Checkout
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useProducts } from '@/composables/useProducts'
import { useLayout } from '@/composables/useLayout'

const { searchQuery, cart, cartItemsCount } = useProducts()
const { leftSidebarOpen, rightSidebarOpen, toggleLeftSidebar, toggleRightSidebar } = useLayout()

const showCartModal = ref(false)
const showMobileSearch = ref(false)

const cartTotal = computed(() => {
  return cart.value.reduce((total, item) => total + (item.product.price * item.quantity), 0)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>