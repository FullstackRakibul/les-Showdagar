<template>
  <div class="bg-gray-50/50 dark:bg-gray-950/30 rounded-2xl p-4 sm:p-6">
    <!-- Skeleton -->
    <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      <div v-for="i in skeletonCount" :key="i"
        class="bg-white dark:bg-gray-900 rounded-2xl aspect-3/4 animate-pulse border border-gray-100 dark:border-gray-800" />
    </div>

    <!-- Empty -->
    <div v-else-if="products.length === 0" class="py-20 text-center">
      <p class="text-gray-400 dark:text-gray-500 text-sm">
        No products found.
      </p>
      <slot name="empty" />
    </div>

    <!-- Grid -->
    <div v-else :class="['grid gap-4', gridClass]">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Product } from '@/types/index'

const props = withDefaults(
  defineProps<{
    products: Product[]
    loading?: boolean
    columns?: 2 | 3 | 4 | 5
    skeletonCount?: number
  }>(),
  { loading: false, columns: 4, skeletonCount: 8 }
)

const gridClass = computed(
  () =>
  ({
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
  }[props.columns])
)
</script>