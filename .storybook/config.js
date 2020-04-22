import Vue from 'vue';
import VueDatePicker from '../src/components/VueDatePicker.vue';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { i18n } from './i18n.js'

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

Vue.component('vue-date-picker', VueDatePicker)