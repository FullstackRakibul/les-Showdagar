<template>
  <div class="clip-card group" :class="[`clip-card--${orientation}`, { 'clip-card--playing': isPlaying }]"
    @click="handleCardClick" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">

    <!-- Video/Poster Container -->
    <div class="media-container">
      <!-- Poster Image -->
      <img v-show="!isPlaying" :src="clip.posterUrl" :alt="clip.title" class="poster-image" loading="lazy" />

      <!-- Video Element -->
      <video v-show="isPlaying" ref="videoRef" :src="clip.videoUrl" :poster="clip.posterUrl" class="video-element"
        :muted="isMuted" loop playsinline @timeupdate="updateProgress" @loadedmetadata="onVideoLoaded" />

      <!-- Video Progress Bar -->
      <div v-if="isPlaying" class="progress-container">
        <div class="progress-bar" :style="{ width: `${progress}%` }" />
      </div>
    </div>

    <!-- Gradient Overlays -->
    <div class="gradient-overlay gradient-overlay--top" />
    <div class="gradient-overlay gradient-overlay--bottom" />

    <!-- Play Button (Centered) -->
    <Transition name="fade">
      <div v-if="!isPlaying" class="play-button-container">
        <div class="play-button">
          <div class="play-button-ring" />
          <HugeiconsIcon :icon="PlayIcon" :size="24" class="play-icon" />
        </div>
      </div>
    </Transition>

    <!-- Club Badge -->
    <div class="club-badge" :class="clubBadgeClass">
      <HugeiconsIcon :icon="clubIcon" :size="12" />
      <span>{{ clubName }}</span>
    </div>

    <!-- Duration Badge -->
    <div class="duration-badge">
      <HugeiconsIcon :icon="Video01Icon" :size="12" />
      <span>{{ formattedDuration }}</span>
    </div>

    <!-- Mute Toggle -->
    <Transition name="fade">
      <button v-if="isPlaying" class="mute-toggle" @click.stop="toggleMute">
        <HugeiconsIcon :icon="isMuted ? VolumeMute01Icon : VolumeHighIcon" :size="16" />
      </button>
    </Transition>

    <!-- Action Sidebar -->
    <div class="action-sidebar">
      <!-- Like Button -->
      <button class="action-btn" :class="{ 'action-btn--liked': isLiked }" @click.stop="handleLike">
        <div class="action-icon-wrapper">
          <HugeiconsIcon :icon="FavouriteIcon" :size="20" />
        </div>
        <span class="action-count">{{ formatCount(234) }}</span>
      </button>

      <!-- Share Button -->
      <button class="action-btn" @click.stop="handleShare">
        <div class="action-icon-wrapper">
          <HugeiconsIcon :icon="Share08Icon" :size="20" />
        </div>
        <span class="action-count">Share</span>
      </button>

      <!-- Add to Cart Button -->
      <button class="action-btn action-btn--cart" @click.stop="handleAddToCart">
        <div class="action-icon-wrapper action-icon-wrapper--cart">
          <HugeiconsIcon :icon="ShoppingCart01Icon" :size="20" />
        </div>
        <span class="action-count">Add</span>
      </button>
    </div>

    <!-- Product Info Bar -->
    <div class="product-info">
      <h3 class="product-title">{{ clip.title }}</h3>

      <div class="product-pricing">
        <div class="price-group">
          <span class="current-price">৳{{ clip.price }}</span>
          <span v-if="clip.originalPrice" class="original-price">৳{{ clip.originalPrice }}</span>
          <span v-if="discountPercent" class="discount-badge">-{{ discountPercent }}%</span>
        </div>

        <Button size="sm" class="buy-now-btn group" @click.stop="handleBuyNow">
          <span>Buy Now</span>
          <HugeiconsIcon :icon="ArrowRight01Icon" :size="14"
            class="buy-arrow group-hover:translate-x-0.5 transition-transform" />
        </Button>
      </div>
    </div>

    <!-- Views Counter -->
    <div class="views-counter" v-if="isPlaying">
      <HugeiconsIcon :icon="ViewIcon" :size="14" />
      <span>{{ formatCount(1234) }} views</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useClipCartStore, type ClipProduct } from '@/stores/clipCart'
import { useProductStore } from '@/stores/products'
import { Button } from '@/components/ui/button'

import { HugeiconsIcon } from '@hugeicons/vue'
import {
  ShoppingCart01Icon,
  PlayIcon,
  FavouriteIcon,
  Share08Icon,
  Video01Icon,
  ViewIcon,
  ArrowRight01Icon,
  VolumeHighIcon,
  VolumeMute01Icon,
  CpuIcon,
  DiamondIcon,
  Airplane01Icon,
} from '@hugeicons/core-free-icons'

