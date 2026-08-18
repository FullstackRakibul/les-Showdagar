<template>
  <div class="clip-card group" :class="[`clip-card--${orientation}`, { 'clip-card--playing': isPlaying }]"
    @click="handleCardClick" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <!-- Video/Poster Container -->
    <div class="media-container">
      <img v-show="!isPlaying" :src="clip.posterUrl" :alt="clip.title" class="poster-image" loading="lazy" />

      <template v-if="clip.sourceType !== 'youtube'">
        <video v-show="isPlaying" ref="videoRef" :src="clip.videoUrl" :poster="clip.posterUrl" class="video-element"
          :muted="isMuted" loop playsinline @timeupdate="updateProgress" @loadedmetadata="onVideoLoaded" />
        <div v-if="isPlaying" class="progress-container">
          <div class="progress-bar" :style="{ width: `${progress}%` }" />
        </div>
      </template>

      <iframe v-else-if="isPlaying && iframeSrc" ref="iframeRef" :src="iframeSrc" class="video-element"
        frameborder="0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen />
    </div>

    <div class="gradient-overlay gradient-overlay--top" />
    <div class="gradient-overlay gradient-overlay--bottom" />

    <Transition name="fade">
      <div v-if="!isPlaying" class="play-button-container" @click.stop="emit('open-reel', clip)">
        <div class="play-button">
          <div class="play-button-ring" />
          <HugeiconsIcon :icon="PlayIcon" :size="24" class="play-icon" />
        </div>
      </div>
    </Transition>

    <div class="club-badge" :class="clubBadgeClass">
      <HugeiconsIcon :icon="clubIcon" :size="12" />
      <span>{{ clubName }}</span>
    </div>

    <div class="duration-badge">
      <HugeiconsIcon :icon="Video01Icon" :size="12" />
      <span>{{ formattedDuration }}</span>
    </div>

    <Transition name="fade">
      <button v-if="isPlaying && clip.sourceType !== 'youtube'" class="mute-toggle" @click.stop="toggleMute">
        <HugeiconsIcon :icon="isMuted ? VolumeMute01Icon : VolumeHighIcon" :size="16" />
      </button>
    </Transition>

    <div class="action-sidebar">
      <button class="action-btn" :class="{ 'action-btn--liked': isLiked }" @click.stop="handleLike">
        <div class="action-icon-wrapper">
          <HugeiconsIcon :icon="FavouriteIcon" :size="20" />
        </div>
        <span class="action-count">{{ formatCount(234) }}</span>
      </button>
      <button class="action-btn" @click.stop="handleShare">
        <div class="action-icon-wrapper">
          <HugeiconsIcon :icon="Share08Icon" :size="20" />
        </div>
        <span class="action-count">Share</span>
      </button>
      <button class="action-btn action-btn--cart" @click.stop="handleAddToCart">
        <div class="action-icon-wrapper action-icon-wrapper--cart">
          <HugeiconsIcon :icon="ShoppingCart01Icon" :size="20" />
        </div>
        <span class="action-count">Add</span>
      </button>
    </div>

    <div class="product-info">
      <h3 class="product-title">{{ clip.title }}</h3>
      <div class="product-pricing">
        <div class="price-group">
          <span class="current-price">৳{{ clip.price }}</span>
          <span v-if="clip.originalPrice" class="original-price">৳{{ clip.originalPrice }}</span>
          <span v-if="discountPercent" class="discount-badge">-{{ discountPercent }}%</span>
        </div>
        <Button size="sm" class="buy-now-btn group" @click.stop="handleBuyNow">
          <div class="flex flex-row items-center justify-around w-full gap-1">
            <span>Buy Now</span>
            <HugeiconsIcon :icon="ArrowRight01Icon" :size="14"
              class="buy-arrow group-hover:translate-x-0.5 transition-transform" />
          </div>
        </Button>
      </div>
    </div>

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
  (e: 'open-reel', clip: ClipProduct): void
}>()

const router = useRouter()
const clipCartStore = useClipCartStore()
const productStore = useProductStore()

const videoRef = ref<HTMLVideoElement | null>(null)
const iframeRef = ref<HTMLIFrameElement | null>(null)
const iframeSrc = ref('')
const isPlaying = ref(false)
const isHovered = ref(false)
const isMuted = ref(true)
const isLiked = ref(false)
const progress = ref(0)
const videoDuration = ref(0)

const clubInfo: Record<string, { name: string; class: string; icon: any }> = {
  quantum: { name: 'Tech', class: 'club-badge--quantum', icon: CpuIcon },
  elegance: { name: 'Fashion', class: 'club-badge--elegance', icon: DiamondIcon },
  nextstop: { name: 'Travel', class: 'club-badge--nextstop', icon: Airplane01Icon },
}

const clubName = computed(() => clubInfo[props.clip.club]?.name || 'Shop')
const clubBadgeClass = computed(() => clubInfo[props.clip.club]?.class || '')
const clubIcon = computed(() => clubInfo[props.clip.club]?.icon || CpuIcon)

const discountPercent = computed(() => {
  if (!props.clip.originalPrice) return 0
  return Math.round((1 - props.clip.price / props.clip.originalPrice) * 100)
})

const formattedDuration = computed(() => {
  const duration = props.clip.duration || 30
  const mins = Math.floor(duration / 60)
  const secs = duration % 60
  return mins > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : `0:${secs.toString().padStart(2, '0')}`
})

const formatCount = (count: number): string => {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
  return count.toString()
}

const updateProgress = () => {
  if (!videoRef.value) return
  const { currentTime, duration } = videoRef.value
  if (duration) progress.value = (currentTime / duration) * 100
}

