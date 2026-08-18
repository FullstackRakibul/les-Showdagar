import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useClipCartStore } from '@/stores/clipCart'
import { useProductStore } from '@/stores/products'
import { useAuthStore } from '@/stores/auth'

export interface RabbITicContext {
  user: { name: string; clubs: string[] }
  cart: { items: { name: string; price: number; quantity: number }[]; total: number; count: number }
  clips: { titles: string[]; count: number }
  products: { recent: string[] }
  club: { current: 'quantum' | 'elegance' | 'nextstop' | null }
}

/**
 * Snapshot of what the shopper is doing right now, shipped with every message so
 * the model can answer "what's in my cart?" without a tool call.
 *
 * Everything here is a computed over live stores, so the object handed to the API
 * is always current — there is nothing to subscribe to or invalidate.
 */
export function useRabbITicContext() {
  const cartStore = useCartStore()
  const clipStore = useClipCartStore()
  const productStore = useProductStore()
  const authStore = useAuthStore()

  const context = computed<RabbITicContext>(() => ({
    user: {
      name: authStore.user?.name ?? 'Guest',
      clubs: [],
    },
    cart: {
      items: cartStore.items.map(i => ({ name: i.productName, price: i.price, quantity: i.quantity })),
      total: cartStore.total,
      count: cartStore.count,
    },
    clips: {
      titles: clipStore.clips.slice(0, 8).map(c => c.title),
      count: clipStore.clips.length,
    },
    products: {
      // The catalog is small enough to name outright; this is what stops the model
      // from inventing products that RH Business Club does not sell.
      recent: productStore.products.slice(0, 20).map(p => `${p.name} (৳${p.price}, ${p.category})`),
    },
    club: {
      current: null,
    },
  }))

  /** Free-text product search the model's answers are grounded against. */
  function searchProducts(query: string, limit = 5) {
    const q = query.toLowerCase().trim()
    if (!q) return []
    const terms = q.split(/\s+/)
    return productStore.products
      .filter(p => {
        const haystack = `${p.name} ${p.category} ${p.brand ?? ''} ${p.description ?? ''}`.toLowerCase()
        return terms.some(t => haystack.includes(t))
      })
      .slice(0, limit)
  }

  function buildSystemPrompt(): string {
    const c = context.value
    const cartLines = c.cart.items.length
      ? c.cart.items.map(i => `  - ${i.name} x${i.quantity} — ৳${i.price * i.quantity}`).join('\n')
      : '  (empty)'

    return `You are RabbITic, the AI shopping assistant for RH Business Club — a premium marketplace with three clubs: Quantum (tech), Elegance (fashion), and NextStop (travel).

Current user context:
- Name: ${c.user.name}
- Cart: ${c.cart.count} item(s), total ৳${c.cart.total.toFixed(2)}
${cartLines}
- Saved clips: ${c.clips.count}${c.clips.titles.length ? ` — ${c.clips.titles.join(', ')}` : ''}

Available products (name, price, category):
${c.products.recent.map(p => `- ${p}`).join('\n')}

Guidelines:
1. Be helpful, concise, and professional.
2. Recommend only from the product list above. Never invent products, prices, or specs.
3. If nothing matches, say so and ask a clarifying question.
4. Prices are in Bangladeshi Taka (৳).
5. Suggest a club (Quantum/Elegance/NextStop) when it fits the user's interests.
6. Keep responses under 200 words unless asked for more.`
  }

  return { context, buildSystemPrompt, searchProducts }
}
