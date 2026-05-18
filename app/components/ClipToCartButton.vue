<template>
  <button
    ref="btnRef"
    @click="handleClip"
    :disabled="!props.product.inStock || clipping"
    :class="[
      'relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      props.product.inStock
        ? 'bg-primary text-primary-foreground hover:opacity-90 active:scale-95'
        : 'bg-muted text-muted-foreground cursor-not-allowed opacity-60',
      clipping ? 'scale-95' : '',
      props.class ?? '',
    ]"
  >
    <HugeiconsIcon :icon="ShoppingCart01Icon" :size="15" />
    <span>{{ clipping ? 'Added!' : props.product.inStock ? 'Clip to Cart' : 'Out of Stock' }}</span>
    <span v-if="clipping" class="absolute inset-0 rounded-xl animate-ping bg-primary/20 pointer-events-none" />
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useClipAnimation } from '@/composables/useClipAnimation'
import type { Product } from '@/types/index'
import { HugeiconsIcon } from '@hugeicons/vue'
import { ShoppingCart01Icon } from '@hugeicons/core-free-icons'

const props = withDefaults(defineProps<{
  product: Product
  selectedColor?: string
  selectedSize?: string
  quantity?: number
  class?: string
}>(), { quantity: 1 })

const emit = defineEmits<{ clip: [product: Product] }>()

const cartStore = useCartStore()
const { flyToCart } = useClipAnimation()
const btnRef = ref<HTMLElement | null>(null)
const clipping = ref(false)

function handleClip() {
  if (!props.product.inStock || clipping.value) return
  cartStore.addItem(props.product, props.quantity, props.selectedColor, props.selectedSize)
  if (btnRef.value) flyToCart(btnRef.value)
  clipping.value = true
  emit('clip', props.product)
  setTimeout(() => { clipping.value = false }, 1200)
}
</script>
