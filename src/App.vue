<template>
  <div>
    <headerComp />
    <router-view />
    <footerComp />
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import headerComp from '@/components/headerComp.vue';
import footerComp from '@/components/footerComp.vue';

export default {
  name: 'App',
  components: {
    headerComp,
    footerComp,
  },
  methods: {
    ...mapActions(['loadCart']),
    ...mapMutations(['updateUserAccessKey']),
  },
  created() {
    const userAccessKey = localStorage.getItem('userAccessKey');
    if (userAccessKey) {
      this.updateUserAccessKey(userAccessKey);
    }
    this.loadCart();
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
