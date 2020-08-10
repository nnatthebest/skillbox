<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{ name: 'product', params: { id: product.id } }">
      <img :src="product.img" :alt="product.title" />
    </router-link>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price"> {{ product.price | numberFormat }} ₽ </span>
    <ul class="colors colors--black">
      <ProductColorVue v-for="item in product.colors" :key="item.id" :color="item" />
    </ul>
  </li>
</template>

<script>
import goToPage from '@/helpers/goToPage'
import numberFormat from '@/helpers/numberFormat'
import ProductColorVue from './ProductColor.vue'

export default {
  name: 'ProductItem',
  components: {
    ProductColorVue,
  },
  props: ['product'],
  data() {
    return {
      color: '#73b6ea',
    }
  },
  filters: {
    numberFormat,
  },
  methods: {
    goToPage,
  },
}
</script>
