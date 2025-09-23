<template>
  <div class="min-h-screen bg-black text-white overflow-hidden rounded-l-lg">
    <!-- Hero Section with Video Background -->
    <section class="relative h-screen flex items-center justify-center overflow-hidden">
      <!-- Background Video -->
      <div class="absolute inset-0 z-0">
        <video autoplay muted loop class="w-full h-full object-cover opacity-40">
          <source src="../assets/video/bg.mp4" type="video/mp4">
        </video>
        <div class="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>


      <!-- Hero Content -->
      <div class="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6">
        <div class="mb-6">
          <span class="inline-flex items-center bg-white/10 text-white/90 px-4 py-2 rounded-full text-sm font-medium">
            🌍 Global Business Network • Trusted by 5,000+ Clients
          </span>


        </div>

        <h1 class="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 text-balance leading-tight">
          The complete platform for
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            global business
          </span>
        </h1>

        <p class="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto text-balance">
          Connect with international suppliers, access premium products, and scale your business with bulk orders and
          custom procurement solutions.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button @click="scrollToCategories"
            class="bg-white text-black font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-200 flex items-center space-x-2 text-lg">
            <span>Start Exploring</span>
            <ArrowRight class="w-5 h-5" />
          </button>
          <button @click="openRequestModal"
            class="border border-white/30 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-200 text-lg">
            Request Custom Quote
          </button>
        </div>
      </div>
    </section>

    <!-- Trust Indicators -->
    <section class="py-16 border-b border-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          <div class="text-center">
            <div class="text-3xl font-bold text-white mb-2">50M+</div>
            <div class="text-gray-400 text-sm">Products Available</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-white mb-2">180+</div>
            <div class="text-gray-400 text-sm">Countries Served</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-white mb-2">24/7</div>
            <div class="text-gray-400 text-sm">Support Available</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-white mb-2">99.9%</div>
            <div class="text-gray-400 text-sm">Uptime Guarantee</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Business Categories -->
    <section id="categories" class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl sm:text-5xl font-bold mb-6 text-balance">
            Explore Business Categories
          </h2>
          <p class="text-xl text-gray-400 max-w-3xl mx-auto text-balance">
            From electronics to lifestyle products, find everything your business needs from verified international
            suppliers.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="category in businessCategories" :key="category.name" @click="navigateToCategory(category.slug)"
            class="group relative overflow-hidden rounded-2xl bg-gray-900 border border-gray-800 hover:border-gray-600 transition-all duration-300 cursor-pointer">
            <div class="aspect-video relative overflow-hidden">
              <img :src="category.image" :alt="category.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div
                class="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300">
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold text-white mb-2">{{ category.name }}</h3>
              <p class="text-gray-400 text-sm mb-4">{{ category.description }}</p>
              <div class="flex items-center justify-between">
                <span class="text-blue-400 font-medium">{{ category.productCount }}+ Products</span>
                <ArrowRight
                  class="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-gray-900/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 class="text-4xl sm:text-5xl font-bold mb-6 text-balance">
              Built for modern businesses.
            </h2>
            <p class="text-xl text-gray-400 mb-8 text-balance">
              Advanced tools and features designed to streamline your procurement process and accelerate business
              growth.
            </p>

            <div class="space-y-6">
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Package class="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-white mb-2">Bulk & Single Orders</h3>
                  <p class="text-gray-400">Order anything from single units to container loads with flexible pricing.
                  </p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageSquare class="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-white mb-2">Custom Procurement</h3>
                  <p class="text-gray-400">Request specific products and get quotes from verified suppliers worldwide.
                  </p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield class="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-white mb-2">Verified Suppliers</h3>
                  <p class="text-gray-400">All suppliers are thoroughly vetted for quality and reliability.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="relative">
            <div class="aspect-square bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl p-8">
              <div
                class="w-full h-full bg-gray-800/50 rounded-2xl border border-gray-700 p-6 flex flex-col justify-center">
                <div class="space-y-4">
                  <div class="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl">
                    <span class="text-white font-medium">Electronics</span>
                    <span class="text-green-400">2.5M+ products</span>
                  </div>
                  <div class="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl">
                    <span class="text-white font-medium">Fashion & Lifestyle</span>
                    <span class="text-blue-400">1.8M+ products</span>
                  </div>
                  <div class="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl">
                    <span class="text-white font-medium">Home & Garden</span>
                    <span class="text-purple-400">950K+ products</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20">
      <div class="max-w-4xl mx-auto text-center px-4 sm:px-6">
        <h2 class="text-4xl sm:text-5xl font-bold mb-6 text-balance">
          Ready to scale your business?
        </h2>
        <p class="text-xl text-gray-400 mb-8 text-balance">
          Join thousands of businesses already trading on RH Business Club. Start your global expansion today.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button @click="navigateTo('/products')"
            class="bg-white text-black font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-200 text-lg">
            Browse Products
          </button>
          <button @click="openRequestModal"
            class="border border-white/30 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-200 text-lg">
            Get Custom Quote
          </button>
        </div>
      </div>
    </section>

    <!-- Request Modal -->
    <teleport to="body">
      <transition name="modal">
        <div v-if="showRequestModal" class="fixed inset-0 z-[9999] overflow-y-auto">
          <div class="flex items-center justify-center min-h-screen px-4">
            <div class="fixed inset-0 bg-black bg-opacity-75" @click="showRequestModal = false"></div>
            <div class="relative bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full border border-gray-700">
              <div class="p-6">
                <div class="flex items-center justify-between mb-6">
                  <h3 class="text-xl font-semibold text-white">Request Custom Quote</h3>
                  <button @click="showRequestModal = false"
                    class="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors">
                    <X class="w-5 h-5" />
                  </button>
                </div>

                <form @submit.prevent="submitRequest" class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-300 mb-2">Product Description</label>
                    <textarea v-model="requestForm.description" placeholder="Describe the product you're looking for..."
                      class="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                      rows="3" required></textarea>
                  </div>

                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-300 mb-2">Quantity</label>
                      <input v-model="requestForm.quantity" type="number" placeholder="1000"
                        class="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                        required />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-300 mb-2">Budget (USD) / Budget (TK)</label>
                      <input v-model="requestForm.budget" type="text" placeholder="10000"
                        class="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-300 mb-2">Contact Email</label>
                    <input v-model="requestForm.email" type="email" placeholder="your@gmail.com"
                      class="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                      required />
                  </div>

                  <button type="submit"
                    class="w-full bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors font-semibold">
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowRight, Package, MessageSquare, Shield, X } from 'lucide-vue-next'

