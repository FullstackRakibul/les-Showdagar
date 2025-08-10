<template>
  <teleport to="body">
    <transition name="modal">
      <div v-if="productStore.showProductModal && productStore.selectedProduct"
        class="fixed inset-0 z-[9999] overflow-y-auto transition-opacity duration-300">
        <div class="flex items-center justify-center min-h-screen px-4 py-8">
          <div class="fixed inset-0 bg-black bg-opacity-10" @click="productStore.closeProductModal"></div>

          <div
            class="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
            <!-- Close Button -->
            <button @click="productStore.closeProductModal"
              class="absolute top-6 right-6 z-10 w-12 h-12 bg-white dark:bg-gray-700 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-200">
              <X class="w-6 h-6" />
            </button>

            <div class="flex flex-col lg:flex-row max-h-[80vh] overflow-y-auto ">
              <!-- Product Images -->
              <div class="lg:w-1/2 p-8">
                <div class="relative">
                  <img :src="product.image" :alt="product.name" class="w-full rounded-2xl object-cover shadow-lg"
                    style="max-height: 500px;" />
                  <div class="absolute top-4 left-4 flex flex-col space-y-2">
                    <span v-if="product.isNew"
                      class="bg-primary text-white text-sm px-3 py-1 rounded-full font-semibold shadow-sm">
                      NEW
                    </span>
                    <span v-if="product.isHot"
                      class="bg-red-500 text-white text-sm px-3 py-1 rounded-full font-semibold shadow-sm">
                      HOT
                    </span>
                  </div>
                </div>
              </div>

              <!-- Product Details -->
              <div class="lg:w-1/2 p-8 lg:py-12 ">
                <!-- Brand -->
                <p v-if="product.brand"
                  class="text-sm text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide font-medium">
                  {{ product.brand }}
                </p>

                <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">{{ product.name }}</h2>

                <!-- Rating -->
                <div class="flex items-center mb-6">
                  <div class="flex text-yellow-400 mr-3">
                    <Star v-for="star in 5" :key="star" :class="star <= product.rating ? 'fill-current' : ''"
                      class="w-5 h-5" />
                  </div>
                  <span class="text-gray-600 dark:text-gray-300">{{ product.rating }} ({{ product.reviews }}
                    reviews)</span>
                </div>

                <!-- Price -->
                <div class="flex items-center mb-8">
                  <span class="text-5xl font-bold text-gray-900 dark:text-white">${{ product.price }}</span>
                  <span v-if="product.originalPrice" class="text-2xl text-gray-500 line-through ml-4">
                    ${{ product.originalPrice }}
                  </span>
                  <span v-if="product.originalPrice"
                    class="ml-4 bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Save ${{ (product.originalPrice - product.price).toFixed(2) }}
                  </span>
                </div>

                <!-- Revenue Info -->
                <div v-if="product.revenue" class="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium text-green-800 dark:text-green-300">Revenue Generated</span>
                    <div class="flex items-center space-x-2">
                      <span class="text-lg font-bold text-green-600">${{ formatRevenue(product.revenue) }}</span>
                      <TrendingUp class="w-4 h-4 text-green-500" />
                    </div>
                  </div>
                </div>

                <!-- Description -->
                <p class="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed text-lg">{{ product.description }}</p>

                <!-- Color Selection -->
                <div v-if="product.colors && product.colors.length > 0" class="mb-6">
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Choose Color</h4>
                  <div class="flex flex-wrap gap-3">
                    <button v-for="color in product.colors" :key="color" @click="selectedColor = color"
                      class="flex items-center space-x-2 px-4 py-2 border-2 rounded-lg transition-all duration-200"
                      :class="{
                        'border-primary bg-primary/10': selectedColor === color,
                        'border-gray-300 dark:border-gray-600 hover:border-gray-400 text-gray-700 dark:text-gray-300': selectedColor !== color
                      }">
                      <div class="w-4 h-4 rounded-full border border-gray-300"
                        :style="{ backgroundColor: getColorValue(color) }"></div>
                      <span class="font-medium">{{ color }}</span>
                    </button>
                  </div>
                </div>

                <!-- Size Selection -->
                <div v-if="product.sizes && product.sizes.length > 0" class="mb-6">
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Choose Size</h4>
                  <div class="flex flex-wrap gap-3">
                    <button v-for="size in product.sizes" :key="size" @click="selectedSize = size"
                      class="px-4 py-2 border-2 rounded-lg transition-all duration-200 font-medium" :class="{
                        'border-primary bg-primary/10 text-primary': selectedSize === size,
                        'border-gray-300 dark:border-gray-600 hover:border-gray-400 text-gray-700 dark:text-gray-300': selectedSize !== size
                      }">
                      {{ size }}
                    </button>
                  </div>
                </div>

                <!-- Specifications -->
                <div v-if="product.specifications" class="mb-8">
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Specifications</h4>
                  <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                    <div v-for="(value, key) in product.specifications" :key="key"
                      class="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600 last:border-b-0">
                      <span class="text-gray-600 dark:text-gray-400">{{ key }}:</span>
                      <span class="font-medium text-gray-900 dark:text-white">{{ value }}</span>
                    </div>
                  </div>
                </div>

                <!-- Stock Status -->
                <div class="mb-8">
                  <span v-if="product.inStock" class="inline-flex items-center text-green-600 font-semibold text-lg">
                    <CheckCircle class="w-5 h-5 mr-2" />
                    In Stock
                  </span>
                  <span v-else class="inline-flex items-center text-red-600 font-semibold text-lg">
                    <XCircle class="w-5 h-5 mr-2" />
                    Out of Stock
                  </span>
                </div>

                <!-- Action Buttons -->
                <div class="flex space-x-4">
                  <button @click="handleAddToCart" :disabled="!product.inStock"
                    class="flex-1 bg-primary hover:bg-primary-dark disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white py-4 px-8 rounded-xl transition-colors font-bold text-lg flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl mb-10">
                    <ShoppingCart class="w-5 h-5" />
                    <span>Add to Cart</span>
                  </button>
                  <button
                    class="w-16 h-16 border-2 border-gray-300 dark:border-gray-600 hover:border-red-500 hover:text-red-500 rounded-xl transition-colors flex items-center justify-center">
                    <Heart class="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { ref, computed } from 'vue'
