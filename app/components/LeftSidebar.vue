<template>
  <aside
    class="h-full bg-white dark:bg-gray-900 flex flex-col shadow-xl border-r border-gray-200 dark:border-gray-700 transition-colors duration-200">
    <div class="p-6 border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center space-x-2">
        <!-- Logo -->
        <button @click="navigateTo('/')" class="flex items-center hover:opacity-80 transition-opacity">
          <img src="@/assets/img/globalUse/RH-Business-Club-logo-black-trsns-vvv.png" alt="RH Business Club"
            class="w-auto" />
        </button>

        <!-- Close Button -->
        <button @click="layoutStore.toggleLeftSidebar"
          class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <LucidePanelLeftClose class="w-5 h-5 " />
        </button>
      </div>
    </div>

    <div class="flex-1 overflow-y-auto p-4">
      <nav class="space-y-4">
        <NuxtLink to="/shop" :class="[
          'flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group',
          isActive('/products')
            ? 'bg-primary text-white shadow-lg'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white',
        ]">
          <LucidePackage :class="[
            'w-5 h-5',
            isActive('/products') ? 'text-white' : 'text-gray-500 dark:text-gray-400',
          ]" />
          <span class="font-medium">Shop</span>
        </NuxtLink>

        <div>
          <h3 class="px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Categories
          </h3>
          <div class="space-y-1">
            <button v-for="category in categories" :key="category.name" @click="selectCategory(category.name)" :class="[
              'w-full flex items-center justify-between px-4 py-2 rounded-lg transition-all duration-200 group',
              productStore.selectedCategory === category.name
                ? 'bg-primary/10 text-primary border border-primary/20'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white',
            ]">
              <span class="font-medium text-sm">{{ category.name }}</span>
              <span :class="[
                'text-xs px-2 py-1 rounded-full font-semibold',
                productStore.selectedCategory === category.name
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 group-hover:bg-gray-300 dark:group-hover:bg-gray-600',
              ]">
                {{ category.count }}
              </span>
            </button>
          </div>
        </div>
      </nav>
    </div>

    <div class="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
      <NuxtLink to="/about"
        class="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300">
        <LucideInfo class="w-5 h-5 text-gray-500 dark:text-gray-400" />
        <span class="font-medium">About</span>
      </NuxtLink>
      <NuxtLink to="/settings"
        class="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300">
        <LucideSettings class="w-5 h-5 text-gray-500 dark:text-gray-400" />
        <span class="font-medium">Account Settings</span>
      </NuxtLink>
    </div>
  </aside>
</template>

<script setup>
import { PanelLeftClose } from 'lucide-vue-next';
import { useRoute } from "vue-router";
import { Store, Package, Info, Settings } from "lucide-vue-next";
import { useProductStore } from "@/stores/products";
import { useLayoutStore } from '@/stores/layout';

const route = useRoute();
const productStore = useProductStore();

const layoutStore = useLayoutStore();
const toggleLeftSidebar = () => {
  layoutStore.leftSidebarOpen.value = !layoutStore.leftSidebarOpen.value;
};

const categories = productStore.categories;
const isActive = (path) => route.path === path;

const selectCategory = (name) => {
  productStore.selectedCategory = name;
};
</script>