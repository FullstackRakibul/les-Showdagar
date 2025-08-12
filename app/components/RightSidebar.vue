<template>
  <aside
    class="h-full bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 flex flex-col shadow-xl transition-colors duration-200"
  >
    <!-- Sidebar Header -->
    <div class="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
          Special Offers
        </h2>
        <button
          @click="layoutStore.closeRightSidebar"
          class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors lg:hidden"
        >
          <X class="w-5 h-5" />
        </button>
      </div>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Don't miss these amazing deals and exclusive offers!
      </p>
    </div>

    <!-- Scrollable Content Area -->
    <div class="flex-1 overflow-y-auto">
      <!-- Campaign Banners -->
      <div class="p-4 sm:p-6 space-y-4">
        <!-- Flash Sale Banner -->
        <div
          class="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-6 text-white relative overflow-hidden"
        >
          <div
            class="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -translate-y-16 translate-x-16"
          ></div>
          <div class="relative z-10">
            <div class="flex items-center mb-2">
              <Zap class="w-5 h-5 mr-2" />
              <span class="text-sm font-semibold uppercase tracking-wide"
                >Flash Sale</span
              >
            </div>
            <h3 class="text-xl font-bold mb-2">Up to 70% OFF</h3>
            <p class="text-sm opacity-90 mb-4">Limited time offer on selected items</p>
            <div class="flex items-center space-x-4 mb-4">
              <div class="text-center">
                <div class="bg-white bg-opacity-20 rounded-lg px-2 py-1">
                  <span class="text-lg font-bold">{{ countdown.hours }}</span>
                </div>
                <span class="text-xs">Hours</span>
              </div>
              <div class="text-center">
                <div class="bg-white bg-opacity-20 rounded-lg px-2 py-1">
                  <span class="text-lg font-bold">{{ countdown.minutes }}</span>
                </div>
                <span class="text-xs">Min</span>
              </div>
              <div class="text-center">
                <div class="bg-white bg-opacity-20 rounded-lg px-2 py-1">
                  <span class="text-lg font-bold">{{ countdown.seconds }}</span>
                </div>
                <span class="text-xs">Sec</span>
              </div>
            </div>
            <button
              class="bg-white text-red-500 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors"
            >
              Shop Now
            </button>
          </div>
        </div>

        <!-- Free Shipping Banner -->
        <div
          class="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white"
        >
          <div class="flex items-center mb-2">
            <Truck class="w-5 h-5 mr-2" />
            <span class="text-sm font-semibold uppercase tracking-wide"
              >Free Shipping</span
            >
          </div>
          <h3 class="text-lg font-bold mb-2">Orders Over $50</h3>
          <p class="text-sm opacity-90">Fast & reliable delivery worldwide</p>
        </div>

        <!-- Seasonal Sale Banner -->
        <div
          class="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-6 text-white"
        >
          <div class="flex items-center mb-2">
            <Gift class="w-5 h-5 mr-2" />
            <span class="text-sm font-semibold uppercase tracking-wide">Winter Sale</span>
          </div>
          <h3 class="text-lg font-bold mb-2">Save Big This Season</h3>
          <p class="text-sm opacity-90 mb-3">Exclusive deals on winter collection</p>
          <button
            class="bg-white text-purple-500 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors"
          >
            Explore Deals
          </button>
        </div>
      </div>

      <!-- Hot Deals Section -->
      <div class="p-4 sm:p-6">
        <div class="flex items-center justify-between mb-4">
          <h3
            class="text-lg font-semibold text-gray-900 dark:text-white flex items-center"
          >
            <Flame class="w-5 h-5 text-red-500 mr-2" />
            Hot Deals
          </h3>
          <span
            class="text-xs bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 px-2 py-1 rounded-full font-semibold"
          >
            Limited Time
          </span>
        </div>

        <div class="space-y-3">
          <div
            v-for="deal in hotDeals"
            :key="deal.id"
            class="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl p-3 border border-red-200 dark:border-red-800 hover:shadow-md transition-all duration-200 cursor-pointer"
            @click="productStore.openProductModal(deal)"
          >
            <div class="flex items-center space-x-3">
              <img
                :src="deal.image"
                :alt="deal.name"
                class="w-12 h-12 object-cover rounded-lg"
              />
              <div class="flex-1 min-w-0">
                <h4 class="font-semibold text-gray-900 dark:text-white text-sm truncate">
                  {{ deal.name }}
                </h4>
                <div class="flex items-center space-x-2 mt-1">
                  <span class="text-lg font-bold text-red-600">${{ deal.price }}</span>
                  <span
                    v-if="deal.originalPrice"
                    class="text-sm text-gray-500 line-through"
                    >${{ deal.originalPrice }}</span
                  >
                </div>
                <div class="flex items-center mt-1">
                  <div class="flex text-yellow-400 mr-2">
                    <Star
                      v-for="star in 5"
                      :key="star"
                      :class="star <= deal.rating ? 'fill-current' : ''"
                      class="w-3 h-3"
                    />
                  </div>
                  <span class="text-xs text-gray-500 dark:text-gray-400"
                    >({{ deal.reviews }})</span
                  >
                </div>
              </div>
            </div>
            <div class="mt-3 flex items-center justify-between">
              <span
                class="text-xs bg-red-500 text-white px-2 py-1 rounded-full font-semibold"
              >
                {{
                  Math.round(
                    ((deal.originalPrice - deal.price) / deal.originalPrice) * 100
                  )
                }}% OFF
              </span>
              <button
                @click.stop="productStore.addToCart(deal)"
                class="text-xs bg-primary text-white px-3 py-1 rounded-lg hover:bg-primary-dark transition-colors font-medium flex items-center space-x-1"
              >
                <ShoppingCart class="w-3 h-3" />
                <span>Add</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- New Arrivals -->
      <div class="p-4 sm:p-6">
        <div class="flex items-center justify-between mb-4">
          <h3
            class="text-lg font-semibold text-gray-900 dark:text-white flex items-center"
          >
            <Sparkles class="w-5 h-5 text-blue-500 mr-2" />
            New Arrivals
          </h3>
          <button class="text-xs text-primary hover:text-primary-dark font-medium">
            View All
          </button>
        </div>

        <div class="space-y-3">
          <div
            v-for="product in newArrivals"
            :key="product.id"
            class="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            @click="productStore.openProductModal(product)"
          >
            <img
              :src="product.image"
              :alt="product.name"
              class="w-12 h-12 object-cover rounded-lg"
            />
            <div class="flex-1 min-w-0">
              <h4 class="font-medium text-gray-900 dark:text-white text-sm truncate">
                {{ product.name }}
              </h4>
              <p class="text-sm font-semibold text-primary">${{ product.price }}</p>
            </div>
            <span
              class="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full font-semibold"
            >
              NEW
            </span>
          </div>
        </div>
      </div>

      <!-- Trending Products -->
      <div class="p-4 sm:p-6">
        <div class="flex items-center justify-between mb-4">
          <h3
            class="text-lg font-semibold text-gray-900 dark:text-white flex items-center"
          >
            <TrendingUp class="w-5 h-5 text-green-500 mr-2" />
            Trending Now
          </h3>
        </div>

        <div class="space-y-3">
          <div
            v-for="(product, index) in trendingProducts"
            :key="product.id"
            class="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            @click="productStore.openProductModal(product)"
          >
            <div
              class="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center"
            >
              {{ index + 1 }}
            </div>
            <img
              :src="product.image"
              :alt="product.name"
              class="w-12 h-12 object-cover rounded-lg"
            />
            <div class="flex-1 min-w-0">
              <h4 class="font-medium text-gray-900 dark:text-white text-sm truncate">
                {{ product.name }}
              </h4>
              <div class="flex items-center space-x-2">
                <p class="text-sm font-semibold text-gray-900 dark:text-white">
                  ${{ product.price }}
                </p>
                <div class="flex text-yellow-400">
                  <Star
                    v-for="star in 5"
                    :key="star"
                    :class="star <= product.rating ? 'fill-current' : ''"
                    class="w-3 h-3"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Newsletter Signup -->
      <div class="p-4 sm:p-6">
        <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
          <div class="text-center">
            <Mail class="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Stay Updated</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Get notified about new deals and products
            </p>
            <div class="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                class="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              />
              <button
                class="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors font-medium text-sm"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <slot />
    </div>
  </aside>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import {
  X,
  Flame,
  Star,
  Sparkles,
  TrendingUp,
  Mail,
  Zap,
  Truck,
  Gift,
  ShoppingCart,
} from "lucide-vue-next";
import { useLayoutStore } from "@/stores/layout";
import { useProductStore } from "@/stores/products";