import { X, Star, TrendingUp, CheckCircle, XCircle, ShoppingCart, Heart } from 'lucide-vue-next'
import { useProductStore } from '@/stores/products'

const productStore = useProductStore()

const selectedColor = ref('')
const selectedSize = ref('')

const product = computed(() => productStore.selectedProduct)

const formatRevenue = (revenue) => {
  if (revenue >= 1000000) {
    return `${(revenue / 1000000).toFixed(1)}M`
  } else if (revenue >= 1000) {
    return `${(revenue / 1000).toFixed(0)}K`
  }
  return revenue.toString()
}

const getColorValue = (colorName) => {
  const colorMap = {
    'Black': '#000000',
    'White': '#FFFFFF',
    'Red': '#EF4444',
    'Blue': '#3B82F6',
    'Green': '#10B981',
    'Yellow': '#F59E0B',
    'Purple': '#8B5CF6',
    'Pink': '#EC4899',
    'Gray': '#6B7280',
    'Orange': '#F97316',
    'Silver': '#C0C0C0',
    'Electric Volt': '#CCFF00',
    'Carbon Black': '#1C1C1C',
    'Robot White': '#F8F8FF'
  }
  return colorMap[colorName] || '#6B7280'
}

const handleAddToCart = () => {
  if (product.value) {
    productStore.addToCart(product.value, selectedColor.value, selectedSize.value)
    productStore.closeProductModal()
  }
}

// Initialize selections
const initializeSelections = () => {
  if (product.value?.colors?.length) {
    selectedColor.value = product.value.colors[0]
  }
  if (product.value?.sizes?.length) {
    selectedSize.value = product.value.sizes[0]
  }
}

initializeSelections()
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>