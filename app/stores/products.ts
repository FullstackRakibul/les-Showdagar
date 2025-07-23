import { defineStore } from "pinia"
import { ref, computed } from "vue"

export interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  category: string
  description: string
  inStock: boolean
  isNew?: boolean
  isHot?: boolean
  brand?: string
  colors?: string[]
  sizes?: string[]
  specifications?: Record<string, string>
  revenue?: number
  listingAge?: string
}

export interface CartItem {
  product: Product
  quantity: number
  selectedColor?: string
  selectedSize?: string
}

export const useProductStore = defineStore("products", () => {
  // State
  const products = ref<Product[]>([
    {
      id: 1,
      name: "PURSHE Mini Projector, Mini Bluetooth Projector",
      price: 41.32,
      originalPrice: 59.99,
      image: "https://img.freepik.com/free-photo/rendering-smart-home-device_23-2151039302.jpg?semt=ais_hybrid&w=740",
      rating: 4.3,
      reviews: 261,
      category: "Electronics",
      description:
        "High-quality mini projector with Bluetooth connectivity and premium display quality. Perfect for presentations and entertainment.",
      inStock: true,
      isHot: true,
      brand: "PURSHE",
      revenue: 12694845,
      listingAge: "1 year",
      colors: ["White", "Black", "Silver"],
      specifications: {
        Resolution: "1080p",
        Connectivity: "Bluetooth, HDMI, USB",
        Battery: "3 hours",
      },
    },
    {
      id: 2,
      name: "Nike Mercurial Vapor 12 Pro FH",
      price: 199.99,
      image: "https://t3.ftcdn.net/jpg/13/37/59/58/360_F_1337595881_iRH94v8gXcq6qDZOmpeEd9XtpL2jIV9h.jpg",
      rating: 4.6,
      reviews: 892,
      category: "Sports",
      description: "Professional soccer boots with advanced traction and comfort technology.",
      inStock: true,
      isNew: true,
      brand: "Nike",
      revenue: 8500000,
      listingAge: "6 months",
      colors: ["Orange", "Gray", "Black"],
      sizes: ["7", "8", "9", "10", "11"],
      specifications: {
        Material: "Synthetic leather",
        Sole: "Rubber studs",
        Weight: "230g",
      },
    },
    {
      id: 3,
      name: "Xbox Wireless Controller - Electric Volt",
      price: 59.99,
      originalPrice: 79.99,
      image:
        "https://img.freepik.com/premium-psd/realistic-watch-series-7-mockup-stairs_850346-37.jpg?semt=ais_hybrid&w=740",
      rating: 4.8,
      reviews: 1456,
      category: "Gaming",
      description: "Wireless gaming controller with enhanced ergonomics and precision control.",
      inStock: true,
      brand: "Microsoft",
      revenue: 15200000,
      listingAge: "2 years",
      colors: ["Electric Volt", "Carbon Black", "Robot White"],
      specifications: {
        Connectivity: "Bluetooth, USB-C",
        Battery: "40 hours",
        Compatibility: "Xbox, PC, Mobile",
      },
    },
    {
      id: 4,
      name: "Professional Camera Lens 85mm f/1.4",
      price: 899.99,
      image:
        "https://images.unsplash.com/photo-1637756856486-9d0cbe42a560?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8",
      rating: 4.9,
      reviews: 234,
      category: "Photography",
      description: "Professional grade camera lens for stunning portrait photography.",
      inStock: false,
      brand: "Canon",
      revenue: 5600000,
      listingAge: "3 years",
      specifications: {
        "Focal Length": "85mm",
        Aperture: "f/1.4",
        Mount: "Canon EF",
      },
    },
  ])

  const cart = ref<CartItem[]>(getCartFromStorage())
  const searchQuery = ref("")
  const selectedCategory = ref("All Products")
  const showProductModal = ref(false)
  const selectedProduct = ref<Product | null>(null)

  // Computed
  const categories = computed(() => [
    { name: "All Products", count: products.value.length },
    { name: "Electronics", count: products.value.filter((p) => p.category === "Electronics").length },
    { name: "Sports", count: products.value.filter((p) => p.category === "Sports").length },
    { name: "Gaming", count: products.value.filter((p) => p.category === "Gaming").length },
    { name: "Photography", count: products.value.filter((p) => p.category === "Photography").length },
  ])

  const filteredProducts = computed(() => {
    let filtered = products.value

    if (searchQuery.value) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          product.brand?.toLowerCase().includes(searchQuery.value.toLowerCase()),
      )
    }

    if (selectedCategory.value !== "All Products") {
      filtered = filtered.filter((product) => product.category === selectedCategory.value)
    }

    return filtered
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
