<template>
  <div class="group rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    :style="{ '--product-hue': hue }" :class="cardBgClass">

    <!-- Image Area -->
    <div class="relative p-2 pb-0">
      <div class="relative rounded-md overflow-hidden bg-background/20 cursor-pointer" @click="openModal">
        <img :src="product.image" :alt="product.name"
          class="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105" />

        <!-- Out of stock overlay -->
        <div v-if="!product.inStock" class="absolute inset-0 bg-background/75 flex items-center justify-center">
          <span
            class="text-xs font-medium text-muted-foreground bg-background/90 border border-border px-3 py-1 rounded-md">
            Out of Stock
          </span>
        </div>

        <!-- Wishlist -->
        <button @click.stop="isWishlisted = !isWishlisted"
          class="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 border border-border/40 flex items-center justify-center transition-all hover:scale-105 backdrop-blur-sm">
          <HugeiconsIcon :icon="FavouriteIcon" :size="15"
            :class="isWishlisted ? 'text-red-500 fill-red-500' : 'text-muted-foreground'" />
        </button>
      </div>
    </div>

    <!-- Content -->
    <div class="p-3 pt-2.5 flex items-end justify-between gap-2">
      <div class="min-w-0 flex-1">
        <h3 class="text-sm font-medium text-foreground truncate cursor-pointer hover:text-primary transition-colors"
          @click="openModal">
          {{ product.name }}
        </h3>
        <div class="flex items-baseline gap-1.5 mt-1">
          <Price :amount="product.price" class="text-base font-bold text-foreground" />
          <Price v-if="product.originalPrice" :amount="product.originalPrice" class="text-xs text-muted-foreground line-through" />
        </div>
      </div>

      <!-- Arrow Button -->
      <button @click.stop="openModal"
        class="w-9 h-9 rounded-md bg-background/60 backdrop-blur-sm border border-border/50 flex items-center justify-center text-foreground transition-all hover:bg-background hover:scale-105 shrink-0">
        <HugeiconsIcon :icon="ArrowUpRightIcon" :size="16" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useProductStore } from '@/stores/products'
import type { Product } from '@/types/index'
import { HugeiconsIcon } from '@hugeicons/vue'
import { FavouriteIcon, ArrowUpRightIcon } from '@hugeicons/core-free-icons'

const props = defineProps<{ product: Product }>()

const productStore = useProductStore()
const isWishlisted = ref(false)

const hue = computed(() => ((props.product.id * 47) % 360).toString())

const cardBgClass = computed(
  () => `bg-[hsl(var(--product-hue),10%,40%)] dark:bg-[hsl(var(--product-hue),12%,85%)]`
)

function openModal() {
  productStore.openProductModal(props.product)
}
</script>