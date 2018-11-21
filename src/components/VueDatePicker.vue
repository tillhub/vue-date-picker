<template>
  <div id="vueDatePicker">
    <el-popover
      placement="bottom"
      trigger="click"
      :value="visableBox">
      <div class="p-sm">
        <div v-show="!simple">
          <h3>{{ getMessage() }}</h3>
        </div>
        <DateRangePicker
          :tint-color="tintColor"
          :locale="locale"
          :selected-date="selectedDate"
          :from-page="fromPage"
          @update-calendar="updateCalendar"
          @clear-options="clearOptions"/>
        <div v-show="!simple">
          <ShortCutButtons
            :locale="locale"
            :short-cut-button="shortCutButton"
            @update-short-cut="updateShortCut"
            @update-calendar="updateCalendar"/>
          <CustomComponent
            :locale="locale"
            :last-check ="lastCheck"
            :since-check="sinceCheck"
            :init-custom-toggle="initCustomToggle"
            @apply-action="applyAction"
            @update-calendar="updateCalendar"
            @clear-options="clearShortCutButton"
            @update-checks="updateChecks"
            @reset-default="resetDefault"/>
        </div>
      </div>
      <el-button
        slot="reference"
        icon="el-icon-date"
        :style="buttonStyle"
        @click="showBox">
        {{ getButtonText() }}
        <i
          class="clearable-date el-icon-error"
          v-show="showClearable"
          @click="resetDefault"
          @click.stop/>
      </el-button>
    </el-popover>
  </div>
</template>

<script>
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import enLocale from 'element-ui/lib/locale/lang/en'
import deLocale from 'element-ui/lib/locale/lang/de'
import ElementLocale from 'element-ui/lib/locale'
import VueI18n from 'vue-i18n'
import 'typeface-lato'

import { Popover, Button, Row, Col, Switch, Checkbox, InputNumber, Select, Option, DatePicker } from 'element-ui'

import ShortCutButtons from './ShortCutButtons.vue'
import CustomComponent from './CustomComponent.vue'
import DateRangePicker from './DateRangePicker.vue'
import en from '../i18n/en.json'
import de from '../i18n/de.json'
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
Vue.use(VueI18n)

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
      type: String,
      required: false,
      default: ''
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
    dateType: {
      type: 'date' | 'iso',
      default: 'date'
    },
    dateRange: {
      type: Object,
      validator: function (input) {
        const startIsDate = input.start ? (input.start instanceof Date || String) : true
        const endIsDate = input.end ? (input.end instanceof Date || String) : true
        return startIsDate && endIsDate
      },
      default: function () {
        return {
          start: null,
          end: null,
          showDateText: false
        }
      }
    },
    simple: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    const locale = this.getLocale()
    const i18n = new VueI18n({
      locale: locale,
      messages: {
        'en': { ...enLocale, ...en },
        'de': { ...deLocale, ...de }
      }
    })
    ElementLocale.i18n((key, value) => i18n.t(key, value))
  },
  data () {
    return {
      buttonStyle: {
        width: this.buttonWidth
      },
      visableBox: false,
      appliedStart: this.getDateFormat(this.dateRange.start),
      appliedEnd: this.getDateFormat(this.dateRange.end),
      selectedDate: this.getSelectedDate(),
      fromPage: {},
      shortCutButton: null,
      lastCheck: false,
      sinceCheck: false,
      showDateText: this.dateRange.showDateText,
      showClearable: false
    }
  },
  methods: {
    getTranlation: function (key) {
      if (this.getLocale() === 'en') {
        return en[key]
      } else {
        return de[key]
      }
    },
    getLocale: function () {
      let locale = this.locale
      locale = locale.substring(0, 2).toLowerCase()
      if (locale === 'en' || locale === 'de') {
        return locale
      } else {
        return 'en'
      }
    },
    getDateFormat (date) {
      let formattedDate = null
      if (typeof date === 'string') {
        formattedDate = new Date(date)
      } else if (date instanceof Date) {
        formattedDate = date
      }
      return formattedDate
    },
    getSelectedDate () {
      let start = this.getDateFormat(this.dateRange.start) || new Date()
      let end = this.getDateFormat(this.dateRange.end) || new Date()

      return {
        start: start,
        end: end
      }
    },
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
      if (this.simple) {
        this.applyAction()
      }
    },
    clearOptions: function () {
      this.clearShortCutButton()
      this.clearCheckBoxes()
    },
    getEmmitDate: function (date) {
      if (this.dateType === 'iso') {
        return date.toISOString()
      } else {
        return date
      }
    },
    applyAction: function () {
      const start = this.getEmmitDate(this.selectedDate.start)
      const end = this.getEmmitDate(this.selectedDate.end)
      this.appliedStart = this.selectedDate.start
      this.appliedEnd = this.selectedDate.end
      const dates = {
        start: start,
        end: end,
        showDateText: true
      }
      this.$emit('get-dates', dates)
      this.dateRange.showDateText = true
      this.visableBox = false
    },
    clearShortCutButton () {
      if (this.shortCutButton !== null) {
        this.shortCutButton = null
      }
    },
    clearCheckBoxes () {
      if (this.lastCheck) {
        this.lastCheck = false
      } else if (this.sinceCheck) {
        this.sinceCheck = false
      }
    },
    updateChecks (last, since) {
      this.lastCheck = last
      this.sinceCheck = since
    },
    resetDefault () {
      console.log('**')
      this.appliedStart = null
      this.appliedEnd = null
      this.selectedDate.start = new Date()
      this.selectedDate.end = new Date()
      this.fromPage = {
        month: this.selectedDate.start.getMonth() + 1,
        year: this.selectedDate.start.getFullYear()
      }
      this.shortCutButton = null
      this.lastCheck = false
      this.sinceCheck = false
      this.showDateText = false
      this.$emit('get-dates', {})
      this.$emit('clear')
      this.dateRange.showDateText = false
    },
    formatDateToText: function (inputStart, inputEnd) {
      const startDate = inputStart || new Date()
      const endDate = inputEnd || new Date()
      const options = { year: 'numeric', month: 'numeric', day: 'numeric' }
      if (this.showTime) {
        options.hour = 'numeric'
        options.minute = 'numeric'
      }
      const start = startDate.toLocaleDateString(this.locale, options)
      const end = endDate.toLocaleDateString(this.locale, options)
      if (start === end) {
        return start
      } else {
        return start + ' to ' + end
      }
    },
    toggleClearable: function (shouldShow) {
      if (this.clearable && shouldShow) {
        this.showClearable = true
      } else {
        this.showClearable = false
      }
    },
    getButtonText: function () {
      if (this.hideDateInButton || !this.dateRange.showDateText) {
        this.toggleClearable(false)
        return this.buttonLabel || this.getTranlation('select')
      } else {
        this.toggleClearable(true)
        return this.formatDateToText(this.appliedStart, this.appliedEnd)
      }
    },
    getMessage: function () {
      if (!this.showDateText && !this.dateRange.showDateText) {
        return this.getTranlation('instructions')
      } else {
        return this.formatDateToText(this.selectedDate.start, this.selectedDate.end)
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

.clearable-date {
  padding-left: 8px;
}

.clearable-date:hover {
  color: #0760a1;
}

.m-t-md {
  margin-top: 15px;
}
</style>
