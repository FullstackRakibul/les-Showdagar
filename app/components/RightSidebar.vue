<template>
  <aside
    class="h-full bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 flex flex-col shadow-xl transition-colors duration-200">
    <!-- Sidebar Header -->
    <div class="p-6 border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
          {{ layoutStore.rightSidebarMode === 'theme' ? 'Theme Studio' : 'Special Offers' }}
        </h2>
        <div class="flex items-center space-x-2">
          <!-- Mode Toggle Buttons -->
          <div class="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button @click="layoutStore.openOffers()" :class="[
              'px-3 py-1 rounded-md text-xs font-medium transition-all duration-200',
              layoutStore.rightSidebarMode === 'offers'
                ? 'bg-primary text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            ]">
              Offers
            </button>
            <button @click="layoutStore.openThemeStudio()" :class="[
              'px-3 py-1 rounded-md text-xs font-medium transition-all duration-200',
              layoutStore.rightSidebarMode === 'theme'
                ? 'bg-primary text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            ]">
              Theme
            </button>
          </div>

          <button @click="layoutStore.closeRightSidebar"
            class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            :class="{ 'lg:hidden': !layoutStore.isMobile }">
            <X class="w-5 h-5" />
          </button>
        </div>
      </div>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        {{ layoutStore.rightSidebarMode === 'theme' ? 'Customize your shopping experience' : 'Dont miss these amazingdeals!' }}
      </p>
    </div>

    <!-- Content Area -->
    <div class="flex-1 overflow-y-auto">
      <!-- Offers Content -->
      <div v-if="layoutStore.rightSidebarMode === 'offers'" class="p-6 space-y-6">
        <!-- Hot Deals Section -->
        <div>
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <Flame class="w-5 h-5 text-red-500 mr-2" />
              Hot Deals
            </h3>
            <span
              class="text-xs bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 px-2 py-1 rounded-full font-semibold">
              Limited Time
            </span>
          </div>

          <div class="space-y-4">
            <div v-for="deal in hotDeals" :key="deal.id"
              class="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl p-4 border border-red-200 dark:border-red-800 hover:shadow-md transition-all duration-200 cursor-pointer"
              @click="productStore.openProductModal(deal)">
              <div class="flex items-center space-x-3">
                <img :src="deal.image" :alt="deal.name" class="w-16 h-16 object-cover rounded-lg" />
                <div class="flex-1 min-w-0">
                  <h4 class="font-semibold text-gray-900 dark:text-white text-sm truncate">{{ deal.name }}</h4>
                  <div class="flex items-center space-x-2 mt-1">
                    <span class="text-lg font-bold text-red-600">${{ deal.price }}</span>
                    <span v-if="deal.originalPrice" class="text-sm text-gray-500 line-through">${{ deal.originalPrice
                      }}</span>
                  </div>
                  <div class="flex items-center mt-2">
                    <div class="flex text-yellow-400 mr-2">
                      <Star v-for="star in 5" :key="star" :class="star <= deal.rating ? 'fill-current' : ''"
                        class="w-3 h-3" />
                    </div>
                    <span class="text-xs text-gray-500 dark:text-gray-400">({{ deal.reviews }})</span>
                  </div>
                </div>
              </div>
              <div class="mt-3 flex items-center justify-between">
                <span class="text-xs bg-red-500 text-white px-2 py-1 rounded-full font-semibold">
                  {{ Math.round(((deal.originalPrice - deal.price) / deal.originalPrice) * 100) }}% OFF
                </span>
                <button @click.stop="productStore.addToCart(deal)"
                  class="text-xs bg-primary text-white px-3 py-1 rounded-lg hover:bg-primary-dark transition-colors font-medium">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Flash Sale Countdown -->
        <div class="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
          <div class="text-center">
            <h3 class="text-lg font-bold mb-2">⚡ Flash Sale</h3>
            <p class="text-sm opacity-90 mb-4">Up to 70% off selected items</p>
            <div class="flex justify-center space-x-4 mb-4">
              <div class="text-center">
                <div class="bg-white bg-opacity-20 rounded-lg px-3 py-2">
                  <span class="text-xl font-bold">{{ countdown.hours }}</span>
                </div>
                <span class="text-xs">Hours</span>
              </div>
              <div class="text-center">
                <div class="bg-white bg-opacity-20 rounded-lg px-3 py-2">
                  <span class="text-xl font-bold">{{ countdown.minutes }}</span>
                </div>
                <span class="text-xs">Minutes</span>
              </div>
              <div class="text-center">
                <div class="bg-white bg-opacity-20 rounded-lg px-3 py-2">
                  <span class="text-xl font-bold">{{ countdown.seconds }}</span>
                </div>
                <span class="text-xs">Seconds</span>
              </div>
            </div>
            <button
              class="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors">
              Shop Flash Sale
            </button>
          </div>
        </div>

        <!-- New Arrivals -->
        <div>
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <Sparkles class="w-5 h-5 text-blue-500 mr-2" />
              New Arrivals
            </h3>
            <button class="text-xs text-primary hover:text-primary-dark font-medium">View All</button>
          </div>

          <div class="space-y-3">
            <div v-for="product in newArrivals" :key="product.id"
              class="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              @click="productStore.openProductModal(product)">
              <img :src="product.image" :alt="product.name" class="w-12 h-12 object-cover rounded-lg" />
              <div class="flex-1 min-w-0">
                <h4 class="font-medium text-gray-900 dark:text-white text-sm truncate">{{ product.name }}</h4>
                <p class="text-sm font-semibold text-primary">${{ product.price }}</p>
              </div>
              <span
                class="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full font-semibold">
                NEW
              </span>
            </div>
          </div>
        </div>

        <!-- Trending Products -->
        <div>
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <TrendingUp class="w-5 h-5 text-green-500 mr-2" />
              Trending Now
            </h3>
          </div>

          <div class="space-y-3">
            <div v-for="(product, index) in trendingProducts" :key="product.id"
              class="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              @click="productStore.openProductModal(product)">
              <div
                class="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                {{ index + 1 }}
              </div>
              <img :src="product.image" :alt="product.name" class="w-12 h-12 object-cover rounded-lg" />
              <div class="flex-1 min-w-0">
                <h4 class="font-medium text-gray-900 dark:text-white text-sm truncate">{{ product.name }}</h4>
                <div class="flex items-center space-x-2">
                  <p class="text-sm font-semibold text-gray-900 dark:text-white">${{ product.price }}</p>
                  <div class="flex text-yellow-400">
                    <Star v-for="star in 5" :key="star" :class="star <= product.rating ? 'fill-current' : ''"
                      class="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Newsletter Signup -->
        <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
          <div class="text-center">
            <Mail class="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Stay Updated</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">Get notified about new deals and products</p>
            <div class="space-y-3">
              <input type="email" placeholder="Enter your email"
                class="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm" />
              <button
                class="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors font-medium text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Theme Studio Content -->
      <div v-else class="p-6 space-y-8">
        <!-- Theme Colors -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Primary Color</h3>
          <div class="grid grid-cols-3 gap-3">
            <button v-for="color in themeColors" :key="color.name" @click="setActiveColor(color)" :class="[
              'w-full h-12 rounded-xl border-2 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50',
              activeColor.name === color.name
                ? 'border-gray-900 dark:border-white shadow-lg scale-105'
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
            ]" :style="{ backgroundColor: color.value }" :aria-label="`Select ${color.name} theme`">
              <div v-if="activeColor.name === color.name"
                class="w-full h-full rounded-lg flex items-center justify-center">
                <Check class="w-5 h-5 text-white drop-shadow-sm" />
              </div>
            </button>
          </div>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            Current: {{ activeColor.name.charAt(0).toUpperCase() + activeColor.name.slice(1) }}
          </p>
        </div>

        <!-- Dark Mode Toggle -->
        <div>
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Dark Mode</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Toggle dark theme</p>
            </div>
            <button @click="toggleDarkMode" :class="[
              'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800',
              isDarkMode
                ? 'bg-primary focus:ring-primary'
                : 'bg-gray-300 dark:bg-gray-600 focus:ring-gray-300'
            ]">
              <span :class="[
                'inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200',
                isDarkMode ? 'translate-x-6' : 'translate-x-1'
              ]" />
            </button>
          </div>
        </div>

        <!-- Font Size -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Font Size</h3>
          <div class="space-y-3">
            <div v-for="size in fontSizes" :key="size.key"
              class="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              @click="setFontSize(size.key)">
              <div class="flex items-center space-x-3">
                <div class="w-2 h-2 rounded-full bg-primary"
                  :class="{ 'opacity-100': selectedFontSize === size.key, 'opacity-30': selectedFontSize !== size.key }">
                </div>
                <span class="font-medium text-gray-900 dark:text-white">{{ size.name }}</span>
              </div>
              <span :class="size.class" class="text-gray-600 dark:text-gray-400">Aa</span>
            </div>
          </div>
        </div>

        <!-- Layout Density -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Layout Density</h3>
          <div class="grid grid-cols-2 gap-3">
            <button v-for="density in layoutDensities" :key="density.key" @click="setLayoutDensity(density.key)" :class="[
              'p-4 border-2 rounded-xl transition-all duration-200 text-center',
              selectedDensity === density.key
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
            ]">
              <component :is="density.icon" class="w-6 h-6 mx-auto mb-2" />
              <p class="text-sm font-medium">{{ density.name }}</p>
            </button>
          </div>
        </div>

        <!-- Quick Actions -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <div class="space-y-3">
            <button @click="resetToDefault"
              class="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl transition-colors font-medium">
              <RotateCcw class="w-4 h-4" />
              <span>Reset to Default</span>
            </button>

            <button @click="exportTheme"
              class="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-primary hover:bg-primary-dark text-white rounded-xl transition-colors font-medium">
              <Download class="w-4 h-4" />
              <span>Export Theme</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import {
  X, Check, RotateCcw, Download, Maximize2, Minimize2,
  Flame, Star, Sparkles, TrendingUp, Mail
} from 'lucide-vue-next'
import { useLayout } from '@/composables/useLayout'
import { useProductStore } from '@/stores/products'

