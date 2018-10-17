<template>
  <el-popover
    placement="bottom"
    trigger="click"
    :value="visableBox">
      <div class="p-sm">
        <div>
          <h3>{{ getMessage() }}</h3>
        </div>
        <DateRangePicker 
        :tintColor="tintColor"
        :locale="locale"
        :selectedDate="selectedDate"
        :fromPage="fromPage"
        @update-calendar="updateCalendar"
        @clear-options="clearOptions"/>
        <ShortCutButtons 
          :shortCutButton="shortCutButton"
          @update-short-cut="updateShortCut"
          @update-calendar="updateCalendar"/>
        <CustomComponent 
          :lastCheck ="lastCheck"
          :sinceCheck="sinceCheck"
          :initCustomToggle="initCustomToggle"
          @apply-action="applyAction" 
          @update-calendar="updateCalendar"
          @clear-options="clearShortCutButton"
          @update-checks="updateChecks"
          @reset-default="resetDefault"/>
      </div>
    <el-button 
      slot="reference" 
      icon="el-icon-date"
      :style="buttonStyle"
      @click="showBox">
      {{ getButtonText() }}
    </el-button>
  </el-popover>
</template>

<script>
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
require('typeface-lato')
import { Popover, Button, Row, Col, Switch,  Checkbox,  InputNumber,  Select,  Option,  DatePicker} from 'element-ui';
Vue.use(Popover)
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Switch) 
Vue.use(Checkbox) 
Vue.use(InputNumber) 
Vue.use(Select) 
Vue.use(Option) 
Vue.use(DatePicker)

import ShortCutButtons from './ShortCutButtons.vue'
import CustomComponent from './CustomComponent.vue'
import DateRangePicker from './DateRangePicker.vue'

export default {
  name: 'VueDatePicker',
  components: {
    ShortCutButtons,
    CustomComponent,
    DateRangePicker
  },
  props: {
    locale: {
      type: String,
      default: 'en'
    },
    tintColor: {
      type: String,
      default: '#357ebd'
    },
    buttonLabel: {
      type: String
    },
    hideDateInButton: {
      type: Boolean,
      default: false
    },
    showTime: {
      type: Boolean,
      default: true
    },
    buttonWidth: {
      type: String,
      default: 'auto' 
    },
    initCustomToggle: {
      type: Boolean,
      default: true
    },
    start: {
      type: Object,
      default: null
    },
    end: {
      type: Object,
      default: null
    }
  },
  mounted() {
    if(this.locale === 'de'){
      this.$i18n.locale = 'de'
    }
  },
  data () {
    return {
      buttonStyle: {
        width: this.buttonWidth
      },
      visableBox: false,
      appliedStart: null,
      appliedEnd: null,  
      selectedDate: {
        start: new Date(),
        end: new Date()
      },
      fromPage: {},
      shortCutButton: null,
      lastCheck: false,
      sinceCheck: false,
      showDateText: false
    }
  },
  methods: {
    showBox: function () {
       this.visableBox = true
    },
    updateShortCut: function (label) {
      this.shortCutButton = label
      this.clearCheckBoxes()
    },
    updateCalendar: function (start, end) {
      this.showDateText = true
      this.selectedDate.start = start
      this.selectedDate.end = end
      this.fromPage = {
        month: start.getMonth() + 1,
        year: start.getFullYear()
      }
    },
    clearOptions: function () {
      this.clearShortCutButton()
      this.clearCheckBoxes()
    },
    applyAction: function () {
      this.appliedStart = this.selectedDate.start
      this.appliedEnd = this.selectedDate.end
      this.$emit('getDates', this.appliedStart, this.appliedEnd)
      this.visableBox = false
    },
    clearShortCutButton() {
      if (this.shortCutButton !== null) {
        this.shortCutButton = null
      }
    },
    clearCheckBoxes() {
      if (this.lastCheck) {
        this.lastCheck = false
      } else if (this.sinceCheck) {
        this.sinceCheck = false
      }
    },
    updateChecks(last, since) {
      this.lastCheck = last
      this.sinceCheck = since
    },
    resetDefault(){
      this.selectedDate.start = new Date()
      this.selectedDate.end = new Date()
      this.fromPage = {
        month: this.selectedDate.start.getMonth() + 1,
        year: this.selectedDate.start.getFullYear()
      }
      this.shortCutButton = null
      this.lastCheck = false
      this.sinceCheck = false
      this.showDateText =  false
    },
    formatDateToText: function (startDate, endDate){
      const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
      if (this.showTime) {
        options.hour = 'numeric'
        options.minute = 'numeric'
      }
      const start = startDate.toLocaleDateString(this.locale, options);
      const end = endDate.toLocaleDateString(this.locale, options);
      if (start == end) {
        return start
      } else {
        return start + ' to ' + end
      }
    },
    getButtonText: function () {
      if(this.hideDateInButton || !this.appliedStart) {
        return this.buttonLabel || this.$t('select')
      }else {
        return this.formatDateToText( this.appliedStart, this.appliedEnd)
      }
    },
    getMessage: function () {
      if(!this.showDateText) {
        return this.$t('instructions')
      }else {
        return this.formatDateToText( this.selectedDate.start, this.selectedDate.end)
      }
    }
  }
}
</script>


<style>
input,
select,
button,
h3,
th,
span {
  font-family: "Lato";
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
