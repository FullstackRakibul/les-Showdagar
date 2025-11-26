<template>
  <!-- Added newsletter subscription and social links section -->
  <div class="py-8 border-t border-gray-200 dark:border-gray-700">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Newsletter -->
      <div>
        <h3 class="font-semibold text-gray-900 dark:text-white text-sm mb-3">Stay Updated</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">Subscribe to get special offers and updates</p>
        <div class="flex">
          <input type="email" placeholder="Enter your email"
            class="flex-1 px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary" />
          <button
            class="px-4 py-2 bg-primary text-white text-sm font-medium rounded-r-lg hover:bg-primary/90 transition-colors">
            Subscribe
          </button>
        </div>
      </div>

      <!-- Social Links -->
      <div class="flex flex-col items-start md:items-end justify-between">
        <h3 class="font-semibold text-gray-900 dark:text-white text-sm mb-3">Follow Us</h3>
        <div class="flex items-center space-x-4">
          <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
            <Facebook class="w-5 h-5" />
          </a>
          <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
            <Twitter class="w-5 h-5" />
          </a>
          <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
            <Instagram class="w-5 h-5" />
          </a>
          <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
            <Linkedin class="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>