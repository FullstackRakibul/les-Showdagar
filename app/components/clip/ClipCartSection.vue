<template>
  <section class="clip-section py-16 sm:py-20 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <!-- Animated Header -->
      <div class="section-header flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div class="header-content">
          <div class="flex items-center gap-3 mb-3">
            <div class="icon-badge">
              <HugeiconsIcon :icon="Video01Icon" :size="20" class="text-primary" />
            </div>
            <span class="text-xs font-semibold uppercase tracking-widest text-primary">Clip to Cart</span>
          </div>
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">
            Discover <span class="text-gradient">Reels</span>
          </h2>
          <p class="text-muted-foreground max-w-md">
            Watch, shop, and add to cart – all in one seamless experience
          </p>
        </div>

        <!-- Category Tabs -->
        <div class="category-tabs flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button v-for="category in categories" :key="category.id"
            :class="['tab-btn', { 'tab-btn--active': activeCategory === category.id }]"
            @click="activeCategory = category.id">
            <HugeiconsIcon :icon="category.icon" :size="16" />
            <span>{{ category.name }}</span>
          </button>
        </div>
      </div>

      <!-- Clips Horizontal Scroll Container -->
      <div class="clips-container relative">
        <!-- Gradient Fade Edges -->
        <div class="fade-edge fade-edge--left" />
        <div class="fade-edge fade-edge--right" />

        <!-- Scroll Buttons -->
        <button class="scroll-btn scroll-btn--left" @click="scrollLeft" :class="{ 'opacity-0': !canScrollLeft }">
          <HugeiconsIcon :icon="ArrowLeft01Icon" :size="20" />
        </button>
        <button class="scroll-btn scroll-btn--right" @click="scrollRight" :class="{ 'opacity-0': !canScrollRight }">
          <HugeiconsIcon :icon="ArrowRight01Icon" :size="20" />
        </button>

        <!-- Clips Scroll Area -->
        <div ref="scrollContainer" class="clips-scroll" @scroll="updateScrollState">
          <div v-for="(clip, index) in filteredClips" :key="clip.id" class="clip-wrapper"
            :style="{ animationDelay: `${index * 0.08}s` }">
            <ClipCard :clip="clip" orientation="vertical" @add-to-cart="handleAddToCart" />
          </div>

          <!-- View All Card -->
          <div class="view-all-card" @click="navigateToAllClips">
            <div class="view-all-content">
              <div class="view-all-icon">
                <HugeiconsIcon :icon="ArrowRight01Icon" :size="32" />
              </div>
              <span class="view-all-text">View All</span>
              <span class="view-all-count">{{ totalClips }}+ Reels</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Bar -->
      <div class="stats-bar mt-10">
        <div v-for="stat in stats" :key="stat.label" class="stat-item group">
          <HugeiconsIcon :icon="stat.icon" :size="20" class="stat-icon" />
          <div class="stat-content">
            <span class="stat-value">{{ stat.value }}</span>
            <span class="stat-label">{{ stat.label }}</span>
          </div>
        </div>
      </div>

      <!-- Mobile View All Button -->
      <div class="mt-8 text-center sm:hidden">
        <Button size="lg" class="w-full max-w-xs group" @click="navigateToAllClips">
          <HugeiconsIcon :icon="Video01Icon" :size="18" class="mr-2" />
          Explore All Reels
          <HugeiconsIcon :icon="ArrowRight01Icon" :size="16"
            class="ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useClipCartStore } from '@/stores/clipCart'
import { useProductStore } from '@/stores/products'
import { Button } from '@/components/ui/button'
import ClipCard from '@/components/clip/ClipCard.vue'

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
const productStore = useProductStore()

// Category tabs
const categories = [
  { id: 'all', name: 'All', icon: GridIcon },
  { id: 'quantum', name: 'Tech', icon: CpuIcon },
  { id: 'elegance', name: 'Fashion', icon: DiamondIcon },
  { id: 'nextstop', name: 'Travel', icon: Airplane01Icon },
]

const activeCategory = ref('all')

// Scroll state
const scrollContainer = ref<HTMLElement | null>(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(true)

// Filter clips by category
const filteredClips = computed(() => {
  const clips = clipCartStore.featuredClips
  if (activeCategory.value === 'all') return clips
  return clips.filter(clip => clip.club === activeCategory.value)
})

const totalClips = computed(() => clipCartStore.featuredClips?.length * 8 || 50)

// Stats
const stats = computed(() => [
  { icon: FireIcon, value: `${filteredClips.value.length}+`, label: 'Trending' },
  { icon: ViewIcon, value: '10K+', label: 'Views Today' },
  { icon: ShoppingCart01Icon, value: '500+', label: 'Purchased' },
])

// Scroll handlers
const updateScrollState = () => {
  if (!scrollContainer.value) return
  const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.value
  canScrollLeft.value = scrollLeft > 10
  canScrollRight.value = scrollLeft < scrollWidth - clientWidth - 10
}

const scrollLeft = () => {
  scrollContainer.value?.scrollBy({ left: -320, behavior: 'smooth' })
}

const scrollRight = () => {
  scrollContainer.value?.scrollBy({ left: 320, behavior: 'smooth' })
}

const handleAddToCart = (clip: any) => {
  const product = productStore.products.find(p => p.id === clip.productId)
  if (product) {
    productStore.addToCart(product)
    router.push('/cart')
  }
}

const navigateToAllClips = () => {
  router.push('/clips')
}

onMounted(() => {
  updateScrollState()
  window.addEventListener('resize', updateScrollState)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScrollState)
})
</script>

<style scoped>
/* Section Background */
.clip-section {
  position: relative;
  background: linear-gradient(180deg,
      hsl(var(--background)) 0%,
      hsl(var(--card) / 0.5) 50%,
      hsl(var(--background)) 100%);
}

