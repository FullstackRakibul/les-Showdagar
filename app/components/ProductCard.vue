<template>
  <div class="group relative">
    <!-- Main Card -->
    <div
      class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
      <!-- Product Image -->
      <div class="relative cursor-pointer overflow-hidden bg-gray-50 dark:bg-gray-700" @click="openModal">
        <img :src="product.image" :alt="product.name"
          class="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500" />

        <!-- Badges -->
        <div class="absolute top-3 left-3 flex flex-col space-y-1">
          <span v-if="product.isNew"
            class="bg-primary text-white text-xs px-2 py-1 rounded-full font-semibold shadow-sm">
            NEW
          </span>
          <span v-if="product.isHot"
            class="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-sm">
            HOT
          </span>
          <span v-if="product.originalPrice"
            class="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-sm">
            -{{ Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) }}%
          </span>
        </div>

        <!-- Wishlist Button -->
        <button
          class="absolute top-3 right-3 w-9 h-9 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100">
          <Heart class="w-4 h-4 text-gray-400 hover:text-red-500 transition-colors" />
        </button>

        <!-- Quick Actions Overlay -->
        <div
          class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <button @click.stop="handleQuickAdd" :disabled="!product.inStock"
            class="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
            <ShoppingCart class="w-4 h-4 inline mr-2" />
            Quick Add
          </button>
        </div>

        <!-- Out of Stock Overlay -->
        <div v-if="!product.inStock" class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <span class="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold shadow-lg">Out of Stock</span>
        </div>
      </div>

      <!-- Product Info -->
      <div class="p-4 sm:p-5">
        <!-- Brand -->
        <p v-if="product.brand"
          class="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide font-medium">
          {{ product.brand }}
        </p>

        <!-- Product Name -->
        <h3
          class="font-semibold text-gray-900 dark:text-white mb-2 cursor-pointer hover:text-primary transition-colors line-clamp-2 text-sm sm:text-base"
          @click="openModal">
          {{ product.name }}
        </h3>

        <!-- Rating -->
        <div class="flex items-center mb-3">
          <div class="flex text-yellow-400 mr-2">
            <Star v-for="star in 5" :key="star" :class="star <= product.rating ? 'fill-current' : ''"
              class="w-3 h-3 sm:w-4 sm:h-4" />
          </div>
          <span class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{{ product.rating }}</span>
          <span class="text-xs text-gray-400 dark:text-gray-500 ml-1">({{ product.reviews }})</span>
        </div>

        <!-- Price and Revenue -->
        <div class="space-y-2 mb-4">
          <div class="flex items-center justify-between">
            <span class="text-xs text-gray-500 dark:text-gray-400">Price</span>
            <div class="flex items-center space-x-2">
              <span class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">${{ product.price }}</span>
              <span v-if="product.originalPrice" class="text-sm text-gray-500 line-through">
                ${{ product.originalPrice }}
              </span>
            </div>
          </div>

          <div v-if="product.revenue" class="flex items-center justify-between">
            <span class="text-xs text-gray-500 dark:text-gray-400">Revenue</span>
            <div class="flex items-center space-x-1">
              <span class="text-sm font-semibold text-green-600">${{ formatRevenue(product.revenue) }}</span>
              <TrendingUp class="w-3 h-3 text-green-500" />
            </div>
          </div>
        </div>

        <!-- Additional Info -->
        <div v-if="product.listingAge"
          class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
          <span>Listing age</span>
          <span>{{ product.listingAge }}</span>
        </div>

        <!-- Action Button -->
        <button @click="handleAddToCart" :disabled="!product.inStock"
          class="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white py-2.5 px-4 rounded-xl transition-colors font-semibold text-sm flex items-center justify-center space-x-2 shadow-sm hover:shadow-md">
          <ShoppingBag class="w-4 h-4" />
          <span>{{ product.inStock ? 'Add to Cart' : 'Out of Stock' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Heart, ShoppingCart, Star, TrendingUp, ShoppingBag } from 'lucide-vue-next'
import { useProductStore } from '@/stores/products'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const productStore = useProductStore()

const formatRevenue = (revenue) => {
  if (revenue >= 1000000) {
    return `${(revenue / 1000000).toFixed(1)}M`
  } else if (revenue >= 1000) {
    return `${(revenue / 1000).toFixed(0)}K`
  }
  return revenue.toString()
}

const openModal = () => {
  productStore.openProductModal(props.product)
}

const handleAddToCart = () => {
  productStore.addToCart(props.product)
}

const handleQuickAdd = () => {
  productStore.addToCart(props.product)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>