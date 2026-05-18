<template>
  <div class="space-y-6">
    <!-- Shipping -->
    <div class="bg-card border border-border rounded-2xl p-6 space-y-4">
      <h2 class="font-semibold text-foreground">Delivery Information</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="space-y-1.5">
          <Label for="name">Full Name</Label>
          <Input id="name" v-model="store.shippingInfo.name" type="text" required placeholder="Your full name" />
        </div>
        <div class="space-y-1.5">
          <Label for="phone">Phone</Label>
          <Input id="phone" v-model="store.shippingInfo.phone" type="tel" required placeholder="+8801XXXXXXXXX" />
        </div>
        <div class="sm:col-span-2 space-y-1.5">
          <Label for="street">Street Address</Label>
          <Input id="street" v-model="store.shippingInfo.street" type="text" required placeholder="House, Road, Area" />
        </div>
        <div class="space-y-1.5">
          <Label for="thana">Thana</Label>
          <Input id="thana" v-model="store.shippingInfo.thana" type="text" required placeholder="e.g. Dhanmondi" />
        </div>
        <div class="space-y-1.5">
          <Label for="zillah">District (Zillah)</Label>
          <Input id="zillah" v-model="store.shippingInfo.zillah" type="text" required placeholder="e.g. Dhaka" />
        </div>
        <div class="sm:col-span-2 space-y-1.5">
          <Label for="note">Note (optional)</Label>
          <Input id="note" v-model="store.shippingInfo.note" type="text" placeholder="Any delivery instructions" />
        </div>
      </div>
    </div>

    <!-- Payment Method -->
    <div class="bg-card border border-border rounded-2xl p-6 space-y-4">
      <h2 class="font-semibold text-foreground">Payment Method</h2>
      <div class="grid grid-cols-3 gap-3">
        <label v-for="method in methods" :key="method.value" class="cursor-pointer">
          <input v-model="store.paymentInfo.method" type="radio" :value="method.value" class="sr-only" />
          <div :class="[
            'flex flex-col items-center gap-2 p-4 rounded-xl border-2 text-center transition-all',
            store.paymentInfo.method === method.value
              ? 'border-ring bg-muted'
              : 'border-border hover:border-muted-foreground/40'
          ]">
            <span class="text-2xl">{{ method.icon }}</span>
            <span class="text-xs font-medium text-foreground">{{ method.label }}</span>
          </div>
        </label>
      </div>

      <!-- bKash fields -->
      <div v-if="store.paymentInfo.method === 'bkash'" class="space-y-3 pt-2">
        <div class="flex items-center gap-3 p-4 bg-pink-50 dark:bg-pink-900/10 border border-pink-200 dark:border-pink-800 rounded-xl">
          <span class="text-2xl">📱</span>
          <div>
            <p class="text-sm font-semibold text-foreground">bKash Number: <span class="text-pink-600">01XXXXXXXXX</span></p>
            <p class="text-xs text-muted-foreground">Send payment → enter your bKash number below</p>
          </div>
        </div>
        <div class="space-y-1.5">
          <Label for="bkash-number">Your bKash Number</Label>
          <Input id="bkash-number" v-model="store.paymentInfo.bkashNumber" type="tel" placeholder="01XXXXXXXXX" />
        </div>
      </div>

      <!-- Card fields -->
      <div v-if="store.paymentInfo.method === 'card'" class="space-y-3 pt-2">
        <div class="space-y-1.5">
          <Label for="card-number">Card Number</Label>
          <Input id="card-number" v-model="store.paymentInfo.cardNumber" type="text" placeholder="4242 4242 4242 4242" maxlength="19" class="font-mono" />
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div class="space-y-1.5">
            <Label for="card-expiry">Expiry</Label>
            <Input id="card-expiry" v-model="store.paymentInfo.cardExpiry" type="text" placeholder="MM/YY" maxlength="5" class="font-mono" />
          </div>
          <div class="space-y-1.5">
            <Label for="card-cvv">CVV</Label>
            <Input id="card-cvv" v-model="store.paymentInfo.cardCvv" type="text" placeholder="123" maxlength="4" class="font-mono" />
          </div>
        </div>
        <div class="space-y-1.5">
          <Label for="card-name">Cardholder Name</Label>
          <Input id="card-name" v-model="store.paymentInfo.cardName" type="text" placeholder="Name on card" />
        </div>
        <p class="text-[10px] text-muted-foreground">Test card: 4242 4242 4242 4242 · 12/29 · 123</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCheckoutStore } from '@/stores/checkout'

const store = useCheckoutStore()

const methods = [
  { value: 'cash',  icon: '💵', label: 'Cash on Delivery' },
  { value: 'bkash', icon: '📱', label: 'bKash' },
  { value: 'card',  icon: '💳', label: 'Card' },
]
</script>
