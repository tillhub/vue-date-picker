import { storiesOf } from '@storybook/vue'
import { i18n } from '../.storybook/i18n'

storiesOf('VueDatePicker', module)
  .add('en locale', () => ({
    template: '<vue-date-picker/>',
    i18n
  }))
  .add('de locale', () => ({
    template: '<vue-date-picker locale="de" />',
    i18n
  }))
