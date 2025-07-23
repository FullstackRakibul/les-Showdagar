import { defineStore } from "pinia"
import { ref } from "vue"

export interface ShippingInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
}

export interface PaymentInfo {
  method: "card" | "paypal" | "apple"
  cardNumber?: string
  expiryDate?: string
  cvv?: string
  cardholderName?: string
}

export interface Order {
  id: string
  items: any[]
  shippingInfo: ShippingInfo
  paymentInfo: PaymentInfo
  subtotal: number
  shipping: number
  tax: number
  total: number
  status: "pending" | "processing" | "completed" | "failed"
  createdAt: Date
}

export const useCheckoutStore = defineStore("checkout", () => {
  // State
  const currentOrder = ref<Order | null>(null)
  const isProcessing = ref(false)
  const showSuccessModal = ref(false)
  const orders = ref<Order[]>([])

  const shippingInfo = ref<ShippingInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  })

  const paymentInfo = ref<PaymentInfo>({
    method: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  })

  // Actions
  function updateShippingInfo(info: Partial<ShippingInfo>) {
    Object.assign(shippingInfo.value, info)
  }

  function updatePaymentInfo(info: Partial<PaymentInfo>) {
    Object.assign(paymentInfo.value, info)
  }

  async function processOrder(
    cartItems: any[],
    totals: { subtotal: number; shipping: number; tax: number; total: number },
  ) {
    isProcessing.value = true

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const order: Order = {
        id: `ORD-${Date.now()}`,
        items: [...cartItems],
        shippingInfo: { ...shippingInfo.value },
        paymentInfo: { ...paymentInfo.value },
        subtotal: totals.subtotal,
        shipping: totals.shipping,
        tax: totals.tax,
        total: totals.total,
        status: "completed",
        createdAt: new Date(),
      }

      orders.value.push(order)
      currentOrder.value = order
      showSuccessModal.value = true

      // Clear form data
      resetForm()

      return order
    } catch (error) {
      console.error("Order processing failed:", error)
      throw error
    } finally {
      isProcessing.value = false
    }
  }

  function resetForm() {
    shippingInfo.value = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
    }

    paymentInfo.value = {
      method: "card",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: "",
    }
  }

  function closeSuccessModal() {
    showSuccessModal.value = false
    currentOrder.value = null
  }

  return {
    // State
    currentOrder,
    isProcessing,
    showSuccessModal,
    orders,
    shippingInfo,
    paymentInfo,

    // Actions
    updateShippingInfo,
    updatePaymentInfo,
    processOrder,
    resetForm,
    closeSuccessModal,
  }
})
