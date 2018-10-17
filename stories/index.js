import { storiesOf } from '@storybook/vue';
import MyButton from './MyButton.vue';
import Welcome from './Welcome.vue';

storiesOf('Button', module)
  .add('story as a component', () => ({
    components: { MyButton },
    template: '<my-button :rounded="true">rounded</my-button>'
  }));

storiesOf('Welcome', module).add('to Storybook', () => ({
  components: { Welcome },
  template: '<welcome :showApp="action" />'
}));
