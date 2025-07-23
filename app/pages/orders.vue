<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Order History</h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400">Track and manage your orders</p>
      </div>
      <div class="mt-4 sm:mt-0 flex items-center space-x-3">
        <select v-model="filterStatus"
          class="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 dark:text-white">
          <option value="all">All Orders</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>
    </div>

    <!-- Orders List -->
    <div v-if="filteredOrders.length === 0" class="text-center py-16">
      <Package class="w-20 h-20 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
      <h3 class="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-4">No orders found</h3>
      <p class="text-gray-500 dark:text-gray-500 mb-8">You haven't placed any orders yet</p>
      <NuxtLink to="/"
        class="inline-flex items-center px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors font-semibold">
        <ArrowLeft class="w-5 h-5 mr-2" />
        Start Shopping
      </NuxtLink>
    </div>

    <div v-else class="space-y-4">
      <div v-for="order in filteredOrders" :key="order.id"
        class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
          <div class="flex items-center space-x-4 mb-4 lg:mb-0">
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-white">Order #{{ order.id }}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ formatDate(order.date) }}</p>
            </div>
            <span :class="[
              'px-3 py-1 rounded-full text-xs font-semibold',
              getStatusColor(order.status)
            ]">
              {{ order.status.charAt(0).toUpperCase() + order.status.slice(1) }}
            </span>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-lg font-bold text-gray-900 dark:text-white">${{ order.total.toFixed(2) }}</span>
            <button @click="viewOrder(order)"
              class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium">
              View Details
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-for="item in order.items.slice(0, 4)" :key="item.id" class="flex items-center space-x-3">
            <img :src="item.image" :alt="item.name" class="w-12 h-12 object-cover rounded-lg" />
            <div class="flex-1 min-w-0">
              <p class="font-medium text-gray-900 dark:text-white text-sm truncate">{{ item.name }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">Qty: {{ item.quantity }}</p>
            </div>
          </div>
          <div v-if="order.items.length > 4" class="flex items-center justify-center text-gray-500 dark:text-gray-400">
            <span class="text-sm">+{{ order.items.length - 4 }} more items</span>
          </div>
        </div>

        <!-- Order Progress -->
        <div v-if="order.status !== 'cancelled'" class="mt-6">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Order Progress</span>
            <span class="text-sm text-gray-500 dark:text-gray-400">{{ getProgressPercentage(order.status) }}%</span>
          </div>
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div class="bg-primary h-2 rounded-full transition-all duration-300"
              :style="{ width: getProgressPercentage(order.status) + '%' }"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Order Details Modal -->
    <teleport to="body">
      <transition name="modal">
        <div v-if="selectedOrder" class="fixed inset-0 z-[9999] overflow-y-auto">
          <div class="flex items-center justify-center min-h-screen px-4">
            <div class="fixed inset-0 bg-black bg-opacity-50" @click="selectedOrder = null"></div>

            <div
              class="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
              <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                <div class="flex items-center justify-between">
                  <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Order Details</h2>
                  <button @click="selectedOrder = null"
                    class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    <X class="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div class="p-6 overflow-y-auto" style="max-height: calc(90vh - 140px);">
                <div class="space-y-6">
                  <!-- Order Info -->
                  <div>
                    <h3 class="font-semibold text-gray-900 dark:text-white mb-3">Order Information</h3>
                    <div class="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span class="text-gray-500 dark:text-gray-400">Order ID:</span>
                        <p class="font-medium">#{{ selectedOrder.id }}</p>
                      </div>
                      <div>
                        <span class="text-gray-500 dark:text-gray-400">Date:</span>
                        <p class="font-medium">{{ formatDate(selectedOrder.date) }}</p>
                      </div>
                      <div>
                        <span class="text-gray-500 dark:text-gray-400">Status:</span>
                        <span :class="[
                          'px-2 py-1 rounded-full text-xs font-semibold',
                          getStatusColor(selectedOrder.status)
                        ]">
                          {{ selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1) }}
                        </span>
                      </div>
                      <div>
                        <span class="text-gray-500 dark:text-gray-400">Total:</span>
                        <p class="font-bold text-lg">${{ selectedOrder.total.toFixed(2) }}</p>
                      </div>
                    </div>
                  </div>

                  <!-- Items -->
                  <div>
                    <h3 class="font-semibold text-gray-900 dark:text-white mb-3">Items</h3>
                    <div class="space-y-3">
                      <div v-for="item in selectedOrder.items" :key="item.id"
                        class="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <img :src="item.image" :alt="item.name" class="w-16 h-16 object-cover rounded-lg" />
                        <div class="flex-1">
                          <h4 class="font-medium text-gray-900 dark:text-white">{{ item.name }}</h4>
                          <p class="text-sm text-gray-500 dark:text-gray-400">Quantity: {{ item.quantity }}</p>
                        </div>
                        <div class="text-right">
                          <p class="font-semibold text-gray-900 dark:text-white">${{ (item.price *
                            item.quantity).toFixed(2) }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Package, ArrowLeft, X } from 'lucide-vue-next'

const filterStatus = ref('all')
const selectedOrder = ref(null)

// Mock orders data
const orders = ref([
  {
    id: 'ORD-001',
    date: new Date('2024-01-15'),
    status: 'delivered',
    total: 299.99,
    items: [
      {
        id: 1,
        name: 'Premium Wireless Headphones',
        quantity: 1,
        price: 299.99,
        image: 'https://img.freepik.com/free-photo/rendering-smart-home-device_23-2151039302.jpg?semt=ais_hybrid&w=740'
      }
    ]
  },
  {
    id: 'ORD-002',
    date: new Date('2024-01-20'),
    status: 'shipped',
    total: 459.98,
    items: [
      {
        id: 2,
        name: 'Smart Fitness Watch',
        quantity: 1,
        price: 199.99,
        image: 'https://t3.ftcdn.net/jpg/13/37/59/58/360_F_1337595881_iRH94v8gXcq6qDZOmpeEd9XtpL2jIV9h.jpg'
      },
      {
        id: 3,
        name: 'Wireless Earbuds',
        quantity: 2,
        price: 129.99,
        image: 'https://img.freepik.com/premium-psd/realistic-watch-series-7-mockup-stairs_850346-37.jpg?semt=ais_hybrid&w=740'
      }
    ]
  }
])

const filteredOrders = computed(() => {
  if (filterStatus.value === 'all') {
    return orders.value
  }
  return orders.value.filter(order => order.status === filterStatus.value)
})

const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

const getStatusColor = (status) => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    shipped: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    delivered: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
  }
  return colors[status] || colors.pending
}

const getProgressPercentage = (status) => {
  const progress = {
    pending: 25,
    processing: 50,
    shipped: 75,
    delivered: 100
  }
  return progress[status] || 0
}

const viewOrder = (order) => {
  selectedOrder.value = order
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
</style>