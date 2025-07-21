<template>
  <aside class="h-full bg-white border-l border-gray-200 flex flex-col">
    <!-- Sidebar Header -->
    <div class="p-4 border-b border-gray-200">
      <h2 class="text-lg font-semibold text-gray-900">Discover</h2>
    </div>

    <div class="flex-1 overflow-y-auto p-4 space-y-6">
      <!-- Recommended Products -->
      <div>
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wide">Recommended</h3>
          <button class="text-xs text-blue-600 hover:text-blue-700 font-medium">
            See all
          </button>
        </div>
        <div class="space-y-3">
          <div v-for="product in popularProducts.slice(0, 3)" :key="product.id"
            class="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors group">
            <img :src="product.image" :alt="product.name"
              class="w-12 h-12 object-cover rounded-lg group-hover:scale-105 transition-transform" />
            <div class="flex-1 min-w-0">
              <h4 class="font-medium text-sm text-gray-900 truncate">{{ product.name }}</h4>
              <div class="flex items-center mt-1">
                <div class="flex text-yellow-400 text-xs">
                  <i v-for="star in Math.floor(product.rating)" :key="star" class="fas fa-star"></i>
                </div>
                <span class="text-xs text-gray-500 ml-1">({{ product.reviews }})</span>
              </div>
              <p class="font-semibold text-blue-600 text-sm mt-1">${{ product.price }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Hot Deals -->
      <div>
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wide">Hot Deals</h3>
          <button class="text-xs text-blue-600 hover:text-blue-700 font-medium">
            See all
          </button>
        </div>
        <div class="space-y-3">
          <div v-for="product in hotDeals" :key="product.id"
            class="bg-gradient-to-r from-red-50 to-orange-50 p-3 rounded-xl border border-red-100 hover:shadow-md transition-shadow cursor-pointer">
            <div class="flex items-center space-x-3">
              <img :src="product.image" :alt="product.name" class="w-10 h-10 object-cover rounded-lg" />
              <div class="flex-1 min-w-0">
                <h4 class="font-medium text-sm text-gray-900 truncate">{{ product.name }}</h4>
                <div class="flex items-center mt-1">
                  <span class="font-bold text-red-600 text-sm">${{ product.price }}</span>
                  <span class="text-xs text-gray-500 line-through ml-2">${{ product.originalPrice }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recently Viewed -->
      <div>
        <h3 class="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Recently Viewed</h3>
        <div class="space-y-3">
          <div v-for="product in products.slice(0, 2)" :key="product.id"
            class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
            <img :src="product.image" :alt="product.name" class="w-10 h-10 object-cover rounded-lg" />
            <div class="flex-1 min-w-0">
              <h4 class="font-medium text-sm text-gray-900 truncate">{{ product.name }}</h4>
              <p class="text-sm text-blue-600">${{ product.price }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Newsletter Signup -->
      <div class="bg-gray-50 rounded-xl p-4">
        <h3 class="text-sm font-semibold text-gray-900 mb-2">Stay Updated</h3>
        <p class="text-xs text-gray-600 mb-3">Get notified about new products and exclusive deals</p>
        <div class="space-y-2">
          <input type="email" placeholder="Enter your email"
            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          <button
            class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg transition-colors text-sm font-medium">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { useProducts } from '@/composables/useProducts'

const { products, popularProducts, hotDeals } = useProducts()
</script>