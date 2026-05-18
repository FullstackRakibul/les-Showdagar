<template>
  <div class="max-w-7xl mx-auto px-4 py-8 space-y-6">
    <!-- Breadcrumb -->
    <div class="flex items-center gap-2 text-xs text-muted-foreground">
      <NuxtLink to="/browse" class="hover:text-foreground transition-colors">Browse</NuxtLink>
      <span>›</span>
      <span class="text-foreground font-medium">{{ category?.name ?? slug }}</span>
    </div>

    <!-- Category header -->
    <div v-if="category" class="flex items-start gap-4">
      <div class="relative h-24 w-40 rounded-2xl overflow-hidden shrink-0">
        <img :src="category.image" :alt="category.name" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
      </div>
      <div>
        <h1 class="text-2xl font-bold text-foreground">{{ category.name }}</h1>
        <p class="text-sm text-muted-foreground mt-1">{{ category.description }}</p>
        <p class="text-xs text-muted-foreground mt-2">{{ products.length }} products</p>
      </div>
    </div>

    <!-- Products -->
    <ProductGrid :products="products" :loading="loading" :skeleton-count="8">
      <template #empty>
        <div class="mt-4">
          <NuxtLink to="/browse" class="text-sm font-medium text-foreground underline underline-offset-2">
            View all categories
          </NuxtLink>
        </div>
      </template>
    </ProductGrid>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCategoryStore } from '@/stores/categories'
import { useProductStore } from '@/stores/products'
import type { Product, Category } from '@/types/index'

const route = useRoute()
const slug = route.params.slug as string

const categoryStore = useCategoryStore()
const productStore = useProductStore()

const category = ref<Category | undefined>()
const products = ref<Product[]>([])
const loading = ref(true)

onMounted(async () => {
  await categoryStore.fetchCategories()
  category.value = categoryStore.getCategoryBySlug(slug)
  await productStore.fetchProducts(slug)
  products.value = productStore.products.filter(p => p.categoryId === slug)
  loading.value = false
})

useHead(() => ({ title: `${category.value?.name ?? slug} — RH Business Club` }))
</script>