/* Header Animation */
.section-header {
  animation: fadeInUp 0.6s ease-out forwards;
}

.header-content {
  animation: slideInLeft 0.6s ease-out forwards;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Icon Badge */
.icon-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: hsl(var(--primary) / 0.1);
  border-radius: 10px;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {

  0%,
  100% {
    box-shadow: 0 0 0 0 hsl(var(--primary) / 0.4);
  }

  50% {
    box-shadow: 0 0 0 8px hsl(var(--primary) / 0);
  }
}

/* Text Gradient */
.text-gradient {
  background: linear-gradient(135deg,
      hsl(var(--primary)),
      hsl(var(--primary) / 0.7),
      hsl(var(--primary)));
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient 3s ease infinite;
}

@keyframes gradient {

  0%,
  100% {
    background-position: 0% center;
  }

  50% {
    background-position: 100% center;
  }
}

/* Category Tabs */
.category-tabs {
  animation: fadeInRight 0.6s ease-out 0.2s forwards;
  opacity: 0;
}

@keyframes fadeInRight {
  to {
    opacity: 1;
  }
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  background: hsl(var(--muted) / 0.5);
  color: hsl(var(--muted-foreground));
  border: 1px solid transparent;
  transition: all 0.3s ease;
  cursor: pointer;
}

.tab-btn:hover {
  background: hsl(var(--muted));
  color: hsl(var(--foreground));
}

.tab-btn--active {
  background: hsl(var(--primary) / 0.1);
  color: hsl(var(--primary));
  border-color: hsl(var(--primary) / 0.3);
}

/* Clips Container */
.clips-container {
  position: relative;
}

/* Fade Edges */
.fade-edge {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 60px;
  z-index: 10;
  pointer-events: none;
}

.fade-edge--left {
  left: 0;
  background: linear-gradient(90deg, hsl(var(--background)), transparent);
}

.fade-edge--right {
  right: 0;
  background: linear-gradient(-90deg, hsl(var(--background)), transparent);
}

/* Scroll Buttons */
.scroll-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  border-radius: 50%;
  color: hsl(var(--foreground));
  cursor: pointer;
  box-shadow: 0 4px 20px hsl(var(--foreground) / 0.1);
  transition: all 0.3s ease;
}

.scroll-btn:hover {
  background: hsl(var(--primary));
  color: white;
  border-color: hsl(var(--primary));
  transform: translateY(-50%) scale(1.05);
}

.scroll-btn--left {
  left: -22px;
}

.scroll-btn--right {
  right: -22px;
}

@media (max-width: 768px) {
  .scroll-btn {
    display: none;
  }

  .fade-edge {
    width: 30px;
  }
}

/* Clips Scroll */
.clips-scroll {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding: 16px;
  padding: 8px 4px 16px;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.clips-scroll::-webkit-scrollbar {
  display: none;
}

/* Clip Wrapper */
.clip-wrapper {
  flex-shrink: 0;
  width: 180px;
  scroll-snap-align: start;
  animation: fadeInUp 0.5s ease-out forwards;
  opacity: 0;
}

@media (min-width: 640px) {
  .clip-wrapper {
    width: 200px;
  }
}

@media (min-width: 1024px) {
  .clip-wrapper {
    width: 220px;
  }
}

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

/* View All Card */
.view-all-card {
  flex-shrink: 0;
  width: 180px;
  aspect-ratio: 9/16;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg,
      hsl(var(--primary) / 0.1),
      hsl(var(--primary) / 0.05));
  border: 2px dashed hsl(var(--primary) / 0.3);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  scroll-snap-align: start;
}

.view-all-card:hover {
  background: linear-gradient(135deg,
      hsl(var(--primary) / 0.15),
      hsl(var(--primary) / 0.1));
  border-color: hsl(var(--primary) / 0.5);
  transform: scale(1.02);
}

.view-all-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
}

.view-all-icon {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: hsl(var(--primary) / 0.15);
  border-radius: 50%;
  color: hsl(var(--primary));
  transition: all 0.3s ease;
}

.view-all-card:hover .view-all-icon {
  background: hsl(var(--primary));
  color: white;
  transform: translateX(4px);
}

.view-all-text {
  font-weight: 600;
  color: hsl(var(--foreground));
}

.view-all-count {
  font-size: 12px;
  color: hsl(var(--muted-foreground));
}

@media (min-width: 640px) {
  .view-all-card {
    width: 200px;
  }
}

@media (min-width: 1024px) {
  .view-all-card {
    width: 220px;
  }
}

/* Stats Bar */
.stats-bar {
  display: flex;
  justify-content: center;
  gap: 24px;
  padding: 20px;
  background: hsl(var(--card) / 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid hsl(var(--border) / 0.5);
  border-radius: 16px;
  animation: fadeInUp 0.6s ease-out 0.4s forwards;
  opacity: 0;
}

@media (max-width: 640px) {
  .stats-bar {
    gap: 16px;
    padding: 16px;
  }
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: default;
}

.stat-item:hover {
  background: hsl(var(--muted) / 0.5);
}

.stat-icon {
  color: hsl(var(--primary));
  transition: transform 0.3s ease;
}

.stat-item:hover .stat-icon {
  transform: scale(1.2);
}

.stat-content {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-weight: 700;
  font-size: 16px;
  color: hsl(var(--foreground));
}

.stat-label {
  font-size: 11px;
  color: hsl(var(--muted-foreground));
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Scrollbar Hide Utility */
.scrollbar-hide {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {

  .section-header,
  .header-content,
  .category-tabs,
  .clip-wrapper,
  .stats-bar,
  .icon-badge,
  .text-gradient {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
</style>