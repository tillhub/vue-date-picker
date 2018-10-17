import { configure } from '@storybook/vue';

import Vue from 'vue';

// Import your custom components.
import Mybutton from '../stories/MyButton.vue';
import Welcome from '../stories/Welcome.vue';

// Register custom components.
Vue.component('my-button', Mybutton);
Vue.component('welcome', Welcome);



function loadStories() {
  // You can require as many stories as you need.
  require('../stories');
}

configure(loadStories, module);
