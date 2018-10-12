<template>
    <el-row type="flex" class="p-sm" justify="space-between">
      <el-col>
        <el-button 
          plain
          type="text"
          name="today"
          class="goToButton"
          :class="{ active: selectedButton === 'today' }"
          @click="goToToday">Today</el-button>
        <el-button 
          plain
          type="text"
          class="goToButton"
          :class="{ active: selectedButton === 'yesterday' }"
          @click="goToYesterday">Yesterday</el-button>
      </el-col>
      <el-col>
        <el-button 
          plain
          type="text"
          class="goToButton"
          :class="{ active: selectedButton === 'thisWeek' }"
          @click="goToThisWeek">This week</el-button>
        <el-button
          plain
          type="text"
          class="goToButton"
          :class="{ active: selectedButton === 'lastWeek' }"
          @click="goToLastWeek">Last week</el-button>
      </el-col>
      <el-col>
        <el-button
          plain
          type="text"
          class="goToButton"
          :class="{ active: selectedButton === 'thisMonth' }"
          @click="goToThisMonth">This month</el-button>
        <el-button 
          plain
          type="text"
          class="goToButton"
          :class="{ active: selectedButton === 'lastMonth' }"
          @click="goToLastMonth">Last month</el-button>
      </el-col>
      <el-col>
        <el-button
          plain 
          type="text"
          class="goToButton"
          :class="{ active: selectedButton === 'thisYear' }"
          @click="goToThisYear">This year</el-button>
        <el-button
          plain 
          type="text"
          class="goToButton"
           :class="{ active: selectedButton === 'lastYear' }"
          @click="goToLastYear">Last year</el-button> 
      </el-col>
    </el-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ShortCutButtons',
  computed: mapState([
    'selectedButton'
  ]),
  methods: {
    updateCalenderDates: function (start, end) {
      this.$store.commit('updateStart', start)
      this.$store.commit('updateEnd', end)
      this.clearCheckBoxes()
    },
    clearCheckBoxes: function () {
      this.$store.commit('clearCheckBoxes')
    },
    updateSelectedButton: function(name){
        this.$store.commit('updateSelectedButton', name)
    },
    goToToday: function (event, other) {
        const today = new Date()
        this.updateSelectedButton('today')
        this.updateCalenderDates(today, today)
    },
    goToYesterday: function () {
      let yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      this.updateSelectedButton('yesterday')
      this.updateCalenderDates(yesterday, yesterday)
    },
    goToThisWeek: function () {
      let start = new Date()
      let end = new Date()
      let days =  start.getDate() - start.getDay()
      start.setDate(days)
      end.setDate(days + 6)
      this.updateSelectedButton('thisWeek')
      this.updateCalenderDates(start, end)
    },
    goToLastWeek: function () {
      let start = new Date()
      let end = new Date()
      let days =  start.getDate() - start.getDay() - 7
      start.setDate(days)
      end.setDate(days + 6)
      this.updateSelectedButton('lastWeek')
      this.updateCalenderDates(start, end)
    },
    goToThisMonth: function (){
      var date = new Date()
      const start = new Date(date.getFullYear(), date.getMonth(), 1)
      const end = new Date(date.getFullYear(), date.getMonth() + 1, 0)
      this.updateSelectedButton('thisMonth')
      this.updateCalenderDates(start, end)
    },
    goToLastMonth: function (){
      var date = new Date()
      const start = new Date(date.getFullYear(), date.getMonth() - 1, 1)
      const end = new Date(date.getFullYear(), date.getMonth(), 0)
      this.updateSelectedButton('lastMonth')
      this.updateCalenderDates(start, end)
    },
    goToThisYear: function (){
      var date = new Date()
      const start = new Date(date.getFullYear(), 0, 1)
      const end = new Date(date.getFullYear() + 1, 0, 0)
      this.updateSelectedButton('thisYear')
      this.updateCalenderDates(start, end)
    },
    goToLastYear: function (){
      var date = new Date()
      const start = new Date(date.getFullYear() - 1, 0, 1)
      const end = new Date(date.getFullYear(), 0, 0)
      this.updateSelectedButton('lastYear')
      this.updateCalenderDates(start, end)
    }
  }
}
</script>

<style scoped>
.goToButton {
  padding: 5px;
  display: block;
  margin-left: 0px;
  color: #a7abb0;
}

.active {
  color: #259ff6;
}
</style>
