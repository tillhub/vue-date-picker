import { storiesOf } from '@storybook/vue'
import VueDatePicker from '../src/components/VueDatePicker'

storiesOf('VueDatePicker', module)
  .add('en locale', () => ({
    components: { VueDatePicker },
    template: '<vue-date-picker/>'
  }))
  .add('de locale', () => ({
    components: { VueDatePicker },
    template: '<vue-date-picker locale="de"/>'
  }))
