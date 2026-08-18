<template>
  <!-- Backdrop -->
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="modelValue" class="reel-backdrop" @click.self="close">

        <!-- Close -->
        <button class="reel-close" @click="close" aria-label="Close">
          <HugeiconsIcon :icon="Cancel01Icon" :size="22" />
        </button>

        <!-- Nav arrows -->
        <button v-if="hasPrev" class="reel-nav reel-nav--prev" @click="prev" aria-label="Previous">
          <HugeiconsIcon :icon="ArrowUp01Icon" :size="22" />
        </button>
        <button v-if="hasNext" class="reel-nav reel-nav--next" @click="next" aria-label="Next">
          <HugeiconsIcon :icon="ArrowDown01Icon" :size="22" />
        </button>

        <!-- Reel container -->
        <div class="reel-container" @touchstart="onTouchStart" @touchend="onTouchEnd">

          <!-- Video / iframe -->
          <div class="reel-media">
            <!-- YouTube -->
            <iframe v-if="clip.sourceType === 'youtube' && clip.youtubeId"
              :src="`https://www.youtube.com/embed/${clip.youtubeId}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&loop=1&playlist=${clip.youtubeId}&rel=0`"
              class="reel-video" frameborder="0" allow="autoplay; encrypted-media; picture-in-picture"
              allowfullscreen />
            <!-- Local -->
            <video v-else-if="clip.sourceType === 'local' && clip.videoUrl" ref="videoRef" :src="clip.videoUrl"
              :poster="clip.posterUrl" class="reel-video" :muted="isMuted" loop playsinline autoplay
              @timeupdate="onTimeUpdate" @loadedmetadata="onLoaded" @waiting="isBuffering = true"
              @canplay="isBuffering = false" />
            <!-- Fallback poster -->
            <img v-else :src="clip.posterUrl" :alt="clip.title" class="reel-video reel-poster-fallback" />

            <!-- Buffering spinner -->
            <Transition name="fade">
              <div v-if="isBuffering" class="reel-buffering">
                <div class="buffering-ring" />
              </div>
            </Transition>

            <!-- Progress bar (local only) -->
            <div v-if="clip.sourceType === 'local'" class="reel-progress-track" @click="seekTo">
              <div class="reel-progress-fill" :style="{ width: `${progress}%` }" />
            </div>
          </div>

          <!-- Gradient overlays -->
          <div class="reel-grad reel-grad--top" />
          <div class="reel-grad reel-grad--bottom" />

          <!-- Top info -->
          <div class="reel-top">
            <div class="reel-club-badge" :class="`reel-club-badge--${clip.club}`">
              <HugeiconsIcon :icon="clubIcon" :size="13" />
              <span>{{ clubName }}</span>
            </div>
            <div class="reel-duration">
              <HugeiconsIcon :icon="Video01Icon" :size="13" />
              <span>{{ formattedDuration }}</span>
            </div>
          </div>

          <!-- Right action sidebar -->
          <div class="reel-sidebar">
            <!-- Mute -->
            <button class="sidebar-btn" @click="toggleMute" :title="isMuted ? 'Unmute' : 'Mute'">
              <div class="sidebar-icon-wrap">
                <HugeiconsIcon :icon="isMuted ? VolumeMute01Icon : VolumeHighIcon" :size="22" />
              </div>
            </button>

            <!-- Like / Wishlist -->
            <button class="sidebar-btn" :class="{ 'sidebar-btn--liked': isLiked }" @click="toggleLike">
              <div class="sidebar-icon-wrap">
                <HugeiconsIcon :icon="isLiked ? FavouriteIcon : FavouriteIcon" :size="22"
                  :class="isLiked ? 'text-red-400' : ''" />
              </div>
              <span class="sidebar-label">{{ isLiked ? 'Saved' : 'Save' }}</span>
            </button>

            <!-- Share -->
            <button class="sidebar-btn" @click="handleShare">
              <div class="sidebar-icon-wrap">
                <HugeiconsIcon :icon="Share08Icon" :size="22" />
              </div>
              <span class="sidebar-label">Share</span>
            </button>

            <!-- Add to cart -->
            <button class="sidebar-btn sidebar-btn--cart" @click="handleAddToCart"
              :class="{ 'sidebar-btn--added': justAdded }">
              <div class="sidebar-icon-wrap sidebar-icon-wrap--cart">
                <HugeiconsIcon :icon="justAdded ? Tick01Icon : ShoppingCart01Icon" :size="22" />
              </div>
              <span class="sidebar-label">{{ justAdded ? 'Added!' : 'Cart' }}</span>
            </button>
          </div>

          <!-- Bottom product info -->
          <div class="reel-bottom">
            <h3 class="reel-title">{{ clip.title }}</h3>
            <p class="reel-desc">{{ clip.description }}</p>

            <div class="reel-price-row">
              <div class="reel-price-group">
                <span class="reel-price">৳{{ clip.price.toLocaleString() }}</span>
                <span v-if="clip.originalPrice" class="reel-original-price">৳{{ clip.originalPrice.toLocaleString()
                  }}</span>
                <span v-if="discountPercent" class="reel-discount">-{{ discountPercent }}%</span>
              </div>

              <button class="reel-buy-btn" @click="handleBuyNow">
                <span>Buy Now</span>
                <HugeiconsIcon :icon="ArrowRight01Icon" :size="16" />
              </button>
            </div>
          </div>

          <!-- Clip counter dots (mobile) -->
          <div class="reel-dots" v-if="clips.length > 1">
            <span v-for="(_, i) in clips" :key="i" class="reel-dot"
              :class="{ 'reel-dot--active': i === currentIndex }" />
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useClipCartStore, type ClipProduct } from '@/stores/clipCart'
import { useCartStore } from '@/stores/cart'
import { useProductStore } from '@/stores/products'

