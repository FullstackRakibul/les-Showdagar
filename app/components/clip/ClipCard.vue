<template>
  <div
    class="group relative rounded-xl overflow-hidden cursor-pointer bg-card border border-border hover:border-muted-foreground/30 transition-all"
    :class="[orientation === 'vertical' ? 'aspect-[9/16]' : 'aspect-video']" @click="handleClick"
    @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <!-- Poster / Video -->
    <img v-if="!isPlaying" :src="clip.posterUrl" :alt="clip.title"
      class="absolute inset-0 w-full h-full object-cover" />
    <video v-else ref="videoRef" :src="clip.videoUrl" :poster="clip.posterUrl"
      class="absolute inset-0 w-full h-full object-cover" muted loop playsinline />

    <!-- Gradient Overlay -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

    <!-- Play Button (hover) -->
    <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
      v-if="!isPlaying">
      <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
        <HugeiconsIcon :icon="PlayFreeIcons" :size="20" color="white" />
      </div>
    </div>

    <!-- Club Badge -->
    <div class="absolute top-3 left-3">
      <Badge :class="clubBadgeClass" class="text-xs">
        {{ clubName }}
      </Badge>
    </div>

    <!-- Duration -->
    <div class="absolute top-3 right-3 bg-black/60 rounded px-1.5 py-0.5">
      <span class="text-xs text-white font-medium">{{ formattedDuration }}</span>
    </div>

    <!-- Content -->
    <div class="absolute bottom-0 left-0 right-0 p-4">
      <h3 class="text-white font-medium text-sm mb-1 line-clamp-2">{{ clip.title }}</h3>
      <div class="flex items-center justify-between">
        <div class="flex items-baseline gap-2">
          <span class="text-white font-semibold">৳{{ clip.price }}</span>
          <span v-if="clip.originalPrice" class="text-white/60 text-xs line-through">
            ৳{{ clip.originalPrice }}
          </span>
        </div>
        <Button size="sm" class="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-0 h-8"
          @click.stop="handleAddToCart">
          <HugeiconsIcon :icon="ShoppingCart01Icon" :size="16" />
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useClipCartStore, type ClipProduct } from '@/stores/clipCart'
import { useProductStore } from '@/stores/products'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import { HugeiconsIcon } from '@hugeicons/vue'
import {
  ShoppingCart01Icon,
  PlayFreeIcons
} from '@hugeicons/core-free-icons'

const props = withDefaults(defineProps<{
  clip: ClipProduct
  orientation?: 'vertical' | 'horizontal'
}>(), {
  orientation: 'vertical'
})

const router = useRouter()
const clipCartStore = useClipCartStore()
const productStore = useProductStore()

const videoRef = ref<HTMLVideoElement | null>(null)
const isPlaying = ref(false)
const isHovered = ref(false)

const clubInfo = {
  quantum: { name: 'Quantum', class: 'bg-quantum-500/20 text-quantum-400 border-quantum-500/30' },
  elegance: { name: 'Elegance', class: 'bg-elegance-500/20 text-elegance-400 border-elegance-500/30' },
  nextstop: { name: 'NextStop', class: 'bg-nextstop-500/20 text-nextstop-400 border-nextstop-500/30' },
}

const clubName = computed(() => clubInfo[props.clip.club].name)
const clubBadgeClass = computed(() => clubInfo[props.clip.club].class)

const formattedDuration = computed(() => {
  const mins = Math.floor(props.clip.duration / 60)
  const secs = props.clip.duration % 60
  return mins > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : `0:${secs.toString().padStart(2, '0')}`
})

const handleClick = () => {
  clipCartStore.trackClick(props.clip.id)
  router.push(`/products?id=${props.clip.productId}`)
}

const handleAddToCart = () => {
  const product = productStore.products.find(p => p.id === props.clip.productId)
  if (product) {
    productStore.addToCart(product)
  }
}

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
  }, 300)
}

const handleMouseLeave = () => {
  isHovered.value = false
  isPlaying.value = false
  videoRef.value?.pause()
}

onUnmounted(() => {
  videoRef.value?.pause()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>