<template>
  <!-- Search Bar & Categories -->
  <div class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-6">
    <div class="max-w-7xl mx-auto space-y-6">
      <!-- Search Bar -->
      <div class="flex items-center space-x-4">
        <div class="flex-1 relative">
          <input type="text" placeholder="Search here..."
            class="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors" />
          <button
            class="absolute right-3 top-1/2 transform -translate-y-1/2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-md transition-colors">
            <Search class="w-5 h-5" />
          </button>
        </div>
        <button
          class="hidden sm:flex items-center space-x-2 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <ShoppingCart class="w-5 h-5" />
          <span class="hidden md:inline text-gray-700 dark:text-gray-300">Cart</span>
        </button>
        <button
          class="px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Sign
          In</button>
        <button class="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors">Sign
          Up</button>
      </div>

      <!-- Categories -->
      <div class="flex items-center space-x-8 overflow-x-auto pb-2">
        <button v-for="category in categories" :key="category"
          class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white whitespace-nowrap transition-colors text-sm md:text-base">
          {{ category }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const categories = [
  'Popular Search',
  'Computer Set',
  'Laptops & Tablets',
  'Phone & Accessories',
  'Printer',
  'Video, Audio, TV',
  'Home Appliance'
]
</script>