const props = withDefaults(defineProps<{
  clip: ClipProduct
  orientation?: 'vertical' | 'horizontal'
}>(), {
  orientation: 'vertical'
})

const emit = defineEmits<{
  (e: 'add-to-cart', clip: ClipProduct): void
}>()

const router = useRouter()
const clipCartStore = useClipCartStore()
const productStore = useProductStore()

// Refs
const videoRef = ref<HTMLVideoElement | null>(null)
const isPlaying = ref(false)
const isHovered = ref(false)
const isMuted = ref(true)
const isLiked = ref(false)
const progress = ref(0)
const videoDuration = ref(0)

// Club information
const clubInfo: Record<string, { name: string; class: string; icon: any }> = {
  quantum: { name: 'Tech', class: 'club-badge--quantum', icon: CpuIcon },
  elegance: { name: 'Fashion', class: 'club-badge--elegance', icon: DiamondIcon },
  nextstop: { name: 'Travel', class: 'club-badge--nextstop', icon: Airplane01Icon },
}

const clubName = computed(() => clubInfo[props.clip.club]?.name || 'Shop')
const clubBadgeClass = computed(() => clubInfo[props.clip.club]?.class || '')
const clubIcon = computed(() => clubInfo[props.clip.club]?.icon || CpuIcon)

// Discount calculation
const discountPercent = computed(() => {
  if (!props.clip.originalPrice) return 0
  return Math.round((1 - props.clip.price / props.clip.originalPrice) * 100)
})

// Format duration
const formattedDuration = computed(() => {
  const duration = props.clip.duration || 30
  const mins = Math.floor(duration / 60)
  const secs = duration % 60
  return mins > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : `0:${secs.toString().padStart(2, '0')}`
})

// Format count (1234 -> 1.2K)
const formatCount = (count: number): string => {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
  return count.toString()
}

// Video progress update
const updateProgress = () => {
  if (!videoRef.value) return
  const { currentTime, duration } = videoRef.value
  if (duration) {
    progress.value = (currentTime / duration) * 100
  }
}

const onVideoLoaded = () => {
  if (videoRef.value) {
    videoDuration.value = videoRef.value.duration
  }
}

// Mouse handlers
const handleMouseEnter = () => {
  isHovered.value = true
  clipCartStore.trackView(props.clip.id)

  setTimeout(() => {
    if (isHovered.value) {
      isPlaying.value = true
      setTimeout(() => {
        videoRef.value?.play()
      }, 100)
    }
  }, 400)
}

const handleMouseLeave = () => {
  isHovered.value = false
  isPlaying.value = false
  progress.value = 0
  videoRef.value?.pause()
  if (videoRef.value) {
    videoRef.value.currentTime = 0
  }
}

// Action handlers
const handleCardClick = () => {
  clipCartStore.trackClick(props.clip.id)
  router.push(`/products?id=${props.clip.productId}`)
}

const handleAddToCart = () => {
  const product = productStore.products.find(p => p.id === props.clip.productId)
  if (product) {
    productStore.addToCart(product)
    emit('add-to-cart', props.clip)
  }
}

const handleBuyNow = () => {
  handleAddToCart()
  router.push('/cart')
}

const handleLike = () => {
  isLiked.value = !isLiked.value
}

const handleShare = async () => {
  try {
    await navigator.share({
      title: props.clip.title,
      text: `Check out this product: ${props.clip.title}`,
      url: window.location.origin + `/products?id=${props.clip.productId}`
    })
  } catch {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(window.location.origin + `/products?id=${props.clip.productId}`)
  }
}

const toggleMute = () => {
  isMuted.value = !isMuted.value
}

// Watch for playing state
watch(isPlaying, (playing) => {
  if (!playing && videoRef.value) {
    videoRef.value.pause()
    videoRef.value.currentTime = 0
  }
})

onUnmounted(() => {
  videoRef.value?.pause()
})
</script>

<style scoped>
/* Base Card Styles */
.clip-card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  transform: translateZ(0);
}

.clip-card--vertical {
  aspect-ratio: 9/16;
}

.clip-card--horizontal {
  aspect-ratio: 16/9;
}

/* Hover Effects */
.clip-card:hover {
  border-color: hsl(var(--primary) / 0.4);
  box-shadow:
    0 20px 40px -12px hsl(var(--foreground) / 0.15),
    0 0 0 1px hsl(var(--primary) / 0.1);
  transform: translateY(-4px) scale(1.02);
}

.clip-card--playing {
  border-color: hsl(var(--primary) / 0.6);
}

/* Media Container */
.media-container {
  position: absolute;
  inset: 0;
}

