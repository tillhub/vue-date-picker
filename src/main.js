import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import deLocale from 'element-ui/lib/locale/lang/de'
import 'element-ui/lib/theme-chalk/index.css'

import en from './i18n/en.json'
import de from './i18n/de.json'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'en',
  messages: {
    en: { ...enLocale, ...en },
    de: { ...deLocale, ...de }
  }
})

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false

new Vue({
  i18n,
  render: h => h(App)
}).$mount('#app')
