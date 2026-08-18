<template>
  <div class="orders-page relative min-h-screen bg-background">
    <!-- Animated background orbs (same as ProductRequestSection) -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div class="orb orb--orders-1" />
      <div class="orb orb--orders-2" />
      <div class="orb orb--orders-3" />
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      <!-- Page Header with gradient line -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div class="space-y-1">
          <h1 class="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Order History
          </h1>
          <p class="text-muted-foreground text-sm sm:text-base">
            Track and manage your orders
          </p>
        </div>
        <div>
          <select v-model="filterStatus"
            class="px-4 py-2 bg-card border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/50 transition-all duration-200">
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>

      <!-- Divider -->
      <div class="h-px bg-linear-to-r from-transparent via-border/70 to-transparent" />

      <!-- Orders List -->
      <div v-if="filteredOrders.length === 0" class="text-center py-20">
        <div class="w-24 h-24 mx-auto mb-6 rounded-2xl bg-muted/50 flex items-center justify-center">
          <Package class="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 class="text-xl font-semibold text-foreground mb-2">No orders found</h3>
        <p class="text-muted-foreground mb-8">You haven't placed any orders yet</p>
        <NuxtLink to="/"
          class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] font-medium">
          <ArrowLeft class="w-4 h-4" />
          Start Shopping
        </NuxtLink>
      </div>

      <div v-else class="space-y-5">
        <div v-for="order in filteredOrders" :key="order.id"
          class="group order-card bg-card border border-border/60 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:shadow-lg hover:border-ring/20">
          <!-- Order header -->
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">
            <div class="flex flex-wrap items-center gap-3">
              <div>
                <h3 class="font-semibold text-foreground text-base">Order #{{ order.id }}</h3>
                <p class="text-xs text-muted-foreground">{{ formatDate(order.date) }}</p>
              </div>
              <span :class="[
                'px-2.5 py-0.5 rounded-full text-xs font-medium',
                getStatusColor(order.status)
              ]">
                {{ order.status.charAt(0).toUpperCase() + order.status.slice(1) }}
              </span>
            </div>
            <div class="flex items-center gap-4">
              <Price :amount="order.total" class="text-xl font-bold text-foreground" />
              <button @click="viewOrder(order)"
                class="px-4 py-1.5 text-sm bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-200 font-medium">
                View Details
              </button>
            </div>
          </div>

          <!-- Order items preview -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div v-for="item in order.items.slice(0, 4)" :key="item.id"
              class="flex items-center gap-3 p-2 rounded-xl bg-muted/30 transition-all hover:bg-muted/50">
              <img :src="item.image" :alt="item.name" class="w-12 h-12 rounded-lg object-cover ring-1 ring-border/50" />
              <div class="flex-1 min-w-0">
                <p class="font-medium text-foreground text-sm truncate">{{ item.name }}</p>
                <p class="text-xs text-muted-foreground">Qty: {{ item.quantity }}</p>
              </div>
            </div>
            <div v-if="order.items.length > 4"
              class="flex items-center justify-center text-muted-foreground text-sm bg-muted/20 rounded-xl">
              +{{ order.items.length - 4 }} more items
            </div>
          </div>

          <!-- Order progress bar (only if not cancelled) -->
          <div v-if="order.status !== 'cancelled'" class="mt-6">
            <div class="flex justify-between text-xs text-muted-foreground mb-1.5">
              <span>Order Progress</span>
              <span>{{ getProgressPercentage(order.status) }}%</span>
            </div>
            <div class="h-1.5 bg-muted rounded-full overflow-hidden">
              <div class="h-full bg-linear-to-r from-primary to-ring rounded-full transition-all duration-500"
                :style="{ width: getProgressPercentage(order.status) + '%' }" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Order Details Modal (glassmorphism style) -->
    <teleport to="body">
      <Transition name="modal-fade">
        <div v-if="selectedOrder" class="fixed inset-0 z-90 overflow-y-auto">
          <div class="flex items-center justify-center min-h-screen px-4 py-8">
            <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" @click="selectedOrder = null" />
            <div
              class="relative bg-card/95 backdrop-blur-md border border-border/60 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden transition-all duration-300">
              <!-- Modal header -->
              <div class="flex items-center justify-between p-5 border-b border-border/60">
                <h2 class="text-xl font-semibold text-foreground">Order Details</h2>
                <button @click="selectedOrder = null"
                  class="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                  <X class="w-5 h-5" />
                </button>
              </div>

              <!-- Modal body -->
              <div class="p-6 overflow-y-auto space-y-6" style="max-height: calc(90vh - 120px);">
                <!-- Order info -->
                <div class="bg-muted/20 rounded-xl p-5 space-y-4">
                  <h3 class="font-semibold text-foreground text-sm uppercase tracking-wider">Order Information</h3>
                  <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span class="text-muted-foreground">Order ID</span>
                      <p class="font-medium text-foreground mt-0.5">#{{ selectedOrder.id }}</p>
                    </div>
                    <div>
                      <span class="text-muted-foreground">Date</span>
                      <p class="font-medium text-foreground mt-0.5">{{ formatDate(selectedOrder.date) }}</p>
                    </div>
                    <div>
                      <span class="text-muted-foreground">Status</span>
                      <span
                        :class="['inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium', getStatusColor(selectedOrder.status)]">
                        {{ selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1) }}
                      </span>
                    </div>
                    <div>
                      <span class="text-muted-foreground">Total</span>
                      <Price :amount="selectedOrder.total" class="text-xl font-bold text-foreground mt-0.5" />
                    </div>
                  </div>
                </div>

                <!-- Delivery Address (new) -->
                <div class="bg-muted/20 rounded-xl p-5 space-y-4">
                  <h3 class="font-semibold text-foreground text-sm uppercase tracking-wider flex items-center gap-2">
                    <span>Delivery Address</span>
                    <span class="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full">Shipping Info</span>
                  </h3>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span class="text-muted-foreground">Full Name</span>
                      <p class="font-medium text-foreground mt-0.5">{{ selectedOrder.address.name }}</p>
                    </div>
                    <div>
                      <span class="text-muted-foreground">Phone</span>
                      <p class="font-medium text-foreground mt-0.5">{{ selectedOrder.address.phone }}</p>
                    </div>
                    <div class="sm:col-span-2">
                      <span class="text-muted-foreground">Address</span>
                      <p class="font-medium text-foreground mt-0.5">{{ selectedOrder.address.street }}, {{
                        selectedOrder.address.city }}</p>
                    </div>
                    <div>
                      <span class="text-muted-foreground">Division</span>
                      <p class="font-medium text-foreground mt-0.5">{{ selectedOrder.address.division }}</p>
                    </div>
                    <div>
                      <span class="text-muted-foreground">Email</span>
                      <p class="font-medium text-foreground mt-0.5">{{ selectedOrder.address.email }}</p>
                    </div>
                  </div>
                </div>

                <!-- Items list -->
                <div>
                  <h3 class="font-semibold text-foreground text-sm uppercase tracking-wider mb-3">Items</h3>
                  <div class="space-y-3">
                    <div v-for="item in selectedOrder.items" :key="item.id"
                      class="flex gap-4 p-3 rounded-xl bg-muted/30">
                      <img :src="item.image" :alt="item.name"
                        class="w-16 h-16 rounded-lg object-cover ring-1 ring-border/50" />
                      <div class="flex-1">
                        <h4 class="font-medium text-foreground">{{ item.name }}</h4>
                        <p class="text-sm text-muted-foreground mt-0.5">Quantity: {{ item.quantity }}</p>
                      </div>
                      <div class="text-right">
                        <Price :amount="item.price * item.quantity" class="font-semibold text-foreground" />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Terms & Conditions (new) -->
                <div class="bg-muted/20 rounded-xl p-5 space-y-3">
                  <div class="flex items-start gap-2">
                    <CheckCircle class="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <h3 class="font-semibold text-foreground text-sm uppercase tracking-wider">Terms & Conditions</h3>
                      <p class="text-xs text-muted-foreground mt-1 leading-relaxed">
                        By placing this order, you agree to our
                        <NuxtLink to="/terms" class="text-primary hover:underline">Terms of Service</NuxtLink>
                        and
                        <NuxtLink to="/privacy" class="text-primary hover:underline">Privacy Policy</NuxtLink>.
                        Items are subject to availability. Delivery estimates are based on standard shipping.
                      </p>
                      <div
                        class="mt-3 pt-2 border-t border-border/30 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
                        <span>✓ 30‑day return policy</span>
                        <span>✓ Secure payment</span>
                        <span>✓ Tracking included</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </teleport>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Package, ArrowLeft, X } from 'lucide-vue-next'

