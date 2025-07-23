<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Notifications</h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400">Stay updated with your latest activities</p>
      </div>
      <div class="flex items-center space-x-3">
        <button @click="markAllAsRead" class="text-primary hover:text-primary-dark font-medium transition-colors">
          Mark all as read
        </button>
        <button
          class="p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <Settings class="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>
    </div>

    <!-- Notification Filters -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div class="flex flex-wrap gap-2">
        <button v-for="filter in filters" :key="filter.key" @click="activeFilter = filter.key" :class="[
          'px-4 py-2 rounded-xl font-medium transition-colors',
          activeFilter === filter.key
            ? 'bg-primary text-white'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
        ]">
          {{ filter.label }}
          <span v-if="filter.count > 0" class="ml-2 px-2 py-1 bg-white bg-opacity-20 rounded-full text-xs">
            {{ filter.count }}
          </span>
        </button>
      </div>
    </div>

    <!-- Notifications List -->
    <div class="space-y-3">
      <div v-for="notification in filteredNotifications" :key="notification.id" :class="[
        'bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border transition-all duration-200 cursor-pointer hover:shadow-md',
        notification.read
          ? 'border-gray-200 dark:border-gray-700'
          : 'border-primary/20 bg-primary/5 dark:bg-primary/10'
      ]" @click="markAsRead(notification.id)">
        <div class="flex items-start space-x-4">
          <div :class="[
            'w-12 h-12 rounded-full flex items-center justify-center',
            getNotificationColor(notification.type)
          ]">
            <component :is="getNotificationIcon(notification.type)" class="w-6 h-6" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-semibold text-gray-900 dark:text-white">{{ notification.title }}</h3>
              <div class="flex items-center space-x-2">
                <span class="text-sm text-gray-500 dark:text-gray-400">{{ formatTime(notification.time) }}</span>
                <div v-if="!notification.read" class="w-2 h-2 bg-primary rounded-full"></div>
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-400 mb-3">{{ notification.message }}</p>
            <div v-if="notification.action" class="flex items-center space-x-3">
              <button @click.stop="handleAction(notification.action)"
                class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium text-sm">
                {{ notification.action.label }}
              </button>
              <button @click.stop="dismissNotification(notification.id)"
                class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 text-sm transition-colors">
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredNotifications.length === 0" class="text-center py-16">
      <Bell class="w-20 h-20 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
      <h3 class="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-4">No notifications</h3>
      <p class="text-gray-500 dark:text-gray-500">You're all caught up! Check back later for updates.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Bell, Settings, Package, ShoppingCart, Heart, Star, AlertCircle, CheckCircle } from 'lucide-vue-next'
import { navigateTo } from '#app' // Import navigateTo from '#app'

const activeFilter = ref('all')

const filters = [
  { key: 'all', label: 'All', count: 0 },
  { key: 'orders', label: 'Orders', count: 3 },
  { key: 'promotions', label: 'Promotions', count: 2 },
  { key: 'account', label: 'Account', count: 1 },
  { key: 'system', label: 'System', count: 0 }
]

const notifications = ref([
  {
    id: 1,
    type: 'order',
    title: 'Order Shipped',
    message: 'Your order #ORD-001 has been shipped and is on its way to you.',
    time: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: false,
    action: {
      label: 'Track Order',
      type: 'track',
      data: 'ORD-001'
    }
  },
  {
    id: 2,
    type: 'promotion',
    title: 'Flash Sale Alert',
    message: 'Get 30% off on all electronics. Limited time offer!',
    time: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    read: false,
    action: {
      label: 'Shop Now',
      type: 'navigate',
      data: '/products?category=Electronics'
    }
  },
  {
    id: 3,
    type: 'wishlist',
    title: 'Price Drop Alert',
    message: 'An item in your wishlist is now 20% off!',
    time: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    read: true,
    action: {
      label: 'View Item',
      type: 'navigate',
      data: '/wishlist'
    }
  },
  {
    id: 4,
    type: 'order',
    title: 'Order Delivered',
    message: 'Your order #ORD-002 has been delivered successfully.',
    time: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    read: true,
    action: {
      label: 'Rate Products',
      type: 'rate',
      data: 'ORD-002'
    }
  },
  {
    id: 5,
    type: 'account',
    title: 'Profile Updated',
    message: 'Your profile information has been updated successfully.',
    time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    read: true
  }
])

const filteredNotifications = computed(() => {
  if (activeFilter.value === 'all') {
    return notifications.value
  }

  const typeMap = {
    orders: ['order'],
    promotions: ['promotion'],
    account: ['account'],
    system: ['system']
  }

  const types = typeMap[activeFilter.value] || []
  return notifications.value.filter(n => types.includes(n.type))
})

const getNotificationIcon = (type) => {
  const icons = {
    order: Package,
    promotion: Star,
    wishlist: Heart,
    account: CheckCircle,
    system: AlertCircle
  }
  return icons[type] || Bell
}

const getNotificationColor = (type) => {
  const colors = {
    order: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    promotion: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
    wishlist: 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400',
    account: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    system: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
  }
  return colors[type] || colors.system
}

const formatTime = (time) => {
  const now = new Date()
  const diff = now - time
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (minutes < 60) {
    return `${minutes}m ago`
  } else if (hours < 24) {
    return `${hours}h ago`
  } else {
    return `${days}d ago`
  }
}

const markAsRead = (id) => {
  const notification = notifications.value.find(n => n.id === id)
  if (notification) {
    notification.read = true
  }
}

const markAllAsRead = () => {
  notifications.value.forEach(n => n.read = true)
}

const dismissNotification = (id) => {
  const index = notifications.value.findIndex(n => n.id === id)
  if (index > -1) {
    notifications.value.splice(index, 1)
  }
}

const handleAction = (action) => {
  switch (action.type) {
    case 'track':
      // Handle order tracking
      console.log('Track order:', action.data)
      break
    case 'navigate':
      // Handle navigation
      navigateTo(action.data)
      break
    case 'rate':
      // Handle product rating
      console.log('Rate products for order:', action.data)
      break
  }
}

// Update filter counts
filters.forEach(filter => {
  if (filter.key === 'all') {
    filter.count = notifications.value.filter(n => !n.read).length
  } else {
    const typeMap = {
      orders: ['order'],
      promotions: ['promotion'],
      account: ['account'],
      system: ['system']
    }
    const types = typeMap[filter.key] || []
    filter.count = notifications.value.filter(n => types.includes(n.type) && !n.read).length
  }
})
</script>