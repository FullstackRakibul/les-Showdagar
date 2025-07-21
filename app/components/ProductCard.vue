<template>
  <div
    class="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group">
    <!-- Product Image -->
    <div class="relative cursor-pointer overflow-hidden" @click="showProductModal = true">
      <img :src="product.image" :alt="product.name"
        class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
      <div v-if="product.isNew"
        class="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
        NEW
      </div>
      <div v-if="product.isHot"
        class="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
        HOT
      </div>
      <div v-if="!product.inStock" class="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
        <span class="text-white font-semibold bg-black bg-opacity-50 px-4 py-2 rounded-lg">Out of Stock</span>
      </div>
    </div>

    <!-- Product Info -->
    <div class="p-4">
      <h3 class="font-semibold text-gray-900 mb-2 cursor-pointer hover:text-blue-600 transition-colors line-clamp-2"
        @click="showProductModal = true">
        {{ product.name }}
      </h3>

      <!-- Rating -->
      <div class="flex items-center mb-3">
        <div class="flex text-yellow-400">
          <i v-for="star in 5" :key="star" :class="star <= product.rating ? 'fas fa-star' : 'far fa-star'"
            class="text-sm"></i>
        </div>
        <span class="text-sm text-gray-500 ml-2">({{ product.reviews }})</span>
      </div>

      <!-- Price -->
      <div class="flex items-center mb-4">
        <span class="text-xl font-bold text-gray-900">${{ product.price }}</span>
        <span v-if="product.originalPrice" class="text-sm text-gray-500 line-through ml-2">
          ${{ product.originalPrice }}
        </span>
      </div>

      <!-- Action Buttons -->
      <div class="flex space-x-2">
        <button @click="handleAddToCart" :disabled="!product.inStock"
          class="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-2 px-4 rounded-lg transition-colors font-medium text-sm flex items-center justify-center">
          <i class="fas fa-cart-plus mr-2"></i>
          Add to Cart
        </button>
        <button @click="showProductModal = true"
          class="px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
          <i class="fas fa-eye"></i>
        </button>
      </div>
    </div>

    <!-- Product Modal -->
    <teleport to="body">
      <transition name="modal">
        <div v-if="showProductModal" class="fixed inset-0 z-[9999] overflow-y-auto">
          <div class="flex items-center justify-center min-h-screen px-4 py-8">
            <div class="fixed inset-0 bg-black bg-opacity-50" @click="showProductModal = false"></div>

            <div class="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <!-- Close Button -->
              <button @click="showProductModal = false"
                class="absolute top-4 right-4 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-colors">
                <i class="fas fa-times text-lg"></i>
              </button>

              <div class="flex flex-col lg:flex-row max-h-[90vh] overflow-y-auto">
                <!-- Product Image -->
                <div class="lg:w-1/2 p-6">
                  <div class="relative">
                    <img :src="product.image" :alt="product.name" class="w-full rounded-xl object-cover"
                      style="max-height: 400px;" />
                    <div v-if="product.isNew"
                      class="absolute top-4 left-4 bg-green-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                      NEW
                    </div>
                    <div v-if="product.isHot"
                      class="absolute top-4 right-4 bg-red-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                      HOT
                    </div>
                  </div>
                </div>

                <!-- Product Details -->
                <div class="lg:w-1/2 p-6 lg:pt-12">
                  <h2 class="text-3xl font-bold text-gray-900 mb-4">{{ product.name }}</h2>

                  <!-- Rating -->
                  <div class="flex items-center mb-6">
                    <div class="flex text-yellow-400">
                      <i v-for="star in 5" :key="star"
                        :class="star <= product.rating ? 'fas fa-star' : 'far fa-star'"></i>
                    </div>
                    <span class="text-gray-500 ml-3">({{ product.reviews }} reviews)</span>
                  </div>

                  <!-- Price -->
                  <div class="flex items-center mb-6">
                    <span class="text-4xl font-bold text-gray-900">${{ product.price }}</span>
                    <span v-if="product.originalPrice" class="text-xl text-gray-500 line-through ml-4">
                      ${{ product.originalPrice }}
                    </span>
                  </div>

                  <!-- Description -->
                  <p class="text-gray-600 mb-8 leading-relaxed">{{ product.description }}</p>

                  <!-- Stock Status -->
                  <div class="mb-8">
                    <span v-if="product.inStock" class="inline-flex items-center text-green-600 font-semibold">
                      <i class="fas fa-check-circle mr-2"></i>
                      In Stock
                    </span>
                    <span v-else class="inline-flex items-center text-red-600 font-semibold">
                      <i class="fas fa-times-circle mr-2"></i>
                      Out of Stock
                    </span>
                  </div>

                  <!-- Action Buttons -->
                  <div class="flex space-x-4">
                    <button @click="handleAddToCart" :disabled="!product.inStock"
                      class="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-4 px-6 rounded-xl transition-colors font-semibold text-lg flex items-center justify-center">
                      <i class="fas fa-cart-plus mr-3"></i>
                      Add to Cart
                    </button>
                    <button
                      class="p-4 border-2 border-gray-300 hover:border-red-500 hover:text-red-500 rounded-xl transition-colors">
                      <i class="fas fa-heart text-xl"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useProducts } from '@/composables/useProducts'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const { addToCart } = useProducts()
const showProductModal = ref(false)

const handleAddToCart = () => {
  addToCart(props.product)
  showProductModal.value = false
}
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

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>