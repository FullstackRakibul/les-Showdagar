import { defineNuxtPlugin } from '#app'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'

const SEED_KEY = 'rh-seeded-v1'

function seedDefaults() {
  if (!localStorage.getItem('rh-theme')) {
    localStorage.setItem('rh-theme', JSON.stringify({ dark: false, accentHue: 220 }))
  }

  if (!localStorage.getItem('rh-cart')) {
    localStorage.setItem('rh-cart', JSON.stringify([]))
  }

  localStorage.setItem(SEED_KEY, '1')
}

export default defineNuxtPlugin({
  name: 'pinia-store-init',
  enforce: 'post',
  setup() {
    if (!import.meta.client) return

    if (!localStorage.getItem(SEED_KEY)) {
      seedDefaults()
    }

    useAuthStore().checkAuth()
    useCartStore()
  },
})
