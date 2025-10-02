<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-70"></div>
        <div class="absolute inset-0"
          style="background-image: radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.1) 1px, transparent 0); background-size: 40px 40px;">
        </div>
      </div> -->
      <div class="absolute inset-0 z-0">
        <video autoplay muted loop class="w-full h-full object-cover opacity-40">
          <source src="../assets/video/bg.mp4" type="video/mp4">
        </video>
        <div class="absolute inset-0 bg-black bg-opacity-10"></div>
      </div>

      <div class="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div class="mb-6 animate-fade-in">
          <span
            class="inline-flex items-center bg-gradient-to-r from-blue-800 to-purple-300 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg">
            🌍 Connecting Global Commerce • Empowering Targeted Excellence
          </span>
        </div>

        <h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-balance leading-tight">
          Welcome to
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
            RH Business Club
          </span>
        </h1>

        <p class="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto text-balance leading-relaxed">
          Your premier commercial hub for sourcing, importing, and distributing high-quality specialized products and
          services across exclusive sectors.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button @click="scrollToSection('clubs')"
            class="group bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-8 py-4 rounded-xl hover:shadow-2xl transition-all duration-300 flex items-center space-x-2 text-lg transform hover:scale-105">
            <span>Explore Our Clubs</span>
            <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button @click="scrollToSection('products')"
            class="border-2 border-gray-300 text-gray-700 font-semibold px-8 py-4 rounded-xl hover:border-blue-600 hover:text-blue-600 hover:shadow-lg transition-all duration-300 text-lg">
            Browse Products
          </button>
        </div>
      </div>

      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown class="w-8 h-8 text-gray-400" />
      </div>
    </section>

    <section class="py-16 bg-white border-y border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          <div class="text-center">
          
            <div
              class="text-4xl   font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              50M+</div>
            <div class="text-gray-600 text-sm font-medium">Products Available</div>
          </div>
          <div class="text-center">
            <div
              class="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              180+</div>
            <div class="text-gray-600 text-sm font-medium">Countries Served</div>
          </div>
          <div class="text-center">
            <div
              class="text-4xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent mb-2">
              24/7</div>
            <div class="text-gray-600 text-sm font-medium">Support Available</div>
          </div>
          <div class="text-center">
            <div
              class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
              99.9%</div>
            <div class="text-gray-600 text-sm font-medium">Client Satisfaction</div>
          </div>
        </div>
      </div>
    </section>

    <section id="clubs" class="py-24 bg-gradient-to-b from-white to-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl sm:text-5xl font-bold mb-6 text-balance">
            Our Specialized <span
              class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Business Clubs</span>
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto text-balance">
            Three distinct subsidiaries, one unified platform. Each club focuses on excellence in its niche while
            sharing our commitment to quality.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            class="group relative overflow-hidden rounded-3xl bg-white border-2 border-gray-200 hover:border-blue-500 transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-2">
            <div
              class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-500 opacity-10 rounded-bl-full">
            </div>
            <div class="p-8">
              <div
                class="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Cpu class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-3">Quantum Club</h3>
              <p class="text-sm text-blue-600 font-semibold mb-4 uppercase tracking-wide">Tech-Inspired Quality Products
              </p>
              <p class="text-gray-600 mb-6 leading-relaxed">
                Latest high-quality and innovative technology goods, gadgets, and smart solutions from global markets.
              </p>
              <button @click="navigateToCategory('electronics')"
                class="text-blue-600 font-semibold flex items-center space-x-2 group-hover:translate-x-2 transition-transform">
                <span>Explore Tech</span>
                <ArrowRight class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            class="group relative overflow-hidden rounded-3xl bg-white border-2 border-gray-200 hover:border-purple-500 transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-2">
            <div
              class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 opacity-10 rounded-bl-full">
            </div>
            <div class="p-8">
              <div
                class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Sparkles class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-3">Elegance Club</h3>
              <p class="text-sm text-purple-600 font-semibold mb-4 uppercase tracking-wide">Premium Fashion & Lifestyle
              </p>
              <p class="text-gray-600 mb-6 leading-relaxed">
                Curated premium and designer fashion, accessories, and luxury lifestyle items for discerning clientele.
              </p>
              <button @click="navigateToCategory('fashion')"
                class="text-purple-600 font-semibold flex items-center space-x-2 group-hover:translate-x-2 transition-transform">
                <span>Explore Fashion</span>
                <ArrowRight class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            class="group relative overflow-hidden rounded-3xl bg-white border-2 border-gray-200 hover:border-green-500 transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-2">
            <div
              class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-500 opacity-10 rounded-bl-full">
            </div>
            <div class="p-8">
              <div
                class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Plane class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-3">NextStop Club</h3>
              <p class="text-sm text-green-600 font-semibold mb-4 uppercase tracking-wide">Travel & Visa Services</p>
              <p class="text-gray-600 mb-6 leading-relaxed">
                Comprehensive global travel, logistics, and visa/immigration consultation for international movement.
              </p>
              <button @click="openRequestModal"
                class="text-green-600 font-semibold flex items-center space-x-2 group-hover:translate-x-2 transition-transform">
                <span>Get Consultation</span>
                <ArrowRight class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

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
                  <Star class="w-4 h-4 text-yellow-400 fill-current" />
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
            <ArrowRight class="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>

    <section class="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 class="text-4xl sm:text-5xl font-bold mb-6 text-balance">
              Why Choose <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">RH
                Business Club</span>?
            </h2>
            <p class="text-xl text-gray-600 mb-8 text-balance leading-relaxed">
              We bridge the gap between discerning clients and their desired global products and services through our
              unified platform.
            </p>

            <div class="space-y-6">
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Package class="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">Quality Assurance</h3>
                  <p class="text-gray-600">Triple-layer vetting ensures all products and services meet our stringent
                    quality standards.</p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Globe class="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">Global Sourcing</h3>
                  <p class="text-gray-600">Access to international suppliers and authentic products from verified
                    sources worldwide.</p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield class="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">Unified Platform</h3>
                  <p class="text-gray-600">Consolidated efficiency with shared resources across all specialized clubs.
                  </p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users class="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">Client-Centric Service</h3>
                  <p class="text-gray-600">Dedicated to finding and delivering your desired products with exceptional
                    support.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="relative">
            <div class="aspect-square bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-3xl p-8">
              <div class="w-full h-full bg-white rounded-2xl shadow-xl p-6 flex flex-col justify-center space-y-4">
                <div
                  class="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                  <span class="text-gray-900 font-semibold">Quantum Club</span>
                  <span class="text-blue-600 font-bold">2.5M+ products</span>
                </div>
                <div
                  class="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                  <span class="text-gray-900 font-semibold">Elegance Club</span>
                  <span class="text-purple-600 font-bold">1.8M+ products</span>
                </div>
                <div
                  class="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <span class="text-gray-900 font-semibold">NextStop Club</span>
                  <span class="text-green-600 font-bold">Global Services</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
      <div class="max-w-4xl mx-auto text-center px-4 sm:px-6">
        <h2 class="text-4xl sm:text-5xl font-bold mb-6 text-white text-balance">
          Ready to Experience Excellence?
        </h2>
        <p class="text-xl text-white/90 mb-8 text-balance leading-relaxed">
          Join thousands of satisfied clients who trust RH Business Club for their global commerce needs.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button @click="navigateTo('/shop')"
            class="bg-white text-gray-900 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 text-lg shadow-xl transform hover:scale-105">
            Start Shopping
          </button>
          <button @click="openRequestModal"
            class="border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white hover:text-gray-900 transition-all duration-300 text-lg transform hover:scale-105">
            Request Custom Quote
          </button>
        </div>
      </div>
    </section>

    <teleport to="body">
      <transition name="modal">
        <div v-if="showRequestModal" class="fixed inset-0 z-[9999] overflow-y-auto">
          <div class="flex items-center justify-center min-h-screen px-4">
            <div class="fixed inset-0 bg-black bg-opacity-50" @click="showRequestModal = false"></div>
            <div class="relative bg-white rounded-2xl shadow-2xl max-w-md w-full border border-gray-200">
              <div class="p-6">
                <div class="flex items-center justify-between mb-6">
                  <h3 class="text-xl font-semibold text-gray-900">Request Custom Quote</h3>
                  <button @click="showRequestModal = false"
                    class="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                    <X class="w-5 h-5" />
                  </button>
                </div>

                <form @submit.prevent="submitRequest" class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Product Description</label>
                    <textarea v-model="requestForm.description" placeholder="Describe the product you're looking for..."
                      class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                      rows="3" required></textarea>
                  </div>

                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                      <input v-model="requestForm.quantity" type="number" placeholder="1000"
                        class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                        required />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Budget (৳)</label>
                      <input v-model="requestForm.budget" type="text" placeholder="10000"
                        class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                    <input v-model="requestForm.email" type="email" placeholder="your@email.com"
                      class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                      required />
                  </div>

                  <button type="submit"
                    class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold transform hover:scale-105">
                    Submit Request
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </teleport>
  </div>

</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowRight, ChevronDown, Package, Globe, Shield, Users, Star, Cpu, Sparkles, Plane, X } from 'lucide-vue-next'

const router = useRouter()

const showRequestModal = ref(false)
const requestForm = ref({
  description: '',
  quantity: '',
  budget: '',
  email: ''
})

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

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const openRequestModal = () => {
  showRequestModal.value = true
}

const navigateTo = (path) => {
  router.push(path)
}

const navigateToCategory = (slug) => {
  router.push(`/products?category=${slug}`)
}

const handleAddToCart = (product) => {
  console.log('Adding to cart:', product)
  alert(`${product.name} added to cart!`)
}

const submitRequest = () => {
  console.log('Request submitted:', requestForm.value)
  showRequestModal.value = false
  requestForm.value = {
    description: '',
    quantity: '',
    budget: '',
    email: ''
  }
  alert('Request submitted successfully! We will contact you within 24 hours.')
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out;
}

html {
  scroll-behavior: smooth;
}
</style>