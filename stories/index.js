import { storiesOf } from '@storybook/vue';
import MyButton from './MyButton.vue';
import Welcome from './Welcome.vue';
import VueDatePicker from '../src/components/VueDatePicker.vue';
import VueI18n from 'vue-i18n'

storiesOf('Button', module)
  .add('story as a component', () => ({
    components: { MyButton },
    template: '<my-button :rounded="true">rounded</my-button>'
  }));

storiesOf('Welcome', module).add('to Storybook', () => ({
  components: { Welcome },
  template: '<welcome :showApp="action" />'
}));

storiesOf('VueDatePicker', module)
  .add('basic', () => ({
    components: { VueDatePicker },
    template: '<vue-date-picker/>',
    i18n: new VueI18n({
      locale: 'de',
    })
  }))