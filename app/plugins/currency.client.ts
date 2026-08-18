import { useCurrencyStore } from '@/stores/currency'

export default defineNuxtPlugin(() => {
  const currencyStore = useCurrencyStore()
  currencyStore.loadFromLocalStorage()
})
