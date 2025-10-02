<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <!-- <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Products</h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400">Discover our premium collection</p> -->
      </div>
      <div class="mt-4 sm:mt-0 flex items-center space-x-3">
        <select v-model="sortBy"
          class="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 dark:text-white">
          <option value="name">Sort by Name</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
        <button
          class="p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <Filter class="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>
    </div>

    <!-- Filters Bar -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div class="flex flex-wrap items-center gap-4">
        <div class="flex items-center space-x-2">
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Categories:</span>
          <div class="flex flex-wrap gap-2">
            <button v-for="category in productStore.categories" :key="category.name"
              @click="productStore.selectedCategory = category.name" :class="[
                'px-3 py-1 rounded-full text-sm font-medium transition-colors',
                productStore.selectedCategory === category.name
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              ]">
              {{ category.name }} ({{ category.count }})
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Products Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <ProductCard v-for="product in sortedProducts" :key="product.id" :product="product" />
    </div>

    <!-- Empty State -->
    <div v-if="sortedProducts.length === 0" class="text-center py-16">
      <Package class="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
      <h3 class="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">No products found</h3>
      <p class="text-gray-500 dark:text-gray-500">Try adjusting your filters or search terms</p>
    </div>

    <!-- Product Modal -->
    <ProductModal />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Filter, Package } from 'lucide-vue-next'
import { useProductStore } from '@/stores/products'
import ProductCard from '@/components/ProductCard.vue'
import ProductModal from '@/components/ProductModal.vue'

const productStore = useProductStore()
const sortBy = ref('name')

const sortedProducts = computed(() => {
  let products = [...productStore.filteredProducts]

  switch (sortBy.value) {
    case 'price-low':
      return products.sort((a, b) => a.price - b.price)
    case 'price-high':
      return products.sort((a, b) => b.price - a.price)
    case 'rating':
      return products.sort((a, b) => b.rating - a.rating)
    default:
      return products.sort((a, b) => a.name.localeCompare(b.name))
  }
})
</script>