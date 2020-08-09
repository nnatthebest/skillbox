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
      <ProductFilter
        :categoryId.sync="filterCategoryId"
        :priceFrom.sync="filterPriceFrom"
        :priceTo.sync="filterPriceTo"
      />
      <section class="catalog">
        <div v-if="productsLoading" class="loader">Загрузка товаров...</div>
        <div v-if="productsLoadingFailed">
          Произошла ошибка при загрузке товаров
          <button @click.prevent="loadProducts">Попробовать еще раз</button>
        </div>
        <ProductList :products="products" />

        <BaseProducts v-model="page" :count="countProducts" :per-page="productPerPage" />
      </section>
    </div>
  </main>
</template>

<script>
import config from '@/config'
import ProductList from '@/components/ProductList.vue'
import BaseProducts from '@/components/BasePagination.vue'
import ProductFilter from '@/components/ProductFilter.vue'
import axios from 'axios'

export default {
  name: 'MainPage',
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
      productsData: null,
      productsLoading: false,
      productsLoadingFailed: false,
    }
  },
  computed: {
    products() {
      return this.productsData
        ? this.productsData.items.map((product) => ({
            ...product,
            img: product.image.file.url,
          }))
        : []
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0
    },
  },
  methods: {
    loadProducts() {
      this.productsLoading = true
      this.productsLoadingFailed = false
      clearTimeout(this.loadProductsTimer)
      this.loadProductsTimer = setTimeout(() => {
        axios
          .get(`${config}/api/products`, {
            params: {
              page: this.page,
              limit: this.productPerPage,
              categoryId: this.filterCategoryId,
              minPrice: this.filterPriceFrom,
              maxPrice: this.filterPriceTo,
            },
          })
          .then((response) => {
            this.productsData = response.data
          })
          .catch(() => {
            this.productsLoadingFailed = true
          })
          .then(() => {
            this.productsLoading = false
          })
      }, 0)
    },
  },
  watch: {
    page() {
      this.loadProducts()
    },
    filterPriceFrom() {
      this.loadProducts()
    },
    filterPriceTo() {
      this.loadProducts()
    },
    filterCategoryId() {
      this.loadProducts()
    },
  },
  created() {
    this.loadProducts()
  },
}
</script>
