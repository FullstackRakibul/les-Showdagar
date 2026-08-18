import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Order, ShippingInfo, PaymentInfo, CartItem } from '@/types/index'

export const useCheckoutStore = defineStore('checkout', () => {
  const currentOrder = ref<Order | null>(null)
  const isProcessing = ref(false)
  const showSuccessModal = ref(false)
  const orders = ref<Order[]>([])
  const paymentError = ref<string | null>(null)

  const shippingInfo = ref<ShippingInfo>({ name: '', phone: '', street: '', thana: '', zillah: '', note: '' })
  const paymentInfo = ref<PaymentInfo>({ method: 'cash' })

  function updateShippingInfo(info: Partial<ShippingInfo>) {
    Object.assign(shippingInfo.value, info)
  }

  function updatePaymentInfo(info: Partial<PaymentInfo>) {
    Object.assign(paymentInfo.value, info)
  }

  async function createOrder(
    cartItems: CartItem[],
    totals: { subtotal: number; shipping: number; tax: number; total: number },
  ): Promise<Order> {
    const api = useApi()
    const order = await api<Order>('/orders', {
      method: 'POST',
      body: {
        items: cartItems,
        shippingInfo: shippingInfo.value,
        paymentMethod: paymentInfo.value.method,
        ...totals,
      },
    })
    return order
  }

  async function processPayment(orderId: string, paymentDetails?: Record<string, unknown>): Promise<void> {
    const api = useApi()
    await api(`/orders/${orderId}/pay`, { method: 'POST', body: paymentDetails ?? {} })
  }

  async function processOrder(
    cartItems: CartItem[],
    totals: { subtotal: number; shipping: number; tax: number; total: number },
  ) {
    isProcessing.value = true
    paymentError.value = null
    try {
      const order = await createOrder(cartItems, totals)
      await processPayment(order.id, { ...paymentInfo.value, method: paymentInfo.value.method })

      const completedOrder: Order = { ...order, status: 'completed' }
      orders.value.push(completedOrder)
      currentOrder.value = completedOrder
      showSuccessModal.value = true
      resetForm()
      return completedOrder
    } catch (e: any) {
      paymentError.value = e?.data?.statusMessage ?? e?.message ?? 'Payment failed'
      throw e
    } finally {
      isProcessing.value = false
    }
  }

  function resetForm() {
    shippingInfo.value = { name: '', phone: '', street: '', thana: '', zillah: '', note: '' }
    paymentInfo.value = { method: 'cash' }
  }

  function closeSuccessModal() {
    showSuccessModal.value = false
    currentOrder.value = null
  }

  return {
    currentOrder, isProcessing, showSuccessModal, orders, shippingInfo, paymentInfo, paymentError,
    updateShippingInfo, updatePaymentInfo, createOrder, processPayment, processOrder, resetForm, closeSuccessModal,
  }
})
