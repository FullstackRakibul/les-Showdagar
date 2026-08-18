export const PRICE_FORMATS: Record<string, { symbol: string; locale: string; decimals: number }> = {
  BDT: { symbol: '৳', locale: 'en-US', decimals: 0 },
  USD: { symbol: '$', locale: 'en-US', decimals: 2 },
  EUR: { symbol: '€', locale: 'de-DE', decimals: 2 },
  GBP: { symbol: '£', locale: 'en-GB', decimals: 2 },
  CAD: { symbol: 'CA$', locale: 'en-CA', decimals: 2 },
  AUD: { symbol: 'A$', locale: 'en-AU', decimals: 2 },
  SGD: { symbol: 'S$', locale: 'en-SG', decimals: 2 },
  INR: { symbol: '₹', locale: 'en-IN', decimals: 2 },
  AED: { symbol: 'د.إ', locale: 'en-US', decimals: 2 },
  SAR: { symbol: 'ر.س', locale: 'en-US', decimals: 2 },
}

export function formatPrice(amount: number, currency: string, rates: Record<string, number>): string {
  const fmt = PRICE_FORMATS[currency] || PRICE_FORMATS.USD!
  const rate = rates[currency] || 1
  const converted = amount * rate

  if (currency === 'BDT') {
    return `৳${new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(converted)}`
  }

  return new Intl.NumberFormat(fmt.locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: fmt.decimals,
    maximumFractionDigits: fmt.decimals,
  }).format(converted)
}

export function convertCurrency(amount: number, from: string, to: string, rates: Record<string, number>): number {
  const fromRate = rates[from] || 1
  const toRate = rates[to] || 1
  return (amount / fromRate) * toRate
}
