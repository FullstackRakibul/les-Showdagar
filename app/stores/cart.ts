// store/cart.ts
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as Array<{ id: string; name: string; price: number; quantity: number; image: string }>,
  }),
  getters: {
    total: (state) => state.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    count: (state) => state.items.reduce((sum, i) => sum + i.quantity, 0),
  },
  actions: {
    addItem(product) {
      const existing = this.items.find((i) => i.id === product.id)
      if (existing) {
        existing.quantity++
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
    },
    removeItem(id: string) {
      this.items = this.items.filter((i) => i.id !== id)
    },
    clearCart() {
      this.items = []
    },
  },
})