const layoutStore = useLayout()
const productStore = useProductStore()

// Countdown timer
const countdown = ref({
  hours: 12,
  minutes: 34,
  seconds: 56
})

// Mock data for offers
const hotDeals = computed(() => [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    originalPrice: 399.99,
    image: "https://img.freepik.com/free-photo/rendering-smart-home-device_23-2151039302.jpg?semt=ais_hybrid&w=740",
    rating: 4.8,
    reviews: 1247
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 199.99,
    originalPrice: 299.99,
    image: "https://t3.ftcdn.net/jpg/13/37/59/58/360_F_1337595881_iRH94v8gXcq6qDZOmpeEd9XtpL2jIV9h.jpg",
    rating: 4.6,
    reviews: 892
  }
])

const newArrivals = computed(() => productStore.products.filter(p => p.isNew).slice(0, 4))
const trendingProducts = computed(() => productStore.products.filter(p => p.rating >= 4.5).slice(0, 5))

// Theme configuration
const themeColors = [
  { name: 'blue', value: '#3b82f6' },
  { name: 'purple', value: '#8b5cf6' },
  { name: 'green', value: '#10b981' },
  { name: 'orange', value: '#f97316' },
  { name: 'pink', value: '#ec4899' },
  { name: 'red', value: '#ef4444' }
]

