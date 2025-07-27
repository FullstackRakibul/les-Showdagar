<template>
  <div class="space-y-8">
    <!-- Hero Section -->
    <section
      class="relative bg-gradient-to-br from-primary/10 via-purple-50 to-pink-50 dark:from-primary/20 dark:via-purple-900/20 dark:to-pink-900/20 rounded-3xl p-8 lg:p-12 mb-8 overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-10 left-10 w-20 h-20 bg-primary rounded-full"></div>
        <div class="absolute top-32 right-20 w-16 h-16 bg-purple-500 rounded-full"></div>
        <div class="absolute bottom-20 left-32 w-12 h-12 bg-pink-500 rounded-full"></div>
        <div class="absolute bottom-10 right-10 w-24 h-24 bg-orange-500 rounded-full"></div>
      </div>

      <div class="relative z-10 text-center max-w-4xl mx-auto">
        <div class="inline-flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-full px-4 py-2 mb-6 shadow-lg">
          <Sparkles class="w-4 h-4 text-primary" />
          <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">New Collection Available</span>
        </div>

        <h1 class="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
          Discover Amazing
          <span class="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Products
          </span>
        </h1>

        <p class="text-lg lg:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Find the best deals on electronics, fashion, home & garden, and more.
          Shop with confidence and enjoy fast, free shipping.
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
          <button
            class="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-2">
            <ShoppingBag class="w-5 h-5" />
            <span>Shop Now</span>
          </button>

          <button
            class="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 flex items-center space-x-2">
            <Play class="w-5 h-5" />
            <span>Watch Demo</span>
          </button>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-2xl mx-auto">
          <div class="text-center">
            <div class="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">10K+</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Products</div>
          </div>
          <div class="text-center">
            <div class="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">50K+</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Customers</div>
          </div>
          <div class="text-center">
            <div class="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">4.9</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Rating</div>
          </div>
          <div class="text-center">
            <div class="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">24/7</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Support</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section>
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Shop by Category</h2>
        <button class="text-primary hover:text-primary-dark font-medium transition-colors flex items-center space-x-1">
          <span>View all</span>
          <ChevronRight class="w-4 h-4" />
        </button>
      </div>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div v-for="category in featuredCategories" :key="category.name"
          @click="productStore.selectedCategory = category.name"
          class="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 dark:border-gray-700 hover:border-primary/20">
          <div class="flex flex-col items-center text-center">
            <div
              class="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <component :is="category.icon" class="w-8 h-8 lg:w-10 lg:h-10 text-primary" />
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">{{ category.name }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">{{ category.count }} items</p>
            <div
              class="text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Explore →
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section>
      <div class="flex justify-between items-center mb-6">
        <div>
          <h2 class="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Featured Products</h2>
          <p class="text-gray-600 dark:text-gray-400 mt-1">Handpicked items just for you</p>
        </div>
        <button class="text-primary hover:text-primary-dark font-medium transition-colors flex items-center space-x-1">
          <span>See all</span>
          <ChevronRight class="w-4 h-4" />
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ProductCard v-for="product in featuredProducts" :key="product.id" :product="product" />
      </div>
    </section>

    <!-- Special Offers Banner -->
    <section
      class="relative bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 lg:p-12 text-white overflow-hidden">
      <div class="absolute inset-0 bg-black bg-opacity-10"></div>
      <div class="absolute top-0 right-0 w-64 h-64 bg-white bg-opacity-10 rounded-full -translate-y-32 translate-x-32">
      </div>
      <div
        class="absolute bottom-0 left-0 w-48 h-48 bg-white bg-opacity-10 rounded-full translate-y-24 -translate-x-24">
      </div>

      <div class="relative z-10 text-center max-w-3xl mx-auto">
        <div class="inline-flex items-center space-x-2 bg-white bg-opacity-20 rounded-full px-4 py-2 mb-4">
          <Zap class="w-4 h-4" />
          <span class="text-sm font-semibold">Limited Time Offer</span>
        </div>

        <h2 class="text-3xl lg:text-5xl font-bold mb-4">
          Up to 70% OFF
        </h2>

        <p class="text-lg lg:text-xl opacity-90 mb-6">
          Don't miss out on our biggest sale of the year. Free shipping on all orders over $50.
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            class="bg-white text-orange-500 hover:bg-gray-100 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl">
            Shop Sale
          </button>

          <div class="flex items-center space-x-4 text-sm">
            <div class="text-center">
              <div class="bg-white bg-opacity-20 rounded-lg px-3 py-2 mb-1">
                <span class="text-xl font-bold">12</span>
              </div>
              <span>Hours</span>
            </div>
            <div class="text-center">
              <div class="bg-white bg-opacity-20 rounded-lg px-3 py-2 mb-1">
                <span class="text-xl font-bold">34</span>
              </div>
              <span>Minutes</span>
            </div>
            <div class="text-center">
              <div class="bg-white bg-opacity-20 rounded-lg px-3 py-2 mb-1">
                <span class="text-xl font-bold">56</span>
              </div>
              <span>Seconds</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Trending Products -->
    <section>
      <div class="flex justify-between items-center mb-6">
        <div>
          <h2 class="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <TrendingUp class="w-6 h-6 text-green-500 mr-3" />
            Trending Now
          </h2>
          <p class="text-gray-600 dark:text-gray-400 mt-1">What everyone's buying</p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ProductCard v-for="product in trendingProducts" :key="product.id" :product="product" />
      </div>
    </section>

    <!-- Features Section -->
    <section class="bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 lg:p-12">
      <div class="text-center mb-12">
        <h2 class="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Why Choose Les Showdagar?
        </h2>
        <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          We're committed to providing you with the best shopping experience possible
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div class="text-center">
          <div
            class="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Truck class="w-8 h-8 text-green-600" />
          </div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Free Shipping</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">Free delivery on orders over $50</p>
        </div>

        <div class="text-center">
          <div
            class="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield class="w-8 h-8 text-blue-600" />
          </div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Secure Payment</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">Your payment information is safe</p>
        </div>

        <div class="text-center">
          <div
            class="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <RotateCcw class="w-8 h-8 text-purple-600" />
          </div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Easy Returns</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">30-day return policy</p>
        </div>

        <div class="text-center">
          <div
            class="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Headphones class="w-8 h-8 text-orange-600" />
          </div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2">24/7 Support</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">Always here to help you</p>
        </div>
      </div>
    </section>

    <!-- No Results -->
    <div v-if="productStore.filteredProducts.length === 0" class="text-center py-16">
      <Search class="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
      <h3 class="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-3">No products found</h3>
      <p class="text-gray-500 dark:text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
      <button @click="productStore.selectedCategory = 'All Products'; productStore.searchQuery = ''"
        class="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl transition-colors font-semibold">
        Clear Filters
      </button>
    </div>

    <!-- Product Modal -->
    <ProductModal />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import {
  ChevronRight, Search, Sparkles, ShoppingBag, Play, TrendingUp,
  Zap, Truck, Shield, RotateCcw, Headphones,
  Smartphone, Laptop, Shirt, Home, Gamepad2, Watch, Camera, Headphones as HeadphonesIcon
} from 'lucide-vue-next'
import { useProductStore } from '@/stores/products'
import ProductCard from '@/components/ProductCard.vue'
import ProductModal from '@/components/ProductModal.vue'

const productStore = useProductStore()

const featuredCategories = [
  { name: 'Electronics', icon: Smartphone, count: 1250 },
  { name: 'Fashion', icon: Shirt, count: 890 },
  { name: 'Home & Garden', icon: Home, count: 650 },
  { name: 'Gaming', icon: Gamepad2, count: 420 }
]

const featuredProducts = computed(() =>
  productStore.products.filter(p => p.rating >= 4.5).slice(0, 8)
)

const trendingProducts = computed(() =>
  productStore.products.filter(p => p.isHot || p.isNew).slice(0, 8)
)
</script>