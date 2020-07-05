<template>
  <div>
    <headerComp />
    <router-view />
    <footerComp />
  </div>
</template>

<script>
import headerComp from './components/header.vue';
import footerComp from './components/footer.vue';

export default {
  name: 'App',
  components: {
    headerComp,
    footerComp,
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
