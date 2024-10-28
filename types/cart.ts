interface ProductInCart {
  id: number
  name: string
  slug: string
  ton_price_with_coef: number
  meter_price_with_coef: number
  unit_price_with_coef: number
  total: number
  tons: number
  meters: number
  peaces: number
  vesMetra: number
  dlina: number
}

interface Cart {
  productsInCart: ProductInCart[]
  name: string
  phone: string
  email: string
}

export type {
  ProductInCart,
  Cart,
}
