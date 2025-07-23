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
    {
      "id": 5,
      "name": "Fujifilm X-T4 Mirrorless Camera",
      "price": 1699.99,
      "image": "https://4.img-dpreview.com/files/p/E~TS590x0~articles/3092032226/product/FujifilmX-T4-lead-02.jpeg",
      "rating": 4.8,
      "reviews": 620,
      "category": "Photography",
      "description": "Powerful mirrorless camera with 26MP sensor, 4K video, and in-body stabilization.",
      "inStock": true,
      "brand": "Fujifilm",
      "revenue": 19500000,
      "listingAge": "1.5 years",
      "colors": ["Black", "Silver"],
      "specifications": {
        "Sensor": "APS-C 26.1MP",
        "Video": "4K 60fps",
        "Mount": "X-Mount"
      },

    },
     {
    "id": 6,
    "name": "Logitech MX Master 3S Wireless Mouse",
    "price": 99.99,
    "image": "https://www.macworld.com/wp-content/uploads/2023/01/MX-Master-3S-hero.jpg?quality=50&strip=all",
    "rating": 4.9,
    "reviews": 843,
    "category": "Accessories",
    "description": "Ergonomic wireless mouse with silent clicks and MagSpeed scrolling.",
    "inStock": true,
    "brand": "Logitech",
    "colors": ["Graphite", "Pale Gray"],
    "specifications": {
      "Battery": "70 days",
      "DPI": "8000",
      "Connection": "Bluetooth, USB"
    }
  },
  {
    "id": 7,
    "name": "Amazon Kindle Paperwhite (11th Gen)",
    "price": 139.99,
    "image": "https://mobilexchangebd.com/storage/products/amazon-kindle-12th-gen-7-2024-1.webp",
    "rating": 4.7,
    "reviews": 2345,
    "category": "Books & Tablets",
    "description": "Waterproof e-reader with adjustable warm light and glare-free display.",
    "inStock": true,
    "brand": "Amazon",
    "colors": ["Black"],
    "specifications": {
      "Display": "6.8” Paperwhite",
      "Storage": "8GB",
      "Battery": "10 weeks"
    }
  },
  {
    "id": 8,
    "name": "ASUS ROG Strix G15 Gaming Laptop",
    "price": 1399.00,
    "originalPrice": 1599.00,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9LADkxWvqGIKjtULIml8wS9gTviNGpqJ8UA&s",
    "rating": 4.6,
    "reviews": 1580,
    "category": "Computers",
    "description": "Powerful gaming laptop with RTX 3060 and 144Hz display.",
    "inStock": true,
    "brand": "ASUS",
    "colors": ["Black", "Red"],
    "specifications": {
      "GPU": "NVIDIA RTX 3060",
      "RAM": "16GB",
      "Storage": "1TB SSD"
    }
  },
  {
    "id": 9,
    "name": "JBL Flip 6 Portable Bluetooth Speaker",
    "price": 119.99,
    "image": "https://images.bauerhosting.com/affiliates/sites/8/2024/07/JBL-Flip-6-Feature.jpg?ar=16%3A9&fit=crop&crop=top&auto=format&w=1440&q=80",
    "rating": 4.5,
    "reviews": 782,
    "category": "Audio",
    "description": "Waterproof speaker with punchy bass and 12-hour battery.",
    "inStock": true,
    "brand": "JBL",
    "colors": ["Teal", "Black", "Red"],
    "specifications": {
      "Battery": "12 hours",
      "Connectivity": "Bluetooth 5.1"
    }
  },
  {
    "id": 10,
    "name": "Nike Air Max 270",
    "price": 129.99,
    "image": "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2018%2F01%2Fa-closer-look-at-the-teal-nikes-air-max-270-releasing-air-max-day-001.jpg?q=75&w=800&cbr=1&fit=max",
    "rating": 4.4,
    "reviews": 1105,
    "category": "Footwear",
    "description": "Everyday sneaker with iconic Air cushioning.",
    "inStock": true,
    "brand": "Nike",
    "colors": ["White", "Black", "Volt"],
    "sizes": ["8", "9", "10", "11", "12"]
  },
  {
    "id": 11,
    "name": "Google Nest Thermostat",
    "price": 129.00,
    "image": "https://i.extremetech.com/imagery/content-types/0329jWck3ImST0lgeUw4LCw/hero-image.fit_lim.v1721935012.jpg",
    "rating": 4.3,
    "reviews": 654,
    "category": "Smart Home",
    "description": "Smart thermostat with voice control and energy-saving automation.",
    "inStock": true,
    "brand": "Google",
    "colors": ["Snow", "Charcoal"]
  },
  {
    "id": 12,
    "name": "Canon PIXMA Wireless All-In-One Printer",
    "price": 89.99,
    "image": "https://5.imimg.com/data5/SELLER/Default/2020/11/AD/AV/EW/35031119/g3010-500x500.jpg",
    "rating": 4.2,
    "reviews": 408,
    "category": "Office",
    "description": "Compact printer for scanning, copying, and printing from your smartphone.",
    "inStock": true,
    "brand": "Canon",
    "colors": ["White", "Black"]
  },
  {
    "id": 13,
    "name": "Samsung Galaxy Watch 5",
    "price": 279.99,
    "image": "https://diamu.com.bd/wp-content/uploads/2022/09/Samsung-Galaxy-Watch-5.jpg",
    "rating": 4.6,
    "reviews": 1402,
    "category": "Wearables",
    "description": "Fitness smartwatch with GPS, sleep tracking, and body composition.",
    "inStock": true,
    "brand": "Samsung",
    "colors": ["Graphite", "Sapphire", "Pink Gold"]
  },
  {
    "id": 14,
    "name": "DJI Mini 3 Pro Drone",
    "price": 759.00,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcKyV5-LNs5lG7GH3WZe9XG_L-uOCKhQjpYLztMqDupxxUTiJTOn_XtK5StL8n7M6BnP4&usqp=CAU",
    "rating": 4.9,
    "reviews": 210,
    "category": "Drones",
    "description": "Compact drone with 4K video and intelligent flight modes.",
    "inStock": false,
    "brand": "DJI"
  },
  {
    "id": 15,
    "name": "HP Envy x360 Convertible Laptop",
    "price": 849.00,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOb8mb2fVuwZ2MMj-PixiKR8T4AxbmHLRrkw&s",
    "rating": 4.5,
    "reviews": 510,
    "category": "Computers",
    "description": "Versatile 2-in-1 laptop with touchscreen and AMD Ryzen.",
    "inStock": true,
    "brand": "HP"
  },
  {
    "id": 16,
    "name": "Razer BlackWidow V3 Mechanical Keyboard",
    "price": 139.99,
    "image": "https://assets2.razerzone.com/images/pnx.assets/5b4b3aa54671b5f65fb35ec272f828a6/razer-blackwidow-v3-hero-mobile-update.webp",
    "rating": 4.6,
    "reviews": 320,
    "category": "Accessories",
    "description": "Tactile, RGB-backlit gaming keyboard with Razer Green switches.",
    "inStock": true,
    "brand": "Razer"
  },
  {
    "id": 17,
    "name": "GoPro HERO11 Black",
    "price": 399.99,
    "image": "https://i.ytimg.com/vi/Vejlyg8Y8QY/sddefault.jpg?v=6321d152",
    "rating": 4.8,
    "reviews": 775,
    "category": "Action Cameras",
    "description": "Waterproof 5.3K action cam with improved stabilization.",
    "inStock": true,
    "brand": "GoPro"
  },
  {
    "id": 18,
    "name": "LIFX Color A19 Wi-Fi Smart Bulb",
    "price": 39.99,
    "image": "https://cdn.thewirecutter.com/wp-content/media/2024/02/smartledlightbulbs-2048px-07782-2x1-1.jpg?width=2048&quality=75&crop=2:1&auto=webp",
    "rating": 4.2,
    "reviews": 213,
    "category": "Smart Home",
    "description": "Bright, full-spectrum smart bulb with no hub required.",
    "inStock": true,
    "brand": "LIFX"
  },
  {
    "id": 19,
    "name": "Ecovacs Deebot N8 Pro Robot Vacuum",
    "price": 499.99,
    "image": "https://www.theaureview.com/wp-content/uploads/2022/01/deebot-n8-pro.jpg",
    "rating": 4.3,
    "reviews": 432,
    "category": "Home Appliances",
    "description": "Self-charging vacuum robot with mopping support and app control.",
    "inStock": true,
    "brand": "Ecovacs"
  },
  {
    "id": 20,
    "name": "Beats Fit Pro Wireless Earbuds",
    "price": 179.99,
    "image": "https://www.gadgetclubbd.com/wp-content/uploads/2024/10/Beats-Fit-Pro-ANC-True-Wireless-Earbuds-4-400x225.webp",
    "rating": 4.5,
    "reviews": 1035,
    "category": "Audio",
    "description": "Comfort-fit wireless earbuds with noise cancellation and spatial audio.",
    "inStock": true,
    "brand": "Beats"
  }
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
