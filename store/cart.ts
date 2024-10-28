import { defineStore, acceptHMRUpdate } from 'pinia'
import { useStorage } from '@vueuse/core'
import type { Cart, ProductInCart } from '~/types/cart'

const initialCart: Cart = {
  productsInCart: [] as ProductInCart[],
  name: '',
  phone: '',
  email: '',
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: useStorage<Cart>('cart', initialCart),
  }),
  hydrate(state, _initialState) {
    state.cart = useStorage('cart', initialCart).value
    // state.cart = initialCart
  },
  getters: {
    getProducts(): ProductInCart[] {
      return this.cart.productsInCart
    },
    getTotalPrice(): number {
      return this.cart.productsInCart.reduce((acc, product) => acc + product.total, 0)
    },
  },
  actions: {
    addProduct(product: ProductInCart) {
      const productIndex = this.cart.productsInCart.findIndex(
        item => item.id === product.id,
      )
      if (productIndex === -1) {
        this.cart.productsInCart.push(product)
      }
      else {
        this.cart.productsInCart[productIndex].tons = product.tons
        this.cart.productsInCart[productIndex].meters = product.meters
        this.cart.productsInCart[productIndex].peaces = product.peaces
        this.cart.productsInCart[productIndex].total = product.total
      }
    },
    editProduct(id: number, tons: number, meters: number, peaces: number, total: number) {
      const productIndex = this.cart.productsInCart.findIndex(
        item => item.id === id,
      )
      if (productIndex !== -1) {
        this.cart.productsInCart[productIndex].tons = tons
        this.cart.productsInCart[productIndex].meters = meters
        this.cart.productsInCart[productIndex].peaces = peaces
        this.cart.productsInCart[productIndex].total = total
      }
    },
    removeProduct(productId: number) {
      const productIndex = this.cart.productsInCart.findIndex(
        item => item.id === productId,
      )
      if (productIndex !== -1) {
        this.cart.productsInCart.splice(productIndex, 1)
      }
    },
    // increaseProductQuantity (productId: number) {
    //   const productIndex = this.cart.productsInCart.findIndex(
    //     item => item.id === productId
    //   )
    //   if (productIndex !== -1) {
    //     this.cart.productsInCart[productIndex].quantity++
    //     this.cart.productsInCart[productIndex].total += this.cart.productsInCart[productIndex].price
    //   }
    // },
    // decreaseProductQuantity (productId: number) {
    //   const productIndex = this.cart.productsInCart.findIndex(
    //     item => item.id === productId
    //   )
    //   if (productIndex !== -1) {
    //     this.cart.productsInCart[productIndex].quantity--
    //     this.cart.productsInCart[productIndex].total -= this.cart.productsInCart[productIndex].price
    //     if (this.cart.productsInCart[productIndex].quantity === 0) {
    //       this.removeProduct(productId)
    //     }
    //   }
    // },
    clearCart() {
      this.cart.productsInCart = []
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}