import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Cancel01Icon,
  ArrowUp01Icon,
  ArrowDown01Icon,
  ArrowRight01Icon,
  ShoppingCart01Icon,
  FavouriteIcon,
  Share08Icon,
  Video01Icon,
  VolumeHighIcon,
  VolumeMute01Icon,
  Tick01Icon,
  CpuIcon,
  DiamondIcon,
  Airplane01Icon,
} from '@hugeicons/core-free-icons'

const props = defineProps<{
  modelValue: boolean
  clips: ClipProduct[]
  startIndex?: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
}>()

const router = useRouter()
const clipStore = useClipCartStore()
const cartStore = useCartStore()
const productStore = useProductStore()

const videoRef = ref<HTMLVideoElement | null>(null)
const currentIndex = ref(props.startIndex ?? 0)
const isMuted = ref(true)
const isLiked = ref(false)
const isBuffering = ref(false)
const justAdded = ref(false)
const progress = ref(0)

const clip = computed(() => props.clips[currentIndex.value])
const hasPrev = computed(() => currentIndex.value > 0)
const hasNext = computed(() => currentIndex.value < props.clips.length - 1)

const clubInfo: Record<string, { name: string; icon: any }> = {
  quantum: { name: 'Tech', icon: CpuIcon },
  elegance: { name: 'Fashion', icon: DiamondIcon },
  nextstop: { name: 'Travel', icon: Airplane01Icon },
}
const clubName = computed(() => clubInfo[clip.value?.club]?.name || 'Shop')
const clubIcon = computed(() => clubInfo[clip.value?.club]?.icon || CpuIcon)

const discountPercent = computed(() => {
  if (!clip.value?.originalPrice) return 0
  return Math.round((1 - clip.value.price / clip.value.originalPrice) * 100)
})

const formattedDuration = computed(() => {
  const d = clip.value?.duration || 0
  const m = Math.floor(d / 60)
  const s = d % 60
  return m > 0 ? `${m}:${s.toString().padStart(2, '0')}` : `0:${s.toString().padStart(2, '0')}`
})

function close() { emit('update:modelValue', false) }

function prev() {
  if (hasPrev.value) { currentIndex.value--; resetVideo() }
}
function next() {
  if (hasNext.value) { currentIndex.value++; resetVideo() }
}

function resetVideo() {
  progress.value = 0
  isBuffering.value = false
  isLiked.value = false
  nextTick(() => {
    if (videoRef.value) {
      videoRef.value.currentTime = 0
      videoRef.value.play().catch(() => { })
    }
  })
}

