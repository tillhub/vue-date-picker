import { configure } from '@storybook/vue';
import Vue from 'vue';

import Welcome from '../stories/Welcome.vue';
import VueDatePicker from '../src/components/VueDatePicker.vue';

Vue.component('welcome', Welcome);
Vue.component('vue-date-picker', VueDatePicker);

function loadStories() {
  require('../stories');
}

configure(loadStories, module);
