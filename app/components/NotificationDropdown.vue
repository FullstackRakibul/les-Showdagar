<template>
  <div class="relative" ref="notificationDropdown">
    <button @click="toggleDropdown"
      class="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
      title="Notifications">
      <Bell class="w-5 h-5 text-gray-700 dark:text-gray-300" />
      <span v-if="unreadCount > 0"
        class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
        {{ unreadCount > 9 ? '9+' : unreadCount }}
      </span>
    </button>

    <transition name="dropdown">
      <div v-if="isOpen"
        class="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">Notifications</h3>
          <button @click="closeDropdown"
            class="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <X class="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div class="max-h-[500px] overflow-y-auto">
          <div v-if="todayNotifications.length > 0">
            <div class="px-6 py-3 bg-gray-50 dark:bg-gray-900/50">
              <h4 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Today
              </h4>
            </div>
            <div class="divide-y divide-gray-100 dark:divide-gray-700">
              <div v-for="notification in todayNotifications" :key="notification.id"
                class="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer relative"
                @click="handleNotificationClick(notification)">
                <div class="flex items-start space-x-3">
                  <div v-if="notification.avatar" class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <img :src="notification.avatar" :alt="notification.sender" class="w-full h-full object-cover" />
                  </div>
                  <div v-else
                    class="w-10 h-10 rounded-full bg-gray-900 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                    <component :is="getIcon(notification.type)" class="w-5 h-5 text-white" />
                  </div>

                  <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between mb-1">
                      <div class="flex items-center space-x-2">
                        <span class="font-semibold text-gray-900 dark:text-white text-sm">
                          {{ notification.sender }}
                        </span>
                        <CheckCircle2 v-if="notification.verified" class="w-4 h-4 text-blue-500" />
                      </div>
                      <span class="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2">
                        {{ notification.time }}
                      </span>
                    </div>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {{ notification.message }}
                    </p>

                    <div v-if="notification.product"
                      class="mt-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl flex items-center space-x-3 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">
                      <img :src="notification.product.image" :alt="notification.product.name"
                        class="w-12 h-12 rounded-lg object-cover" />
                      <div class="flex-1 min-w-0">
                        <div v-if="notification.product.badge" class="mb-1">
                          <span class="text-xs font-semibold text-orange-600 dark:text-orange-400">
                            {{ notification.product.badge }}
                          </span>
                        </div>
                        <h5 class="font-semibold text-gray-900 dark:text-white text-sm truncate">
                          {{ notification.product.name }}
                        </h5>
                        <div class="flex items-center space-x-2 mt-1">
                          <div class="flex items-center">
                            <Star class="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            <span class="text-xs text-gray-600 dark:text-gray-400 ml-1">
                              {{ notification.product.rating }}
                            </span>
                          </div>
                          <span v-if="notification.product.reviews" class="text-xs text-gray-500 dark:text-gray-400">
                            ({{ notification.product.reviews }})
                          </span>
                        </div>
                        <div v-if="notification.product.price" class="mt-1">
                          <span class="font-bold text-gray-900 dark:text-white text-sm">
                            {{ notification.product.price }}
                          </span>
                          <span v-if="notification.product.oldPrice" class="text-xs text-gray-400 line-through ml-2">
                            {{ notification.product.oldPrice }}
                          </span>
                        </div>
                        <div v-if="notification.product.location" class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Current location: <span class="font-medium">{{ notification.product.location }}</span>
                        </div>
                      </div>
                      <ArrowRight class="w-5 h-5 text-gray-400 flex-shrink-0" />
                    </div>
                  </div>

                  <div v-if="!notification.read" class="absolute right-6 top-6">
                    <div class="w-2 h-2 bg-orange-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="yesterdayNotifications.length > 0">
            <div class="px-6 py-3 bg-gray-50 dark:bg-gray-900/50">
              <h4 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Yesterday
              </h4>
            </div>
            <div class="divide-y divide-gray-100 dark:divide-gray-700">
              <div v-for="notification in yesterdayNotifications" :key="notification.id"
                class="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                @click="handleNotificationClick(notification)">
                <div class="flex items-start space-x-3">
                  <div v-if="notification.avatar" class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <img :src="notification.avatar" :alt="notification.sender" class="w-full h-full object-cover" />
                  </div>
                  <div v-else
                    class="w-10 h-10 rounded-full bg-gray-900 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                    <component :is="getIcon(notification.type)" class="w-5 h-5 text-white" />
                  </div>

                  <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between mb-1">
                      <div class="flex items-center space-x-2">
                        <span class="font-semibold text-gray-900 dark:text-white text-sm">
                          {{ notification.sender }}
                        </span>
                        <CheckCircle2 v-if="notification.verified" class="w-4 h-4 text-blue-500" />
                      </div>
                      <span class="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2">
                        {{ notification.time }}
                      </span>
                    </div>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      {{ notification.message }}
                    </p>

                    <div v-if="notification.product"
                      class="mt-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl flex items-center space-x-3">
                      <img :src="notification.product.image" :alt="notification.product.name"
                        class="w-12 h-12 rounded-lg object-cover" />
                      <div class="flex-1 min-w-0">
                        <h5 class="font-semibold text-gray-900 dark:text-white text-sm truncate">
                          {{ notification.product.name }}
                        </h5>
                        <div v-if="notification.product.location" class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Current location: <span class="font-medium">{{ notification.product.location }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="notifications.length === 0" class="px-6 py-12 text-center">
            <Bell class="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p class="text-gray-500 dark:text-gray-400 text-sm">No notifications yet</p>
          </div>
        </div>

        <div v-if="notifications.length > 0" class="border-t border-gray-200 dark:border-gray-700 px-6 py-3">
          <button @click="viewAllNotifications"
            class="w-full text-center text-sm font-medium text-primary hover:text-primary-dark transition-colors">
            View All Notifications
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Bell, X, Package, ShoppingCart, Star, ArrowRight, CheckCircle2 } from 'lucide-vue-next'
import { navigateTo } from '#app'

