import Vue from 'vue';
import VueDatePicker from '../src/components/VueDatePicker.vue';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

Vue.component('vue-date-picker', VueDatePicker)