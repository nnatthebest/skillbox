import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import config from '@/config'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: [],
    orderInfo: null,
  },
  mutations: {
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo
    },
    resetCart(state) {
      state.cartProducts = []
      state.cartProductsData = []
    },
    updateCartProductAmount(state, { productId, amount }) {
      const item = state.cartProducts.find((product) => product.productId === productId)
      if (item) {
        item.amount = amount
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter((p) => p.productId !== productId)
    },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey
    },
    updateProductsData(state, items) {
      state.cartProductsData = items
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => ({
        productId: item.product.id,
        amount: item.quantity,
      }))
    },
  },
  actions: {
    loadOrderInfo(context, orderId) {
      return axios
        .get(`${config}/api/orders/${orderId}`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          context.commit('updateOrderInfo', response.data)
        })
    },
    loadCart(context) {
      return axios
        .get(`${config}/api/baskets`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          if (!context.state.userAccessKsey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey)
            context.commit('updateUserAccessKey', response.data.user.accessKey)
          }
          context.commit('updateProductsData', response.data.items)
          context.commit('syncCartProducts')
        })
    },
    addProductToCart(context, { productId, amount }) {
      return new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
        return axios
          .post(
            `${config}/api/baskets/products`,
            {
              productId,
              quantity: amount,
            },
            {
              params: {
                userAccessKey: context.state.userAccessKey,
              },
            }
          )
          .then((response) => {
            context.commit('updateProductsData', response.data.items)
            context.commit('syncCartProducts')
          })
      })
    },
    updateCartProductAmount(context, { productId, amount }) {
      context.commit('updateCartProductAmount', { productId, amount })

      if (amount < 1) {
        return false
      }
      return axios
        .put(
          `${config}/api/baskets/products`,
          {
            productId,
            quantity: amount,
          },
          {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          }
        )
        .then((response) => {
          context.commit('updateProductsData', response.data.items)
        })
        .catch(() => {
          context.commit('syncCartProducts')
        })
    },
    deleteCartProduct(context, productId) {
      context.commit('deleteCartProduct', productId)
      return axios.delete(`${config}/api/baskets/products`, {
        params: { userAccessKey: context.state.userAccessKey },
        data: {
          productId,
        },
      })
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => {
        const { product } = state.cartProductsData.find((p) => p.product.id === item.productId)
        return {
          ...item,
          productInfo: {
            ...product,
            image: product.image.file.url,
          },
        }
      })
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce(
        (acc, item) => item.productInfo.price * item.amount + acc,
        0
      )
    },
  },
})
