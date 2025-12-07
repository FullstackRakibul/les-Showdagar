<template>
  <footer
    class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 transition-colors duration-200">
    <!-- Main Footer Content (Hidden on Mobile) -->
    <div class="hidden md:block px-4 sm:px-6 py-12">
      <!-- Footer Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <!-- Brand Section -->
        <div class="col-span-1 flex items-center space-x-3 mb-4">

          <div class="flex-1 flex justify-center">
            <button @click="navigateTo('/')" class="flex items-center hover:opacity-80 transition-opacity">
              <img src="@/assets/img/globalUse/RH-Business-Club-logo-trsns-black.png" alt="RH Business Club"
                class="h-40 w-auto" />
            </button>
          </div>

        </div>

        <!-- Shop Links -->
        <div>
          <h3 class="font-semibold text-gray-900 dark:text-white text-sm mb-4">Shop</h3>
          <ul class="space-y-3">
            <li>
              <NuxtLink to="/"
                class="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                All Products
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/"
                class="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                Best Sellers
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/"
                class="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                New Arrivals
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/"
                class="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                On Sale
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Support Links -->
        <div>
          <h3 class="font-semibold text-gray-900 dark:text-white text-sm mb-4">Support</h3>
          <ul class="space-y-3">
            <li>
              <NuxtLink to="/"
                class="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                Contact Us
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/"
                class="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                FAQ
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/"
                class="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                Shipping Info
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/"
                class="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                Returns
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Legal Links -->
        <div>
          <h3 class="font-semibold text-gray-900 dark:text-white text-sm mb-4">Legal</h3>
          <ul class="space-y-3">
            <li>
              <NuxtLink to="/"
                class="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                About Us
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/"
                class="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                Privacy Policy
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/"
                class="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                Terms of Service
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/"
                class="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                Cookie Policy
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>



      <!-- Bottom Footer -->
      <div class="pt-8 border-t border-gray-200 dark:border-gray-700">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p class="text-sm text-gray-500 dark:text-gray-400">
            © {{ currentYear }} RH Business Club. All rights reserved.
          </p>
          <div class="flex items-center space-x-6 text-xs text-gray-500 dark:text-gray-400">
            <span>❤️ for smart shoppers</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Footer (Simplified) -->
    <div class="md:hidden px-4 py-6 space-y-6">
      <!-- Quick Links -->
      <div class="grid grid-cols-2 gap-4 text-center">
        <NuxtLink to="/" class="text-xs text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
          Contact
        </NuxtLink>
        <NuxtLink to="/" class="text-xs text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
          FAQ
        </NuxtLink>
        <NuxtLink to="/" class="text-xs text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
          Privacy
        </NuxtLink>
        <NuxtLink to="/" class="text-xs text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
          Terms
        </NuxtLink>
      </div>

      <!-- Copyright -->
      <div class="text-center">
        <p class="text-xs text-gray-500 dark:text-gray-400">
          © {{ currentYear }} RH Business Club
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { Store, Facebook, Twitter, Instagram, Linkedin } from 'lucide-vue-next'

const currentYear = computed(() => new Date().getFullYear())
</script>