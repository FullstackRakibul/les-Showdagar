<template>
  <section class="py-12 sm:py-16 lg:py-20 overflow-hidden bg-linear-to-b from-background via-card/30 to-background">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">

      <!-- Header -->
      <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 lg:mb-12">
        <div class="space-y-2">
          <div class="flex items-center gap-3">
            <div class="icon-badge">
              <HugeiconsIcon :icon="Video01Icon" :size="24" class="text-primary" />
            </div>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              Discover &amp; Clip to Cart <span class="text-gradient">Reels</span>
            </h2>
          </div>
          <p class="text-muted-foreground text-sm sm:text-base max-w-md">
            Watch, shop, and add to cart – all in one seamless experience
          </p>
        </div>

        <!-- Category Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto pb-2 lg:overflow-visible lg:flex-wrap scrollbar-hide">
          <button v-for="category in categories" :key="category.id" @click="activeCategory = category.id"
            class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap border transition-all duration-200"
            :class="activeCategory === category.id
              ? 'bg-primary/10 text-primary border-primary/30'
              : 'bg-muted/50 text-muted-foreground border-transparent hover:bg-muted hover:text-foreground'">
            <HugeiconsIcon :icon="category.icon" :size="16" />
            <span>{{ category.name }}</span>
          </button>
        </div>
      </div>

      <!-- Clips Scroll Container -->
      <div class="relative">
        <!-- Fade edges -->
        <div class="absolute top-0 bottom-0 left-0 w-14 z-10 pointer-events-none hidden lg:block"
          style="background: linear-gradient(90deg, var(--background), transparent)" />
        <div class="absolute top-0 bottom-0 right-0 w-14 z-10 pointer-events-none hidden lg:block"
          style="background: linear-gradient(-90deg, var(--background), transparent)" />

        <!-- Left scroll button -->
        <button
          class="absolute top-1/2 -translate-y-1/2 -left-5 z-20 w-11 h-11 hidden lg:flex items-center justify-center bg-card border border-border rounded-full text-foreground shadow-md transition-all duration-200 hover:bg-primary hover:text-white hover:border-primary"
          :class="{ 'opacity-0 pointer-events-none': !canScrollLeft }" @click="scrollLeft">
          <HugeiconsIcon :icon="ArrowLeft01Icon" :size="20" />
        </button>

        <!-- Right scroll button -->
        <button
          class="absolute top-1/2 -translate-y-1/2 -right-5 z-20 w-11 h-11 hidden lg:flex items-center justify-center bg-card border border-border rounded-full text-foreground shadow-md transition-all duration-200 hover:bg-primary hover:text-white hover:border-primary"
          :class="{ 'opacity-0 pointer-events-none': !canScrollRight }" @click="scrollRight">
          <HugeiconsIcon :icon="ArrowRight01Icon" :size="20" />
        </button>

        <!-- Scroll area -->
        <div ref="scrollContainer" class="flex gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          @scroll="updateScrollState">
          <div v-for="(clip, index) in filteredClips" :key="clip.id"
            class="shrink-0 w-37.5 min-[480px]:w-42.5 sm:w-45 md:w-50 lg:w-55 snap-start animate-fadeInUp"
            :style="{ animationDelay: `${index * 0.08}s` }">
            <ClipCard :clip="clip" orientation="vertical" @add-to-cart="handleAddToCart" @open-reel="openReel" />
          </div>

          <!-- View All card -->
          <div
            class="shrink-0 w-37.5 min-[480px]:w-42.5 sm:w-45 md:w-50 lg:w-55 snap-start rounded-2xl border border-dashed border-border flex flex-col items-center justify-center gap-3 p-4 cursor-pointer transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 group"
            @click="navigateToAllClips">
            <div
              class="w-14 h-14 rounded-full flex items-center justify-center text-primary transition-all duration-300 group-hover:translate-x-1"
              style="background: color-mix(in oklch, var(--primary) 15%, transparent)">
              <HugeiconsIcon :icon="ArrowRight01Icon" :size="28" />
            </div>
            <span class="font-semibold text-foreground">View All</span>
            <span class="text-xs text-muted-foreground">{{ totalClips }}+ Reels</span>
          </div>
        </div>
      </div>

      <!-- Stats bar -->
      <div class="flex flex-wrap justify-center gap-4 sm:gap-6 p-4 sm:p-5 mt-10 rounded-xl   backdrop-blur-sm">
        <div v-for="stat in stats" :key="stat.label"
          class="flex items-center gap-3 px-3 py-2 rounded-lg transition-all hover:bg-muted/50">
          <HugeiconsIcon :icon="stat.icon" :size="20" class="text-primary" />
          <div class="flex flex-col">
            <span class="font-bold text-foreground text-sm sm:text-base">{{ stat.value }}</span>
            <span class="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide">{{ stat.label }}</span>
          </div>
        </div>
      </div>

      <!-- Mobile View All Button -->
      <div class="mt-8 text-center lg:hidden flex justify-center">
        <Button size="lg" class="w-full max-w-md mx-auto group flex justify-center gap-3 items-center"
          @click="navigateToAllClips">
          <HugeiconsIcon :icon="Video01Icon" :size="18" class="mr-2" />
          Explore All Reels
          <HugeiconsIcon :icon="ArrowRight01Icon" :size="16"
            class="ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>

    </div>
  </section>

  <ClipReelModal
    v-model="reelOpen"
    :clips="filteredClips"
    :start-index="reelStartIndex"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useClipCartStore, type ClipProduct } from '@/stores/clipCart'
