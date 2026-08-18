<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="productStore.showProductModal && productStore.selectedProduct"
        class="fixed  inset-0 z-50 overflow-y-auto">

        <!-- Backdrop -->
        <div class="fixed inset-0 py-2 bg-black/55 backdrop-blur-sm" @click="productStore.closeProductModal" />

        <!-- Modal Container -->
        <div class="flex items-center justify-center min-h-screen px-4 py-8">
          <div
            class="relative bg-card border border-border rounded-lg shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden">

            <!-- Close Button -->
            <button @click="productStore.closeProductModal"
              class="absolute top-4 right-4 z-10 w-9 h-9 rounded-md bg-muted hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
              <HugeiconsIcon :icon="Cancel01Icon" :size="18" />
            </button>

            <!-- Two Panel Layout -->
            <div class="flex flex-col lg:flex-row max-h-[90vh]">

              <!-- Left Panel: Details -->
              <div class="lg:w-80 shrink-0 border-b lg:border-b-0 lg:border-r border-border bg-muted/30 flex flex-col">
                <div class="p-6 flex-1 overflow-y-auto">

                  <h2 class="text-sm font-semibold text-foreground mb-5 uppercase tracking-wider">
                    Product Details
                  </h2>

                  <!-- Product Name Field -->
                  <div class="mb-5">
                    <label
                      class="block text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5">
                      Template Name
                    </label>
                    <div
                      class="w-full px-3 py-2.5 bg-background border border-border rounded-md text-sm text-foreground truncate">
                      {{ product.name }}
                    </div>
                  </div>

                  <!-- Details List -->
                  <div class="space-y-1 mb-5">
                    <p class="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                      Details
                    </p>

                    <div class="flex items-center justify-between py-2.5 border-b border-border/60">
                      <span class="text-sm text-muted-foreground">Category</span>
                      <span :class="['text-xs font-medium px-2.5 py-1 rounded-md', categoryBadgeClass]">
                        {{ product.category }}
                      </span>
                    </div>

                    <div class="flex items-center justify-between py-2.5 border-b border-border/60">
                      <span class="text-sm text-muted-foreground">Status</span>
                      <span :class="[
                        'inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md',
                        product.inStock
                          ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400'
                          : 'bg-red-50 text-red-600 dark:bg-red-500/15 dark:text-red-400',
                      ]">
                        <span
                          :class="['w-1.5 h-1.5 rounded-full', product.inStock ? 'bg-emerald-500' : 'bg-red-500']" />
                        {{ product.inStock ? 'In Stock' : 'Out of Stock' }}
                      </span>
                    </div>

                    <div v-if="product.brand"
                      class="flex items-center justify-between py-2.5 border-b border-border/60">
                      <span class="text-sm text-muted-foreground">Brand</span>
                      <button @click="copyBrand"
                        class="text-xs font-medium px-3 py-1.5 rounded-md bg-background border border-border text-foreground hover:bg-secondary transition-colors">
                        {{ copiedBrand ? 'Copied!' : product.brand }}
                      </button>
                    </div>

                    <div class="flex items-center justify-between py-2.5 border-b border-border/60">
                      <span class="text-sm text-muted-foreground">Rating</span>
                      <div class="flex items-center gap-2">
                        <img :src="creatorAvatar" :alt="creatorName"
                          class="w-6 h-6 rounded-full object-cover ring-1 ring-border" />
                        <div class="flex items-center gap-1">
                          <HugeiconsIcon :icon="StarIcon" :size="13" class="text-amber-400 fill-amber-400" />
                          <span class="text-sm font-medium text-foreground">{{ product.rating }}</span>
                        </div>
                      </div>
                    </div>

                    <div class="flex items-center justify-between py-2.5 border-b border-border/60">
                      <span class="text-sm text-muted-foreground">Code</span>
                      <div class="flex items-center gap-1.5">
                        <HugeiconsIcon :icon="Calendar03Icon" :size="13" class="text-muted-foreground" />
                        <span class="text-sm text-foreground font-mono">{{ productCode }}</span>
                      </div>
                    </div>

                    <!-- Price Row -->
                    <div class="flex items-center justify-between pt-3">
                      <span class="text-sm text-muted-foreground">Price</span>
                      <div class="flex items-baseline gap-2">
                        <Price :amount="product.price" class="text-lg font-bold text-primary" />
                        <Price v-if="product.originalPrice" :amount="product.originalPrice" class="text-sm text-muted-foreground line-through" />
                      </div>
                    </div>
                    <div v-if="product.originalPrice" class="flex items-center justify-between pb-1">
                      <span class="text-sm text-muted-foreground">You Save</span>
                      <Price :amount="product.originalPrice - product.price" class="text-xs font-semibold px-2.5 py-1 rounded-md bg-red-50 text-red-600 dark:bg-red-500/15 dark:text-red-400" />
                    </div>
                  </div>
                </div>

                <!-- Bottom Actions -->
                <div class="p-4 border-t border-border">
                  <div class="flex gap-2 mb-2">
                    <button @click="handleAddToCart" :disabled="!product.inStock"
                      class="flex-1 flex items-center justify-center text-sm font-medium py-2.5 rounded-md border border-border bg-background text-foreground hover:bg-secondary active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                      Add to Cart
                    </button>
                    <button @click="handleBuyNow" :disabled="!product.inStock"
                      class="flex-1 flex items-center justify-center text-sm font-medium py-2.5 rounded-md bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                      Buy Now
                    </button>
                  </div>
                  <button @click="productStore.closeProductModal"
                    class="w-full py-1.5 text-xs font-medium text-muted-foreground hover:text-destructive flex items-center justify-center gap-1 transition-colors">
                    <HugeiconsIcon :icon="Delete01Icon" :size="13" />
                    Close
                  </button>
                </div>
              </div>

              <!-- Right Panel: Main Content -->
              <div class="flex-1 p-6 m-2 lg:p-8 overflow-y-auto bg-card">

                <!-- Title -->
                <h2 class="text-xl font-bold text-foreground mb-5 pr-10">{{ product.name }}</h2>

                <!-- Product Image -->
                <div class="relative mb-5 rounded-md overflow-hidden bg-muted group">
                  <img :src="product.image" :alt="product.name" class="w-full aspect-video object-cover" />

                  <!-- Badges -->
                  <div class="absolute top-4 left-4 flex gap-2">
                    <span v-if="product.isNew"
                      class="bg-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-sm">
                      NEW
                    </span>
                    <span v-if="product.isHot"
                      class="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-sm">
                      HOT
                    </span>
                  </div>

                  <!-- Image indicator dots -->
                  <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-white" />
                    <span v-for="i in 3" :key="i" class="w-1.5 h-1.5 rounded-full bg-white/40" />
                  </div>
                </div>

                <!-- Features Section -->
                <div class="mb-5">
                  <p class="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                    Features
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <span v-for="feature in productFeatures" :key="feature" :class="[
                      'text-xs font-medium px-2.5 py-1 rounded-md border',
                      featureColors[feature] || 'bg-muted text-muted-foreground border-border',
                    ]">
                      {{ feature }}
                    </span>
                  </div>
                </div>

                <!-- Description -->
                <div class="bg-muted/50 rounded-md p-4 border border-border">
                  <p class="text-sm text-muted-foreground leading-relaxed">{{ product.description }}</p>
                </div>

                <!-- Engagement Bar -->
                <div class="mt-5 flex items-center justify-between pt-4 border-t border-border">
                  <div class="flex items-center gap-5">
                    <button @click="toggleLike" class="flex items-center gap-1.5 text-sm transition-colors"
                      :class="isLiked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'">
                      <HugeiconsIcon :icon="FavouriteIcon" :size="17" :class="isLiked ? 'fill-red-500' : ''" />
                      <span class="font-medium text-xs">{{ likeCount }}</span>
                    </button>

                    <div class="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <HugeiconsIcon :icon="AiInnovationIcon" :size="17" />
                      <span class="font-medium text-xs">{{ product.reviews }}</span>
                    </div>

                    <button
                      class="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <HugeiconsIcon :icon="Share08Icon" :size="17" />
                      <span class="font-medium text-xs">{{ shareCount }}</span>
                    </button>
                  </div>

                  <div class="flex items-center gap-1">
                    <HugeiconsIcon :icon="StarIcon" :size="15" class="text-amber-400 fill-amber-400" />
                    <span class="text-sm font-bold text-foreground">{{ product.rating }}</span>
                    <span class="text-xs text-muted-foreground">/ 5</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import { useTheme } from '@/composables/useTheme'