.poster-image,
.video-element {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.clip-card:hover .poster-image {
  transform: scale(1.05);
}

/* Progress Bar */
.progress-container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: hsl(var(--foreground) / 0.2);
  z-index: 30;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary) / 0.8));
  transition: width 0.1s linear;
  border-radius: 0 2px 2px 0;
}

/* Gradient Overlays */
.gradient-overlay {
  position: absolute;
  left: 0;
  right: 0;
  pointer-events: none;
  z-index: 5;
}

.gradient-overlay--top {
  top: 0;
  height: 80px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, transparent 100%);
}

.gradient-overlay--bottom {
  bottom: 0;
  height: 140px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, transparent 100%);
}

/* Play Button */
.play-button-container {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 15;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.clip-card:hover .play-button-container {
  opacity: 1;
}

.play-button {
  position: relative;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: hsl(var(--primary) / 0.9);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.play-button:hover {
  transform: scale(1.1);
  background: hsl(var(--primary));
}

.play-button-ring {
  position: absolute;
  inset: -4px;
  border: 2px solid hsl(var(--primary) / 0.4);
  border-radius: 50%;
  animation: ringPulse 2s ease-in-out infinite;
}

@keyframes ringPulse {

  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    transform: scale(1.15);
    opacity: 0;
  }
}

.play-icon {
  color: white;
  margin-left: 2px;
}

/* Club Badge */
.club-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.club-badge--quantum {
  background: rgba(59, 130, 246, 0.2);
  color: rgb(147, 197, 253);
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.club-badge--elegance {
  background: rgba(168, 85, 247, 0.2);
  color: rgb(216, 180, 254);
  border: 1px solid rgba(168, 85, 247, 0.3);
}

.club-badge--nextstop {
  background: rgba(16, 185, 129, 0.2);
  color: rgb(110, 231, 183);
  border: 1px solid rgba(16, 185, 129, 0.3);
}

/* Duration Badge */
.duration-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 6px;
  color: white;
  font-size: 11px;
  font-weight: 500;
}

/* Mute Toggle */
.mute-toggle {
  position: absolute;
  top: 50px;
  right: 12px;
  z-index: 25;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  border: none;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mute-toggle:hover {
  background: rgba(0, 0, 0, 0.7);
  transform: scale(1.1);
}

/* Action Sidebar */
.action-sidebar {
  position: absolute;
  right: 10px;
  bottom: 100px;
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: 16px;
  opacity: 0;
  transform: translateX(10px);
  transition: all 0.3s ease;
}

.clip-card:hover .action-sidebar {
  opacity: 1;
  transform: translateX(0);
}

.action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  background: none;
  border: none;
  cursor: pointer;
  color: white;
  transition: all 0.2s ease;
}

.action-btn:hover {
  transform: scale(1.1);
}

.action-icon-wrapper {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  transition: all 0.2s ease;
}

.action-btn:hover .action-icon-wrapper {
  background: rgba(255, 255, 255, 0.25);
}

.action-btn--liked .action-icon-wrapper {
  background: rgba(239, 68, 68, 0.2);
  color: rgb(248, 113, 113);
}

.action-btn--cart .action-icon-wrapper--cart {
  background: hsl(var(--primary) / 0.3);
}

.action-btn--cart:hover .action-icon-wrapper--cart {
  background: hsl(var(--primary));
}

.action-count {
  font-size: 10px;
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

/* Product Info */
.product-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 20;
  padding: 16px;
}

.product-title {
  font-size: 13px;
  font-weight: 600;
  color: white;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  transition: color 0.2s ease;
}

.clip-card:hover .product-title {
  color: hsl(var(--primary));
}

.product-pricing {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.price-group {
  display: flex;
  align-items: baseline;
  gap: 6px;
  flex-wrap: wrap;
}

.current-price {
  font-size: 18px;
  font-weight: 700;
  color: white;
}

.original-price {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: line-through;
}

.discount-badge {
  font-size: 10px;
  font-weight: 600;
  color: rgb(248, 113, 113);
  background: rgba(239, 68, 68, 0.2);
  padding: 2px 6px;
  border-radius: 4px;
}

.buy-now-btn {
  flex-shrink: 0;
  background: hsl(var(--primary));
  color: white;
  border: none;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 12px;
  height: auto;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
}

.clip-card:hover .buy-now-btn {
  opacity: 1;
  transform: translateY(0);
}

.buy-now-btn:hover {
  background: hsl(var(--primary) / 0.9);
}

.buy-arrow {
  margin-left: 4px;
}

/* Views Counter */
.views-counter {
  position: absolute;
  bottom: 100px;
  left: 12px;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 11px;
}

/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {

  .clip-card,
  .play-button,
  .action-sidebar,
  .buy-now-btn,
  .play-button-ring {
    animation: none !important;
    transition: none !important;
  }
}
</style>