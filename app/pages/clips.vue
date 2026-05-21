<template>
  <div class="min-h-screen bg-background">
    <!-- Hero Header -->
    <section class="relative overflow-hidden bg-gradient-to-b from-card/30 to-background pt-12 pb-8">
      <div class="absolute inset-0 pointer-events-none">
        <div class="orb orb--clips-1" />
        <div class="orb orb--clips-2" />
      </div>
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <h1 class="text-3xl sm:text-4xl font-bold text-foreground mb-3">
          All Reels
        </h1>
        <p class="text-muted-foreground max-w-md mx-auto">
          Browse, watch, and shop from our entire collection of short product videos
        </p>
      </div>
    </section>

    <!-- Filter Bar -->
    <div class="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-border/50 py-3">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <button v-for="cat in categories" :key="cat.id" @click="activeCategory = cat.id" class="category-chip"
              :class="{ 'category-chip--active': activeCategory === cat.id }">
              <HugeiconsIcon :icon="cat.icon" :size="16" />
              <span>{{ cat.name }}</span>
            </button>
          </div>
          <div class="text-sm text-muted-foreground">
            {{ filteredClips.length }} clips
          </div>
        </div>
      </div>
    </div>

    <!-- Clips Grid -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div v-if="isLoading" class="flex justify-center items-center py-20">
        <div class="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>

      <div v-else-if="filteredClips.length === 0" class="text-center py-20">
        <div class="w-24 h-24 mx-auto mb-6 rounded-2xl bg-muted/50 flex items-center justify-center">
          <HugeiconsIcon :icon="Video01Icon" :size="40" class="text-muted-foreground" />
        </div>
        <h3 class="text-xl font-semibold text-foreground mb-2">No clips found</h3>
        <p class="text-muted-foreground mb-6">Try changing the category filter</p>
        <Button @click="activeCategory = 'all'">View all clips</Button>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 auto-rows-fr">
        <ClipCard v-for="clip in filteredClips" :key="clip.id" :clip="clip" orientation="vertical"
          @add-to-cart="handleAddToCart" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useClipCartStore } from '@/stores/clipCart'
import { useCartStore } from '@/stores/cart'
import { useProductStore } from '@/stores/products'
import ClipCard from '@/components/clip/ClipCard.vue'

import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Video01Icon,
  GridIcon,
  CpuIcon,
  DiamondIcon,
  Airplane01Icon,
} from '@hugeicons/core-free-icons'

const router = useRouter()
const clipStore = useClipCartStore()
const cartStore = useCartStore()
const productStore = useProductStore()

const isLoading = ref(false)
const activeCategory = ref('all')

const categories = [
  { id: 'all', name: 'All', icon: GridIcon },
  { id: 'quantum', name: 'Tech', icon: CpuIcon },
  { id: 'elegance', name: 'Fashion', icon: DiamondIcon },
  { id: 'nextstop', name: 'Travel', icon: Airplane01Icon },
]

// Get clips from store (already populated with mock data)
const allClips = computed(() => {
  if (clipStore.featuredClips?.length) return clipStore.featuredClips
  // Fallback mock data
  return [
    { id: '1', productId: 1, videoUrl: '/video/clip-electronics.mp4', posterUrl: '/images/poster1.jpg', title: 'Wireless Headphones', description: '', price: 99.99, club: 'quantum' as const, duration: 30, featured: true },
    // ... more fallback items
  ]
})

const filteredClips = computed(() => {
  if (activeCategory.value === 'all') return allClips.value
  return allClips.value.filter(clip => clip.club === activeCategory.value)
})

const handleAddToCart = (clip: any) => {
  const product = productStore.products.find(p => p.id === clip.productId)
  if (product) {
    cartStore.addItem(product)
    router.push('/cart')
  }
}
// Optional: fetch clips if store has async action
onMounted(async () => {
  if (clipStore.featuredClips?.length === 0 && clipStore.fetchAllClips) {
    isLoading.value = true
    await clipStore.fetchAllClips()
    isLoading.value = false
  }
})

// Page SEO
useHead({
  title: 'All Reels | RH Business Club',
  meta: [{ name: 'description', content: 'Watch and shop from our collection of product reels across Tech, Fashion, and Travel clubs.' }]
})
</script>

<style scoped>
/* Animated background orbs */
.orb--clips-1,
.orb--clips-2 {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
}

.orb--clips-1 {
  width: 400px;
  height: 400px;
  top: -150px;
  right: -100px;
  background: radial-gradient(circle, oklch(0.55 0.18 220 / 0.08), transparent);
  animation: drift 20s ease-in-out infinite;
}

.orb--clips-2 {
  width: 350px;
  height: 350px;
  bottom: -100px;
  left: -80px;
  background: radial-gradient(circle, oklch(0.55 0.22 300 / 0.06), transparent);
  animation: drift 24s ease-in-out infinite reverse;
}

@keyframes drift {

  0%,
  100% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(20px, -30px);
  }
}

/* Category chips */
.category-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 9999px;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  background: hsl(var(--muted) / 0.5);
  color: hsl(var(--muted-foreground));
  border: 1px solid transparent;
  transition: all 0.2s ease;
}

.category-chip:hover {
  background: hsl(var(--muted));
  color: hsl(var(--foreground));
}

.category-chip--active {
  background: hsl(var(--primary) / 0.1);
  color: hsl(var(--primary));
  border-color: hsl(var(--primary) / 0.3);
}

/* Hide scrollbar */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

@media (prefers-reduced-motion: reduce) {

  .orb--clips-1,
  .orb--clips-2 {
    animation: none;
  }
}
</style>