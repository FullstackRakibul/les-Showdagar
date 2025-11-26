<template>
  <div
    class="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 safe-area-inset-bottom md:hidden">
    <div class="grid grid-cols-5 gap-0 h-16">
      <!-- Home -->
      <NuxtLink to="/" class="flex flex-col items-center justify-center gap-1 text-xs transition-colors text-primary">
        <Home :size="24" />
        <span class="text-xs font-medium">Home</span>
      </NuxtLink>

      <!-- Search -->
      <button @click="showSearch = true"
        class="flex flex-col items-center justify-center gap-1 text-xs text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
        <Search :size="24" />
        <span class="text-xs font-medium">Search</span>
      </button>

      <!-- Cart -->
      <NuxtLink to="/cart"
        class="flex flex-col items-center justify-center gap-1 text-xs transition-colors relative text-gray-600 dark:text-gray-400 hover:text-primary">
        <div class="relative">
          <ShoppingCart :size="24" />
          <span
            class="absolute -top-2 -right-2 w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
            {{ cartCount }}
          </span>
        </div>
        <span class="text-xs font-medium">Cart</span>
      </NuxtLink>

      <!-- Favorites -->
      <NuxtLink to="/favorites"
        class="flex flex-col items-center justify-center gap-1 text-xs transition-colors text-gray-600 dark:text-gray-400 hover:text-primary">
        <Heart :size="24" />
        <span class="text-xs font-medium">Saved</span>
      </NuxtLink>

      <!-- Account/Menu -->
      <button @click="showMenu = true"
        class="flex flex-col items-center justify-center gap-1 text-xs text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
        <Menu :size="24" />
        <span class="text-xs font-medium">Menu</span>
      </button>
    </div>

    <!-- Search Modal -->
    <div v-if="showSearch" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col"
      @click.self="showSearch = false">
      <div class="mt-auto bg-white dark:bg-gray-900 w-full rounded-t-2xl p-4 space-y-4 animate-slide-up">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-gray-900 dark:text-white">Search Products</h3>
          <button @click="showSearch = false" class="text-gray-500 dark:text-gray-400">
            <X :size="24" />
          </button>
        </div>
        <input type="text" placeholder="Search for products..."
          class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
        <div class="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
          <button v-for="category in popularCategories" :key="category" @click="showSearch = false"
            class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white transition-colors">
            {{ category }}
          </button>
        </div>
      </div>
    </div>

    <!-- Menu Modal -->
    <div v-if="showMenu" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col" @click.self="showMenu = false">
      <div
        class="mt-auto bg-white dark:bg-gray-900 w-full rounded-t-2xl p-4 space-y-4 max-h-96 overflow-y-auto animate-slide-up">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-gray-900 dark:text-white">Menu</h3>
          <button @click="showMenu = false" class="text-gray-500 dark:text-gray-400">
            <X :size="24" />
          </button>
        </div>

        <!-- Account Section -->
        <div class="space-y-3 pb-4 border-b border-gray-200 dark:border-gray-700">
          <button
            class="w-full px-4 py-2 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors">
            Sign In
          </button>
          <button
            class="w-full px-4 py-2 border border-primary text-primary rounded-lg font-medium text-sm hover:bg-primary hover:text-white transition-colors">
            Create Account
          </button>
        </div>

        <!-- Menu Items -->
        <nav class="space-y-3">
          <NuxtLink to="/orders" @click="showMenu = false"
            class="flex items-center space-x-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <Package :size="20" />
            <span class="text-sm font-medium">My Orders</span>
          </NuxtLink>
          <NuxtLink to="/wishlist" @click="showMenu = false"
            class="flex items-center space-x-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <Heart :size="20" />
            <span class="text-sm font-medium">Wishlist</span>
          </NuxtLink>
          <NuxtLink to="/account" @click="showMenu = false"
            class="flex items-center space-x-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <User :size="20" />
            <span class="text-sm font-medium">Account Settings</span>
          </NuxtLink>
          <NuxtLink to="/notifications" @click="showMenu = false"
            class="flex items-center space-x-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <Bell :size="20" />
            <span class="text-sm font-medium">Notifications</span>
          </NuxtLink>
          <NuxtLink to="/help" @click="showMenu = false"
            class="flex items-center space-x-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <HelpCircle :size="20" />
            <span class="text-sm font-medium">Help & Support</span>
          </NuxtLink>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Home, Search, ShoppingCart, Heart, Menu, X, Package, User, Bell, HelpCircle } from 'lucide-vue-next'

const showSearch = ref(false)
const showMenu = ref(false)
const cartCount = ref(3)

const popularCategories = [
  'Laptops',
  'Headphones',
  'Smartphones',
  'Tablets',
  'Smart Watch',
  'Gaming Gear',
  'Accessories',
  'Monitors'
]
</script>

<style scoped>
.safe-area-inset-bottom {
  padding-bottom: max(0.5rem, env(safe-area-inset-bottom));
}

@keyframes slide-up {
  from {
    transform: translateY(100%);
  }

  to {
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slide-up 0.3s ease-out;
}
</style>