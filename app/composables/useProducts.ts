import { ref, computed } from "vue"
import type { Product } from "../stores/products"

export const useProducts = () => {
  const products = ref<Product[]>([
    // Quantum Club - Electronics & Technology
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299.99,
      originalPrice: 399.99,
      image: "https://img.freepik.com/free-photo/rendering-smart-home-device_23-2151039302.jpg",
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
      name: "Professional Camera Lens",
      price: 899.99,
      image: "https://images.unsplash.com/photo-1637756856486-9d0cbe42a560?w=500",
      rating: 4.9,
      reviews: 234,
      category: "Photography",
      description: "Professional grade camera lens for stunning photography.",
      inStock: false,
    },
    {
      id: 4,
      name: "Bluetooth Speaker",
      price: 79.99,
      image: "https://img.freepik.com/free-photo/smartwatch-screen-digital-device_53876-97321.jpg",
      rating: 4.3,
      reviews: 1123,
      category: "Electronics",
      description: "Portable bluetooth speaker with excellent sound quality.",
      inStock: true,
    },
    {
      id: 5,
      name: "4K Action Camera",
      price: 349.99,
      originalPrice: 449.99,
      image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500",
      rating: 4.8,
      reviews: 567,
      category: "Electronics",
      description: "Waterproof 4K action camera with image stabilization.",
      inStock: true,
      isHot: true,
    },
    {
      id: 6,
      name: "Wireless Gaming Mouse",
      price: 79.99,
      originalPrice: 99.99,
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500",
      rating: 4.5,
      reviews: 789,
      category: "Gaming",
      description: "High-precision wireless gaming mouse with RGB lighting.",
      inStock: true,
    },
    {
      id: 7,
      name: "Mechanical Keyboard",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500",
      rating: 4.7,
      reviews: 456,
      category: "Gaming",
      description: "RGB mechanical keyboard with customizable switches.",
      inStock: true,
      isNew: true,
    },
    {
      id: 8,
      name: "Smart Home Hub",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1558089687-e1c6e5e7e6e6?w=500",
      rating: 4.4,
      reviews: 334,
      category: "Electronics",
      description: "Central hub for all your smart home devices.",
      inStock: true,
    },
    {
      id: 9,
      name: "Drone with 4K Camera",
      price: 599.99,
      originalPrice: 799.99,
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500",
      rating: 4.6,
      reviews: 223,
      category: "Electronics",
      description: "Professional drone with 4K camera and GPS navigation.",
      inStock: true,
      isHot: true,
    },
    {
      id: 10,
      name: "VR Headset",
      price: 399.99,
      image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=500",
      rating: 4.5,
      reviews: 445,
      category: "Gaming",
      description: "Immersive virtual reality headset with motion tracking.",
      inStock: true,
    },

    // Elegance Club - Fashion & Lifestyle
    {
      id: 11,
      name: "Designer Leather Handbag",
      price: 449.99,
      originalPrice: 599.99,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500",
      rating: 4.9,
      reviews: 678,
      category: "Fashion",
      description: "Genuine leather designer handbag with premium craftsmanship.",
      inStock: true,
      isHot: true,
    },
    {
      id: 12,
      name: "Luxury Silk Scarf",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500",
      rating: 4.7,
      reviews: 234,
      category: "Fashion",
      description: "100% pure silk scarf with elegant patterns.",
      inStock: true,
      isNew: true,
    },
    {
      id: 13,
      name: "Premium Sunglasses",
      price: 189.99,
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500",
      rating: 4.6,
      reviews: 456,
      category: "Fashion",
      description: "UV protection designer sunglasses with polarized lenses.",
      inStock: true,
    },
    {
      id: 14,
      name: "Cashmere Sweater",
      price: 299.99,
      originalPrice: 399.99,
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500",
      rating: 4.8,
      reviews: 567,
      category: "Fashion",
      description: "Luxurious 100% cashmere sweater in multiple colors.",
      inStock: true,
    },
    {
      id: 15,
      name: "Designer Watch",
      price: 799.99,
      image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500",
      rating: 4.9,
      reviews: 890,
      category: "Fashion",
      description: "Swiss-made automatic watch with sapphire crystal.",
      inStock: true,
      isHot: true,
    },
    {
      id: 16,
      name: "Leather Wallet",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500",
      rating: 4.5,
      reviews: 345,
      category: "Fashion",
      description: "Handcrafted genuine leather wallet with RFID protection.",
      inStock: true,
    },
    {
      id: 17,
      name: "Designer Perfume",
      price: 149.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500",
      rating: 4.7,
      reviews: 678,
      category: "Beauty",
      description: "Luxury eau de parfum with long-lasting fragrance.",
      inStock: true,
      isNew: true,
    },
    {
      id: 18,
      name: "Premium Sneakers",
      price: 179.99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
      rating: 4.6,
      reviews: 789,
      category: "Fashion",
      description: "Limited edition designer sneakers with premium materials.",
      inStock: true,
    },
    {
      id: 19,
      name: "Silk Tie Collection",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1589756823695-278bc8356c60?w=500",
      rating: 4.4,
      reviews: 234,
      category: "Fashion",
      description: "Set of 3 premium silk ties in classic patterns.",
      inStock: true,
    },
    {
      id: 20,
      name: "Designer Belt",
      price: 159.99,
      originalPrice: 219.99,
      image: "https://images.unsplash.com/photo-1624222247344-550fb60583bb?w=500",
      rating: 4.5,
      reviews: 456,
      category: "Fashion",
      description: "Reversible leather belt with signature buckle.",
      inStock: true,
    },

    // Additional Products - Home & Lifestyle
    {
      id: 21,
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
      id: 22,
      name: "Smart Coffee Maker",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500",
      rating: 4.5,
      reviews: 445,
      category: "Home",
      description: "WiFi-enabled coffee maker with app control.",
      inStock: true,
      isNew: true,
    },
    {
      id: 23,
      name: "Air Purifier",
      price: 299.99,
      originalPrice: 399.99,
      image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500",
      rating: 4.8,
      reviews: 567,
      category: "Home",
      description: "HEPA air purifier for large rooms with smart sensors.",
      inStock: true,
    },
    {
      id: 24,
      name: "Robot Vacuum",
      price: 349.99,
      image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500",
      rating: 4.6,
      reviews: 890,
      category: "Home",
      description: "Smart robot vacuum with mapping and app control.",
      inStock: true,
      isHot: true,
    },
  ])

  const categories = ref([
    { name: "All Products", count: products.value.length },
    { name: "Electronics", count: products.value.filter((p) => p.category === "Electronics").length },
    { name: "Fashion", count: products.value.filter((p) => p.category === "Fashion").length },
    { name: "Furniture", count: products.value.filter((p) => p.category === "Furniture").length },
    { name: "Photography", count: products.value.filter((p) => p.category === "Photography").length },
    { name: "Wearables", count: products.value.filter((p) => p.category === "Wearables").length },
    { name: "Gaming", count: products.value.filter((p) => p.category === "Gaming").length },
    { name: "Home", count: products.value.filter((p) => p.category === "Home").length },
    { name: "Beauty", count: products.value.filter((p) => p.category === "Beauty").length },
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
