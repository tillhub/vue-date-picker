import { storiesOf } from '@storybook/vue'

storiesOf('VueDatePicker', module)
  .add('en locale', () => ({
    template: '<vue-date-picker/>'
  }))
  .add('de locale', () => ({
    template: '<vue-date-picker locale="de" />'
  }))
