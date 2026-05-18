import { products } from '../data/catalog'

export default defineEventHandler((event) => {
  const { category } = getQuery(event)
  if (category && typeof category === 'string') {
    return products.filter(p => p.categoryId === category || p.category.toLowerCase() === category.toLowerCase())
  }
  return products
})
