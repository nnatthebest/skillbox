<template>
  <main class="content container">
    <div v-if="productLoading">Загрузка товара</div>
    <div v-else-if="!productData">Не удалось загрузить товар товар</div>
    <div v-else>
      <div class="content__top">
        <ul class="breadcrumbs">
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
              Каталог
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
              {{ category.title }}
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link">
              {{ product.title }}
            </a>
          </li>
        </ul>
      </div>

      <section class="item">
        <div class="item__pics pics">
          <div class="pics__wrapper">
            <img width="570" height="570" :src="product.image" :alt="product.title" />
          </div>
        </div>

        <div class="item__info">
          <span class="item__code">Артикул: {{ product.id }}</span>
          <h2 class="item__title">
            {{ product.title }}
          </h2>
          <div class="item__form">
            <form class="form" action="#" method="POST" @submit.prevent="addToCart">
              <b class="item__price"> {{ product.price | numberFormat }} ₽ </b>

              <fieldset class="form__block">
                <legend class="form__legend">Цвет:</legend>
                <ul class="colors">
                  <ProductColor
                    v-for="(item, index) in colors"
                    :key="index"
                    :color="item"
                    :currentColor.sync="productColor"
                  />
                </ul>
              </fieldset>

              <fieldset class="form__block">
                <legend class="form__legend">Объемб в ГБ:</legend>

                <ul class="sizes sizes--primery">
                  <li class="sizes__item">
                    <label class="sizes__label">
                      <input
                        class="sizes__radio sr-only"
                        type="radio"
                        name="sizes-item"
                        value="32"
                      />
                      <span class="sizes__value">
                        32gb
                      </span>
                    </label>
                  </li>
                  <li class="sizes__item">
                    <label class="sizes__label">
                      <input
                        class="sizes__radio sr-only"
                        type="radio"
                        name="sizes-item"
                        value="64"
                      />
                      <span class="sizes__value">
                        64gb
                      </span>
                    </label>
                  </li>
                  <li class="sizes__item">
                    <label class="sizes__label">
                      <input
                        class="sizes__radio sr-only"
                        type="radio"
                        name="sizes-item"
                        value="128"
                        checked=""
                      />
                      <span class="sizes__value">
                        128gb
                      </span>
                    </label>
                  </li>
                </ul>
              </fieldset>

              <div class="item__row">
                <div class="form__counter">
                  <button
                    type="button"
                    aria-label="Убрать один товар"
                    :disabled="productAmount <= 1"
                    @click="minusAmount"
                  >
                    <svg width="12" height="12" fill="currentColor">
                      <use xlink:href="#icon-minus"></use>
                    </svg>
                  </button>

                  <input type="text" v-model.number="productAmount" name="count" />

                  <button type="button" aria-label="Добавить один товар" @click="addAmount">
                    <svg width="12" height="12" fill="currentColor">
                      <use xlink:href="#icon-plus"></use>
                    </svg>
                  </button>
                </div>

                <button class="button button--primery" type="submit" :disabled="productAddSending">
                  В корзину
                </button>
                <div v-show="productAdded">Товар добавлен в корзину</div>
                <div v-show="productAddSending">Добавляем в корзину</div>
              </div>
            </form>
          </div>
        </div>

        <div class="item__desc">
          <ul class="tabs">
            <li class="tabs__item">
              <a class="tabs__link tabs__link--current">
                Описание
              </a>
            </li>
            <li class="tabs__item">
              <a class="tabs__link" href="#">
                Характеристики
              </a>
            </li>
            <li class="tabs__item">
              <a class="tabs__link" href="#">
                Гарантия
              </a>
            </li>
            <li class="tabs__item">
              <a class="tabs__link" href="#">
                Оплата и доставка
              </a>
            </li>
          </ul>

          <div class="item__content">
            <p>
              Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br />
              Синхронизация со смартфоном<br />
              Связь по Bluetooth Smart, ANT+ и Wi-Fi<br />
              Поддержка сторонних приложений<br />
            </p>

            <a href="#">
              Все характеристики
            </a>

            <h3>Что это?</h3>

            <p>
              Wahoo ELEMNT BOLT GPS – это велокомпьютер, который позволяет оптимизировать свои
              велотренировки, сделав их максимально эффективными. Wahoo ELEMNT BOLT GPS
              синхронизируется с датчиками по ANT+, объединяя полученную с них информацию. Данные
              отображаются на дисплее, а также сохраняются на смартфоне. При этом на мобильное
              устройство можно установить как фирменное приложение, так и различные приложения
              сторонних разработчиков. Велокомпьютер точно отслеживает местоположение, принимая
              сигнал с целого комплекса спутников. Эта информация позволяет смотреть уже
              преодоленные маршруты и планировать новые велопрогулки.
            </p>

            <h3>Дизайн</h3>

            <p>
              Велокомпьютер Wahoo ELEMNT BOLT очень компактный. Размеры устройства составляют всего
              74,6 x 47,3 x 22,1 мм. что не превышает габариты смартфона. Корпус гаджета выполнен из
              черного пластика. На обращенной к пользователю стороне расположен дисплей диагональю
              56 мм. На дисплей выводятся координаты и скорость, а также полученная со смартфона и
              синхронизированных датчиков информация: интенсивность, скорость вращения педалей,
              пульс и т.д. (датчики не входят в комплект поставки). Корпус велокомпьютера имеет
              степень защиты от влаги IPX7. Это означает, что устройство не боится пыли, а также
              выдерживает кратковременное (до 30 минут) погружение в воду на глубину не более 1
              метра.
            </p>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
import config from '@/config'
import goToPage from '@/helpers/goToPage'
import numberFormat from '@/helpers/numberFormat'
import ProductColor from '@/components/ProductColor.vue'

export default {
  name: 'ProductPage',
  components: {
    ProductColor,
  },
  data() {
    return {
      productAmount: 1,
      productData: null,
      productLoading: false,
      productLoadingError: false,
      productAdded: false,
      productAddSending: false,
      productColor: null,
    }
  },
  filters: {
    numberFormat,
  },
  computed: {
    product() {
      const image = this.productData.image.file.url
      const product = this.productData
      product.image = image
      return product
    },
    category() {
      return this.productData.category
    },
    colors() {
      return this.productData.colors
    },
  },
  methods: {
    ...mapActions(['addProductToCart']),
    goToPage,
    addToCart() {
      this.productAdded = false
      this.productAddSending = true
      this.addProductToCart({
        productId: this.product.id,
        amount: this.productAmount,
      }).then(() => {
        this.productAdded = true
        this.productAddSending = false
      })
    },
    addAmount() {
      this.productAmount += 1
    },
    minusAmount() {
      this.productAmount -= 1
    },
    loadProduct() {
      this.productLoading = true
      this.productLoadingError = false
      axios
        .get(`${config}/api/products/${this.$route.params.id}`)
        .then((response) => {
          this.productData = response.data
          this.productColor = this.productData.colors.find((element, index) => index === 0)
        })
        .catch(() => {
          this.productLoadingError = true
        })
        .then(() => {
          this.productLoading = false
        })
    },
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.loadProduct()
      },
      immediate: true,
    },
  },
}
</script>
