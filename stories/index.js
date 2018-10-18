import { storiesOf } from '@storybook/vue';
import Welcome from './Welcome.vue';
import VueDatePicker from '../src/components/VueDatePicker.vue';

storiesOf('Welcome', module).add('to Storybook', () => ({
  components: { Welcome },
  template: '<welcome :showApp="action" />'
}));

storiesOf('VueDatePicker', module)
  .add('en locale', () => ({
    components: { VueDatePicker },
    template: '<vue-date-picker/>'
  }))
  .add('de locale', () => ({
    components: { VueDatePicker },
    template: '<vue-date-picker locale="de"/>'
  }))