// Initialize router
const router = useRouter()

// Reactive data - all declared at the top level
const showRequestModal = ref(false)
const requestForm = ref({
  description: '',
  quantity: '',
  budget: '',
  email: ''
})

// Business categories data
const businessCategories = ref([
  {
    name: 'Electronics & Technology',
    slug: 'electronics',
    description: 'Smartphones, laptops, components, and cutting-edge tech products',
    productCount: '2.5M',
    image: 'https://friendlyturtle.com/cdn/shop/articles/eco-friendly-gadgets.jpg?v=1691526848'
  },
  {
    name: 'Fashion & Lifestyle',
    slug: 'fashion',
    description: 'Apparel, accessories, beauty products, and lifestyle goods',
    productCount: '1.8M',
    image: 'https://cdn.shopify.com/s/files/1/0817/7988/4088/articles/best_20fashion_20ecommerce_20sites_36edb549-bb10-4880-b15c-128449f9b373.jpg?v=1746799686'
  },
  {
    name: 'Home & Garden',
    slug: 'home-garden',
    description: 'Furniture, decor, gardening tools, and home improvement',
    productCount: '950K',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS14zj89DSMyogxEJghV73RfU7PrdO88Xy-usLDLIqNuGb8UZvmLjDEYIZuE-DpSZ1Ugdw&usqp=CAU'
  },
  {
    name: 'Industrial Equipment',
    slug: 'industrial',
    description: 'Machinery, tools, safety equipment, and industrial supplies',
    productCount: '750K',
    image: 'https://www.mitsubishielectric.com/fa/products/cnt/plcnet/pmerit/cclink_ie_tsn/lineup/img/drv_hmi_img01.jpg'
  },
  {
    name: 'Health & Beauty',
    slug: 'health-beauty',
    description: 'Cosmetics, skincare, wellness products, and medical supplies',
    productCount: '680K',
    image: 'https://www.intuitsolutions.net/wp-content/uploads/2022/11/health-and-beauty-b2b-cosmetics-ecommerce.jpg'
  },
  {
    name: 'Sports & Recreation',
    slug: 'sports',
    description: 'Sporting goods, outdoor equipment, and recreational products',
    productCount: '420K',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnk553Xu64gdv6GIpD9Z8_DDzsDIiuSWCa67k06p2h4wEQK0jUo84Crrr03sw3Fn4kb0Y&usqp=CAU'
  }
])

// Methods
const scrollToCategories = () => {
  const element = document.getElementById('categories')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
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

const submitRequest = () => {
  // Handle form submission
  console.log('Request submitted:', requestForm.value)
  showRequestModal.value = false
  // Reset form
  requestForm.value = {
    description: '',
    quantity: '',
    budget: '',
    email: ''
  }
  // Show success message
  alert('Request submitted successfully! We will contact you within 24 hours.')
}

// Set dark theme by default
onMounted(() => {
  document.documentElement.classList.add('dark')
})
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

/* Custom scrollbar for dark theme */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1f2937;
}

::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style>