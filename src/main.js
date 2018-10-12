import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VCalendar from 'v-calendar';
import 'v-calendar/lib/v-calendar.min.css';
import App from './App';
import elementLocale from 'element-ui/lib/locale/lang/en';
import store from './store'



Vue.config.productionTip = false
Vue.use(ElementUI, { locale: elementLocale })
Vue.use(VCalendar)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>'
})
