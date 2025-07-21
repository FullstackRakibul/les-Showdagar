<template>
  <aside class="h-full bg-white border-r border-gray-200 flex flex-col">
    <!-- Sidebar Header -->
    <div class="p-4 border-b border-gray-200">
      <h2 class="text-lg font-semibold text-gray-900">Filters</h2>
    </div>

    <div class="flex-1 overflow-y-auto p-4 space-y-6">
      <!-- Categories -->
      <div>
        <h3 class="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Categories</h3>
        <ul class="space-y-1">
          <li v-for="category in categories" :key="category.name">
            <button @click="selectedCategory = category.name"
              class="w-full text-left px-3 py-2 rounded-lg transition-colors flex justify-between items-center group"
              :class="{
                'bg-blue-600 text-white': selectedCategory === category.name,
                'hover:bg-gray-100 text-gray-700': selectedCategory !== category.name
              }">
              <span class="font-medium">{{ category.name }}</span>
              <span class="text-xs px-2 py-1 rounded-full" :class="{
                'bg-blue-500 text-white': selectedCategory === category.name,
                'bg-gray-200 text-gray-600 group-hover:bg-gray-300': selectedCategory !== category.name
              }">
                {{ category.count }}
              </span>
            </button>
          </li>
        </ul>
      </div>

      <!-- Quick Actions -->
      <div>
        <h3 class="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Quick Links</h3>
        <ul class="space-y-1">
          <li>
            <button
              class="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center text-gray-700 transition-colors">
              <i class="fas fa-fire text-red-500 mr-3 w-4"></i>
              <span>Hot Deals</span>
            </button>
          </li>
          <li>
            <button
              class="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center text-gray-700 transition-colors">
              <i class="fas fa-heart text-pink-500 mr-3 w-4"></i>
              <span>Wishlist</span>
            </button>
          </li>
          <li>
            <button
              class="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center text-gray-700 transition-colors">
              <i class="fas fa-history text-blue-500 mr-3 w-4"></i>
              <span>Recently Viewed</span>
            </button>
          </li>
          <li>
            <button
              class="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center text-gray-700 transition-colors">
              <i class="fas fa-star text-yellow-500 mr-3 w-4"></i>
              <span>Top Rated</span>
            </button>
          </li>
        </ul>
      </div>

      <!-- Price Range -->
      <div>
        <h3 class="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Price Range</h3>
        <div class="space-y-3">
          <div class="flex items-center space-x-2">
            <input type="range" min="0" max="1000" v-model="priceRange.min"
              class="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
          </div>
          <div class="flex items-center justify-between text-sm text-gray-600">
            <span>${{ priceRange.min }}</span>
            <span>${{ priceRange.max }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Promo Section -->
    <div class="p-4 border-t border-gray-200">
      <div class="bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl p-4 text-white">
        <h4 class="font-semibold mb-2">Special Offer!</h4>
        <p class="text-sm mb-3 text-blue-100">Get 20% off on your first order</p>
        <button
          class="w-full bg-white text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors text-sm">
          Shop Now
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { useProducts } from '@/composables/useProducts'

const { categories } = useProducts()
const selectedCategory = ref(null)

const priceRange = ref({
  min: 0,
  max: 1000
})
</script>