function onTimeUpdate() {
  if (!videoRef.value) return
  const { currentTime, duration } = videoRef.value
  if (duration) progress.value = (currentTime / duration) * 100
}

function onLoaded() {
  isBuffering.value = false
  videoRef.value?.play().catch(() => { })
}

function seekTo(e: MouseEvent) {
  if (!videoRef.value) return
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  const ratio = (e.clientX - rect.left) / rect.width
  videoRef.value.currentTime = ratio * videoRef.value.duration
}

function toggleMute() {
  isMuted.value = !isMuted.value
  if (videoRef.value) videoRef.value.muted = isMuted.value
}

function toggleLike() { isLiked.value = !isLiked.value }

async function handleShare() {
  if (!import.meta.client) return
  const url = window.location.origin + `/products?id=${clip.value.productId}`
  try {
    await navigator.share({ title: clip.value.title, text: clip.value.description, url })
  } catch {
    navigator.clipboard.writeText(url)
  }
}

function handleAddToCart() {
  const product = productStore.products.find(p => p.id === clip.value.productId)
  if (product) {
    cartStore.addItem(product)
    clipStore.trackClick(clip.value.id)
    justAdded.value = true
    setTimeout(() => { justAdded.value = false }, 1800)
  }
}

function handleBuyNow() {
  handleAddToCart()
  close()
  router.push('/cart')
}

// Touch swipe
let touchStartY = 0
function onTouchStart(e: TouchEvent) { touchStartY = e.touches[0].clientY }
function onTouchEnd(e: TouchEvent) {
  const delta = touchStartY - e.changedTouches[0].clientY
  if (delta > 60) next()
  else if (delta < -60) prev()
}

// Keyboard nav
function onKeydown(e: KeyboardEvent) {
  if (!props.modelValue) return
  if (e.key === 'Escape') close()
  if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') prev()
  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next()
  if (e.key === 'm') toggleMute()
}

// Sync startIndex when modal opens
watch(() => props.startIndex, (v) => { if (v !== undefined) currentIndex.value = v })

watch(() => props.modelValue, (open) => {
  if (open) {
    currentIndex.value = props.startIndex ?? 0
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeydown)
    nextTick(() => {
      videoRef.value?.play().catch(() => { })
    })
  } else {
    document.body.style.overflow = ''
    window.removeEventListener('keydown', onKeydown)
    videoRef.value?.pause()
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped>
/* ── Backdrop ── */
.reel-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

/* ── Container: fixed 9:16 reel card ── */
.reel-container {
  position: relative;
  width: min(360px, 90vw);
  height: min(640px, 90svh);
  border-radius: 20px;
  overflow: hidden;
  background: #000;
  box-shadow: 0 40px 80px -20px rgba(0, 0, 0, 0.8);

  /* Mobile: fill screen */
  @media (max-width: 480px) {
    width: 100vw;
    height: 100svh;
    border-radius: 0;
  }
}

/* ── Media ── */
.reel-media {
  position: absolute;
  inset: 0;
}

.reel-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.reel-poster-fallback {
  object-fit: cover;
}

/* ── Progress bar ── */
.reel-progress-track {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(255, 255, 255, 0.2);
  z-index: 40;
  cursor: pointer;
}

.reel-progress-fill {
  height: 100%;
  background: var(--primary, #3b82f6);
  transition: width 0.1s linear;
}

/* ── Buffering ── */
.reel-buffering {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 35;
  background: rgba(0, 0, 0, 0.3);
}

.buffering-ring {
  width: 48px;
  height: 48px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* ── Gradients ── */
.reel-grad {
  position: absolute;
  left: 0;
  right: 0;
  pointer-events: none;
  z-index: 10;
}

.reel-grad--top {
  top: 0;
  height: 120px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.65) 0%, transparent 100%);
}

.reel-grad--bottom {
  bottom: 0;
  height: 200px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.85) 0%, transparent 100%);
}

