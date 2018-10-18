<template>
  <VueDatePicker 
    locale="de"
    tintColor="#357ebd"
    buttonLabel="All Time"
    buttonWidth="auto"
    :hideDateInButton="false"
    :showTime="false"
    :initCustomToggle="true"
    @getDates="printTheDate"/>
</template>

<script>

import  VueDatePicker  from './components/VueDatePicker.vue';

export default {
  name: 'App',
  components: {
    VueDatePicker
  },
  methods: {
    printTheDate(dates){
      console.log("I gots the dates! ", dates.start, " to ", dates.end)
    }
  },
}
</script>
