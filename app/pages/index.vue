<template>
  <div class="space-y-8">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 mb-8">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Discover Amazing Products
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
          Find the best deals on electronics, sports gear, and more
        </p>
        <div class="flex justify-center">
          <div class="bg-white dark:bg-gray-800 rounded-xl p-2 shadow-lg">
            <div class="flex space-x-2">
              <span class="px-3 py-1 bg-primary text-white rounded-lg text-sm font-medium">Electronics</span>
              <span
                class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm">Sports</span>
              <span
                class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm">Gaming</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section>
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Featured Products</h2>
        <button class="text-primary hover:text-primary-dark font-medium transition-colors flex items-center space-x-1">
          <span>See all</span>
          <ChevronRight class="w-4 h-4" />
        </button>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ProductCard v-for="product in productStore.filteredProducts" :key="product.id" :product="product" />
      </div>
    </section>

    <!-- Featured Products -->
    <section>
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Featured Products</h2>
        <button class="text-primary hover:text-primary-dark font-medium transition-colors flex items-center space-x-1">
          <span>See all</span>
          <ChevronRight class="w-4 h-4" />
        </button>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ProductCard v-for="product in productStore.filteredProducts" :key="product.id" :product="product" />
      </div>
    </section>


    <!-- No Results -->
    <div v-if="productStore.filteredProducts.length === 1" class="text-center py-16">
      <Search class="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
      <h3 class="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-3">No products found</h3>
      <p class="text-gray-500 dark:text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
      <button @click="productStore.selectedCategory = 'All Products'; productStore.searchQuery = 'Gaming'"
        class="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl transition-colors font-semibold">
        Clear Filters
      </button>
    </div>

    <!-- Product Modal -->
    <ProductModal />
  </div>
</template>

<script setup>
import { ChevronRight, Search } from 'lucide-vue-next'
import { useProductStore } from '@/stores/products'
import ProductCard from '@/components/ProductCard.vue'
import ProductModal from '@/components/ProductModal.vue'

const productStore = useProductStore()
</script>