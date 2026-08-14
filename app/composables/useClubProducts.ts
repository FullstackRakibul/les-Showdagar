import { computed, type ComputedRef } from 'vue'
import { useProductStore } from '@/stores/products'
import type { Product } from '@/types/index'
import type { ClubId } from '@/types/content'

/**
 * Resolves which club a product belongs to.
 *
 * `Product.club` is optional and no catalogue entry currently sets it, so this
 * falls back to mapping `categoryId`. Once products carry an explicit `club`,
 * that value wins and this map only covers the gaps.
 */
const CATEGORY_TO_CLUB: Record<string, ClubId> = {
  // Quantum — technology & innovation
  electronics: 'quantum',
  gaming: 'quantum',
  computers: 'quantum',
  accessories: 'quantum',
  audio: 'quantum',
  'smart-home': 'quantum',
  photography: 'quantum',

  // Elegance — fashion & lifestyle
  footwear: 'elegance',
  fashion: 'elegance',
  watches: 'elegance',
  wearables: 'elegance',
  'personal-care': 'elegance',

  // NextStop — travel & experiences
  sports: 'nextstop',
  travel: 'nextstop',
  outdoor: 'nextstop',
  luggage: 'nextstop',
}

export function resolveProductClub(product: Product): ClubId | null {
  if (product.club) return product.club
  return CATEGORY_TO_CLUB[product.categoryId] ?? null
}

export function useClubProducts(clubId: ComputedRef<ClubId | null | undefined>) {
  const productStore = useProductStore()

  const products = computed<Product[]>(() => {
    const id = clubId.value
    if (!id) return []
    return productStore.products.filter(p => resolveProductClub(p) === id)
  })

  const count = computed(() => products.value.length)

  return { products, count, resolveProductClub }
}