import { HugeiconsIcon } from '@hugeicons/vue'
import type { Product } from '@/types/index'
import {
  Cancel01Icon,
  FavouriteIcon,
  StarIcon,
  AiInnovationIcon,
  Share08Icon,
  Delete01Icon,
  Calendar03Icon,
} from '@hugeicons/core-free-icons'

const router = useRouter()
const productStore = useProductStore()
const cartStore = useCartStore()
const { load } = useTheme()

onMounted(load)

const product = computed(() => productStore.selectedProduct || ({} as Product))
const isLiked = ref(false)
const likeCount = ref(Math.floor(Math.random() * 500) + 50)
const shareCount = ref(Math.floor(Math.random() * 100) + 20)
const copiedBrand = ref(false)

const categoryColors: Record<string, string> = {
  Electronics: 'bg-sky-50 text-sky-600 dark:bg-sky-500/15 dark:text-sky-400',
  Gaming: 'bg-violet-50 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400',
  Photography: 'bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400',
  Audio: 'bg-rose-50 text-rose-600 dark:bg-rose-500/15 dark:text-rose-400',
  Computers: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400',
  Accessories: 'bg-teal-50 text-teal-600 dark:bg-teal-500/15 dark:text-teal-400',
  Sports: 'bg-orange-50 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400',
  Footwear: 'bg-pink-50 text-pink-600 dark:bg-pink-500/15 dark:text-pink-400',
  Wearables: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-500/15 dark:text-cyan-400',
  'Smart Home': 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400',
}

