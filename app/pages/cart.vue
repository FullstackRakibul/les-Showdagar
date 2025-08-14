<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Shopping Cart</h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400">{{ productStore.cartItemsCount }} items in your cart</p>
      </div>
      <button v-if="productStore.cart.length > 0" @click="productStore.clearCart"
        class="text-red-600 hover:text-red-700 font-medium transition-colors">
        Clear Cart
      </button>
    </div>

    <!-- Cart Content -->
    <div v-if="productStore.cart.length === 0" class="text-center py-16">
      <ShoppingCart class="w-20 h-20 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
      <h3 class="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-4">Your cart is empty</h3>
      <p class="text-gray-500 dark:text-gray-500 mb-8">Looks like you haven't added anything to your cart yet</p>
      <NuxtLink to="/"
        class="inline-flex items-center px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors font-semibold">
        <ArrowLeft class="w-5 h-5 mr-2" />
        Continue Shopping
      </NuxtLink>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Cart Items -->
      <div class="lg:col-span-2 space-y-4">
        <div v-for="item in productStore.cart" :key="`${item.product.id}-${item.selectedColor}-${item.selectedSize}`"
          class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div class="flex items-center space-x-4">
            <img :src="item.product.image" :alt="item.product.name" class="w-20 h-20 object-cover rounded-xl" />
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold text-gray-900 dark:text-white truncate">{{ item.product.name }}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ item.product.brand }}</p>
              <div class="flex items-center space-x-2 mt-2">
                <span v-if="item.selectedColor" class="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{{
                  item.selectedColor }}</span>
                <span v-if="item.selectedSize" class="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{{
                  item.selectedSize }}</span>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <div class="flex items-center space-x-2">
                <button
                  @click="productStore.updateCartQuantity(item.product.id, item.quantity - 1, item.selectedColor, item.selectedSize)"
                  class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center transition-colors">
                  <Minus class="w-4 h-4" />
                </button>
                <span class="font-medium text-gray-900 dark:text-white min-w-[2rem] text-center">{{ item.quantity
                  }}</span>
                <button
                  @click="productStore.updateCartQuantity(item.product.id, item.quantity + 1, item.selectedColor, item.selectedSize)"
                  class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center transition-colors">
                  <Plus class="w-4 h-4" />
                </button>
              </div>
              <div class="text-right">
                <p class="font-bold text-lg text-gray-900 dark:text-white">${{ (item.product.price *
                  item.quantity).toFixed(2) }}</p>
                <button @click="productStore.removeFromCart(item.product.id, item.selectedColor, item.selectedSize)"
                  class="text-red-500 hover:text-red-700 text-sm mt-1 transition-colors flex items-center">
                  <Trash2 class="w-4 h-4 mr-1" />
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="lg:col-span-1">
        <div
          class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 sticky top-24">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Order Summary</h2>

          <div class="space-y-4 mb-6">
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Subtotal</span>
              <span class="font-medium">৳{{ productStore.cartTotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Shipping</span>
              <span class="font-medium">৳{{ shipping.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Tax</span>
              <span class="font-medium">৳{{ tax.toFixed(2) }}</span>
            </div>
            <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
              <div class="flex justify-between">
                <span class="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
                <span class="text-xl font-bold text-gray-900 dark:text-white">৳{{ total.toFixed(2) }}</span>
              </div>
            </div>
          </div>

          <NuxtLink to="/checkout"
            class="w-full bg-primary text-white py-3 px-4 rounded-xl hover:bg-primary-dark transition-colors font-semibold text-center block mb-4">
            Proceed to Checkout
          </NuxtLink>

          <NuxtLink to="/"
            class="w-full border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-semibold text-center block">
            Continue Shopping
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ShoppingCart, ArrowLeft, Minus, Plus, Trash2 } from 'lucide-vue-next'
import { useProductStore } from '@/stores/products'

const productStore = useProductStore()

const shipping = computed(() => productStore.cartTotal > 100 ? 0 : 9.99)
const tax = computed(() => productStore.cartTotal * 0.08)
const total = computed(() => productStore.cartTotal + shipping.value + tax.value)
</script>