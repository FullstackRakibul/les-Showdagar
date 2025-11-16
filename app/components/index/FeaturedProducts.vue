<template>
  <section id="products" class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl sm:text-5xl font-bold mb-6 text-balance">
          Featured <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Products</span>
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto text-balance">
          Discover our curated selection of premium products across technology, fashion, and lifestyle categories.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div v-for="product in featuredProducts" :key="product.id"
          class="group bg-white rounded-2xl border-2 border-gray-200 hover:border-blue-500 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div class="relative aspect-square overflow-hidden bg-gray-100">
            <img :src="product.image" :alt="product.name"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div v-if="product.isNew"
              class="absolute top-3 left-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold">NEW
            </div>
            <div v-if="product.isHot"
              class="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold">🔥 HOT
            </div>
          </div>
          <div class="p-4">
            <p class="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">{{ product.category }}</p>
            <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2">{{ product.name }}</h3>
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center space-x-2">
                <!-- <span class="text-lg font-bold text-gray-900">৳{{ product.price }}</span>
                  <span v-if="product.originalPrice" class="text-sm text-gray-400 line-through">৳{{
                    product.originalPrice }}</span> -->
              </div>
              <div class="flex items-center space-x-1">
                <LucideStar class="w-4 h-4 text-yellow-400 fill-current" />
                <span class="text-sm text-gray-600">{{ product.rating }}</span>
              </div>
            </div>
            <!-- <button @click="handleAddToCart(product)"
                class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Add to Cart
              </button> -->
          </div>
        </div>
      </div>

      <div class="text-center">
        <button @click="navigateTo('/products')"
          class="inline-flex items-center space-x-2 bg-gray-900 text-white font-semibold px-8 py-4 rounded-xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105">
          <span>View All Products</span>
          <LucideArrowRight class="w-5 h-5" />
        </button>
      </div>
    </div>
  </section>
</template>

<script setup {} lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateTo = (path) => {
  router.push(path)
}

const featuredProducts = ref([
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    originalPrice: 399.99,
    image: "https://img.freepik.com/free-photo/rendering-smart-home-device_23-2151039302.jpg",
    rating: 4.8,
    category: "Electronics",
    isHot: true,
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 199.99,
    image: "https://t3.ftcdn.net/jpg/13/37/59/58/360_F_1337595881_iRH94v8gXcq6qDZOmpeEd9XtpL2jIV9h.jpg",
    rating: 4.6,
    category: "Wearables",
    isNew: true,
  },
  {
    id: 3,
    name: "Designer Leather Handbag",
    price: 449.99,
    originalPrice: 599.99,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500",
    rating: 4.9,
    category: "Fashion",
    isHot: true,
  },
  {
    id: 4,
    name: "Professional Camera Lens",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1637756856486-9d0cbe42a560?w=500",
    rating: 4.9,
    category: "Photography",
  },
  {
    id: 5,
    name: "Luxury Silk Scarf",
    price: 129.99,
    image: "https://i5.walmartimages.com/asr/98cdac3c-946f-4f22-8552-323995c1eb9f.acc8bc893823c599b27ab2b605589c8b.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    rating: 4.7,
    category: "Fashion",
    isNew: true,
  },
  {
    id: 6,
    name: "Wireless Gaming Mouse",
    price: 79.99,
    originalPrice: 99.99,
    image: "https://m.media-amazon.com/images/I/61Mk3YqYHpL.jpg",
    rating: 4.5,
    category: "Gaming",
  },
  {
    id: 7,
    name: "Premium Sunglasses",
    price: 189.99,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBRLRmME3ChslGO295OF8bAvf20oKCK6K9BQ&s",
    rating: 4.6,
    category: "Fashion",
  },
  {
    id: 8,
    name: "4K Action Camera",
    price: 349.99,
    originalPrice: 449.99,
    image: "https://ausha.co.in/cdn/shop/files/G.jpg",
    rating: 4.8,
    category: "Electronics",
    isHot: true,
  }
])
</script>