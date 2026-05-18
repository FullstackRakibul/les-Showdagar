import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CartItem, Product } from '@/types/index'

const STORAGE_KEY = 'rh-cart'

function load(): CartItem[] {
  if (typeof localStorage === 'undefined') return []
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') } catch { return [] }
}

function save(items: CartItem[]) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>(load())

  const count = computed(() => items.value.reduce((s, i) => s + i.quantity, 0))
  const total = computed(() => items.value.reduce((s, i) => s + i.price * i.quantity, 0))

  function key(productId: number, color?: string, size?: string) {
    return `${productId}|${color ?? ''}|${size ?? ''}`
  }

  function addItem(product: Product, quantity = 1, selectedColor?: string, selectedSize?: string) {
    const k = key(product.id, selectedColor, selectedSize)
    const existing = items.value.find(
      i => key(i.productId, i.selectedColor, i.selectedSize) === k,
    )
    if (existing) {
      existing.quantity += quantity
    } else {
      items.value.push({
        productId: product.id,
        productName: product.name,
        productImage: product.image,
        price: product.price,
        quantity,
        selectedColor,
        selectedSize,
      })
    }
    save(items.value)
  }

  function updateQuantity(productId: number, quantity: number, selectedColor?: string, selectedSize?: string) {
    const k = key(productId, selectedColor, selectedSize)
    const item = items.value.find(i => key(i.productId, i.selectedColor, i.selectedSize) === k)
    if (!item) return
    if (quantity <= 0) {
      removeItem(productId, selectedColor, selectedSize)
    } else {
      item.quantity = quantity
      save(items.value)
    }
  }

  function removeItem(productId: number, selectedColor?: string, selectedSize?: string) {
    const k = key(productId, selectedColor, selectedSize)
    items.value = items.value.filter(i => key(i.productId, i.selectedColor, i.selectedSize) !== k)
    save(items.value)
  }

  function clearCart() {
    items.value = []
    save(items.value)
  }

  return { items, count, total, addItem, updateQuantity, removeItem, clearCart }
})
