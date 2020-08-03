<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ cartProduct.length }} товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <li class="cart__item product" v-for="item in cartProduct" :key="item.productId">
              <div class="product__pic">
                <img :src="item.productInfo.image" width="120" height="120"
                  :alt="item.productInfo.title">
              </div>
              <h3 class="product__title">
                {{ item.productInfo.title }}
              </h3>
              <p class="product__info">
                Объем: <span>128GB</span>
              </p>
              <span class="product__code">
                Артикул: {{ item.productId }}
              </span>

              <div class="product__counter form__counter">
                <button type="button" aria-label="Убрать один товар">
                  <svg width="10" height="10" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <input type="text" v-model.number="item.amount"
                  @change="changeAmount(item.productId, $event.target.value)" name="count">

                <button type="button" aria-label="Добавить один товар">
                  <svg width="10" height="10" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>

              <b class="product__price">
                {{ item.productInfo.price|numberFormat }} ₽
              </b>

              <button class="product__del button-del" type="button"
                aria-label="Удалить товар из корзины">
                <svg width="20" height="20" fill="currentColor">
                  <use xlink:href="#icon-close"></use>
                </svg>
              </button>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ cartPrice|numberFormat }} ₽</span>
          </p>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';

export default {
  name: 'CartPage',
  filters: {
    numberFormat,
  },
  methods: {
    changeAmount(productId, amount) {
      this.$store.commit('updateCartProductAmount', {
        productId,
        amount,
      });
    },
  },
  computed: {
    cartProduct() {
      return this.$store.getters.cartDetailProducts;
    },
    cartPrice() {
      return this.$store.getters.cartTotalPrice;
    },
  },
};

</script>