const fontSizes = [
  { key: 'small', name: 'Small', class: 'text-sm' },
  { key: 'medium', name: 'Medium', class: 'text-base' },
  { key: 'large', name: 'Large', class: 'text-lg' }
]

const layoutDensities = [
  { key: 'compact', name: 'Compact', icon: Minimize2 },
  { key: 'comfortable', name: 'Comfortable', icon: Maximize2 }
]

// Theme state
const activeColor = ref(themeColors[3]) // Default to orange
const isDarkMode = ref(false)
const selectedFontSize = ref('medium')
const selectedDensity = ref('comfortable')

// Theme functions
const setActiveColor = (color) => {
  activeColor.value = color
  updateCSSVariables()
  saveToLocalStorage()
}

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  updateDarkMode()
  saveToLocalStorage()
}

const setFontSize = (size) => {
  selectedFontSize.value = size
  updateFontSize()
  saveToLocalStorage()
}

const setLayoutDensity = (density) => {
  selectedDensity.value = density
  updateLayoutDensity()
  saveToLocalStorage()
}

const updateCSSVariables = () => {
  const root = document.documentElement
  const color = activeColor.value.value

  const hex = color.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)

  root.style.setProperty('--color-primary', color)
  root.style.setProperty('--color-primary-rgb', `${r}, ${g}, ${b}`)
  root.style.setProperty('--color-primary-dark', darkenColor(color, 10))
}

