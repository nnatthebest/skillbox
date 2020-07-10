import Vue from 'vue';
import Vuex from 'vuex';
import products from '@/data/products';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
  },
  mutations: {
    addProductToCart(state, { productId, amount, productInfo }) {
      state.cartProducts.push({
        productId,
        amount,
        productInfo,
      });
    },
  },
  actions: {
    addProductItem({ commit, state }, { productId, amount }) {
      const item = state.cartProducts.find((product) => product.productId === productId);
      if (item) {
        item.amount += amount;
      } else {
        const productInfo = products.find((element) => element.id === productId);
        commit('addProductToCart', { productId, amount, productInfo });
      }
    },
  },
  getters: {
    countPrice(state) {
      let currentPrice = 0;
      state.cartProducts.forEach((element) => {
        currentPrice += (element.amount * element.productInfo.price);
      });
      return currentPrice;
    },
  },
});
