import Vue from 'vue'
import MaskedInput from 'vue-masked-input'
import App from './App.vue'
import '@babel/polyfill'
import router from './router'
import store from './store'

Vue.config.productionTip = false
new Vue({
  router,
  store,
  MaskedInput,
  render: (h) => h(App),
}).$mount('#app')
