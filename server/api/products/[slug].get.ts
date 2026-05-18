import { products } from '../../data/catalog'

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')
  const product = products.find(p => p.slug === slug)
  if (!product) throw createError({ statusCode: 404, statusMessage: 'Product not found' })
  return product
})
