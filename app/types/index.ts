export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  image: string
  description: string
  productCount?: number
  club?: 'quantum' | 'elegance' | 'nextstop'
}

export interface ProductVariant {
  type: 'color' | 'size'
  options: string[]
}

export interface Product {
  id: number
  name: string
  slug: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  image: string
  categoryId: string
  category: string
  stock: number
  inStock: boolean
  rating: number
  reviews: number
  isNew?: boolean
  isHot?: boolean
  brand?: string
  colors?: string[]
  sizes?: string[]
  specifications?: Record<string, string>
  revenue?: number
  listingAge?: string
}

export interface CartItem {
  productId: number
  productName: string
  productImage: string
  price: number
  quantity: number
  selectedColor?: string
  selectedSize?: string
}

export interface ShippingInfo {
  name: string
  phone: string
  street: string
  thana: string
  zillah: string
  note?: string
}

export interface PaymentInfo {
  method: 'cash' | 'bkash' | 'card'
  bkashNumber?: string
  cardNumber?: string
  cardExpiry?: string
  cardCvv?: string
  cardName?: string
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  subtotal: number
  shipping: number
  tax: number
  status: 'pending' | 'processing' | 'completed' | 'failed'
  paymentMethod: PaymentInfo['method']
  shippingInfo: ShippingInfo
  createdAt: string
}
