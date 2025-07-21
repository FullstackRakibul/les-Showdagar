
import { ref, computed } from 'vue'

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
}

export const useProducts = () => {
  const products = ref<Product[]>([
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299.99,
      originalPrice: 399.99,
      image: "https://img.freepik.com/free-photo/rendering-smart-home-device_23-2151039302.jpg?semt=ais_hybrid&w=740",
      rating: 4.8,
      reviews: 1247,
      category: "Electronics",
      description: "High-quality wireless headphones with noise cancellation and premium sound quality.",
      inStock: true,
      isHot: true,
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 199.99,
      image: "https://t3.ftcdn.net/jpg/13/37/59/58/360_F_1337595881_iRH94v8gXcq6qDZOmpeEd9XtpL2jIV9h.jpg",
      rating: 4.6,
      reviews: 892,
      category: "Wearables",
      description: "Advanced fitness tracking with heart rate monitoring and GPS.",
      inStock: true,
      isNew: true,
    },
    {
      id: 3,
      name: "Organic Cotton T-Shirt",
      price: 29.99,
      originalPrice: 39.99,
      image: "https://img.freepik.com/premium-psd/realistic-watch-series-7-mockup-stairs_850346-37.jpg?semt=ais_hybrid&w=740",
      rating: 4.4,
      reviews: 456,
      category: "Clothing",
      description: "Comfortable organic cotton t-shirt in various colors.",
      inStock: true,
    },
    {
      id: 4,
      name: "Professional Camera Lens",
      price: 899.99,
      image: "https://images.unsplash.com/photo-1637756856486-9d0cbe42a560?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8",
      rating: 4.9,
      reviews: 234,
      category: "Photography",
      description: "Professional grade camera lens for stunning photography.",
      inStock: false,
    },
    {
      id: 5,
      name: "Ergonomic Office Chair",
      price: 449.99,
      originalPrice: 599.99,
      image: "https://t3.ftcdn.net/jpg/14/27/82/78/360_F_1427827810_jZZJUs5cPVg5wtEy2wa5CBQY6Nfykzem.jpg",
      rating: 4.7,
      reviews: 678,
      category: "Furniture",
      description: "Comfortable ergonomic office chair with lumbar support.",
      inStock: true,
      isHot: true,
    },
    {
      id: 6,
      name: "Bluetooth Speaker",
      price: 79.99,
      image: "https://img.freepik.com/free-photo/smartwatch-screen-digital-device_53876-97321.jpg?semt=ais_hybrid&w=740",
      rating: 4.3,
      reviews: 1123,
      category: "Electronics",
      description: "Portable bluetooth speaker with excellent sound quality.",
      inStock: true,
    },
  ])

  const categories = ref([
    { name: "All Products", count: products.value.length },
    { name: "Electronics", count: products.value.filter((p) => p.category === "Electronics").length },
    { name: "Clothing", count: products.value.filter((p) => p.category === "Clothing").length },
    { name: "Furniture", count: products.value.filter((p) => p.category === "Furniture").length },
    { name: "Photography", count: products.value.filter((p) => p.category === "Photography").length },
    { name: "Wearables", count: products.value.filter((p) => p.category === "Wearables").length },
  ])

  const cart = ref<{ product: Product; quantity: number }[]>([])
  const searchQuery = ref("")
  const selectedCategory = ref("All Products")

  const filteredProducts = computed(() => {
    let filtered = products.value

    if (searchQuery.value) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.value.toLowerCase()),
      )
    }

    if (selectedCategory.value !== "All Products") {
      filtered = filtered.filter((product) => product.category === selectedCategory.value)
    }

    return filtered
  })

  const popularProducts = computed(() => products.value.filter((p) => p.rating >= 4.5).slice(0, 4))

  const newArrivals = computed(() => products.value.filter((p) => p.isNew).slice(0, 4))

  const hotDeals = computed(() => products.value.filter((p) => p.isHot && p.originalPrice).slice(0, 3))

  const cartItemsCount = computed(() => cart.value.reduce((total, item) => total + item.quantity, 0))

  const addToCart = (product: Product) => {
    const existingItem = cart.value.find((item) => item.product.id === product.id)
    if (existingItem) {
      existingItem.quantity++
    } else {
      cart.value.push({ product, quantity: 1 })
    }
  }

  return {
    products,
    categories,
    cart,
    searchQuery,
    selectedCategory,
    filteredProducts,
    popularProducts,
    newArrivals,
    hotDeals,
    cartItemsCount,
    addToCart,
  }
}
