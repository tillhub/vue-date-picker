<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-popover
      placement="bottom"
      trigger="click">
        <div class="content-card p-sm">
          <div>
            <h3>Select a date range or one of the presets below</h3>
          </div>
          <v-date-picker
            mode="range"
            v-model="selectedDate"
            is-inline
            is-double-paned
            tint-color="#357ebd"
            :pane-width="200"
            :theme-styles="themeStyles">
          </v-date-picker>
          <ShortCutButtons />
          <!-- <el-row type="flex" class="p-sm" justify="space-between">
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
          </el-row> -->
          <el-row type="flex" justify="space-between" align="middle">
            <h3>Custom</h3>
            <el-switch v-model="showCustom" active-color="#50e3c1" @change="clearCheckedBoxes">
            </el-switch>
          </el-row>
          <el-row :class="{'hide': !showCustom}">
            <el-row type="flex" class="p-xs" align="middle">
              <el-checkbox v-model="lastCheck" name="lastCheck" @change="checkedBox"></el-checkbox>
                <span class="check-lable">Last</span>
                <el-input-number 
                  size="mini" 
                  v-model="lastInput"
                  class="num-input"
                  @focus="checkLast"
                  @change="applyLast"
                  :controls=false>
                </el-input-number>
              <el-select 
                v-model="lastDropdown" 
                class="select-dropdown" 
                placeholder="select" 
                size="mini"
                @focus="checkLast"
                @change="applyLast">
                <el-option
                  v-for="item in dateUnits"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-row>
            <el-row type="flex" class="p-xs" align="middle">
             <el-checkbox v-model="sinceCheck" name="sinceCheck" @change="checkedBox"></el-checkbox>
                <el-input-number 
                  size="mini" 
                  v-model="sinceInput"
                  class="num-input"
                  @focus="checkSince"
                  :controls=false>
                </el-input-number>
              <el-select 
                v-model="sinceDropdown" 
                class="select-dropdown" 
                placeholder="years" 
                size="mini"
                @focus="checkSince"
                @change="applySince">
                <el-option
                  v-for="item in dateUnits"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span class="check-lable">since</span>
              <el-date-picker
                v-model="sinceDateTime"
                class="time-picker"
                size="mini"
                type="datetime"
                placeholder="Select date and time"
                default-time="12:00:00"
                @focus="checkSince"
                @change="applySince">
              </el-date-picker>
            </el-row>
          </el-row>
          <el-row type="flex" class="m-t-md" justify="center">
            <el-button @click="resetDefault">Reset</el-button>
            <el-button type="primary">Apply</el-button>
          </el-row>
        </div>
      <el-button slot="reference" icon="el-icon-date">All Time</el-button>
    </el-popover>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ShortCutButtons from './ShortCutButtons.vue'

