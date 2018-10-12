<template>
  <el-row>
    <el-row type="flex" justify="space-between" align="middle">
      <h3>Custom</h3>
      <el-switch v-model="showCustom" active-color="#50e3c1">
      </el-switch>
    </el-row>
    <el-row :class="{'hide': !showCustom}">
      <el-row type="flex" class="p-xs" align="middle">
        <el-checkbox :value="lastCheck" name="lastCheck" @change="checkedBox"></el-checkbox>
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
       <el-checkbox :value="sinceCheck" name="sinceCheck" @change="checkedBox"></el-checkbox>
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
  </el-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CustomComponent',
  computed: mapState([
      'lastCheck',
      'sinceCheck'
  ]),
  data () {
    return {
      showCustom: true,
      lastInput: 5,
      lastDropdown: 'days',
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
    updateCalenderDates: function (start, end) {
      this.$store.commit('updateStart', start)
      this.$store.commit('updateEnd', end)
    },
    updateLastCheck(boolean) {
        this.$store.commit('updateLastCheck', boolean)
    },
    updateSinceCheck(boolean){
        this.$store.commit('updateSinceCheck', boolean)
    },
    clearCheckBoxes: function () {
      this.$store.commit('clearCheckBoxes')
    },
    checkedBox: function (boolean, event) {
      if(boolean){
        if(event.target.name === "lastCheck"){
            this.checkLast();
          this.applyLast();
        }else if(event.target.name === "sinceCheck"){
            this.checkSince();
          this.applySince();
        }
      }
    },
    checkLast: function () {
      this.updateSinceCheck(false)
      this.updateLastCheck(true)
    },
    checkSince: function () {
      this.updateSinceCheck(true)
      this.updateLastCheck(false)
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
      this.$store.commit('resetCalendar')
      this.lastInput = 5;
      this.lastDropdown = 'days';
      this.sinceInput = 5;
      this.sinceDropdown = 'days';
      this.sinceDateTime = null;
    },
    setByDays: function (num, inputDate) {
      let start = inputDate ? new Date(inputDate) : new Date();
      let end = inputDate ? new Date(inputDate) : new Date();

      let days = num - 1;
      start.setDate(start.getDate() - days);
        this.updateCalenderDates(start, end);
    },
    setByWeeks: function (num, inputDate) {
      let start = inputDate ? new Date(inputDate) : new Date();
      let end = inputDate ? new Date(inputDate) : new Date();

      let days = num * 7 - 1;
      start.setDate(start.getDate() - days);
      this.updateCalenderDates(start, end);
    },
    setByMonths: function (num, inputDate) {
      let date = inputDate ? new Date(inputDate) : new Date();
      const start = new Date(date.getFullYear(), date.getMonth() - num,  date.getDate());
      const end = date;
      this.updateCalenderDates(start, end);
    },
    setByYears: function (num, inputDate) {
      let date = inputDate ? new Date(inputDate) : new Date();
      const start =  new Date(date.getFullYear() - num, date.getDate());
      const end = date;
      this.updateCalenderDates(start, end);
    }
  }
}
</script>

<style scoped>
.hide {
  display: none;
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
