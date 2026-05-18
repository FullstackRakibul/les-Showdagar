<template>
  <div class="group overflow-hidden bg-card border border-border hover:border-muted-foreground/30 transition-all rounded-2xl hover:shadow-sm">
    <!-- Image -->
    <div class="relative cursor-pointer" @click="openModal">
      <img :src="product.image" :alt="product.name" class="w-full aspect-square object-cover" />

      <!-- Club badge -->
      <div class="absolute top-2.5 left-2.5">
        <span :class="['text-[10px] font-semibold px-2 py-0.5 rounded-full', clubBadgeClass]">{{ clubName }}</span>
      </div>

      <!-- Wishlist -->
      <div class="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <button @click.stop="isWishlisted = !isWishlisted"
          class="w-7 h-7 rounded-full bg-card/90 border border-border flex items-center justify-center hover:bg-card transition-colors">
          <HugeiconsIcon :icon="FavouriteIcon" :size="14" :class="isWishlisted ? 'text-red-500' : 'text-muted-foreground'" />
        </button>
      </div>

      <!-- Out of stock overlay -->
      <div v-if="!product.inStock" class="absolute inset-0 bg-background/70 flex items-center justify-center">
        <span class="text-xs font-medium text-muted-foreground bg-card border border-border px-3 py-1 rounded-full">Out of Stock</span>
      </div>

      <!-- New / Hot badges -->
      <div v-if="product.isNew || product.isHot" class="absolute bottom-2 left-2.5">
        <span v-if="product.isNew" class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-nextstop-500 text-white mr-1">NEW</span>
        <span v-if="product.isHot" class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-elegance-500 text-white">HOT</span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-3 space-y-2">
      <div>
        <h3 class="text-sm font-medium text-foreground line-clamp-2 leading-snug">{{ product.name }}</h3>
        <div class="flex items-center gap-1 mt-1">
          <HugeiconsIcon :icon="StarIcon" :size="12" class="text-yellow-500" />
          <span class="text-[11px] text-muted-foreground">{{ product.rating }} · {{ product.reviews }}</span>
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-baseline gap-1.5">
          <span class="text-base font-semibold text-foreground">৳{{ product.price }}</span>
          <span v-if="product.originalPrice" class="text-xs text-muted-foreground line-through">৳{{ product.originalPrice }}</span>
        </div>

        <!-- Clip button -->
        <button ref="clipBtnRef" :disabled="!product.inStock || clipping"
          @click.stop="handleClip"
          :class="[
            'w-8 h-8 rounded-xl flex items-center justify-center transition-all',
            product.inStock
              ? 'bg-primary text-primary-foreground hover:opacity-90 active:scale-90'
              : 'bg-muted text-muted-foreground cursor-not-allowed',
          ]">
          <HugeiconsIcon :icon="ShoppingCart01Icon" :size="14" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useProductStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import { useClipAnimation } from '@/composables/useClipAnimation'
import type { Product } from '@/types/index'
import { HugeiconsIcon } from '@hugeicons/vue'
import { FavouriteIcon, StarIcon, ShoppingCart01Icon } from '@hugeicons/core-free-icons'

const props = defineProps<{ product: Product }>()

const productStore = useProductStore()
const cartStore = useCartStore()
const { flyToCart } = useClipAnimation()

const isWishlisted = ref(false)
const clipping = ref(false)
const clipBtnRef = ref<HTMLElement | null>(null)

const clubMapping: Record<string, { name: string; class: string }> = {
  Electronics: { name: 'Quantum', class: 'bg-quantum-500/20 text-quantum-500' },
  Gaming:      { name: 'Quantum', class: 'bg-quantum-500/20 text-quantum-500' },
  Photography: { name: 'Quantum', class: 'bg-quantum-500/20 text-quantum-500' },
  Audio:       { name: 'Quantum', class: 'bg-quantum-500/20 text-quantum-500' },
  Computers:   { name: 'Quantum', class: 'bg-quantum-500/20 text-quantum-500' },
  Accessories: { name: 'Quantum', class: 'bg-quantum-500/20 text-quantum-500' },
  Sports:      { name: 'NextStop', class: 'bg-nextstop-500/20 text-nextstop-500' },
  Footwear:    { name: 'Elegance', class: 'bg-elegance-500/20 text-elegance-500' },
  Wearables:   { name: 'Elegance', class: 'bg-elegance-500/20 text-elegance-500' },
  'Smart Home':{ name: 'NextStop', class: 'bg-nextstop-500/20 text-nextstop-500' },
  default:     { name: 'RH Club', class: 'bg-muted text-muted-foreground' },
}

const clubInfo = computed(() => clubMapping[props.product.category] ?? clubMapping.default)
const clubName = computed(() => clubInfo.value.name)
const clubBadgeClass = computed(() => clubInfo.value.class)

function openModal() { productStore.openProductModal(props.product) }

function handleClip() {
  if (!props.product.inStock || clipping.value) return
  cartStore.addItem(props.product)
  if (clipBtnRef.value) flyToCart(clipBtnRef.value)
  clipping.value = true
  setTimeout(() => { clipping.value = false }, 1000)
}
</script>