const filterStatus = ref('all')
const selectedOrder = ref(null)

// Mock orders data (same as before)
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
    ],
    address: {
      name: 'Rakibul Hasan Rabbi',
      phone: '+880 1234 567890',
      street: '123, Gulshan Avenue',
      city: 'Dhaka',
      division: 'Dhaka',
      email: 'rakibul@rhbusinessclub.com'
    }
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
    ],
    address: {
      name: 'Rakibul Hasan Rabbi',
      phone: '+880 1234 567890',
      street: 'House 45, Road 11, Block D',
      city: 'Chittagong',
      division: 'Chittagong',
      email: 'rakibul@rhbusinessclub.com'
    }
  }
])

const filteredOrders = computed(() => {
  if (filterStatus.value === 'all') return orders.value
  return orders.value.filter(order => order.status === filterStatus.value)
})

const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(date)
}

const getStatusColor = (status) => {
  const colors = {
    pending: 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400',
    processing: 'bg-blue-500/20 text-blue-700 dark:text-blue-400',
    shipped: 'bg-purple-500/20 text-purple-700 dark:text-purple-400',
    delivered: 'bg-green-500/20 text-green-700 dark:text-green-400',
    cancelled: 'bg-red-500/20 text-red-700 dark:text-red-400'
  }
  return colors[status] || colors.pending
}

