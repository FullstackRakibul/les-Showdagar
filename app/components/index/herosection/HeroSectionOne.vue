<template>
  <section class="w-full bg-white dark:bg-gray-900 transition-colors duration-200">


    <!-- Hero Banner Section -->
    <div class="bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 px-4 sm:px-6 py-12 md:py-20">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Left: Text Content -->
          <div class="space-y-6">
            <div class="flex items-center space-x-2">
              <div class="w-1 h-6 bg-red-500 rounded-full"></div>
              <span class="text-gray-600 dark:text-gray-400 text-sm font-medium">Technology for your convenience</span>
            </div>

            <h1 class="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Premium Tech Products for Modern Living
            </h1>

            <p class="text-gray-600 dark:text-gray-400 text-lg max-w-md">
              For your job, study or housework, everything you need is here. Discover our curated collection of premium
              technology and electronics.
            </p>

            <button
              class="inline-flex items-center space-x-2 px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              <span>Shop Now</span>
              <ArrowRight class="w-5 h-5" />
            </button>
          </div>

          <!-- Right: Product Image -->
          <div class="relative flex justify-center items-center h-96 md:h-full">
            <div class="relative w-full h-full flex items-center justify-center">
              <!-- Background decorative circles -->
              <div
                class="absolute inset-0 bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30 rounded-3xl">
              </div>

              <!-- Product Image -->
              <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop"
                alt="Premium Headphones"
                class="relative z-10 w-4/5 h-4/5 object-contain drop-shadow-2xl transform hover:scale-110 transition-transform duration-300" />

              <!-- Navigation Arrows -->
              <button
                class="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 md:-translate-x-12 p-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full transition-colors z-20">
                <ChevronLeft class="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </button>
              <button
                class="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 md:translate-x-12 p-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full transition-colors z-20">
                <ChevronRight class="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </button>

              <!-- Indicator Dots -->
              <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 z-20">
                <button class="w-3 h-3 bg-red-500 rounded-full transition-all duration-300"></button>
                <button
                  class="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full hover:bg-red-500 transition-all duration-300"></button>
                <button
                  class="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full hover:bg-red-500 transition-all duration-300"></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { Phone, Mail, Search, ShoppingCart, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-vue-next'



const featuredProducts = ref([
  {
    id: 1,
    name: 'Gaming Laptop',
    price: '$1,000.00',
    image: 'https://images.unsplash.com/photo-1588872657840-218e7e66e858?w=400&h=400&fit=crop'
  },
  {
    id: 2,
    name: 'Wireless Headset',
    price: '$175.00',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'
  },
  {
    id: 3,
    name: 'Mobile Phone',
    price: '$500.00',
    image: 'https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=400&h=400&fit=crop'
  }
])
</script>

<style scoped>
/* Smooth transitions for all interactive elements */
button,
input {
  transition: all 0.3s ease;
}

/* Enhanced hover effects for product cards */
.group:hover {
  transform: translateY(-4px);
}
</style>