const onVideoLoaded = () => {
  if (videoRef.value) videoDuration.value = videoRef.value.duration
}

const handleMouseEnter = () => {
  isHovered.value = true
  clipCartStore.trackView(props.clip.id)
  setTimeout(() => {
    if (!isHovered.value) return
    isPlaying.value = true
    if (props.clip.sourceType === 'youtube' && props.clip.youtubeId) {
      const id = props.clip.youtubeId
      iframeSrc.value = `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}`
    } else {
      setTimeout(() => { videoRef.value?.play() }, 100)
    }
  }, 400)
}

const handleMouseLeave = () => {
  isHovered.value = false
  isPlaying.value = false
  progress.value = 0
  if (props.clip.sourceType === 'youtube') {
    iframeSrc.value = ''
  } else {
    videoRef.value?.pause()
    if (videoRef.value) videoRef.value.currentTime = 0
  }
}

const handleCardClick = () => {
  clipCartStore.trackClick(props.clip.id)
  router.push(`/products?id=${props.clip.productId}`)
}

const handleAddToCart = () => {
  const product = productStore.products.find(p => p.id === props.clip.productId)
  if (product) {
    ; (productStore as any).addToCart(product)
    emit('add-to-cart', props.clip)
  }
}

const handleBuyNow = () => {
  handleAddToCart()
  router.push('/cart')
}

const handleLike = () => { isLiked.value = !isLiked.value }

const handleShare = async () => {
  if (!import.meta.client) return
  const url = window.location.origin + `/products?id=${props.clip.productId}`
  try {
    await navigator.share({ title: props.clip.title, text: `Check out this product: ${props.clip.title}`, url })
  } catch {
    navigator.clipboard.writeText(url)
  }
}

const toggleMute = () => { isMuted.value = !isMuted.value }

watch(isPlaying, (playing) => {
  if (playing) return
  iframeSrc.value = ''
  if (videoRef.value) {
    videoRef.value.pause()
    videoRef.value.currentTime = 0
  }
})

onUnmounted(() => {
  videoRef.value?.pause()
  iframeSrc.value = ''
})
</script>

<style scoped>
.clip-card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  background: var(--card);
  border: 1px solid var(--border);
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  transform: translateZ(0);
}

.clip-card--vertical {
  aspect-ratio: 9/16;
}

.clip-card--horizontal {
  aspect-ratio: 16/9;
}

.clip-card:hover {
  border-color: color-mix(in oklch, var(--primary) 40%, transparent);
  box-shadow:
    0 20px 40px -12px color-mix(in oklch, var(--foreground) 15%, transparent),
    0 0 0 1px color-mix(in oklch, var(--primary) 10%, transparent);
  transform: translateY(-4px) scale(1.02);
}

.clip-card--playing {
  border-color: color-mix(in oklch, var(--primary) 60%, transparent);
}

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

.progress-container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: color-mix(in oklch, var(--foreground) 20%, transparent);
  z-index: 30;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--primary), color-mix(in oklch, var(--primary) 80%, transparent));
  transition: width 0.1s linear;
  border-radius: 0 2px 2px 0;
}

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
  background: color-mix(in oklch, var(--primary) 90%, transparent);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.play-button:hover {
  transform: scale(1.1);
  background: var(--primary);
}

.play-button-ring {
  position: absolute;
  inset: -4px;
  border: 2px solid color-mix(in oklch, var(--primary) 40%, transparent);
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

/* quantum — oklch(0.55 0.18 220) blue */
.club-badge--quantum {
  background: color-mix(in oklch, oklch(0.55 0.18 220) 20%, transparent);
  color: oklch(0.80 0.12 220);
  border: 1px solid color-mix(in oklch, oklch(0.55 0.18 220) 30%, transparent);
}

/* elegance — oklch(0.55 0.22 300) purple */
.club-badge--elegance {
  background: color-mix(in oklch, oklch(0.55 0.22 300) 20%, transparent);
  color: oklch(0.80 0.14 300);
  border: 1px solid color-mix(in oklch, oklch(0.55 0.22 300) 30%, transparent);
}

/* nextstop — oklch(0.55 0.20 160) green */
.club-badge--nextstop {
  background: color-mix(in oklch, oklch(0.55 0.20 160) 20%, transparent);
  color: oklch(0.80 0.13 160);
  border: 1px solid color-mix(in oklch, oklch(0.55 0.20 160) 30%, transparent);
}

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
  color: oklch(0.70 0.22 25);
}

.action-btn--cart .action-icon-wrapper--cart {
  background: color-mix(in oklch, var(--primary) 30%, transparent);
}

.action-btn--cart:hover .action-icon-wrapper--cart {
  background: var(--primary);
}

.action-count {
  font-size: 10px;
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.product-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 20;
  padding: 16px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
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
  color: var(--primary);
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
  color: oklch(0.70 0.22 25);
  background: color-mix(in oklch, oklch(0.55 0.22 25) 20%, transparent);
  padding: 2px 6px;
  border-radius: 4px;
}

.buy-now-btn {
  flex-shrink: 0;
  flex-direction: row;
  background: var(--primary);
  color: var(--primary-foreground);
  border: none;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 10px;
  height: auto;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
  border-radius: 6px 12px 6px 12px;
}

.clip-card:hover .buy-now-btn {
  opacity: 1;
  transform: translateY(0);
}

.buy-now-btn:hover {
  background: color-mix(in oklch, var(--primary) 90%, transparent);
}

.buy-arrow {
  margin-left: 4px;
}

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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

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