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
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        3 товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormTextVue
              title="ФИО"
              :error="formError.name"
              placeholder="Введите ваше ФИО"
              v-model="formData.name"
            />
            <BaseFormTextVue
              title="Адрес доставки"
              :error="formError.address"
              placeholder="Введите ваш адрес"
              v-model="formData.address"
            />
            <BaseFormTextVue
              title="Телефон"
              type="tel"
              :error="formError.phone"
              placeholder="Введите ваш телефон"
              v-model="formData.phone"
            />
            <BaseFormTextVue
              title="Email"
              type="email"
              :error="formError.email"
              placeholder="Введи ваш Email"
              v-model="formData.email"
            />
            <BaseFormTextareaVue
              v-model="formData.comments"
              :error="formError.comment"
              title="Коментарии к заказу"
              placeholder="Ваши пожелания"
            />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="delivery"
                    value="0"
                    checked=""
                  />
                  <span class="options__value"> Самовывоз <b>бесплатно</b> </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500" />
                  <span class="options__value"> Курьером <b>500 ₽</b> </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card" />
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash" />
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <order-product-item-vue
              v-for="item in cartProducts"
              :key="item.product.id"
              :product="item"
            />
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>
              Итого: <b>{{ cartProducts.length }}</b> товара на сумму <b>{{ orderTotalPrice }} ₽</b>
            </p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
    <transition name="fade">
      <preloader-vue v-if="sendState" />
    </transition>
  </main>
</template>
<script>
import Axios from 'axios'
import config from '@/config.js'
import { mapGetters } from 'vuex'
import BaseFormTextVue from '../components/BaseFormText.vue'
import BaseFormTextareaVue from '../components/BaseFormTextarea.vue'
import OrderProductItemVue from '../components/OrderProductItem.vue'
import PreloaderVue from '../components/Preloader.vue'

export default {
  name: 'OrderPage',
  components: {
    BaseFormTextVue,
    BaseFormTextareaVue,
    OrderProductItemVue,
    PreloaderVue,
  },
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
      sendState: false,
    }
  },
  computed: {
    ...mapGetters({ cartPrice: 'cartTotalPrice' }),
    cartProducts() {
      return this.$store.state.cartProductsData
    },
  },
  methods: {
    order() {
      this.formError = {}
      this.formErrorMessage = ''
      this.sendState = true
      return new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
        return Axios.post(
          `${config}/api/orders`,
          {
            ...this.formData,
          },
          {
            params: {
              userAccessKey: this.$store.state.userAccessKey,
            },
          }
        )
          .then((response) => {
            this.$store.commit('resetCart')
            this.$store.commit('updateOrderInfo', response.data)
            this.$router.push({ name: 'orderInfo', params: { id: response.data.id } })
            this.sendState = false
          })
          .catch((error) => {
            this.formError = error.response.data.error.request || {}
            this.formErrorMessage = error.response.data.error.message
          })
      })
    },
  },
}
</script>
