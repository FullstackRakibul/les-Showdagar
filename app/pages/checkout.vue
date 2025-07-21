<template>
  <div class="max-w-6xl mx-auto">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
      <div class="flex items-center space-x-2 text-sm text-gray-500">
        <span>Cart</span>
        <i class="fas fa-chevron-right"></i>
        <span class="text-blue-600 font-medium">Checkout</span>
        <i class="fas fa-chevron-right"></i>
        <span>Payment</span>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Checkout Form -->
      <div class="lg:col-span-2 space-y-8">
        <!-- Shipping Information -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 class="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <i class="fas fa-shipping-fast text-blue-600 mr-3"></i>
            Shipping Information
          </h2>

          <form @submit.prevent="processOrder" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input v-model="shippingInfo.firstName" type="text" required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="John" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input v-model="shippingInfo.lastName" type="text" required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Doe" />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input v-model="shippingInfo.email" type="email" required
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="john.doe@example.com" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input v-model="shippingInfo.phone" type="tel" required
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="+1 (555) 123-4567" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <input v-model="shippingInfo.address" type="text" required
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="123 Main Street" />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">City</label>
                <input v-model="shippingInfo.city" type="text" required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="New York" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">State</label>
                <select v-model="shippingInfo.state" required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors">
                  <option value="">Select State</option>
                  <option value="NY">New York</option>
                  <option value="CA">California</option>
                  <option value="TX">Texas</option>
                  <option value="FL">Florida</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                <input v-model="shippingInfo.zipCode" type="text" required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="10001" />
              </div>
            </div>
          </form>
        </div>

        <!-- Payment Information -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 class="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <i class="fas fa-credit-card text-blue-600 mr-3"></i>
            Payment Information
          </h2>

          <div class="space-y-6">
            <!-- Payment Method Selection -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-4">Payment Method</label>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label class="relative cursor-pointer">
                  <input v-model="paymentMethod" type="radio" value="card" class="sr-only" />
                  <div class="border-2 rounded-xl p-6 text-center transition-all duration-200"
                    :class="paymentMethod === 'card' ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-300 hover:border-gray-400'">
                    <i class="fas fa-credit-card text-3xl mb-3"
                      :class="paymentMethod === 'card' ? 'text-blue-600' : 'text-gray-400'"></i>
                    <div class="font-semibold">Credit Card</div>
                  </div>
                </label>

                <label class="relative cursor-pointer">
                  <input v-model="paymentMethod" type="radio" value="paypal" class="sr-only" />
                  <div class="border-2 rounded-xl p-6 text-center transition-all duration-200"
                    :class="paymentMethod === 'paypal' ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-300 hover:border-gray-400'">
                    <i class="fab fa-paypal text-3xl mb-3"
                      :class="paymentMethod === 'paypal' ? 'text-blue-600' : 'text-gray-400'"></i>
                    <div class="font-semibold">PayPal</div>
                  </div>
                </label>

                <label class="relative cursor-pointer">
                  <input v-model="paymentMethod" type="radio" value="apple" class="sr-only" />
                  <div class="border-2 rounded-xl p-6 text-center transition-all duration-200"
                    :class="paymentMethod === 'apple' ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-300 hover:border-gray-400'">
                    <i class="fab fa-apple text-3xl mb-3"
                      :class="paymentMethod === 'apple' ? 'text-blue-600' : 'text-gray-400'"></i>
                    <div class="font-semibold">Apple Pay</div>
                  </div>
                </label>
              </div>
            </div>

            <!-- Credit Card Form -->
            <div v-if="paymentMethod === 'card'" class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                <input v-model="cardInfo.number" type="text" placeholder="1234 5678 9012 3456"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" />
              </div>

              <div class="grid grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                  <input v-model="cardInfo.expiry" type="text" placeholder="MM/YY"
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                  <input v-model="cardInfo.cvv" type="text" placeholder="123"
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                <input v-model="cardInfo.name" type="text" placeholder="John Doe"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

          <!-- Cart Items -->
          <div class="space-y-4 mb-6 max-h-64 overflow-y-auto">
            <div v-for="item in cart" :key="`${item.product.id}-${item.selectedColor}-${item.selectedSize}`"
              class="flex items-center space-x-4 p-3 rounded-lg bg-gray-50">
              <img :src="item.product.image" :alt="item.product.name" class="w-16 h-16 object-cover rounded-lg" />
              <div class="flex-1 min-w-0">
                <h4 class="font-medium text-gray-900 text-sm truncate">{{ item.product.name }}</h4>
                <div class="flex items-center space-x-1 mt-1">
                  <span v-if="item.selectedColor" class="text-xs bg-white px-2 py-1 rounded">{{ item.selectedColor
                    }}</span>
                  <span v-if="item.selectedSize" class="text-xs bg-white px-2 py-1 rounded">{{ item.selectedSize
                    }}</span>
                </div>
                <p class="text-sm text-gray-500">Qty: {{ item.quantity }}</p>
              </div>
              <div class="text-right">
                <p class="font-semibold text-gray-900">${{ (item.product.price * item.quantity).toFixed(2) }}</p>
              </div>
            </div>
          </div>

          <!-- Order Totals -->
          <div class="border-t border-gray-200 pt-6 space-y-3">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Subtotal</span>
              <span class="font-medium">${{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Shipping</span>
              <span class="font-medium">${{ shipping.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Tax</span>
              <span class="font-medium">${{ tax.toFixed(2) }}</span>
            </div>
            <div class="border-t border-gray-200 pt-3">
              <div class="flex justify-between">
                <span class="text-lg font-semibold text-gray-900">Total</span>
                <span class="text-xl font-bold text-gray-900">${{ total.toFixed(2) }}</span>
              </div>
            </div>
          </div>

          <!-- Place Order Button -->
          <button @click="processOrder" :disabled="isProcessing || cart.length === 0"
            class="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-4 px-6 rounded-xl transition-colors font-semibold text-lg flex items-center justify-center">
            <i v-if="isProcessing" class="fas fa-spinner fa-spin mr-2"></i>
            <i v-else class="fas fa-lock mr-2"></i>
            {{ isProcessing ? 'Processing...' : 'Place Order' }}
          </button>

          <!-- Security Badge -->
          <div class="mt-4 text-center">
            <div class="flex items-center justify-center text-sm text-gray-500">
              <i class="fas fa-shield-alt text-green-500 mr-2"></i>
              Secure SSL Encryption
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <teleport to="body">
      <transition name="modal">
        <div v-if="showSuccessModal" class="fixed inset-0 z-[9999] overflow-y-auto">
          <div class="flex items-center justify-center min-h-screen px-4">
            <div class="fixed inset-0 bg-black bg-opacity-50"></div>

            <div class="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center">
              <div class="mb-6">
                <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i class="fas fa-check text-3xl text-green-600"></i>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h3>
                <p class="text-gray-600">Thank you for your purchase. You'll receive a confirmation email shortly.</p>
              </div>

              <div class="space-y-3">
                <button @click="goToHome"
                  class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl transition-colors font-semibold">
                  Continue Shopping
                </button>
                <button @click="showSuccessModal = false"
                  class="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-xl transition-colors">
                  Close
                </button>
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
import { useProducts } from '@/composables/useProducts'
import { useRouter } from 'vue-router'

const router = useRouter()
const { cart, clearCart } = useProducts()

const shippingInfo = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: ''
})

const paymentMethod = ref('card')
const cardInfo = ref({
  number: '',
  expiry: '',
  cvv: '',
  name: ''
})

const isProcessing = ref(false)
const showSuccessModal = ref(false)

const subtotal = computed(() => {
  return cart.value.reduce((total, item) => total + (item.product.price * item.quantity), 0)
})

const shipping = computed(() => subtotal.value > 100 ? 0 : 9.99)
const tax = computed(() => subtotal.value * 0.08)
const total = computed(() => subtotal.value + shipping.value + tax.value)

const processOrder = async () => {
  isProcessing.value = true

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 2000))

  isProcessing.value = false
  showSuccessModal.value = true

  // Clear cart after successful order
  clearCart()
}

const goToHome = () => {
  showSuccessModal.value = false
  router.push('/')
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