<template>
  <div class="group relative h-full">
    <div
      class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 h-full flex flex-col"
    >
      <!-- Product Image -->
      <div
        class="relative cursor-pointer overflow-hidden bg-gray-50 dark:bg-gray-700 aspect-square"
        @click="openModal"
      >
        <img
          :src="product.image"
          :alt="product.name"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <!-- badges & actions unchanged -->
        <div class="absolute top-2 left-2 flex flex-col space-y-1">
          <span
            v-if="product.isNew"
            class="bg-primary text-white text-xs px-2 py-1 rounded-full font-semibold shadow-sm"
            >NEW</span
          >
          <span
            v-if="product.isHot"
            class="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-sm"
            >HOT</span
          >
          <span
            v-if="product.originalPrice"
            class="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-sm"
          >
            -{{
              Math.round(
                ((product.originalPrice - product.price) / product.originalPrice) * 100
              )
            }}%
          </span>
        </div>
        <div
          class="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <button
            @click.stop="toggleWishlist"
            class="w-8 h-8 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-200"
            :class="{
              'text-red-500': isWishlisted,
              'text-gray-400 hover:text-red-500': !isWishlisted,
            }"
          >
            <Heart class="w-4 h-4" :class="{ 'fill-current': isWishlisted }" />
          </button>
          <button
            @click.stop="handleQuickView"
            class="w-8 h-8 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-200 text-gray-400 hover:text-primary"
          >
            <Eye class="w-4 h-4" />
          </button>
        </div>
        <div
          class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100"
        >
          <button
            @click.stop="handleQuickAdd"
            :disabled="!product.inStock"
            class="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <ShoppingCart class="w-4 h-4" />
            <span>Quick Add</span>
          </button>
        </div>
        <div
          v-if="!product.inStock"
          class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center"
        >
          <span
            class="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold shadow-lg"
            >Out of Stock</span
          >
        </div>
      </div>

      <!-- Info -->
      <div class="p-3 sm:p-4 flex-1 flex flex-col">
        <p
          v-if="product.brand"
          class="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide font-medium"
        >
          {{ product.brand }}
        </p>
        <h3
          class="font-semibold text-gray-900 dark:text-white mb-2 cursor-pointer hover:text-primary transition-colors line-clamp-2 text-sm flex-1"
          @click="openModal"
        >
          {{ product.name }}
        </h3>

        <div
          class="mb-4 flex flex-col sm:flex-row items-center sm:items-center justify-between"
        >
          <div class="flex items-center space-x-2">
            <span class="text-lg font-bold text-gray-900 dark:text-white"
              >৳ {{ product.price }}</span
            >
            <span v-if="product.originalPrice" class="text-sm text-gray-500 line-through"
              >৳ {{ product.originalPrice }}</span
            >
          </div>
          <div class="flex items-center mb-3">
            <div class="flex text-yellow-400 mr-2">
              <Star
                v-for="star in 5"
                :key="star"
                :class="star <= Math.round(product.rating) ? 'fill-current' : ''"
                class="w-3 h-3"
              />
            </div>
            <span class="text-xs text-gray-500 dark:text-gray-400">{{
              product.rating
            }}</span>
            <span class="text-xs text-gray-400 dark:text-gray-500 ml-1"
              >({{ product.reviews }})</span
            >
          </div>
        </div>

        <button
          @click="handleAddToCart"
          :disabled="!product.inStock"
          class="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white py-2.5 px-4 rounded-xl transition-colors font-semibold text-sm flex items-center justify-center space-x-2 shadow-sm hover:shadow-md mt-auto"
        >
          <ShoppingBag class="w-4 h-4" />
          <span>{{ product.inStock ? "Add to Cart" : "Out of Stock" }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Heart, ShoppingCart, Star, ShoppingBag, Eye } from "lucide-vue-next";
import { useProductStore } from "@/stores/products";

const props = defineProps({ product: { type: Object, required: true } });
const productStore = useProductStore();
const isWishlisted = ref(false);

const openModal = () => productStore.openProductModal(props.product);
const handleAddToCart = () => productStore.addToCart(props.product);
const handleQuickAdd = () => productStore.addToCart(props.product);
const handleQuickView = () => productStore.openProductModal(props.product);
const toggleWishlist = () => {
  isWishlisted.value = !isWishlisted.value;
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.aspect-square {
  aspect-ratio: 1 / 1;
}
</style>
