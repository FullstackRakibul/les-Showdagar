<template>
  <div class="max-w-7xl mx-auto px-4 py-8 space-y-8">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold text-foreground">Browse</h1>
      <p class="text-sm text-muted-foreground mt-1">Shop by category across all RH Business Clubs</p>
    </div>

    <!-- Categories grid -->
    <section>
      <h2 class="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Categories</h2>
      <div v-if="categoryStore.loading" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div v-for="i in 10" :key="i" class="bg-muted rounded-2xl h-48 animate-pulse" />
      </div>
      <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <CategoryCard v-for="cat in categoryStore.categories" :key="cat.id" :category="cat" />
      </div>
    </section>

    <!-- All products -->
    <section>
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-sm font-semibold text-muted-foreground uppercase tracking-wider">All Products</h2>
        <div class="relative">
          <input v-model="productStore.searchQuery" type="text" placeholder="Search…"
            class="pl-3 pr-8 py-1.5 text-sm bg-muted border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring w-48 transition-shadow" />
        </div>
      </div>

      <!-- Category filter chips -->
      <div class="flex flex-wrap gap-2 mb-5">
        <button v-for="cat in productStore.categories" :key="cat.name" @click="productStore.selectedCategory = cat.name"
          :class="[
            'px-3 py-1 rounded-full text-xs font-medium transition-colors',
            productStore.selectedCategory === cat.name
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-secondary hover:text-foreground'
          ]">
          {{ cat.name }} <span class="opacity-60">({{ cat.count }})</span>
        </button>
      </div>

      <ProductGrid :products="productStore.filteredProducts" :loading="productStore.loading" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCategoryStore } from '@/stores/categories'
import { useProductStore } from '@/stores/products'

const categoryStore = useCategoryStore()
const productStore = useProductStore()

onMounted(async () => {
  await Promise.all([
    categoryStore.fetchCategories(),
    productStore.fetchProducts(),
  ])
})

useHead({ title: 'Browse — RH Business Club' })
</script>