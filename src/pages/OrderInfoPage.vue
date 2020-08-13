<template>
  <main class="content container">
    <div v-if="!orderInfo">
      Информация о заказе не найдена
      <router-link :to="{ name: 'main' }">
        Вернуться на главную
      </router-link>
    </div>
    <div v-else>
      <div class="content__top">
        <ul class="breadcrumbs">
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
              Каталог
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link">
              Информация о заказе
            </a>
          </li>
        </ul>

        <h1 class="content__title">Заказ оформлен <span>№ 23621</span></h1>
      </div>

      <section class="cart">
        <form class="cart__form form" action="#" method="POST">
          <div class="cart__field">
            <p class="cart__message">
              Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо
              с&nbsp;деталями заказа. Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для
              уточнения деталей доставки.
            </p>

            <ul class="dictionary">
              <li class="dictionary__item">
                <span class="dictionary__key">
                  Получатель
                </span>
                <span class="dictionary__value">
                  {{ orderInfo.name }}
                </span>
              </li>
              <li class="dictionary__item">
                <span class="dictionary__key">
                  Адрес доставки
                </span>
                <span class="dictionary__value">
                  {{ orderInfo.address }}
                </span>
              </li>
              <li class="dictionary__item">
                <span class="dictionary__key">
                  Телефон
                </span>
                <span class="dictionary__value">
                  {{ orderInfo.phone }}
                </span>
              </li>
              <li class="dictionary__item">
                <span class="dictionary__key">
                  Email
                </span>
                <span class="dictionary__value">
                  {{ orderInfo.email }}
                </span>
              </li>
              <li class="dictionary__item">
                <span class="dictionary__key">
                  Способ оплаты
                </span>
                <span class="dictionary__value">
                  картой при получении
                </span>
              </li>
            </ul>
          </div>

          <div class="cart__block">
            <ul class="cart__orders">
              <order-product-item-vue
                v-for="item in orderInfo.basket.items"
                :key="item.id"
                :product="item"
              />
            </ul>

            <div class="cart__total">
              <p>Доставка: <b>500 ₽</b></p>
              <p>
                Итого: <b>{{ orderInfo.basket.items.length }}</b> товара на сумму
                <b>{{ orderInfo.totalPrice }}</b>
              </p>
            </div>
          </div>
        </form>
      </section>
    </div>
  </main>
</template>
<script>
import OrderProductItemVue from '../components/OrderProductItem.vue'

export default {
  name: 'OrderInfoPage',
  components: {
    OrderProductItemVue,
  },
  computed: {
    orderInfo() {
      return this.$store.state.orderInfo
    },
  },
  created() {
    if (this.$store.state.orderInfo && this.$store.state.orderInfo.id === this.$route.params.id)
      return
    this.$store.dispatch('loadOrderInfo', this.$route.params.id)
  },
}
</script>
