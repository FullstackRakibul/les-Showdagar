<template>
  <header
    class="sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-200">
    <div class="px-4 sm:px-6">
      <div class="flex items-center justify-between h-16">
        <!-- Left Section: Sidebar Toggle & Logo -->
        <div class="flex items-center space-x-3">
          <!-- Left Sidebar Toggle -->
          <button @click="toggleLeftSidebar"
            class="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            :class="{ 'text-primary': leftSidebarOpen, 'text-gray-500 dark:text-gray-400': !leftSidebarOpen }">
            <Menu class="w-5 h-5" />
          </button>

          <!-- Logo -->
          <NuxtLink to="/"
            class="flex items-center space-x-2 text-xl font-bold text-primary hover:text-primary-dark transition-colors">

            <span class="hidden sm:block">Les Showdagar</span>
          </NuxtLink>
        </div>

        <!-- Middle Section: Search Bar -->
        <div class="flex-1 mx-6 max-w-2xl hidden md:block">
          <div class="relative">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input v-model="searchQuery" placeholder="Search products, brands, categories..."
              class="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" />
          </div>
        </div>

        <!-- Right Section: Actions & Profile -->
        <div class="flex items-center space-x-2">
          <!-- Mobile Search Toggle -->
          <button
            class="md:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors duration-200"
            @click="showMobileSearch = !showMobileSearch">
            <Search class="w-5 h-5" />
          </button>

          <!-- Notifications -->
          <button
            class="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200">
            <Bell class="w-5 h-5" />
            <span class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
              <span class="w-1.5 h-1.5 bg-white rounded-full"></span>
            </span>
          </button>

          <!-- Cart Button -->
          <button @click="showCartModal = true"
            class="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200">
            <ShoppingCart class="w-5 h-5" />
            <span v-if="cartItemsCount > 0"
              class="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
              {{ cartItemsCount > 9 ? '9+' : cartItemsCount }}
            </span>
          </button>

          <!-- Profile Dropdown -->
          <div class="relative" ref="profileDropdown">
            <button @click="showProfileMenu = !showProfileMenu"
              class="flex items-center space-x-2 p-1 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
              <div
                class="w-8 h-8 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-primary font-semibold text-sm">
                SW
              </div>
              <ChevronDown class="w-4 h-4 text-gray-500 dark:text-gray-400 hidden sm:block"
                :class="{ 'rotate-180': showProfileMenu }" />
            </button>

            <!-- Profile Dropdown Menu -->
            <transition name="dropdown">
              <div v-if="showProfileMenu"
                class="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
                <!-- User Info -->
                <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                  <div class="flex items-center space-x-3">
                    <div
                      class="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-primary font-bold text-lg">
                      RH
                    </div>
                    <div>
                      <h3 class="font-semibold text-gray-900 dark:text-white">Rakibul H. Rabbi</h3>
                      <p class="text-sm text-gray-500 dark:text-gray-400">rakibul.cse.47@gmail.com</p>
                    </div>
                  </div>
                </div>

                <!-- Theme Toggle -->
                <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Theme</span>
                    <div class="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                      <button @click="setTheme('light')" :class="[
                        'p-1.5 rounded-md transition-colors duration-200',
                        currentTheme === 'light' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'hover:bg-gray-200 dark:hover:bg-gray-600'
                      ]">
                        <Sun class="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </button>
                      <button @click="setTheme('dark')" :class="[
                        'p-1.5 rounded-md transition-colors duration-200',
                        currentTheme === 'dark' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'hover:bg-gray-200 dark:hover:bg-gray-600'
                      ]">
                        <Moon class="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </button>
                      <button @click="setTheme('system')" :class="[
                        'p-1.5 rounded-md transition-colors duration-200',
                        currentTheme === 'system' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'hover:bg-gray-200 dark:hover:bg-gray-600'
                      ]">
                        <Monitor class="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Menu Items -->
                <div class="py-2">
                  <!-- Your Companies -->
                  <button
                    class="w-full px-4 py-2 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <div class="flex items-center space-x-3">
                      <Building2 class="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <span class="text-sm text-gray-700 dark:text-gray-300">Your Companies</span>
                    </div>
                    <span class="text-sm font-medium text-primary">12</span>
                  </button>

                  <!-- Your Numbers -->
                  <button
                    class="w-full px-4 py-2 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <div class="flex items-center space-x-3">
                      <Phone class="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <span class="text-sm text-gray-700 dark:text-gray-300">Your Numbers</span>
                    </div>
                    <span class="text-sm font-medium text-primary">2</span>
                  </button>

                  <!-- Status -->
                  <div class="px-4 py-2">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center space-x-3">
                        <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span class="text-sm text-gray-700 dark:text-gray-300">Available</span>
                      </div>
                      <ChevronDown class="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                <!-- Account Storage -->
                <div class="px-4 py-3 mx-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Account Storage</span>
                    <button class="text-sm text-primary hover:text-primary-dark font-medium">Manage</button>
                  </div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Your account has 2GB storage</p>
                </div>

                <!-- Bottom Menu Items -->
                <div class="py-2 border-t border-gray-100 dark:border-gray-700 mt-2">
                  <!-- Theme Settings -->
                  <button @click="openThemeSettings"
                    class="w-full px-4 py-2 flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <Palette class="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span class="text-sm text-gray-700 dark:text-gray-300">Theme Settings</span>
                  </button>

                  <!-- Settings -->
                  <button
                    class="w-full px-4 py-2 flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <Settings class="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span class="text-sm text-gray-700 dark:text-gray-300">Settings</span>
                  </button>

                  <!-- Help Center -->
                  <button
                    class="w-full px-4 py-2 flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <HelpCircle class="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span class="text-sm text-gray-700 dark:text-gray-300">Help Center</span>
                  </button>

                  <!-- Logout -->
                  <button
                    class="w-full px-4 py-2 flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 text-red-600 dark:text-red-400">
                    <LogOut class="w-4 h-4" />
                    <span class="text-sm">Logout</span>
                  </button>
                </div>
              </div>
            </transition>
          </div>

          <!-- Right Sidebar Toggle (Hidden on mobile) -->
          <button @click="toggleRightSidebar"
            class="hidden xl:block p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            :class="{ 'text-primary': rightSidebarOpen, 'text-gray-500 dark:text-gray-400': !rightSidebarOpen }">
            <PanelRight class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Mobile Search Bar -->
      <transition name="slide-down">
        <div v-if="showMobileSearch" class="md:hidden pb-4 border-t border-gray-200 dark:border-gray-700 mt-4 pt-4">
          <div class="relative">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input v-model="searchQuery" placeholder="Search products..."
              class="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" />
          </div>
        </div>
      </transition>
    </div>

    <!-- Enhanced Cart Modal -->
    <teleport to="body">
      <transition name="modal">
        <div v-if="showCartModal" class="fixed inset-0 z-[9999] overflow-y-auto">
          <div class="flex items-center justify-center min-h-screen px-4">
            <div class="fixed inset-0 bg-black bg-opacity-50" @click="showCartModal = false"></div>

            <div
              class="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[85vh] overflow-hidden">
              <!-- Cart Header -->
              <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Shopping Cart</h3>
                <button @click="showCartModal = false"
                  class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                  <X class="w-5 h-5" />
                </button>
              </div>

              <!-- Cart Content -->
              <div class="overflow-y-auto" style="max-height: calc(85vh - 200px);">
                <div v-if="cart.length === 0" class="text-center py-12">
                  <ShoppingCart class="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <p class="text-gray-500 dark:text-gray-400 mb-4">Your cart is empty</p>
                  <button @click="showCartModal = false"
                    class="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium">
                    Continue Shopping
                  </button>
                </div>

                <div v-else class="p-6 space-y-4">
                  <div v-for="item in cart" :key="`${item.product.id}-${item.selectedColor}-${item.selectedSize}`"
                    class="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <img :src="item.product.image" :alt="item.product.name" class="w-16 h-16 object-cover rounded-lg" />
                    <div class="flex-1 min-w-0">
                      <h4 class="font-medium text-gray-900 dark:text-white truncate">{{ item.product.name }}</h4>
                      <p class="text-sm text-gray-500 dark:text-gray-400">${{ item.product.price }}</p>
                      <div class="flex items-center space-x-2 mt-1">
                        <span v-if="item.selectedColor"
                          class="text-xs bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">{{ item.selectedColor }}</span>
                        <span v-if="item.selectedSize" class="text-xs bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">{{
                          item.selectedSize }}</span>
                      </div>
                      <div class="flex items-center space-x-2 mt-2">
                        <button
                          @click="updateCartQuantity(item.product.id, item.quantity - 1, item.selectedColor, item.selectedSize)"
                          class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 flex items-center justify-center transition-colors">
                          <Minus class="w-3 h-3" />
                        </button>
                        <span class="font-medium text-gray-900 dark:text-white min-w-[2rem] text-center">{{
                          item.quantity }}</span>
                        <button
                          @click="updateCartQuantity(item.product.id, item.quantity + 1, item.selectedColor, item.selectedSize)"
                          class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 flex items-center justify-center transition-colors">
                          <Plus class="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <div class="text-right">
                      <p class="font-semibold text-gray-900 dark:text-white">${{ (item.product.price *
                        item.quantity).toFixed(2) }}</p>
                      <button @click="removeFromCart(item.product.id, item.selectedColor, item.selectedSize)"
                        class="text-red-500 hover:text-red-700 text-sm mt-1 transition-colors">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Cart Footer -->
              <div v-if="cart.length > 0" class="border-t border-gray-200 dark:border-gray-700 p-6">
                <div class="flex justify-between items-center mb-4">
                  <span class="text-lg font-semibold text-gray-900 dark:text-white">Total:</span>
                  <span class="text-xl font-bold text-gray-900 dark:text-white">${{ cartTotal.toFixed(2) }}</span>
                </div>
                <NuxtLink to="/checkout" @click="showCartModal = false"
                  class="w-full bg-primary text-white py-3 px-4 rounded-xl hover:bg-primary-dark transition-colors font-semibold text-center block">
                  Proceed to Checkout
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </teleport>

    <!-- Theme Settings Modal -->
    <teleport to="body">
      <transition name="modal">
        <div v-if="showThemeSettings" class="fixed inset-0 z-[9999] overflow-y-auto">
          <div class="flex items-center justify-center min-h-screen px-4">
            <div class="fixed inset-0 bg-black bg-opacity-50" @click="showThemeSettings = false"></div>

            <div class="relative">
              <ThemeSettings @close="showThemeSettings = false" />
            </div>
          </div>
        </div>
      </transition>
    </teleport>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import {
  Menu, Search, Bell, ShoppingCart, ChevronDown, Sun, Moon, Monitor,
  Building2, Phone, Settings, HelpCircle, LogOut, PanelRight, X,
  Minus, Plus, Palette
} from 'lucide-vue-next'
import { useProducts } from '@/composables/useProducts'
import { useLayout } from '@/composables/useLayout'
import ThemeSettings from '@/components/ThemeSettings.vue'

