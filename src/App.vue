<template>
  <div class="container">
    <component :is="currentPageComponent" :page-params="currentPageParams" />
  </div>
</template>

<script>
import MainPage from './pages/MainPage.vue';
import ProductPage from './pages/ProductPage.vue';
import NotFound from './pages/NotFoundPage.vue';
import eventBus from './eventBus';

const routes = {
  main: 'MainPage',
  product: 'ProductPage',
};

export default {
  name: 'App',
  components: {
    MainPage,
    ProductPage,
    NotFound,
  },
  data() {
    return {
      currentPage: 'main',
      currentPageParams: {},
    };
  },
  methods: {
    goToPage(pageName, pageParams) {
      this.currentPage = pageName;
      this.currentPageParams = pageParams;
    },
  },
  computed: {
    currentPageComponent() {
      return routes[this.currentPage] || 'NotFoundPage';
    },
  },
  created() {
    eventBus.$on('goToPage', (pageName, pageParams) => this.goToPage(pageName, pageParams));
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
