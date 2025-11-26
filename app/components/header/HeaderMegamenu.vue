<template>
  <div class="relative">
    <!-- Menu Button -->
    <button @click="toggleMenu" @mouseenter="openMenu" @mouseleave="closeMenu"
      class="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
      :class="{ 'bg-gray-100 dark:bg-gray-800': isOpen }">
      <LucideMenu class="w-5 h-5 text-gray-700 dark:text-gray-300" />
      <span class="hidden sm:inline text-sm font-medium text-gray-900 dark:text-white">{{ activeMenu }}</span>
      <LucideChevronDown class="w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }" />
    </button>

    <!-- Megamenu Dropdown -->
    <transition name="megamenu">
      <div v-if="isOpen" @mouseenter="openMenu" @mouseleave="closeMenu"
        class="absolute left-0 mt-1 w-80 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 py-2 z-50">

        <!-- Home Section -->
        <div class="px-2 py-1">
          <button @click="selectMenu('Home')"
            class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left">
            <LucideHome class="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <div>
              <p class="text-sm font-semibold text-gray-900 dark:text-white">Home</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">Back to dashboard</p>
            </div>
          </button>
        </div>

        <div class="border-t border-gray-100 dark:border-gray-800 my-1"></div>

        <!-- Shop Section -->
        <div class="px-2 py-1">
          <p class="px-3 py-1 text-xs font-semibold text-gray-600 dark:text-gray-500 uppercase tracking-wide">Shop</p>
          <button @click="selectMenu('All Products')"
            class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left">
            <LucideShoppingBag class="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <div>
              <p class="text-sm font-semibold text-gray-900 dark:text-white">All Products</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">Browse entire catalog</p>
            </div>
          </button>
          <button @click="layoutStore.toggleLeftSidebar"
            class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left">
            <LucideListIndentDecrease class="w-5 h-5 " />
            <div>
              <p class="text-sm font-semibold text-gray-900 dark:text-white">More Events</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">See Events on Left Sidebar.</p>
            </div>
          </button>
          <button @click="selectMenu('Deals')"
            class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left">
            <LucideZap class="w-5 h-5 text-yellow-500" />
            <div>
              <p class="text-sm font-semibold text-gray-900 dark:text-white">Deals & Offers</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">Hot deals available</p>
            </div>
          </button>
        </div>

        <div class="border-t border-gray-100 dark:border-gray-800 my-1"></div>

        <!-- Club Section -->
        <div class="px-2 py-1">
          <p class="px-3 py-1 text-xs font-semibold text-gray-600 dark:text-gray-500 uppercase tracking-wide">Club</p>
          <button @click="selectMenu('Membership')"
            class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left">
            <Users class="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <div>
              <p class="text-sm font-semibold text-gray-900 dark:text-white">Membership</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">Join RH Business Club</p>
            </div>
          </button>
          <button @click="selectMenu('Benefits')"
            class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left">
            <LucideGift class="w-5 h-5 text-pink-600 dark:text-pink-400" />
            <div>
              <p class="text-sm font-semibold text-gray-900 dark:text-white">Member Benefits</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">Exclusive perks</p>
            </div>
          </button>

        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import {
  Menu,
  ChevronDown,
  Home,
  ShoppingBag,
  Tag,
  Zap,
  Users,
  Gift,
  Calendar,
} from 'lucide-vue-next';
import { useLayout } from '../../composables/useLayout';

const router = useRouter();
const isOpen = ref(false);
const activeMenu = ref('Menu');

const layoutStore = useLayout();

const toggleLeftSidebar = () => {
  -  layoutStore.toggleLeftSidebar();
};
const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const openMenu = () => {
  isOpen.value = true;
};

const closeMenu = () => {
  isOpen.value = false;
};

const selectMenu = (menu) => {
  activeMenu.value = menu;
  isOpen.value = false;

  // Navigate based on menu selection
  const routes = {
    'Home': '/',
    'All Products': '/products',
    'Categories': '/shop',
    'Deals': '/products?filter=deals',
    'Membership': '/club/membership',
    'Benefits': '/club/benefits',
    'Events': '/club/events',
  };

  if (routes[menu]) {
    router.push(routes[menu]);
  }
};
</script>

<style scoped>
.megamenu-enter-active,
.megamenu-leave-active {
  transition: all 0.2s ease;
}

.megamenu-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}

.megamenu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>