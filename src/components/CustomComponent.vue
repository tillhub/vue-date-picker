<template>
  <el-row>
    <el-row type="flex" justify="space-between" align="middle">
      <h3>{{ $t("custom") }}</h3>
      <el-switch v-model="showCustom" active-color="#50e3c1">
      </el-switch>
    </el-row>
    <el-row :class="{'hide': !showCustom}">
      <el-row type="flex" class="p-xs" align="middle">
        <el-checkbox :value="lastCheck" name="lastCheck" @change="checkedBox"></el-checkbox>
          <span class="check-lable">{{ $t("last") }}</span>
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
            :key="item"
            :label="$t(item)"
            :value="item">
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
            :key="item"
            :label="$t(item)"
            :value="item">
          </el-option>
        </el-select>
        <span class="check-lable">{{ $t("since") }}</span>
        <el-date-picker
          v-model="sinceDateTime"
          class="time-picker"
          size="mini"
          type="datetime"
          default-time="12:00:00"
          :placeholder="$t('selectDateAndTime')"
          @focus="checkSince"
          @change="applySince">
        </el-date-picker>
      </el-row>
    </el-row>
    <el-row type="flex" class="m-t-md" justify="center">
        <el-button @click="resetDefault">{{ $t("reset") }}</el-button>
        <el-button type="primary" @click="applyAction">{{ $t("apply") }}</el-button>
    </el-row>
  </el-row>
</template>

<script>

export default {
  name: 'CustomComponent',
  props: ['initCustomToggle', 'sinceCheck', 'lastCheck'],
  data () {
    return {
      showCustom: this.initCustomToggle,
      lastInput: 5,
      lastDropdown: 'days',
      sinceInput: 5,
      sinceDropdown: 'days',
      sinceDateTime: null,
      dateUnits: ['days', 'weeks', 'months', 'years']
    }
  },
  methods: {
    updateCalenderDates: function (start, end) {
      this.$emit('update-calendar', start, end)
      this.$emit('clear-options')
    },
    applyAction: function () {
      this.$emit('apply-action')
    },
    checkedBox: function (boolean, event) {
      if(boolean){
        if(event.target.name === "lastCheck"){
            this.checkLast()
          this.applyLast()
        }else if(event.target.name === "sinceCheck"){
            this.checkSince()
          this.applySince()
        }
      }
    },
    checkLast: function () {
      this.$emit('update-checks', true, false)
    },
    checkSince: function () {
      this.$emit('update-checks', false, true)
    },
    applyLast: function () {
      if(this.lastInput && this.lastDropdown){
        if(this.lastDropdown === 'days'){
          this.setByDays(this.lastInput)
        }else if(this.lastDropdown === 'weeks') {
          this.setByWeeks(this.lastInput)
        }else if(this.lastDropdown === 'months') {
          this.setByMonths(this.lastInput)
        }else if(this.lastDropdown === 'years') {
          this.setByYears(this.lastInput)
        }
      }
    },
    applySince: function (){
      if(this.sinceInput && this.sinceDropdown && this.sinceDateTime){
        if(this.sinceDropdown === 'days'){
          this.setByDays(this.sinceInput, this.sinceDateTime)
        }else if(this.sinceDropdown === 'weeks') {
          this.setByWeeks(this.sinceInput, this.sinceDateTime)
        }else if(this.sinceDropdown === 'months') {
          this.setByMonths(this.sinceInput, this.sinceDateTime)
        }else if(this.sinceDropdown === 'years') {
          this.setByYears(this.sinceInput, this.sinceDateTime)
        }
      }
    },
    resetDefault: function () {
      this.$emit('reset-default')
      this.lastInput = 5
      this.lastDropdown = 'days'
      this.sinceInput = 5
      this.sinceDropdown = 'days'
      this.sinceDateTime = null
    },
    setByDays: function (num, inputDate) {
      let start = inputDate ? new Date(inputDate) : new Date()
      let end = inputDate ? new Date(inputDate) : new Date()

      let days = num - 1
      start.setDate(start.getDate() - days)
      this.updateCalenderDates(start, end)
    },
    setByWeeks: function (num, inputDate) {
      let start = inputDate ? new Date(inputDate) : new Date()
      let end = inputDate ? new Date(inputDate) : new Date()

      let days = num * 7 - 1
      start.setDate(start.getDate() - days)
      this.updateCalenderDates(start, end)
    },
    setByMonths: function (num, inputDate) {
      let date = inputDate ? new Date(inputDate) : new Date()
      const start = new Date(date.getFullYear(), date.getMonth() - num,  date.getDate())
      const end = date
      this.updateCalenderDates(start, end)
    },
    setByYears: function (num, inputDate) {
      let date = inputDate ? new Date(inputDate) : new Date()
      const start =  new Date(date.getFullYear() - num, date.getDate())
      const end = date
      this.updateCalenderDates(start, end)
    }
  }
}
</script>

<style scoped>

input,
select,
textarea,
button,
h3,
span {
  font-family: "Lato";
}

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
