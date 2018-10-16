<template>
    <el-row type="flex" class="p-sm" justify="space-between">
      <div>
        <el-button 
          plain
          type="text"
          class="goToButton"
          :class="{ active: selectedButton === 'today' }"
          @click="goToToday">{{ $t("today") }}</el-button>
        <el-button 
          plain
          type="text"
          class="goToButton"
          :class="{ active: selectedButton === 'yesterday' }"
          @click="goToYesterday">{{ $t("yesterday") }}</el-button>
      </div>
      <div>
        <el-button 
          plain
          type="text"
          class="goToButton"
          :class="{ active: selectedButton === 'thisWeek' }"
          @click="goToThisWeek">{{ $t("thisWeek") }}</el-button>
        <el-button
          plain
          type="text"
          class="goToButton"
          :class="{ active: selectedButton === 'lastWeek' }"
          @click="goToLastWeek">{{ $t("lastWeek") }}</el-button>
      </div>
      <div>
        <el-button
          plain
          type="text"
          class="goToButton"
          :class="{ active: selectedButton === 'thisMonth' }"
          @click="goToThisMonth">{{ $t("thisMonth") }}</el-button>
        <el-button 
          plain
          type="text"
          class="goToButton"
          :class="{ active: selectedButton === 'lastMonth' }"
          @click="goToLastMonth">{{ $t("lastMonth") }}</el-button>
      </div>
      <div>
        <el-button
          plain 
          type="text"
          class="goToButton"
          :class="{ active: selectedButton === 'thisYear' }"
          @click="goToThisYear">{{ $t("thisYear") }}</el-button>
        <el-button
          plain 
          type="text"
          class="goToButton"
           :class="{ active: selectedButton === 'lastYear' }"
          @click="goToLastYear">{{ $t("lastYear") }}</el-button> 
      </div>
    </el-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ShortCutButtons',
  computed: mapState([
    'selectedButton',
    'locale'
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
