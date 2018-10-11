<template>
    <el-row type="flex" class="p-sm" justify="space-between">
      <el-col>
        <el-button 
          plain
          type="text"
          class="goToButton"
          @click="goToToday">Today</el-button>
        <el-button 
          plain
          type="text"
          class="goToButton"
          @click="goToYesterday">Yesterday</el-button>
      </el-col>
      <el-col>
        <el-button 
          plain
          type="text"
          class="goToButton"
          @click="goToThisWeek">This week</el-button>
        <el-button
          plain
          type="text"
          class="goToButton"
          @click="goToLastWeek">Last week</el-button>
      </el-col>
      <el-col>
        <el-button
          plain
          type="text"
          class="goToButton"
          @click="goToThisMonth">This month</el-button>
        <el-button 
          plain
          type="text"
          class="goToButton"
          @click="goToLastMonth">Last month</el-button>
      </el-col>
      <el-col>
        <el-button
          plain 
          type="text"
          class="goToButton"
          @click="goToThisYear">This year</el-button>
        <el-button
          plain 
          type="text"
          class="goToButton"
          @click="goToLastYear">Last year</el-button> 
      </el-col>
    </el-row>
</template>

<script>
export default {
  name: 'ShortCutButtons',
  data () {
    return {

      }
  },
  methods: {
    updateCalenderDates: function (start, end) {
      this.$store.commit('updateStart', start)
      this.$store.commit('updateEnd', end)
    },
    goToToday: function (event, other) {
        const today = new Date();
        this.updateCalenderDates(today, today);
    },
    goToYesterday: function () {
      let yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      this.updateCalenderDates(yesterday, yesterday);
    },
    goToThisWeek: function () {
      let start = new Date();
      let end = new Date();
      let days =  start.getDate() - start.getDay();
      start.setDate(days);
      end.setDate(days + 6);
    //   this.selectedDate.start = start;
    //   this.selectedDate.end = end;
      this.updateCalenderDates(start, end);
    },
    goToLastWeek: function () {
      let start = new Date();
      let end = new Date();
      let days =  start.getDate() - start.getDay() - 7;
      start.setDate(days);
      end.setDate(days + 6);
      this.selectedDate.start = start;
      this.selectedDate.end = end;
    },
    goToThisMonth: function (){
      var date = new Date();
      this.selectedDate.start = new Date(date.getFullYear(), date.getMonth(), 1);
      this.selectedDate.end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    },
    goToLastMonth: function (){
      var date = new Date();
      this.selectedDate.start = new Date(date.getFullYear(), date.getMonth() - 1, 1);
      this.selectedDate.end = new Date(date.getFullYear(), date.getMonth(), 0);
    },
    goToThisYear: function (){
      var date = new Date();
      this.selectedDate.start = new Date(date.getFullYear(), 1);
      this.selectedDate.end = new Date(date.getFullYear() + 1, 0);
    },
    goToLastYear: function (){
      var date = new Date();
      this.selectedDate.start = new Date(date.getFullYear() - 1, 1);
      this.selectedDate.end = new Date(date.getFullYear(), 0);
    },
    // checkedBox: function (boolean, event) {
    //   if(boolean){
    //     if(event.target.name === "lastCheck"){
    //       this.applyLast();
    //       this.sinceCheck = false;
    //     }else if(event.target.name === "sinceCheck"){
    //       this.applySince();
    //       this.lastCheck = false;
    //     }
    //   }
    // },
    // checkLast: function () {
    //   this.sinceCheck = false;
    //   this.lastCheck = true;
    // },
    // checkSince: function () {
    //   this.sinceCheck = true;
    //   this.lastCheck = false;
    // },
    // clearCheckedBoxes: function () {
    //   this.sinceCheck = false;
    //   this.lastCheck = false;
    // },
    // applyLast: function () {
    //   if(this.lastInput && this.lastDropdown){
    //     if(this.lastDropdown === 'days'){
    //       this.setByDays(this.lastInput);
    //     }else if(this.lastDropdown === 'weeks') {
    //       this.setByWeeks(this.lastInput);
    //     }else if(this.lastDropdown === 'months') {
    //       this.setByMonths(this.lastInput);
    //     }else if(this.lastDropdown === 'years') {
    //       this.setByYears(this.lastInput);
    //     }
    //   }
    // },
    // applySince: function (){
    //   if(this.sinceInput && this.sinceDropdown && this.sinceDateTime){
    //     if(this.sinceDropdown === 'days'){
    //       this.setByDays(this.sinceInput, this.sinceDateTime);
    //     }else if(this.sinceDropdown === 'weeks') {
    //       this.setByWeeks(this.sinceInput, this.sinceDateTime);
    //     }else if(this.sinceDropdown === 'months') {
    //       this.setByMonths(this.sinceInput, this.sinceDateTime);
    //     }else if(this.sinceDropdown === 'years') {
    //       this.setByYears(this.sinceInput, this.sinceDateTime);
    //     }
    //   }
    // },
    // resetDefault: function () {
    //   this.selectedDate.start = new Date();
    //   this.selectedDate.end = new Date();
    //   this.lastCheck = false;
    //   this.lastInput = 5;
    //   this.lastDropdown = 'days';
    //   this.sinceCheck = false;
    //   this.sinceInput = 5;
    //   this.sinceDropdown = 'days';
    //   this.sinceDateTime = null;
    // },
    // setByDays: function (num, inputDate) {
    //   let start = inputDate ? new Date(inputDate) : new Date();
    //   let end = inputDate ? new Date(inputDate) : new Date();

    //   let days = num - 1;
    //   start.setDate(start.getDate() - days);
    //   this.selectedDate.start = start;
    //   this.selectedDate.end = end;
    // },
    // setByWeeks: function (num, inputDate) {
    //   let start = inputDate ? new Date(inputDate) : new Date();
    //   let end = inputDate ? new Date(inputDate) : new Date();

    //   let days = num * 7 - 1;
    //   start.setDate(start.getDate() - days);
    //   this.selectedDate.start = start;
    //   this.selectedDate.end = end;
    // },
    // setByMonths: function (num, inputDate) {
    //   let date = inputDate ? new Date(inputDate) : new Date();
    //   this.selectedDate.start = new Date(date.getFullYear(), date.getMonth() - num,  date.getDate());
    //   this.selectedDate.end = date;
    // },
    // setByYears: function (num, inputDate) {
    //   let date = inputDate ? new Date(inputDate) : new Date();
    //   this.selectedDate.start = new Date(date.getFullYear() - num, date.getDate());
    //   this.selectedDate.end = date;
    // }
  }
}
</script>

<style scoped>
.hide {
  display: none;
}

.goToButton {
  padding: 5px;
  display: block;
  margin-left: 0px;
  color: #a7abb0;
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

.check-lable {
  margin: 0px 5px;
  font-size: 15px;
  vertical-align: middle;
}

.num-input {
  max-width: 50px;
  margin: 0px 5px;
}

.select-dropdown {
  max-width: 100px;
  margin: 0px 5px;
}

.time-picker {
  max-width: 200px;
  margin: 0px 5px;
}
</style>
