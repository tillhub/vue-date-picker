<template>
  <vue-date-picker
    locale="en"
    tint-color="#357ebd"
    button-label="All Time"
    button-width="auto"
    :hide-date-in-button="false"
    :show-time="false"
    :init-custom-toggle="true"
    @get-dates="printTheDate"/>
</template>

<script>

import VueDatePicker from './components/VueDatePicker.vue'

export default {
  name: 'App',
  components: {
    VueDatePicker
  },
  methods: {
    printTheDate (dates) {
      console.log('I gots the dates! ', dates.start, ' to ', dates.end)
    }
  }
}
</script>
