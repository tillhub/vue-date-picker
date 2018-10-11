import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';
import elementLocale from 'element-ui/lib/locale/lang/en';
import VCalendar from 'v-calendar';
import 'v-calendar/lib/v-calendar.min.css';
import store from './store'

Vue.config.productionTip = false
Vue.use(ElementUI, { locale: elementLocale })

Vue.use(VCalendar, {
  locale: 'en-UK',
  // locale: 'de-DE', 
  formats: {
    title: 'MMMM YYYY',
    weekdays: 'WW',
    navMonths: 'MMM',
    input: ['L', 'YYYY-MM-DD', 'YYYY/MM/DD'],
    dayPopover: 'L',
    data: ['L', 'YYYY-MM-DD', 'YYYY/MM/DD']
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>'
})