const layoutStore = useLayoutStore();
const productStore = useProductStore();

// Countdown timer
const countdown = ref({
  hours: 12,
  minutes: 34,
  seconds: 56,
});

// Mock data for offers
const hotDeals = computed(() => [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    originalPrice: 399.99,
    image:
      "https://img.freepik.com/free-photo/rendering-smart-home-device_23-2151039302.jpg?semt=ais_hybrid&w=740",
    rating: 4.8,
    reviews: 1247,
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 199.99,
    originalPrice: 299.99,
    image:
      "https://t3.ftcdn.net/jpg/13/37/59/58/360_F_1337595881_iRH94v8gXcq6qDZOmpeEd9XtpL2jIV9h.jpg",
    rating: 4.6,
    reviews: 892,
  },
]);

const newArrivals = computed(() =>
  productStore.products.filter((p) => p.isNew).slice(0, 4)
);
const trendingProducts = computed(() =>
  productStore.products.filter((p) => p.rating >= 4.5).slice(0, 5)
);

// Countdown timer
let countdownInterval = null;

const startCountdown = () => {
  countdownInterval = setInterval(() => {
    if (countdown.value.seconds > 0) {
      countdown.value.seconds--;
    } else if (countdown.value.minutes > 0) {
      countdown.value.minutes--;
      countdown.value.seconds = 59;
    } else if (countdown.value.hours > 0) {
      countdown.value.hours--;
      countdown.value.minutes = 59;
      countdown.value.seconds = 59;
    } else {
      // Reset countdown
      countdown.value = { hours: 12, minutes: 34, seconds: 56 };
    }
  }, 1000);
};

onMounted(() => {
  startCountdown();
});

onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
});
</script>
