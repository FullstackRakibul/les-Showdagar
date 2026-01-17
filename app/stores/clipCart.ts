import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface ClipProduct {
  id: string
  productId: number
  videoUrl: string
  posterUrl: string
  title: string
  description: string
  price: number
  originalPrice?: number
  club: 'quantum' | 'elegance' | 'nextstop'
  duration: number // seconds
  featured: boolean
}

export interface ClipAnalytics {
  views: number
  clicks: number
  orders: number
}

export const useClipCartStore = defineStore('clipCart', () => {
  // State
  const clips = ref<ClipProduct[]>([
    {
      id: 'clip-1',
      productId: 1,
      videoUrl: '/video/clip-electronics.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
      title: 'Premium Wireless Headphones',
      description: 'Experience crystal-clear audio with our flagship wireless headphones',
      price: 12500,
      originalPrice: 15000,
      club: 'quantum',
      duration: 15,
      featured: true,
    },
    {
      id: 'clip-2',
      productId: 2,
      videoUrl: '/video/clip-fashion.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
      title: 'Luxury Smart Watch',
      description: 'Elegance meets technology in this premium timepiece',
      price: 28000,
      originalPrice: 35000,
      club: 'elegance',
      duration: 12,
      featured: true,
    },
    {
      id: 'clip-3',
      productId: 3,
      videoUrl: '/video/clip-travel.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&q=80',
      title: 'Thailand Visa Package',
      description: 'Complete visa assistance for your Thailand journey',
      price: 8500,
      club: 'nextstop',
      duration: 18,
      featured: true,
    },
    {
      id: 'clip-4',
      productId: 4,
      videoUrl: '/video/clip-phone.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80',
      title: 'Flagship Smartphone 2026',
      description: 'The most advanced smartphone experience',
      price: 89000,
      originalPrice: 95000,
      club: 'quantum',
      duration: 20,
      featured: true,
    },
    {
      id: 'clip-5',
      productId: 5,
      videoUrl: '/video/clip-bag.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80',
      title: 'Designer Leather Bag',
      description: 'Handcrafted Italian leather with timeless design',
      price: 45000,
      club: 'elegance',
      duration: 10,
      featured: true,
    },
    {
      id: 'clip-6',
      productId: 6,
      videoUrl: '/video/clip-dubai.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80',
      title: 'Dubai Visit Visa',
      description: 'Fast-track visa processing for UAE',
      price: 12000,
      club: 'nextstop',
      duration: 14,
      featured: true,
    },
  ])

  const isLoading = ref(false)
  const activeClipId = ref<string | null>(null)
  const analytics = ref<Record<string, ClipAnalytics>>({})

  // Computed
  const featuredClips = computed(() => clips.value.filter(clip => clip.featured))
  
  const clipsByClub = computed(() => ({
    quantum: clips.value.filter(clip => clip.club === 'quantum'),
    elegance: clips.value.filter(clip => clip.club === 'elegance'),
    nextstop: clips.value.filter(clip => clip.club === 'nextstop'),
  }))

  // Actions
  function setActiveClip(clipId: string | null) {
    activeClipId.value = clipId
  }

  function trackView(clipId: string) {
    if (!analytics.value[clipId]) {
      analytics.value[clipId] = { views: 0, clicks: 0, orders: 0 }
    }
    analytics.value[clipId].views++
  }

  function trackClick(clipId: string) {
    if (!analytics.value[clipId]) {
      analytics.value[clipId] = { views: 0, clicks: 0, orders: 0 }
    }
    analytics.value[clipId].clicks++
  }

  function trackOrder(clipId: string) {
    if (!analytics.value[clipId]) {
      analytics.value[clipId] = { views: 0, clicks: 0, orders: 0 }
    }
    analytics.value[clipId].orders++
  }

  function getClipById(clipId: string): ClipProduct | undefined {
    return clips.value.find(clip => clip.id === clipId)
  }

  return {
    // State
    clips,
    isLoading,
    activeClipId,
    analytics,

    // Computed
    featuredClips,
    clipsByClub,

    // Actions
    setActiveClip,
    trackView,
    trackClick,
    trackOrder,
    getClipById,
  }
})
