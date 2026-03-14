import { defineStore } from "pinia"
import { ref, computed } from "vue"

/**
 * Calcifer - Premium Single Product
 * A revolutionary audio system for the discerning listener
 */
export interface CalciferProduct {
  id: number
  name: string
  brand: string
  price: number
  tagline: string
  description: string
  longDescription: string
  inStock: boolean
  
  // High-res images for storytelling
  heroImage: string
  featureImages: string[]
  galleryImages: string[]
  
  // Technical specifications
  specs: {
    [key: string]: string
  }
  
  // Features for scrollytelling
  features: Array<{
    title: string
    description: string
    image?: string
    icon?: string
  }>
  
  // Ecosystem details
  ecosystem: {
    name: string
    tagline: string
    features: string[]
  }
  
  // Testimonials / Social proof
  testimonials?: Array<{
    quote: string
    author: string
    role?: string
  }>
  
  // Pre-order info
  preOrderAvailable: boolean
  estimatedDelivery?: string
}

interface CalciferCart {
  quantity: number
}

export const useProductStore = defineStore("products", () => {
  // The Single Product - Calcifer
  const product = ref<CalciferProduct>({
    id: 1,
    name: "Calcifer",
    brand: "Calcifer",
    price: 1299.99,
    tagline: "Where Sound Meets Soul",
    description: "An exceptional audio system designed for the discerning listener. Premium craftsmanship meets innovative engineering.",
    longDescription: "Calcifer is not just a product—it's a revolution in personal audio. Engineered with precision and designed with intention, Calcifer transforms how you experience sound. Every detail, from the acoustics to the industrial design, reflects an obsession with perfection.",
    inStock: true,
    
    heroImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1400&q=80",
    featureImages: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&q=80",
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=1000&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=1000&q=80",
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=600&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&q=80",
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80",
      "https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=600&q=80",
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&q=80",
    ],
    
    specs: {
      "Frequency Response": "20Hz – 20kHz",
      "Driver Size": "2x 50mm Dynamic Drivers",
      "Impedance": "32 Ohms",
      "Battery Life": "40 hours continuous playback",
      "Charging Time": "2 hours (Fast Charge)",
      "Bluetooth": "5.3 with aptX Adaptive Codec",
      "Weight": "310g",
      "Materials": "Aluminum, Genuine Leather, Premium Plastics",
      "Water Resistance": "IPX4 Splash Resistant",
      "Active Noise Cancellation": "Adaptive Hybrid ANC with 5 modes",
    },
    
    features: [
      {
        title: "Sonic Perfection",
        description: "Hand-tuned acoustic chambers deliver pristine, studio-quality sound with deep bass and crystal-clear highs. Every frequency curve is calibrated for the perfect balance.",
        icon: "🎵",
      },
      {
        title: "Adaptive Noise Cancellation",
        description: "Intelligent algorithm learns your environment and adapts in real-time. Block the world, or blend in—you control the experience.",
        icon: "🔇",
      },
      {
        title: "40-Hour Battery",
        description: "All-day, every-day. Calcifer lasts through 40 hours of continuous listening, with fast charging for emergencies.",
        icon: "🔋",
      },
      {
        title: "Precision Craftsmanship",
        description: "Premium materials meet meticulous engineering. Each Calcifer is hand-finished with attention to every detail.",
        icon: "✨",
      },
      {
        title: "Seamless Connectivity",
        description: "Bluetooth 5.3 with multi-device pairing. Connect to anything, instantly. No latency, no compromise.",
        icon: "📡",
      },
      {
        title: "Personalized Sound",
        description: "AI-driven EQ adapts to your music taste and hearing profile. Your sound, perfectly tuned.",
        icon: "🎚️",
      },
    ],
    
    ecosystem: {
      name: "Calcifer Ecosystem",
      tagline: "The Future of Personal Audio",
      features: [
        "Calcifer App: Control every setting from your phone",
        "Cloud Sync: Your preferences follow you everywhere",
        "Lifetime Firmware Updates: New features forever",
        "Calcifer Community: Connect with other users globally",
        "Exclusive Content: Early access to new features and partnerships",
      ],
    },
    
    testimonials: [
      {
        quote: "Calcifer redefined what audio excellence means. It's not just what you hear—it's how you feel.",
        author: "Alex Chen",
        role: "Audio Engineer, Warner Bros",
      },
      {
        quote: "The attention to detail is unmatched. From the first listen, I was transformed.",
        author: "Jordan Williams",
        role: "Music Producer, Grammy Winner",
      },
      {
        quote: "Finally, a product that respects the listener's experience. Calcifer is a masterpiece.",
        author: "Sam Patel",
        role: "Audiophile & Tech Journalist",
      },
    ],
    
    preOrderAvailable: true,
    estimatedDelivery: "Q2 2026",
  })

  // Cart - simplified to just quantity of Calcifer
  const cart = ref<CalciferCart>(getCartFromStorage())
  
  // Computed
  const cartQuantity = computed(() => cart.value.quantity)
  
  const cartTotal = computed(() => {
    return product.value.price * cart.value.quantity
  })
  
  const cartItemsCount = computed(() => cart.value.quantity)

  // Actions
  function getCartFromStorage(): CalciferCart {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("calcifer-cart")
      return stored ? JSON.parse(stored) : { quantity: 0 }
    }
    return { quantity: 0 }
  }

  function saveCartToStorage() {
    if (typeof window !== "undefined") {
      localStorage.setItem("calcifer-cart", JSON.stringify(cart.value))
    }
  }

  function addToCart(quantity: number = 1) {
    cart.value.quantity += quantity
    saveCartToStorage()
  }

  function removeFromCart(quantity: number = 1) {
    cart.value.quantity = Math.max(0, cart.value.quantity - quantity)
    saveCartToStorage()
  }

  function updateCartQuantity(quantity: number) {
    cart.value.quantity = Math.max(0, quantity)
    saveCartToStorage()
  }

  function clearCart() {
    cart.value.quantity = 0
    saveCartToStorage()
  }

  return {
    // State
    product,
    cart,

    // Computed
    cartQuantity,
    cartTotal,
    cartItemsCount,

    // Actions
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
  }
})

  const cartItemsCount = computed(() => cart.value.reduce((total, item) => total + item.quantity, 0))

  const cartTotal = computed(() => {
    return cart.value.reduce((total, item) => total + item.product.price * item.quantity, 0)
  })

  // Actions
  function getCartFromStorage(): CartItem[] {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("shopping-cart")
      return stored ? JSON.parse(stored) : []
    }
    return []
  }

  function saveCartToStorage() {
    if (typeof window !== "undefined") {
      localStorage.setItem("shopping-cart", JSON.stringify(cart.value))
    }
  }

  function addToCart(product: Product, selectedColor?: string, selectedSize?: string) {
    const existingItem = cart.value.find(
      (item) =>
        item.product.id === product.id && item.selectedColor === selectedColor && item.selectedSize === selectedSize,
    )

    if (existingItem) {
      existingItem.quantity++
    } else {
      cart.value.push({ product, quantity: 1, selectedColor, selectedSize })
    }

    saveCartToStorage()
  }

  function removeFromCart(productId: number, selectedColor?: string, selectedSize?: string) {
    const index = cart.value.findIndex(
      (item) =>
        item.product.id === productId && item.selectedColor === selectedColor && item.selectedSize === selectedSize,
    )
    if (index > -1) {
      cart.value.splice(index, 1)
      saveCartToStorage()
    }
  }

  function updateCartQuantity(productId: number, quantity: number, selectedColor?: string, selectedSize?: string) {
    const item = cart.value.find(
      (item) =>
        item.product.id === productId && item.selectedColor === selectedColor && item.selectedSize === selectedSize,
    )
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId, selectedColor, selectedSize)
      } else {
        item.quantity = quantity
        saveCartToStorage()
      }
    }
  }

  function clearCart() {
    cart.value = []
    saveCartToStorage()
  }

  function openProductModal(product: Product) {
    selectedProduct.value = product
    showProductModal.value = true
  }

  function closeProductModal() {
    showProductModal.value = false
    selectedProduct.value = null
  }

  return {
    // State
    products,
    cart,
    searchQuery,
    selectedCategory,
    showProductModal,
    selectedProduct,

    // Computed
    categories,
    filteredProducts,
    cartItemsCount,
    cartTotal,

    // Actions
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    openProductModal,
    closeProductModal,
  }
})
