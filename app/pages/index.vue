<template>
  <!-- Popular Products Section -->
  <section class="ml-64 w-full h-screen overflow-y-auto bg-gray-50">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-900">Popular Products</h2>
      <SfButton variant="tertiary" class="text-linkedin-blue">
        See all
      </SfButton>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
      <ProductCard v-for="product in popularProducts" :key="product.id" :product="product" />
    </div>
  </section>

  <!-- New Arrivals Section -->
  <section class="mb-8">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-900">New Arrivals</h2>
      <SfButton variant="tertiary" class="text-linkedin-blue">
        See all
      </SfButton>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <ProductCard v-for="product in newArrivals" :key="product.id" :product="product" />
    </div>
  </section>

  <!-- All Products Section -->
  <section v-if="filteredProducts.length > 0">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-900">
        {{ selectedCategory === 'All Products' ? 'All Products' : selectedCategory }}
        <span class="text-lg text-gray-500">({{ filteredProducts.length }})</span>
      </h2>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
    </div>
  </section>

  <!-- No Results -->
  <div v-else class="text-center py-12">
    <i class="fas fa-search text-4xl text-gray-300 mb-4"></i>
    <h3 class="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
    <p class="text-gray-500">Try adjusting your search or filter criteria</p>
  </div>
</template>
<script setup>
import { useProducts } from '@/composables/useProducts';
const { popularProducts, newArrivals, filteredProducts, selectedCategory } = useProducts();
import ProductCard from '@/components/ProductCard.vue';

</script>

<style scoped>
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-thumb {
  background-color: #cbd5e1; /* Tailwind gray-300 */
  border-radius: 4px;
}
::-webkit-scrollbar-track {
  background-color: #f3f4f6; /* Tailwind gray-200 */
}

</style>