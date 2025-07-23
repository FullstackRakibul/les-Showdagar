<template>
  <div class="max-w-6xl mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Checkout</h1>
      <div class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
        <span>Cart</span>
        <ChevronRight class="w-4 h-4" />
        <span class="text-primary font-medium">Checkout</span>
        <ChevronRight class="w-4 h-4" />
        <span>Payment</span>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Checkout Form -->
      <div class="lg:col-span-2 space-y-8">
        <!-- Shipping Information -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <Truck class="w-6 h-6 text-primary mr-3" />
            Shipping Information
          </h2>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                <input v-model="checkoutStore.shippingInfo.firstName" type="text" required
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="John" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                <input v-model="checkoutStore.shippingInfo.lastName" type="text" required
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Doe" />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
              <input v-model="checkoutStore.shippingInfo.email" type="email" required
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="john.doe@example.com" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
              <input v-model="checkoutStore.shippingInfo.phone" type="tel" required
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="+1 (555) 123-4567" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Address</label>
              <input v-model="checkoutStore.shippingInfo.address" type="text" required
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="123 Main Street" />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">City</label>
                <input v-model="checkoutStore.shippingInfo.city" type="text" required
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="New York" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">State</label>
                <select v-model="checkoutStore.shippingInfo.state" required
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option value="">Select State</option>
                  <option value="NY">New York</option>
                  <option value="CA">California</option>
                  <option value="TX">Texas</option>
                  <option value="FL">Florida</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">ZIP Code</label>
                <input v-model="checkoutStore.shippingInfo.zipCode" type="text" required
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="10001" />
              </div>
            </div>
          </form>
        </div>

        <!-- Payment Information -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <CreditCard class="w-6 h-6 text-primary mr-3" />
            Payment Information
          </h2>

          <div class="space-y-6">
            <!-- Payment Method Selection -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Payment Method</label>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label class="relative cursor-pointer">
                  <input v-model="checkoutStore.paymentInfo.method" type="radio" value="card" class="sr-only" />
                  <div class="border-2 rounded-xl p-6 text-center transition-all duration-200"
                    :class="checkoutStore.paymentInfo.method === 'card' ? 'border-primary bg-primary/10 shadow-md' : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'">
                    <CreditCard class="w-8 h-8 mx-auto mb-3"
                      :class="checkoutStore.paymentInfo.method === 'card' ? 'text-primary' : 'text-gray-400'" />
                    <div class="font-semibold">Credit Card</div>
                  </div>
                </label>

                <label class="relative cursor-pointer">
                  <input v-model="checkoutStore.paymentInfo.method" type="radio" value="paypal" class="sr-only" />
                  <div class="border-2 rounded-xl p-6 text-center transition-all duration-200"
                    :class="checkoutStore.paymentInfo.method === 'paypal' ? 'border-primary bg-primary/10 shadow-md' : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'">
                    <Wallet class="w-8 h-8 mx-auto mb-3"
                      :class="checkoutStore.paymentInfo.method === 'paypal' ? 'text-primary' : 'text-gray-400'" />
                    <div class="font-semibold">PayPal</div>
                  </div>
                </label>

                <label class="relative cursor-pointer">
                  <input v-model="checkoutStore.paymentInfo.method" type="radio" value="apple" class="sr-only" />
                  <div class="border-2 rounded-xl p-6 text-center transition-all duration-200"
                    :class="checkoutStore.paymentInfo.method === 'apple' ? 'border-primary bg-primary/10 shadow-md' : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'">
                    <Smartphone class="w-8 h-8 mx-auto mb-3"
                      :class="checkoutStore.paymentInfo.method === 'apple' ? 'text-primary' : 'text-gray-400'" />
                    <div class="font-semibold">Apple Pay</div>
                  </div>
                </label>
              </div>
            </div>

            <!-- Credit Card Form -->
            <div v-if="checkoutStore.paymentInfo.method === 'card'" class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Card Number</label>
                <input v-model="checkoutStore.paymentInfo.cardNumber" type="text" placeholder="1234 5678 9012 3456"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
              </div>

              <div class="grid grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Expiry Date</label>
                  <input v-model="checkoutStore.paymentInfo.expiryDate" type="text" placeholder="MM/YY"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">CVV</label>
                  <input v-model="checkoutStore.paymentInfo.cvv" type="text" placeholder="123"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cardholder Name</label>
                <input v-model="checkoutStore.paymentInfo.cardholderName" type="text" placeholder="John Doe"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="lg:col-span-1">
        <div
          class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-24">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Order Summary</h2>

          <!-- Cart Items -->
          <div class="space-y-4 mb-6 max-h-64 overflow-y-auto">
            <div v-for="item in productStore.cart"
              :key="`${item.product.id}-${item.selectedColor}-${item.selectedSize}`"
              class="flex items-center space-x-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
              <img :src="item.product.image" :alt="item.product.name" class="w-16 h-16 object-cover rounded-lg" />
              <div class="flex-1 min-w-0">
                <h4 class="font-medium text-gray-900 dark:text-white text-sm truncate">{{ item.product.name }}</h4>
                <div class="flex items-center space-x-1 mt-1">
                  <span v-if="item.selectedColor" class="text-xs bg-white dark:bg-gray-600 px-2 py-1 rounded">{{
                    item.selectedColor }}</span>
                  <span v-if="item.selectedSize" class="text-xs bg-white dark:bg-gray-600 px-2 py-1 rounded">{{
                    item.selectedSize }}</span>
                </div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Qty: {{ item.quantity }}</p>
              </div>
              <div class="text-right">
                <p class="font-semibold text-gray-900 dark:text-white">${{ (item.product.price *
                  item.quantity).toFixed(2) }}</p>
              </div>
            </div>
          </div>

          <!-- Order Totals -->
          <div class="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-3">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">Subtotal</span>
              <span class="font-medium">${{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">Shipping</span>
              <span class="font-medium">${{ shipping.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">Tax</span>
              <span class="font-medium">${{ tax.toFixed(2) }}</span>
            </div>
            <div class="border-t border-gray-200 dark:border-gray-700 pt-3">
              <div class="flex justify-between">
                <span class="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
                <span class="text-xl font-bold text-gray-900 dark:text-white">${{ total.toFixed(2) }}</span>
              </div>
            </div>
          </div>

          <!-- Place Order Button -->
          <button @click="handleSubmit" :disabled="checkoutStore.isProcessing || productStore.cart.length === 0"
            class="w-full mt-6 bg-primary hover:bg-primary-dark disabled:bg-gray-400 text-white py-4 px-6 rounded-xl transition-colors font-semibold text-lg flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl">
            <Loader2 v-if="checkoutStore.isProcessing" class="w-5 h-5 animate-spin" />
            <Lock v-else class="w-5 h-5" />
            <span>{{ checkoutStore.isProcessing ? 'Processing...' : 'Place Order' }}</span>
          </button>

          <!-- Security Badge -->
          <div class="mt-4 text-center">
            <div class="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
              <Shield class="w-4 h-4 text-green-500 mr-2" />
              Secure SSL Encryption
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <PaymentSuccessModal />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  ChevronRight, Truck, CreditCard, Wallet, Smartphone,
  Lock, Shield, Loader2
} from 'lucide-vue-next'
import { useProductStore } from '@/stores/products'
import { useCheckoutStore } from '@/stores/checkout'
import PaymentSuccessModal from '@/components/PaymentSuccessModal.vue'

const router = useRouter()
const productStore = useProductStore()
const checkoutStore = useCheckoutStore()

const subtotal = computed(() => productStore.cartTotal)
const shipping = computed(() => subtotal.value > 100 ? 0 : 9.99)
const tax = computed(() => subtotal.value * 0.08)
const total = computed(() => subtotal.value + shipping.value + tax.value)

const handleSubmit = async () => {
  try {
    await checkoutStore.processOrder(
      productStore.cart,
      {
        subtotal: subtotal.value,
        shipping: shipping.value,
        tax: tax.value,
        total: total.value
      }
    )

    // Clear cart after successful order
    productStore.clearCart()
  } catch (error) {
    console.error('Checkout failed:', error)
  }
}

// Redirect if cart is empty
const redirectIfCartIsEmpty = () => {
  if (productStore.cart.length === 0) {
    router.push('/')
  }
}

redirectIfCartIsEmpty()
</script>