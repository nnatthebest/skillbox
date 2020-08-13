<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="item.productInfo.image" width="120" height="120" :alt="item.productInfo.title" />
    </div>
    <router-link :to="{ name: 'product', params: { id: item.productInfo.id } }">
      <h3 class="product__title">
        {{ item.productInfo.title }}
      </h3>
    </router-link>
    <p class="product__info">Объем: <span>128GB</span></p>
    <span class="product__code"> Артикул: {{ item.productId }} </span>

    <div class="product__counter form__counter">
      <button type="button" aria-label="Убрать один товар">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>

      <input
        type="text"
        v-model.number="amount"
        @change="changeAmount(item.productId, $event.target.value)"
        name="count"
      />

      <button type="button" aria-label="Добавить один товар">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>

    <b class="product__price"> {{ (item.productInfo.price * item.amount) | numberFormat }} ₽ </b>

    <button
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
      @click.prevent="deleteProduct(item.productId)"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>
<script>
import numberFormat from '@/helpers/numberFormat'

export default {
  props: ['item'],
  name: 'CartItem',
  filters: {
    numberFormat,
  },
  computed: {
    amount: {
      get() {
        return this.item.amount
      },
      set(value) {
        this.$store.dispatch('updateCartProductAmount', {
          productId: this.item.productId,
          amount: value,
        })
      },
    },
  },
  methods: {
    deleteProduct(productId) {
      this.$store.dispatch('deleteCartProduct', productId)
    },
  },
}
</script>