export default {
  name: 'HelloWorld',
  computed: mapState([
    // map this.count to store.state.count
    'count',
    'selectedDate'
  ]),
  components: {
    ShortCutButtons
  },
  data () {
    return {
      msg: 'Tillhub Date Picker',
      activeButton: false,
      themeStyles: {
        wrapper: { 
          backgroundColor: 'white', 
          border: 'none',
          color: 'black'
        },
        verticalDivider: {
          borderLeft: 'none'
        }
      },
      // selectedDate: {
      //   start: new Date(),
      //   end: new Date()
      // },
      showCustom: true,
      lastCheck: false,
      lastInput: 5,
      lastDropdown: 'days',
      sinceCheck: false,
      sinceInput: 5,
      sinceDropdown: 'days',
      sinceDateTime: null,
      dateUnits: [{
        value: 'days',
        label: 'days'
      }, {
        value: 'weeks',
        label: 'weeks'
      }, {
        value: 'months',
        label: 'months'
      }, {
        value: 'years',
        label: 'years'
      }]
    }
  },
  methods: {
    
    /////////////
    goToToday: function (event, other) {
      // this.selectedDate.start = new Date();
      // this.selectedDate.end = new Date();
      // console.log(this.$store.state.start)
      this.$store.commit('updateStart', new Date())
      this.$store.commit('updateEnd', new Date())
      console.log(this.selectedDate)
    },
    goToYesterday: function () {
      let yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      // this.selectedDate.start = yesterday;
      // this.selectedDate.end = yesterday;
      this.$store.commit('updateStart', yesterday)
      this.$store.commit('updateEnd', yesterday)
      // this.$store.commit('updateStart', "alskdjfklasd")
    },
    goToThisWeek: function () {
      let start = new Date();
      let end = new Date();
      let days =  start.getDate() - start.getDay();
      start.setDate(days);
      end.setDate(days + 6);
      this.selectedDate.start = start;
      this.selectedDate.end = end;
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
    checkedBox: function (boolean, event) {
      if(boolean){
        if(event.target.name === "lastCheck"){
          this.applyLast();
          this.sinceCheck = false;
        }else if(event.target.name === "sinceCheck"){
          this.applySince();
          this.lastCheck = false;
        }
      }
    },
    checkLast: function () {
      this.sinceCheck = false;
      this.lastCheck = true;
    },
    checkSince: function () {
      this.sinceCheck = true;
      this.lastCheck = false;
    },
    clearCheckedBoxes: function () {
      this.sinceCheck = false;
      this.lastCheck = false;
    },
    applyLast: function () {
      if(this.lastInput && this.lastDropdown){
        if(this.lastDropdown === 'days'){
          this.setByDays(this.lastInput);
        }else if(this.lastDropdown === 'weeks') {
          this.setByWeeks(this.lastInput);
        }else if(this.lastDropdown === 'months') {
          this.setByMonths(this.lastInput);
        }else if(this.lastDropdown === 'years') {
          this.setByYears(this.lastInput);
        }
      }
    },
    applySince: function (){
      if(this.sinceInput && this.sinceDropdown && this.sinceDateTime){
        if(this.sinceDropdown === 'days'){
          this.setByDays(this.sinceInput, this.sinceDateTime);
        }else if(this.sinceDropdown === 'weeks') {
          this.setByWeeks(this.sinceInput, this.sinceDateTime);
        }else if(this.sinceDropdown === 'months') {
          this.setByMonths(this.sinceInput, this.sinceDateTime);
        }else if(this.sinceDropdown === 'years') {
          this.setByYears(this.sinceInput, this.sinceDateTime);
        }
      }
    },
    resetDefault: function () {
      this.selectedDate.start = new Date();
      this.selectedDate.end = new Date();
      this.lastCheck = false;
      this.lastInput = 5;
      this.lastDropdown = 'days';
      this.sinceCheck = false;
      this.sinceInput = 5;
      this.sinceDropdown = 'days';
      this.sinceDateTime = null;
    },
    setByDays: function (num, inputDate) {
      let start = inputDate ? new Date(inputDate) : new Date();
      let end = inputDate ? new Date(inputDate) : new Date();

      let days = num - 1;
      start.setDate(start.getDate() - days);
      this.selectedDate.start = start;
      this.selectedDate.end = end;
    },
    setByWeeks: function (num, inputDate) {
      let start = inputDate ? new Date(inputDate) : new Date();
      let end = inputDate ? new Date(inputDate) : new Date();

      let days = num * 7 - 1;
      start.setDate(start.getDate() - days);
      this.selectedDate.start = start;
      this.selectedDate.end = end;
    },
    setByMonths: function (num, inputDate) {
      let date = inputDate ? new Date(inputDate) : new Date();
      this.selectedDate.start = new Date(date.getFullYear(), date.getMonth() - num,  date.getDate());
      this.selectedDate.end = date;
    },
    setByYears: function (num, inputDate) {
      let date = inputDate ? new Date(inputDate) : new Date();
      this.selectedDate.start = new Date(date.getFullYear() - num, date.getDate());
      this.selectedDate.end = date;
    }
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
