<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{ name: 'product', params: {id: product.id}}">
      <img :src="product.img" :alt="product.title">
    </router-link>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{ product.price|numberFormat }} ₽
    </span>
    <ul class="colors colors--black">
      <li class="colors__item">
          <label for="" class="colors__label">
              <input type="radio" class="colors__radio sr-only" v-model="color">
              <span class="colors__value"></span>
            </label>
        </li>
    </ul>
  </li>
</template>

<script>
import goToPage from '@/helpers/goToPage';
import numberFormat from '@/helpers/numberFormat';

export default {
  name: 'ProductItem',
  props: ['product'],
  data() {
    return {
      color: '#73b6ea',
    };
  },
  filters: {
    numberFormat,
  },
  methods: {
    goToPage,
  },
};

</script>
