<template>
  <aside
    class="h-full bg-white dark:bg-gray-900 flex flex-col shadow-xl border-r border-gray-200 dark:border-gray-700 transition-colors duration-200">
    <!-- Sidebar Header -->
    <div class="p-6 border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Store class="w-5 h-5 text-white" />
          </div>
          <div class="flex flex-col">
            <span class="font-bold text-gray-900 dark:text-white text-lg">Les Showdagar</span>
            <span class="text-xs text-gray-500 dark:text-gray-400">Premium E-commerce</span>
          </div>
        </div>
        <button class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <Search class="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>
      </div>

      <!-- Mode Toggle -->
      <div class="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1 transition-colors duration-200">
        <button @click="activeMode = 'shop'" :class="[
          'flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-200',
          activeMode === 'shop'
            ? 'bg-primary text-white shadow-sm'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
        ]">
          SHOP
        </button>
        <button @click="activeMode = 'admin'" :class="[
          'flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-200',
          activeMode === 'admin'
            ? 'bg-primary text-white shadow-sm'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
        ]">
          ADMIN
        </button>
      </div>
    </div>

    <!-- Navigation Menu -->
    <div class="flex-1 overflow-y-auto p-4">
      <nav class="space-y-2">
        <!-- Main Navigation -->
        <div v-for="item in navigationItems" :key="item.name">
          <NuxtLink :to="item.path" :class="[
            'flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group',
            isActive(item.path)
              ? 'bg-primary text-white shadow-lg'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
          ]">
            <component :is="item.icon" :class="[
              'w-5 h-5 transition-colors duration-200',
              isActive(item.path) ? 'text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
            ]" />
            <span class="font-medium">{{ item.name }}</span>
            <span v-if="item.badge" :class="[
              'ml-auto px-2 py-1 text-xs font-bold rounded-full',
              isActive(item.path)
                ? 'bg-white text-primary'
                : 'bg-primary text-white'
            ]">
              {{ item.badge }}
            </span>
          </NuxtLink>
        </div>

        <!-- Categories Section -->
        <div class="pt-6">
          <h3 class="px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            CATEGORIES
          </h3>
          <div class="space-y-1">
            <button v-for="category in categories" :key="category.name"
              @click="productStore.selectedCategory = category.name" :class="[
                'w-full flex items-center justify-between px-4 py-2 rounded-lg transition-all duration-200 group',
                productStore.selectedCategory === category.name
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
              ]">
              <span class="font-medium text-sm">{{ category.name }}</span>
              <span :class="[
                'text-xs px-2 py-1 rounded-full font-semibold',
                productStore.selectedCategory === category.name
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 group-hover:bg-gray-300 dark:group-hover:bg-gray-600'
              ]">
                {{ category.count }}
              </span>
            </button>
          </div>
        </div>

        <!-- Account Section -->
        <div class="pt-6">
          <h3 class="px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            ACCOUNT
          </h3>
          <div class="space-y-1">
            <NuxtLink v-for="item in accountItems" :key="item.name" :to="item.path" :class="[
              'flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group',
              isActive(item.path)
                ? 'bg-primary text-white shadow-lg'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
            ]">
              <component :is="item.icon" :class="[
                'w-5 h-5 transition-colors duration-200',
                isActive(item.path) ? 'text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
              ]" />
              <span class="font-medium">{{ item.name }}</span>
              <span v-if="item.badge" :class="[
                'ml-auto px-2 py-1 text-xs font-bold rounded-full',
                item.badgeColor === 'green' ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'
              ]">
                {{ item.badge }}
              </span>
            </NuxtLink>
          </div>
        </div>
      </nav>
    </div>

    <!-- User Profile Section -->
    <div class="p-4 border-t border-gray-200 dark:border-gray-700">
      <div
        class="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 cursor-pointer">
        <div
          class="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center">
          <User class="w-5 h-5 text-white" />
        </div>
        <div class="flex-1 min-w-0">
          <p class="font-semibold text-gray-900 dark:text-white text-sm truncate">John Doe</p>
          <p class="text-xs text-gray-500 dark:text-gray-400 truncate">john.doe@example.com</p>
        </div>
        <MoreHorizontal class="w-4 h-4 text-gray-400 dark:text-gray-500" />
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  Store, Search, LayoutDashboard, Package, ShoppingCart,
  Heart, History, Star, Bell, MessageCircle, Settings,
  User, MoreHorizontal, TrendingUp, Users, BarChart3,
  FileText, CreditCard
} from 'lucide-vue-next'
import { useProductStore } from '@/stores/products'

const route = useRoute()
const productStore = useProductStore()

const activeMode = ref('shop')

const navigationItems = computed(() => {
  if (activeMode.value === 'shop') {
    return [
      { name: 'Dashboard', path: '/', icon: LayoutDashboard },
      { name: 'Products', path: '/products', icon: Package },
      { name: 'Cart', path: '/cart', icon: ShoppingCart, badge: productStore.cartItemsCount || null },
      { name: 'Wishlist', path: '/wishlist', icon: Heart },
      { name: 'Orders', path: '/orders', icon: FileText },
      { name: 'Checkout', path: '/checkout', icon: CreditCard },
    ]
  } else {
    return [
      { name: 'Analytics', path: '/admin', icon: BarChart3 },
      { name: 'Products', path: '/admin/products', icon: Package },
      { name: 'Orders', path: '/admin/orders', icon: FileText },
      { name: 'Customers', path: '/admin/customers', icon: Users },
      { name: 'Revenue', path: '/admin/revenue', icon: TrendingUp },
    ]
  }
})

const accountItems = [
  { name: 'Notifications', path: '/notifications', icon: Bell, badge: '24', badgeColor: 'green' },
  { name: 'Messages', path: '/messages', icon: MessageCircle, badge: '8', badgeColor: 'orange' },
  { name: 'Settings', path: '/settings', icon: Settings },
]

const categories = computed(() => productStore.categories)

const isActive = (path) => {
  return route.path === path
}
</script>