const { searchQuery, cart, cartItemsCount, updateCartQuantity, removeFromCart } = useProducts()
const { leftSidebarOpen, rightSidebarOpen, toggleLeftSidebar, toggleRightSidebar } = useLayout()

const showCartModal = ref(false)
const showMobileSearch = ref(false)
const showProfileMenu = ref(false)
const showThemeSettings = ref(false)
const profileDropdown = ref(null)
const currentTheme = ref('system')

const cartTotal = computed(() => {
  return cart.value.reduce((total, item) => total + (item.product.price * item.quantity), 0)
})

const setTheme = (theme) => {
  currentTheme.value = theme

  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else if (theme === 'light') {
    document.documentElement.classList.remove('dark')
  } else {
    // System theme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (prefersDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Save to localStorage
  localStorage.setItem('theme', theme)
}

const openThemeSettings = () => {
  showThemeSettings.value = true
  showProfileMenu.value = false
}

// Close profile menu when clicking outside
const handleClickOutside = (event) => {
  if (profileDropdown.value && !profileDropdown.value.contains(event.target)) {
    showProfileMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)

  // Load saved theme
  const savedTheme = localStorage.getItem('theme') || 'system'
  setTheme(savedTheme)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Custom scrollbar for cart */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 2px;
}

.dark .overflow-y-auto::-webkit-scrollbar-thumb {
  background: #4b5563;
}
</style>