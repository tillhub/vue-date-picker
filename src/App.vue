<template>
  <VueDatePicker 
    locale="de"
    tintColor="#357ebd"
    buttonLabel="All Time"
    buttonWidth="auto"
    :hideDateInButton="false"
    :showTime="false"
    :initCustomToggle="true"
    :start="null"
    :end="null"
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
    printTheDate(selected){
      console.log("I gots the dates! ", selected)
    }
  },
}
</script>
