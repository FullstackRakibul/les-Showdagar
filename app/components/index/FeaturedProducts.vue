<template>
  <section class="py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <!-- Header -->
      <div class="flex items-end justify-between mb-8">
        <div>
          <h2 class="text-2xl sm:text-3xl font-semibold text-foreground mb-2">
            Featured Products
          </h2>
          <p class="text-muted-foreground">
            Handpicked selections from our collection
          </p>
        </div>
        <Button variant="ghost" size="sm" class="hidden sm:flex" @click="navigateToProducts">
          View All
          <HugeiconsIcon :icon="ArrowRight01Icon" :size="16" class="ml-1" />
        </Button>
      </div>

      <!-- Product Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        <ProductCard v-for="product in featuredProducts" :key="product.id" :product="product" />
      </div>

      <!-- Mobile View All -->
      <div class="mt-8 text-center sm:hidden">
        <Button variant="outline" size="sm" @click="navigateToProducts">
          View All Products
          <HugeiconsIcon :icon="ArrowRight01Icon" :size="16" class="ml-1" />
        </Button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/products'
import ProductCard from '@/components/product/ProductCard.vue'

import { HugeiconsIcon } from '@hugeicons/vue'
import { ArrowRight01Icon } from '@hugeicons/core-free-icons'

const router = useRouter()
const productStore = useProductStore()

const featuredProducts = computed(() => productStore.products.slice(0, 8))

const navigateToProducts = () => {
  router.push('/products')
}
</script>