export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  // Mock payment processing — always succeeds unless test failure flag
  if (body?.simulateFailure) {
    throw createError({ statusCode: 402, statusMessage: 'Payment declined (test)' })
  }

  return {
    orderId: id,
    status: 'completed',
    transactionId: `TXN-${Date.now()}`,
    paidAt: new Date().toISOString(),
  }
})