const categoryBadgeClass = computed(
  () => categoryColors[product.value.category] || 'bg-muted text-muted-foreground'
)

const creatorInfo = computed(() => {
  const map: Record<string, { name: string; avatar: string }> = {
    Electronics: { name: 'TechReviewer', avatar: 'https://i.pravatar.cc/150?u=tech' },
    Sports: { name: 'SportsPro', avatar: 'https://i.pravatar.cc/150?u=sports' },
    Gaming: { name: 'GameMaster', avatar: 'https://i.pravatar.cc/150?u=gaming' },
    Photography: { name: 'PhotoExpert', avatar: 'https://i.pravatar.cc/150?u=photo' },
    default: { name: 'RH Club', avatar: 'https://i.pravatar.cc/150?u=default' },
  }
  return map[product.value.category] || map.default
})

const creatorName = computed(() => creatorInfo.value.name)
const creatorAvatar = computed(() => creatorInfo.value.avatar)

const productCode = computed(() => {
  const prefix = product.value.category?.slice(0, 3).toUpperCase() || 'PRD'
  const id = String(product.value.id || 0).padStart(4, '0')
  return `${prefix}-${id}`
})

const productFeatures = computed(() => {
  const f: string[] = []
  if (product.value.isNew) f.push('New Arrival')
  if (product.value.isHot) f.push('Trending')
  if (product.value.inStock) f.push('In Stock')
  else f.push('Out of Stock')
  if (product.value.brand) f.push(product.value.brand)
  f.push(product.value.category || 'General')
  return [...new Set(f)].slice(0, 6)
})

const featureColors: Record<string, string> = {
  'New Arrival': 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/30',
  'Trending': 'bg-red-50 text-red-600 border-red-200 dark:bg-red-500/15 dark:text-red-400 dark:border-red-500/30',
  'In Stock': 'bg-sky-50 text-sky-600 border-sky-200 dark:bg-sky-500/15 dark:text-sky-400 dark:border-sky-500/30',
  'Out of Stock': 'bg-muted text-muted-foreground border-border',
}

function copyBrand() {
  if (product.value.brand) {
    navigator.clipboard.writeText(product.value.brand)
    copiedBrand.value = true
    setTimeout(() => (copiedBrand.value = false), 1500)
  }
}

function toggleLike() {
  isLiked.value = !isLiked.value
  likeCount.value += isLiked.value ? 1 : -1
}

function handleAddToCart() {
  if (product.value?.inStock) {
    cartStore.addItem(product.value)
    productStore.closeProductModal()
  }
}

function handleBuyNow() {
  if (product.value?.inStock) {
    cartStore.addItem(product.value)
    productStore.closeProductModal()
    router.push('/checkout')
  }
}

</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from>div>div>div,
.modal-leave-to>div>div>div {
  transform: scale(0.97) translateY(8px);
  transition: transform 0.25s ease;
}
</style>