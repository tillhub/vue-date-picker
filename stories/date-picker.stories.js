import { storiesOf } from '@storybook/vue'

storiesOf('VueDatePicker', module)
  .add('en locale', () => ({
    template: '<vue-date-picker/>'
  }))
  .add('de locale', () => ({
    template: '<vue-date-picker locale="de" />'
  }))
  .add('default short cut', () => ({
    template: '<vue-date-picker default-short-cut="thisWeek" />'
  }))
  .add('date range', () => ({
    template: '<vue-date-picker :date-range="dateRange" />',
    data () {
      return {
        dateRange: { start: '2019-12-31T23:00:00.000Z', end: '2020-12-31T22:59:59.999Z', showDateText: true }
      }
    }
  }))
  .add('default short cut + date range', () => ({
    template: '<vue-date-picker default-short-cut="thisWeek" :date-range="dateRange" />',
    data () {
      return {
        dateRange: { start: '2019-12-31T23:00:00.000Z', end: '2020-12-31T22:59:59.999Z', showDateText: true }
      }
    }
  }))
