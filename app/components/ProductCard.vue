<template>
  <Card class="group overflow-hidden bg-card border-border hover:border-muted-foreground/30 transition-colors">
    <!-- Product Image -->
    <div class="relative cursor-pointer" @click="openModal">
      <img :src="product.image" :alt="product.name" class="w-full aspect-square object-cover" />

      <!-- Club Badge -->
      <div class="absolute top-3 left-3">
        <Badge :class="clubBadgeClass" class="text-xs">
          {{ clubName }}
        </Badge>
      </div>

      <!-- Quick Actions -->
      <div class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="secondary" size="icon" class="w-8 h-8 bg-card/90" @click.stop="toggleWishlist">
          <HugeiconsIcon :icon="FavouriteIcon" :size="16" :class="{ 'text-red-500': isWishlisted }" />
        </Button>
      </div>

      <!-- Stock Status -->
      <div v-if="!product.inStock" class="absolute inset-0 bg-background/80 flex items-center justify-center">
        <span class="text-sm font-medium text-muted-foreground">Out of Stock</span>
      </div>
    </div>

    <!-- Content -->
    <CardContent class="p-4 space-y-3">
      <!-- Name & Rating -->
      <div>
        <h3 class="font-medium text-foreground text-sm line-clamp-2 leading-snug">
          {{ product.name }}
        </h3>
        <div class="flex items-center gap-1 mt-1">
          <HugeiconsIcon :icon="StarIcon" :size="14" class="text-yellow-500" />
          <span class="text-xs text-muted-foreground">{{ product.rating }}</span>
          <span class="text-xs text-muted-foreground">·</span>
          <span class="text-xs text-muted-foreground">{{ product.reviews }} reviews</span>
        </div>
      </div>

      <!-- Price & Action -->
      <div class="flex items-center justify-between">
        <div class="flex items-baseline gap-2">
          <span class="text-lg font-semibold text-foreground">৳{{ product.price }}</span>
          <span v-if="product.originalPrice" class="text-sm text-muted-foreground line-through">
            ৳{{ product.originalPrice }}
          </span>
        </div>
        <Button size="sm" variant="outline" :disabled="!product.inStock" @click.stop="handleAddToCart">
          <HugeiconsIcon :icon="ShoppingCart01Icon" :size="16" />
        </Button>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useProductStore, type Product } from '@/stores/products'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import { HugeiconsIcon } from '@hugeicons/vue'
import {
  FavouriteIcon,
  StarIcon,
  ShoppingCart01Icon,
} from '@hugeicons/core-free-icons'

const props = defineProps<{
  product: Product
}>()

const productStore = useProductStore()
const isWishlisted = ref(false)

// Club mapping based on category
const clubMapping: Record<string, { name: string; class: string }> = {
  'Electronics': { name: 'Quantum', class: 'bg-quantum-500/20 text-quantum-500 border-quantum-500/30' },
  'Gaming': { name: 'Quantum', class: 'bg-quantum-500/20 text-quantum-500 border-quantum-500/30' },
  'Photography': { name: 'Quantum', class: 'bg-quantum-500/20 text-quantum-500 border-quantum-500/30' },
  'Sports': { name: 'Elegance', class: 'bg-elegance-500/20 text-elegance-500 border-elegance-500/30' },
  'Fashion': { name: 'Elegance', class: 'bg-elegance-500/20 text-elegance-500 border-elegance-500/30' },
  'default': { name: 'RH Club', class: 'bg-muted text-muted-foreground' },
}

const clubInfo = computed(() => clubMapping[props.product.category] || clubMapping.default)
const clubName = computed(() => clubInfo.value.name)
const clubBadgeClass = computed(() => clubInfo.value.class)

const openModal = () => {
  productStore.openProductModal(props.product)
}

const handleAddToCart = () => {
  productStore.addToCart(props.product)
}

const toggleWishlist = () => {
  isWishlisted.value = !isWishlisted.value
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>