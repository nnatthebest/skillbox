<template>

<main class="content container">
  <div class="content__top content__top--catalog">
    <h1 class="content__title">
      Каталог
    </h1>
    <span class="content__info">
      152 товара
    </span>
  </div>

  <div class="content__catalog">
    <ProductFilter :categoryId.sync="filterCategoryId" :priceFrom.sync="filterPriceFrom"
      :priceTo.sync="filterPriceTo" />
    <section class="catalog">
      <ProductList :products="products" />

      <BaseProducts v-model="page" :count="countProducts" :per-page="productPerPage" />
    </section>
  </div>
</main>

</template>

<script>
import products from './data/products';
import ProductList from './components/ProductList.vue';
import BaseProducts from './components/BasePagination.vue';
import ProductFilter from './components/ProductFilter.vue';

export default {
  name: 'App',
  components: {
    ProductList,
    BaseProducts,
    ProductFilter,
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      productPerPage: 3,
      page: 1,
    };
  },
  computed: {
    filteredProducts() {
      let filteredProducts = products;
      if (this.filterPriceFrom > 0) {
        filteredProducts = filteredProducts.filter((product) => product.price > this
          .filterPriceFrom);
      }
      if (this.filterPriceTo > 0) {
        filteredProducts = filteredProducts.filter((product) => product.price < this
          .filterPriceTo);
      }
      if (this.filterCategoryId > 0) {
        filteredProducts = filteredProducts.filter((product) => product.categoryId === this
          .filterCategoryId);
      }
      return filteredProducts;
    },
    products() {
      const offset = (this.page - 1) * this.productPerPage;
      return this.filteredProducts.slice(offset, offset + this.productPerPage);
    },
    countProducts() {
      return this.filteredProducts.length;
    },
  },
};

</script>

<style lang="sass">
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  margin-top: 60px
</style>
