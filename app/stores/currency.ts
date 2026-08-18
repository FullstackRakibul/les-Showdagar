import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const CURRENCY_SYMBOLS: Record<string, string> = {
  BDT: '৳', USD: '$', EUR: '€', GBP: '£',
  CAD: 'CA$', AUD: 'A$', SGD: 'S$', INR: '₹', AED: 'د.إ', SAR: 'ر.س',
}

export const CURRENCY_LOCALES: Record<string, string> = {
  BDT: 'en-US', USD: 'en-US', EUR: 'de-DE', GBP: 'en-GB',
  CAD: 'en-CA', AUD: 'en-AU', SGD: 'en-SG', INR: 'en-IN', AED: 'en-US', SAR: 'en-US',
}

export const CURRENCY_DECIMALS: Record<string, number> = {
  BDT: 0, USD: 2, EUR: 2, GBP: 2, CAD: 2, AUD: 2, SGD: 2, INR: 2, AED: 2, SAR: 2,
}

const STATIC_RATES: Record<string, number> = {
  BDT: 1, USD: 0.0092, EUR: 0.0085, GBP: 0.0073,
  CAD: 0.0126, AUD: 0.0138, SGD: 0.0124, INR: 0.77, AED: 0.034, SAR: 0.035,
}

export interface Currency {
  code: string
  symbol: string
  rate: number
  locale: string
  decimals: number
}

export const useCurrencyStore = defineStore('currency', () => {
  const displayCurrency = ref('BDT')
  const rates = ref<Record<string, number>>({ ...STATIC_RATES })
  const lastUpdated = ref<string | null>(null)

  const currentCurrency = computed((): Currency => {
    const code = displayCurrency.value
    return {
      code,
      symbol: CURRENCY_SYMBOLS[code] || code,
      rate: rates.value[code] || 1,
      locale: CURRENCY_LOCALES[code] || 'en-US',
      decimals: CURRENCY_DECIMALS[code] ?? 2,
    }
  })

  function formatPrice(amount: number): string {
    const c = currentCurrency.value
    const converted = amount * c.rate
    if (c.code === 'BDT') {
      return `৳${new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(converted)}`
    }
    return new Intl.NumberFormat(c.locale, {
      style: 'currency',
      currency: c.code,
      minimumFractionDigits: c.decimals,
      maximumFractionDigits: c.decimals,
    }).format(converted)
  }

  function setCurrency(code: string) {
    if (rates.value[code] !== undefined) {
      displayCurrency.value = code
      if (import.meta.client) {
        localStorage.setItem('rh-currency', code)
      }
    }
  }

  async function fetchRates() {
    try {
      const response = await $fetch<Record<string, number>>('/api/currency/rates')
      rates.value = { ...rates.value, ...response }
      lastUpdated.value = new Date().toISOString()
    } catch {
      // static rates remain active
    }
  }

  function loadFromLocalStorage() {
    if (!import.meta.client) return
    const saved = localStorage.getItem('rh-currency')
    if (saved && rates.value[saved] !== undefined) {
      displayCurrency.value = saved
    }
  }

  return {
    displayCurrency,
    rates,
    lastUpdated,
    currentCurrency,
    formatPrice,
    setCurrency,
    fetchRates,
    loadFromLocalStorage,
  }
})
