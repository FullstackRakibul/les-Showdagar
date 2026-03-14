<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <div class="max-w-4xl mx-auto px-6 py-12">
      <h1 class="text-5xl font-bold mb-2">Complete Your Order</h1>
      <p class="text-lg text-muted-foreground">Calcifer - {{ productStore.cartQuantity }} unit{{ productStore.cartQuantity !== 1 ? 's' : '' }}</p>
    </div>

    <!-- Main Content -->
    <div class="max-w-4xl mx-auto px-6 pb-20">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        <!-- Left: Order Form -->
        <div class="lg:col-span-2">
          <!-- Product Review -->
          <div class="mb-12 p-8 bg-muted/30 rounded-xl border border-border">
            <h2 class="text-xl font-semibold mb-4">Order Review</h2>
            <div class="flex gap-4">
              <img :src="productStore.product.heroImage" :alt="productStore.product.name" class="w-24 h-24 object-cover rounded-lg" />
              <div class="flex-1">
                <h3 class="font-semibold text-lg">{{ productStore.product.name }}</h3>
                <p class="text-muted-foreground text-sm mt-1">{{ productStore.product.tagline }}</p>
                <div class="mt-4 flex items-center justify-between">
                  <span class="text-sm text-muted-foreground">Quantity: {{ productStore.cartQuantity }}</span>
                  <span class="font-bold text-lg">${{ (productStore.product.price * productStore.cartQuantity).toFixed(2) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Delivery Form -->
          <div class="mb-8">
            <h2 class="text-2xl font-bold mb-6">Delivery Information</h2>
            <form @submit.prevent="handleSubmit" class="space-y-6">
              
              <!-- Name & Email -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium mb-2">Full Name *</label>
                  <input 
                    v-model="shippingInfo.name" 
                    type="text" 
                    required
                    placeholder="John Doe"
                    class="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-2">Email *</label>
                  <input 
                    v-model="shippingInfo.email" 
                    type="email" 
                    required
                    placeholder="you@example.com"
                    class="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <!-- Phone -->
              <div>
                <label class="block text-sm font-medium mb-2">Phone Number *</label>
                <input 
                  v-model="shippingInfo.phone" 
                  type="tel" 
                  required
                  placeholder="+1 (555) 000-0000"
                  class="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                />
              </div>

              <!-- Address -->
              <div>
                <label class="block text-sm font-medium mb-2">Street Address *</label>
                <input 
                  v-model="shippingInfo.street" 
                  type="text" 
                  required
                  placeholder="123 Main Street"
                  class="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                />
              </div>

              <!-- City & Postal -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium mb-2">City *</label>
                  <input 
                    v-model="shippingInfo.city" 
                    type="text" 
                    required
                    placeholder="New York"
                    class="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-2">Postal Code *</label>
                  <input 
                    v-model="shippingInfo.postal" 
                    type="text" 
                    required
                    placeholder="10001"
                    class="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <!-- Country & State -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium mb-2">Country *</label>
                  <input 
                    v-model="shippingInfo.country" 
                    type="text" 
                    required
                    placeholder="United States"
                    class="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-2">State/Province</label>
                  <input 
                    v-model="shippingInfo.state" 
                    type="text" 
                    placeholder="New York"
                    class="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <!-- Notes -->
              <div>
                <label class="block text-sm font-medium mb-2">Delivery Notes (Optional)</label>
                <textarea 
                  v-model="shippingInfo.notes" 
                  placeholder="Any special delivery instructions..."
                  rows="3"
                  class="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
                />
              </div>
            </form>
          </div>

          <!-- Payment Method -->
          <div>
            <h2 class="text-2xl font-bold mb-6">Payment Method</h2>
            <div class="space-y-3">
              <label class="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors" 
                :class="{ 'border-accent bg-accent/10': paymentMethod === 'card' }">
                <input v-model="paymentMethod" type="radio" value="card" class="w-4 h-4" />
                <span class="ml-3 font-medium">Credit/Debit Card</span>
              </label>
              <label class="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                :class="{ 'border-accent bg-accent/10': paymentMethod === 'paypal' }">
                <input v-model="paymentMethod" type="radio" value="paypal" class="w-4 h-4" />
                <span class="ml-3 font-medium">PayPal</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Right: Order Summary (Sticky) -->
        <div class="lg:col-span-1">
          <div class="sticky top-24 bg-muted/30 rounded-xl p-8 border border-border">
            <h2 class="text-xl font-semibold mb-6">Order Summary</h2>

            <!-- Product -->
            <div class="mb-6 pb-6 border-b border-border">
              <div class="flex justify-between mb-2">
                <span class="text-muted-foreground">{{ productStore.product.name }}</span>
                <span class="font-medium">${{ productStore.product.price.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-sm text-muted-foreground">
                <span>Quantity: {{ productStore.cartQuantity }}</span>
              </div>
            </div>

            <!-- Totals -->
            <div class="space-y-3 mb-6">
              <div class="flex justify-between">
                <span class="text-muted-foreground">Subtotal</span>
                <span class="font-medium">${{ subtotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-muted-foreground">Shipping</span>
                <span class="font-medium">{{ shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-muted-foreground">Tax</span>
                <span class="font-medium">${{ tax.toFixed(2) }}</span>
              </div>
              <div class="border-t border-border pt-3">
                <div class="flex justify-between items-center">
                  <span class="font-semibold">Total</span>
                  <span class="text-2xl font-bold">${{ total.toFixed(2) }}</span>
                </div>
              </div>
            </div>

            <!-- CTA -->
            <Button 
              @click="handleSubmit" 
              :disabled="isProcessing || !canSubmit"
              class="w-full mb-4"
              size="lg"
            >
              <span v-if="isProcessing" class="flex items-center gap-2">
                <div class="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </span>
              <span v-else>Complete Purchase</span>
            </Button>

            <!-- Security -->
            <div class="text-center text-xs text-muted-foreground">
              <div class="flex items-center justify-center gap-2">
                <HugeiconsIcon :icon="ShieldCheckIcon" :size="16" />
                Secure SSL Encrypted
              </div>
            </div>

            <!-- Estimated Delivery -->
            <div class="mt-6 p-4 bg-background rounded-lg border border-border text-sm text-muted-foreground text-center">
              <p>Estimated Delivery</p>
              <p class="font-semibold text-foreground mt-1">{{ productStore.product.estimatedDelivery }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <PaymentSuccessModal />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/products'
import PaymentSuccessModal from '@/components/PaymentSuccessModal.vue'
import { Button } from '@/components/ui/button'
import { HugeiconsIcon } from '@hugeicons/vue'
import { ShieldCheckIcon } from '@hugeicons/core-free-icons'

const router = useRouter()
const productStore = useProductStore()

const isProcessing = ref(false)
const paymentMethod = ref('card')

const shippingInfo = ref({
  name: '',
  email: '',
  phone: '',
  street: '',
  city: '',
  state: '',
  postal: '',
  country: '',
  notes: '',
})

const subtotal = computed(() => productStore.cartTotal)
const shipping = computed(() => (subtotal.value > 500 ? 0 : 15))
const tax = computed(() => subtotal.value * 0.08)
const total = computed(() => subtotal.value + shipping.value + tax.value)

const canSubmit = computed(() => {
  const s = shippingInfo.value
  return !!(s.name && s.email && s.phone && s.street && s.city && s.postal && s.country)
})

const handleSubmit = async () => {
  if (!canSubmit.value || isProcessing.value) return

  isProcessing.value = true
  
  // Simulate payment processing
  await new Promise(resolve => setTimeout(resolve, 2000))

  // Show success modal
  const event = new CustomEvent('show-success-modal', {
    detail: {
      orderNumber: Math.random().toString(36).substring(2, 11).toUpperCase(),
      estimatedDelivery: productStore.product.estimatedDelivery,
      total: total.value,
    }
  })
  document.dispatchEvent(event)

  // Clear cart after a delay
  setTimeout(() => {
    productStore.clearCart()
    router.push('/')
  }, 3000)

  isProcessing.value = false
}

// Redirect if cart is empty
onMounted(() => {
  if (productStore.cartQuantity === 0) {
    router.push('/')
  }
})

useHead({
  title: 'Checkout - Calcifer',
  meta: [
    { name: 'description', content: 'Complete your Calcifer pre-order' }
  ]
})
</script>
