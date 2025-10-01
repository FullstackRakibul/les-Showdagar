<template>
  <footer
    class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 transition-colors duration-200">
    <div class="px-4 sm:px-6 py-6">
      <div class="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <!-- Logo and tagline -->
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Store class="w-5 h-5 text-white" />
          </div>
          <div class="flex flex-col">
            <span class="font-bold text-gray-900 dark:text-white text-sm">RH Business Club</span>
            <span class="text-xs text-gray-500 dark:text-gray-400">Building a Club of Smart Shoppers.</span>
          </div>
        </div>

        <!-- Links -->
        <div class="flex items-center space-x-6 text-sm">
          <NuxtLink to="/about"
            class="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
            About
          </NuxtLink>
          <NuxtLink to="/contact"
            class="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
            Contact
          </NuxtLink>
          <NuxtLink to="/privacy"
            class="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
            Privacy
          </NuxtLink>
          <NuxtLink to="/terms"
            class="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
            Terms
          </NuxtLink>
        </div>

        <!-- Copyright -->
        <div class="text-sm text-gray-500 dark:text-gray-400">
          © {{ currentYear }} RH Business Club. All rights reserved.
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { Store } from 'lucide-vue-next'

const currentYear = computed(() => new Date().getFullYear())
</script>