const isOpen = ref(false)
const notificationDropdown = ref(null)

// Sample notifications data matching the design
const notifications = ref([
  {
    id: 1,
    type: 'assistant',
    sender: 'Florenka | FW Assistant',
    avatar: 'https://img.freepik.com/free-vector/shop-with-we-are-open-sign_23-2148557016.jpg',
    message: 'Hey Emir, Do you still remember the "Nike Alphafly 2" you want? Now it\'s already stock!.',
    time: '30m',
    read: false,
    product: {
      name: 'Nike Alphafly 2',
      image: 'https://img.freepik.com/free-vector/shop-with-we-are-open-sign_23-2148557016.jpg',
      badge: 'Ready stock',
      rating: '4.9',
      reviews: '12989 Review'
    }
  },
  {
    id: 2,
    type: 'promo',
    sender: 'FootWear Promo',
    avatar: null,
    verified: true,
    message: 'Check this out!, today we have a discount for "Compass Retrograde Hi Creme Spinach".',
    time: '1h',
    read: false,
    product: {
      name: 'Compass Retrograde ...',
      image: 'https://img.freepik.com/free-vector/shop-with-we-are-open-sign_23-2148557016.jpg',
      rating: '4.9',
      reviews: '412 Items Sold',
      price: 'Rp 668,000',
      oldPrice: 'Rp 768,000'
    }
  },
  {
    id: 3,
    type: 'system',
    sender: 'FootWear System',
    avatar: null,
    verified: true,
    message: 'Your package shoes of "Nike Air Force 1 \'07" is on the way!.',
    time: '12.05',
    read: true,
    product: {
      name: 'Nike Air Force 1 \'07',
      image: 'https://img.freepik.com/free-vector/shop-with-we-are-open-sign_23-2148557016.jpg',
      location: 'Sorting at DC Cakung'
    }
  }
])

const todayNotifications = computed(() => {
  return notifications.value.filter(n => n.time.includes('m') || n.time.includes('h'))
})

const yesterdayNotifications = computed(() => {
  return notifications.value.filter(n => !n.time.includes('m') && !n.time.includes('h'))
})

const unreadCount = computed(() => {
  return notifications.value.filter(n => !n.read).length
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const closeDropdown = () => {
  isOpen.value = false
}

const handleNotificationClick = (notification) => {
  notification.read = true
  // Handle navigation or action based on notification type
  console.log('[v0] Notification clicked:', notification)
}

const viewAllNotifications = () => {
  closeDropdown()
  navigateTo('/notifications')
}

const getIcon = (type) => {
  const icons = {
    assistant: Bell,
    promo: ShoppingCart,
    system: Package
  }
  return icons[type] || Bell
}

const handleClickOutside = (event) => {
  if (notificationDropdown.value && !notificationDropdown.value.contains(event.target)) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

/* Custom scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

.dark .overflow-y-auto::-webkit-scrollbar-thumb {
  background: #4b5563;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

.dark .overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style>