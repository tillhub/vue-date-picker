<template>
  <div id="app">
    <DatePicker/>
  </div>
</template>

<script>
import DatePicker from './components/DatePicker'

export default {
  name: 'App',
  components: {
    DatePicker
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

input,
select,
textarea,
button,
h3,
span {
  font-family: "Avenir";
}

.el-button--primary {
  background-color: #259ff6;
  border-color: #259ff6;
}

.el-button--default {
  color: #259ff6;
}

.p-sm {
  padding: 10px;
}

.p-xs {
  padding: 5px;
}

.m-t-md {
  margin-top: 15px;
}
</style>