const darkenColor = (color, percent) => {
  const hex = color.replace('#', '')
  const r = Math.max(0, parseInt(hex.substr(0, 2), 16) - Math.round(255 * percent / 100))
  const g = Math.max(0, parseInt(hex.substr(2, 2), 16) - Math.round(255 * percent / 100))
  const b = Math.max(0, parseInt(hex.substr(4, 2), 16) - Math.round(255 * percent / 100))

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

const updateDarkMode = () => {
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

const updateFontSize = () => {
  const root = document.documentElement
  const sizes = {
    small: '14px',
    medium: '16px',
    large: '18px'
  }
  root.style.setProperty('--font-size-base', sizes[selectedFontSize.value])
}

const updateLayoutDensity = () => {
  const root = document.documentElement
  const densities = {
    compact: '0.75',
    comfortable: '1'
  }
  root.style.setProperty('--layout-density', densities[selectedDensity.value])
}

const resetToDefault = () => {
  activeColor.value = themeColors[3]
  isDarkMode.value = false
  selectedFontSize.value = 'medium'
  selectedDensity.value = 'comfortable'

  updateCSSVariables()
  updateDarkMode()
  updateFontSize()
  updateLayoutDensity()
  saveToLocalStorage()
}

const exportTheme = () => {
  const themeConfig = {
    color: activeColor.value,
    darkMode: isDarkMode.value,
    fontSize: selectedFontSize.value,
    density: selectedDensity.value
  }

  const dataStr = JSON.stringify(themeConfig, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'les-showdagar-theme.json'
  link.click()
  URL.revokeObjectURL(url)
}

const saveToLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const settings = {
      activeColor: activeColor.value,
      isDarkMode: isDarkMode.value,
      fontSize: selectedFontSize.value,
      density: selectedDensity.value
    }
    localStorage.setItem('themeSettings', JSON.stringify(settings))
  }
}

const loadFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('themeSettings')
    if (saved) {
      try {
        const settings = JSON.parse(saved)
        if (settings.activeColor) activeColor.value = settings.activeColor
        if (typeof settings.isDarkMode === 'boolean') isDarkMode.value = settings.isDarkMode
        if (settings.fontSize) selectedFontSize.value = settings.fontSize
        if (settings.density) selectedDensity.value = settings.density
      } catch (error) {
        console.warn('Failed to load theme settings from localStorage:', error)
      }
    }
  }
}

// Countdown timer
let countdownInterval = null

const startCountdown = () => {
  countdownInterval = setInterval(() => {
    if (countdown.value.seconds > 0) {
      countdown.value.seconds--
    } else if (countdown.value.minutes > 0) {
      countdown.value.minutes--
      countdown.value.seconds = 59
    } else if (countdown.value.hours > 0) {
      countdown.value.hours--
      countdown.value.minutes = 59
      countdown.value.seconds = 59
    } else {
      // Reset countdown
      countdown.value = { hours: 12, minutes: 34, seconds: 56 }
    }
  }, 1000)
}

onMounted(() => {
  loadFromLocalStorage()
  updateCSSVariables()
  updateDarkMode()
  updateFontSize()
  updateLayoutDensity()
  startCountdown()
})

onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval)
  }
})
</script>