const getProgressPercentage = (status) => {
  const progress = { pending: 25, processing: 50, shipped: 75, delivered: 100 }
  return progress[status] || 0
}

const viewOrder = (order) => {
  selectedOrder.value = order
}
</script>

<style scoped>
/* Same background orbs and animations as before */
.orb--orders-1,
.orb--orders-2,
.orb--orders-3 {
  position: absolute;
  border-radius: 50%;
  filter: blur(72px);
  pointer-events: none;
}

.orb--orders-1 {
  width: 400px;
  height: 400px;
  top: -150px;
  right: -100px;
  background: radial-gradient(circle, oklch(0.55 0.18 220 / 0.08), transparent 70%);
  animation: drift 20s ease-in-out infinite;
}

.orb--orders-2 {
  width: 350px;
  height: 350px;
  bottom: -100px;
  left: -80px;
  background: radial-gradient(circle, oklch(0.55 0.22 300 / 0.06), transparent 70%);
  animation: drift 24s ease-in-out infinite reverse;
}

.orb--orders-3 {
  width: 280px;
  height: 280px;
  top: 40%;
  left: 40%;
  background: radial-gradient(circle, oklch(0.55 0.20 160 / 0.05), transparent 70%);
  animation: drift 18s ease-in-out infinite 2s;
}

@keyframes drift {

  0%,
  100% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(20px, -30px);
  }
}

.order-card {
  transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
}

.order-card:hover {
  transform: translateY(-2px);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {

  .orb--orders-1,
  .orb--orders-2,
  .orb--orders-3,
  .order-card,
  .order-card :deep(.bg-gradient-to-r) {
    animation: none !important;
    transition: none !important;
  }
}
</style>