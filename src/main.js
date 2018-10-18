import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App'

Vue.config.productionTip = false
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'en',
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  components: { App },
  template: '<App/>'
})
