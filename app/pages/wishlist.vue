<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Wishlist</h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400">{{ wishlistItems.length }} items saved for later</p>
      </div>
      <button v-if="wishlistItems.length > 0" @click="clearWishlist"
        class="text-red-600 hover:text-red-700 font-medium transition-colors">
        Clear Wishlist
      </button>
    </div>

    <!-- Wishlist Content -->
    <div v-if="wishlistItems.length === 0" class="text-center py-16">
      <Heart class="w-20 h-20 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
      <h3 class="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-4">Your wishlist is empty</h3>
      <p class="text-gray-500 dark:text-gray-500 mb-8">Save items you love to buy them later</p>
      <NuxtLink to="/"
        class="inline-flex items-center px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors font-semibold">
        <ArrowLeft class="w-5 h-5 mr-2" />
        Start Shopping
      </NuxtLink>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div v-for="item in wishlistItems" :key="item.id"
        class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden group hover:shadow-lg transition-all duration-300">
        <div class="relative">
          <img :src="item.image" :alt="item.name"
            class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
          <button @click="removeFromWishlist(item.id)"
            class="absolute top-3 right-3 w-9 h-9 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-200">
            <Heart class="w-4 h-4 text-red-500 fill-current" />
          </button>
        </div>

        <div class="p-4">
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">{{ item.name }}</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">{{ item.brand }}</p>

          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-2">
              <span class="text-lg font-bold text-gray-900 dark:text-white">${{ item.price }}</span>
              <span v-if="item.originalPrice" class="text-sm text-gray-500 line-through">${{ item.originalPrice
                }}</span>
            </div>
            <div class="flex items-center">
              <Star class="w-4 h-4 text-yellow-400 fill-current" />
              <span class="text-sm text-gray-600 dark:text-gray-400 ml-1">{{ item.rating }}</span>
            </div>
          </div>

          <div class="flex space-x-2">
            <button @click="addToCart(item)" :disabled="!item.inStock"
              class="flex-1 bg-primary hover:bg-primary-dark disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white py-2 px-4 rounded-xl transition-colors font-medium text-sm flex items-center justify-center">
              <ShoppingCart class="w-4 h-4 mr-2" />
              {{ item.inStock ? 'Add to Cart' : 'Out of Stock' }}
            </button>
            <button @click="productStore.openProductModal(item)"
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors">
              <Eye class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Modal -->
    <ProductModal />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Heart, ArrowLeft, ShoppingCart, Eye, Star } from 'lucide-vue-next'
import { useProductStore } from '@/stores/products'
import ProductModal from '@/components/ProductModal.vue'

const productStore = useProductStore()

// Mock wishlist data - in real app, this would come from a store
const wishlistItems = ref([
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    originalPrice: 399.99,
    image: "https://img.freepik.com/free-photo/rendering-smart-home-device_23-2151039302.jpg?semt=ais_hybrid&w=740",
    rating: 4.8,
    brand: "AudioTech",
    inStock: true
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 199.99,
    image: "https://t3.ftcdn.net/jpg/13/37/59/58/360_F_1337595881_iRH94v8gXcq6qDZOmpeEd9XtpL2jIV9h.jpg",
    rating: 4.6,
    brand: "FitTech",
    inStock: true
  }
])

const removeFromWishlist = (id) => {
  const index = wishlistItems.value.findIndex(item => item.id === id)
  if (index > -1) {
    wishlistItems.value.splice(index, 1)
  }
}

const clearWishlist = () => {
  wishlistItems.value = []
}

const addToCart = (item) => {
  productStore.addToCart(item)
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