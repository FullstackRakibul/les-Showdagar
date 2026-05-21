<template>
  <div class="relative min-h-screen bg-background/80 backdrop-blur-sm p-8 overflow-hidden">
    <div class="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div class="orb orb--products-1" />
      <div class="orb orb--products-2" />
    </div>

    <div class="relative z-10 space-y-6">
      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold text-foreground">Products</h1>
          <p class="mt-1 text-muted-foreground">Discover our premium collection</p>
        </div>
        <div class="flex items-center gap-3">
          <select v-model="sortBy"
            class="px-4 py-2 bg-card border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors">
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
          <button
            class="p-2 bg-card/80 backdrop-blur-sm border border-border/60 rounded-xl hover:border-primary/40 hover:bg-card transition-all duration-200">
            <Filter class="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      <!-- Filters Bar -->
      <div class="bg-card/80 backdrop-blur-sm border border-border/60 rounded-2xl p-5 shadow-sm">
        <div class="flex flex-wrap items-center gap-3">
          <span class="text-sm font-medium text-muted-foreground shrink-0">Categories:</span>
          <div class="flex flex-wrap gap-2">
            <button v-for="category in productStore.categories" :key="category.name"
              @click="productStore.selectedCategory = category.name" :class="[
                'px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 border',
                productStore.selectedCategory === category.name
                  ? 'bg-primary/10 text-primary border-primary/30'
                  : 'bg-muted/50 text-muted-foreground border-transparent hover:bg-muted hover:text-foreground'
              ]">
              {{ category.name }} ({{ category.count }})
            </button>
          </div>
        </div>
      </div>

      <!-- Products Grid -->
      <div v-if="sortedProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <ProductCard v-for="product in sortedProducts" :key="product.id" :product="product" />
      </div>

      <!-- Empty State -->
      <div v-else class="flex flex-col items-center py-20 text-center">
        <div
          class="w-24 h-24 mb-6 mx-auto rounded-2xl bg-card/80 backdrop-blur-sm border border-border/60 flex items-center justify-center shadow-sm">
          <Package class="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 class="text-xl font-semibold text-foreground mb-2">No products found</h3>
        <p class="text-muted-foreground">Try adjusting your filters or search terms</p>
      </div>
    </div>

    <ProductModal />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Filter, Package } from 'lucide-vue-next'
import { useProductStore } from '@/stores/products'

const productStore = useProductStore()
const sortBy = ref('name')

const sortedProducts = computed(() => {
  const products = [...productStore.filteredProducts]
  switch (sortBy.value) {
    case 'price-low': return products.sort((a, b) => a.price - b.price)
    case 'price-high': return products.sort((a, b) => b.price - a.price)
    case 'rating': return products.sort((a, b) => b.rating - a.rating)
    default: return products.sort((a, b) => a.name.localeCompare(b.name))
  }
})
</script>

<style scoped>
.orb--products-1,
.orb--products-2 {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
}

.orb--products-1 {
  width: 500px;
  height: 500px;
  top: -200px;
  right: -100px;
  background: radial-gradient(circle, oklch(0.55 0.18 220 / 0.07), transparent);
  animation: drift 22s ease-in-out infinite;
}

.orb--products-2 {
  width: 400px;
  height: 400px;
  bottom: 100px;
  left: -120px;
  background: radial-gradient(circle, oklch(0.55 0.22 300 / 0.05), transparent);
  animation: drift 28s ease-in-out infinite reverse;
}

@keyframes drift {

  0%,
  100% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(30px, -40px);
  }
}

@media (prefers-reduced-motion: reduce) {

  .orb--products-1,
  .orb--products-2 {
    animation: none;
  }
}
</style>