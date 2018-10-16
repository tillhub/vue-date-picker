import Vue from 'vue'

import ElementUI from 'element-ui'
import enLocale from 'element-ui/lib/locale/lang/en'
import deLocale from 'element-ui/lib/locale/lang/de'
import ElementLocale from 'element-ui/lib/locale'

import VCalendar from 'v-calendar'

import VueI18n from 'vue-i18n'
import en from './i18n/en.json'
import de from './i18n/de.json'

import 'element-ui/lib/theme-chalk/index.css'
import 'v-calendar/lib/v-calendar.min.css'
require('typeface-lato')

import App from './App'
import store from './store'

Vue.config.productionTip = false
Vue.use(VueI18n)
Vue.use(ElementUI)
Vue.use(VCalendar)

const messages = {
  'en': {...enLocale, ...en},
  'de': { ...deLocale, ...de }
}

const i18n = new VueI18n({
  locale: 'en',
  messages,
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  store,
  components: { App },
  template: '<App/>'
})

ElementLocale.i18n((key, value) => i18n.t(key, value))
