<template>
  <v-date-picker
    mode="range"
    :tint-color="tintColor"
    is-inline
    is-double-paned
    is-linked
    update-on-input
    :value="selectedDate"
    :from-page="fromPage"
    :pane-width="200"
    :theme-styles="themeStyles"
    @input="selectCalenderFromGui"
  />
</template>

<script>
import Vue from 'vue'
import VCalendar, { setupCalendar } from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'
Vue.use(VCalendar)

export default {
  name: 'DateRangePicker',
  props: {
    locale: {
      type: String,
      required: true
    },
    tintColor: {
      type: String,
      required: true
    },
    selectedDate: {
      type: Object,
      required: true
    },
    fromPage: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      themeStyles: {
        wrapper: {
          backgroundColor: 'white',
          border: 'none',
          color: 'black'
        },
        verticalDivider: {
          borderLeft: 'none'
        }
      }
    }
  },
  methods: {
    selectCalenderFromGui: function (selectedDates) {
      const start = selectedDates.start
      const end = selectedDates.end
      this.$emit('update-calendar', start, end)
      this.$emit('clear-options')
    },
    getButtonText: function () {
      if (this.hideDateInButton || !this.appliedStart) {
        return this.buttonLabel || this.$t('select')
      } else {
        return this.buttonText(this.showTime)
      }
    },
    getMessage: function () {
      if (!this.showDateText) {
        return this.$t('instructions')
      } else {
        return this.dateText(this.showTime)
      }
    }
  },
  created () {
    setupCalendar({
      locale: this.locale,
      datePickerShowDayPopover: false,
      formats: {
        title: 'MMMM YYYY',
        weekdays: 'WW',
        navMonths: 'MMM',
        input: ['L', 'YYYY-MM-DD', 'YYYY/MM/DD'],
        dayPopover: 'L',
        data: ['L', 'YYYY-MM-DD', 'YYYY/MM/DD']
      }
    })
  }
}
</script>
