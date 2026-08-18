import { computed } from 'vue'
import { useCurrencyStore, CURRENCY_SYMBOLS, CURRENCY_LOCALES, CURRENCY_DECIMALS } from '@/stores/currency'

export const useCurrency = () => {
  const store = useCurrencyStore()

  function formatPrice(amount: number, currencyCode?: string): string {
    if (currencyCode && currencyCode !== store.displayCurrency) {
      const rate = store.rates[currencyCode] || 1
      const locale = CURRENCY_LOCALES[currencyCode] || 'en-US'
      const decimals = CURRENCY_DECIMALS[currencyCode] ?? 2
      const converted = amount * rate
      if (currencyCode === 'BDT') {
        return `৳${new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(converted)}`
      }
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(converted)
    }
    return store.formatPrice(amount)
  }

  function convert(amount: number, from = 'BDT', to?: string): number {
    const fromRate = store.rates[from] || 1
    const toRate = store.rates[to || store.displayCurrency] || 1
    return (amount / fromRate) * toRate
  }

  function getCurrencySymbol(code?: string): string {
    return CURRENCY_SYMBOLS[code || store.displayCurrency] || code || ''
  }

  return {
    currentCurrency: computed(() => store.currentCurrency),
    displayCurrency: computed(() => store.displayCurrency),
    availableCurrencies: computed(() => Object.keys(store.rates)),
    formatPrice,
    convert,
    getCurrencySymbol,
    setCurrency: store.setCurrency,
    loadCurrency: store.loadFromLocalStorage,
  }
}