/* ── Top row ── */
.reel-top {
  position: absolute;
  top: 16px;
  left: 16px;
  right: 60px;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.reel-club-badge {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  backdrop-filter: blur(10px);
}

.reel-club-badge--quantum {
  background: oklch(0.55 0.18 220 / 0.25);
  color: oklch(0.85 0.12 220);
  border: 1px solid oklch(0.55 0.18 220 / 0.35);
}

.reel-club-badge--elegance {
  background: oklch(0.55 0.22 300 / 0.25);
  color: oklch(0.85 0.14 300);
  border: 1px solid oklch(0.55 0.22 300 / 0.35);
}

.reel-club-badge--nextstop {
  background: oklch(0.55 0.20 160 / 0.25);
  color: oklch(0.85 0.13 160);
  border: 1px solid oklch(0.55 0.20 160 / 0.35);
}

.reel-duration {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 5px 10px;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 11px;
  font-weight: 500;
}

/* ── Right sidebar ── */
.reel-sidebar {
  position: absolute;
  right: 12px;
  bottom: 130px;
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

.sidebar-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  color: white;
  transition: transform 0.2s ease;
}

.sidebar-btn:hover {
  transform: scale(1.12);
}

.sidebar-icon-wrap {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: background 0.2s ease;
}

.sidebar-btn:hover .sidebar-icon-wrap {
  background: rgba(255, 255, 255, 0.25);
}

.sidebar-btn--liked .sidebar-icon-wrap {
  background: rgba(239, 68, 68, 0.25);
  border-color: rgba(239, 68, 68, 0.4);
}

.sidebar-icon-wrap--cart {
  background: color-mix(in oklch, var(--primary, #3b82f6) 30%, transparent);
  border-color: color-mix(in oklch, var(--primary, #3b82f6) 40%, transparent);
}

.sidebar-btn--added .sidebar-icon-wrap--cart {
  background: oklch(0.55 0.20 160 / 0.4);
  border-color: oklch(0.55 0.20 160 / 0.6);
}

.sidebar-label {
  font-size: 10px;
  font-weight: 600;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
  white-space: nowrap;
}

/* ── Bottom product info ── */
.reel-bottom {
  position: absolute;
  bottom: 16px;
  left: 16px;
  right: 72px;
  z-index: 20;
}

.reel-title {
  font-size: 16px;
  font-weight: 700;
  color: white;
  margin-bottom: 6px;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.reel-desc {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.reel-price-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
}

.reel-price-group {
  display: flex;
  align-items: baseline;
  gap: 6px;
  flex-wrap: wrap;
}

.reel-price {
  font-size: 20px;
  font-weight: 800;
  color: white;
}

.reel-original-price {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.45);
  text-decoration: line-through;
}

.reel-discount {
  font-size: 11px;
  font-weight: 700;
  color: oklch(0.75 0.22 140);
  background: oklch(0.55 0.20 140 / 0.2);
  padding: 2px 7px;
  border-radius: 4px;
}

.reel-buy-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: var(--primary, #3b82f6);
  color: var(--primary-foreground, white);
  border: none;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.reel-buy-btn:hover {
  background: color-mix(in oklch, var(--primary, #3b82f6) 85%, white);
  transform: scale(1.04);
}

/* ── Dot nav ── */
.reel-dots {
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 25;
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-height: 60%;
  overflow: hidden;
}

.reel-dot {
  width: 3px;
  height: 16px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  transition: all 0.2s ease;
}

.reel-dot--active {
  background: white;
  height: 24px;
}

/* ── Close button ── */
.reel-close {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10000;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.reel-close:hover {
  background: rgba(255, 255, 255, 0.22);
  transform: scale(1.1);
}

/* ── Nav arrows ── */
.reel-nav {
  position: fixed;
  left: 50%;
  translate: -50% 0;
  z-index: 10000;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.reel-nav:hover {
  background: rgba(255, 255, 255, 0.22);
  transform: translateY(-2px);
}

.reel-nav--prev {
  top: 20px;

  /* hide on mobile, use swipe */
  @media (max-width: 480px) {
    display: none;
  }
}

.reel-nav--next {
  bottom: 20px;

  @media (max-width: 480px) {
    display: none;
  }
}

/* ── Transitions ── */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>