import { useCartStore } from '@/stores/cart'
import { useProductStore } from '@/stores/products'
import ClipCard from '@/components/clip/ClipCard.vue'
import ClipReelModal from '@/components/clip/ClipReelModal.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  ArrowRight01Icon,
  ArrowLeft01Icon,
  Video01Icon,
  CpuIcon,
  DiamondIcon,
  Airplane01Icon,
  GridIcon,
  ShoppingCart01Icon,
  ViewIcon,
  FireIcon,
} from '@hugeicons/core-free-icons'

const router = useRouter()
const clipCartStore = useClipCartStore()
const cartStore = useCartStore()
const productStore = useProductStore()

const categories = [
  { id: 'all', name: 'All', icon: GridIcon },
  { id: 'quantum', name: 'Tech', icon: CpuIcon },
  { id: 'elegance', name: 'Fashion', icon: DiamondIcon },
  { id: 'nextstop', name: 'Travel', icon: Airplane01Icon },
]

const activeCategory = ref('all')
const scrollContainer = ref<HTMLElement | null>(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(true)

const reelOpen = ref(false)
const reelStartIndex = ref(0)

function openReel(clip: ClipProduct) {
  const idx = filteredClips.value.findIndex(c => c.id === clip.id)
  reelStartIndex.value = idx >= 0 ? idx : 0
  reelOpen.value = true
}

const filteredClips = computed(() => {
  const clips = clipCartStore.featuredClips
  if (activeCategory.value === 'all') return clips
  return clips.filter(clip => clip.club === activeCategory.value)
})

const totalClips = computed(() => clipCartStore.featuredClips?.length * 8 || 50)

const stats = computed(() => [
  { icon: FireIcon, value: `${filteredClips.value.length}+`, label: 'Trending' },
  { icon: ViewIcon, value: '10K+', label: 'Views Today' },
  { icon: ShoppingCart01Icon, value: '500+', label: 'Purchased' },
])

const updateScrollState = () => {
  if (!scrollContainer.value) return
  const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.value
  canScrollLeft.value = scrollLeft > 10
  canScrollRight.value = scrollLeft < scrollWidth - clientWidth - 10
}

const scrollLeft = () => { scrollContainer.value?.scrollBy({ left: -280, behavior: 'smooth' }) }
const scrollRight = () => { scrollContainer.value?.scrollBy({ left: 280, behavior: 'smooth' }) }

const handleAddToCart = (clip: any) => {
  const product = productStore.products.find(p => p.id === clip.productId)
  if (product) { cartStore.addItem(product); router.push('/cart') }
}

const navigateToAllClips = () => { router.push('/clips') }

onMounted(() => { updateScrollState(); window.addEventListener('resize', updateScrollState) })
onUnmounted(() => { window.removeEventListener('resize', updateScrollState) })
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulseRing {

  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    transform: scale(1.2);
    opacity: 0;
  }
}

@keyframes gradientShift {

  0%,
  100% {
    background-position: 0% center;
  }

  50% {
    background-position: 100% center;
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
  opacity: 0;
}

.icon-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: color-mix(in oklch, var(--primary) 10%, transparent);
  border-radius: 12px;
  animation: pulseRing 2s ease-in-out infinite;
}

.text-gradient {
  background: linear-gradient(135deg, var(--primary), color-mix(in oklch, var(--primary) 60%, transparent), var(--primary));
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 3s ease infinite;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

@media (prefers-reduced-motion: reduce) {

  .animate-fadeInUp,
  .icon-badge,
  .text-gradient {
    animation: none !important;
    transition: none !important;
  }

  .animate-fadeInUp {
    opacity: 1;
    transform: none;
  }
}
</style>