export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const order = {
    id: `ORD-${Date.now()}`,
    ...body,
    status: 'pending',
    createdAt: new Date().toISOString(),
  }
  // In production, persist to DB here
  return order
})
