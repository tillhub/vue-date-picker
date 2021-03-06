<template>
  <div id="vueDatePicker">
    <el-popover
      :placement="placement"
      trigger="click"
      v-model="visableBox"
    >
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
          @clear-options="clearOptions"
        />
        <div v-show="!simple">
          <ShortCutButtons
            :locale="locale"
            :short-cut-button="shortCutButton"
            @update-short-cut="updateShortCut"
            @update-calendar="updateCalendar"
          />
          <CustomComponent
            :locale="locale"
            :last-check="lastCheck"
            :since-check="sinceCheck"
            :init-custom-toggle="initCustomToggle"
            @apply-action="applyAction"
            @update-calendar="updateCalendar"
            @clear-options="clearShortCutButton"
            @update-checks="updateChecks"
            @reset-default="resetDefault"
          />
        </div>
      </div>
      <el-button
        slot="reference"
        icon="el-icon-date"
        :style="buttonStyle"
      >
        {{ getButtonText() }}
        <i
          class="clearable-date el-icon-error"
          v-show="showClearable"
          @click="resetDefault"
          @click.stop
        />
      </el-button>
    </el-popover>
  </div>
</template>

<script>
import Vue from 'vue'

import enLocale from 'element-ui/lib/locale/lang/en'
import deLocale from 'element-ui/lib/locale/lang/de'
import ElementLocale from 'element-ui/lib/locale'
import VueI18n from 'vue-i18n'
import { format } from 'date-fns'

import ShortCutButtons from './ShortCutButtons.vue'
import CustomComponent from './CustomComponent.vue'
import DateRangePicker from './DateRangePicker.vue'
import en from '../i18n/en.json'
import de from '../i18n/de.json'

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
      default: navigator.language
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
      type: String,
      validator: prop => {
        return ['date', 'iso'].includes(prop)
      },
      default: 'date'
    },
    dateFormat: {
      type: String,
      required: false,
      default: ''
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
    },
    placement: {
      type: String,
      default: 'bottom'
    },
    defaultShortCut: {
      type: String,
      default: null,
      validator: (val) => {
        return ['today',
          'yesterday',
          'thisWeek',
          'lastWeek',
          'thisMonth',
          'lastMonth',
          'thisYear',
          'lastYear'].includes(val)
      }
    }
  },
  async mounted () {
    const locale = this.getLocale()
    const i18n = new VueI18n({
      locale: locale,
      messages: {
        en: { ...enLocale, ...en },
        de: { ...deLocale, ...de }
      }
    })
    ElementLocale.i18n((key, value) => i18n.t(key, value))

    const isDateRange = this.dateRange.start && this.dateRange.end
    if (this.defaultShortCut && !isDateRange) {
      await this.updateShortCut(this.defaultShortCut)
      this.applyAction()
    }
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
    getDefaultStart () {
      const start = new Date()
      start.setHours(0, 0, 0, 0)
      return start
    },
    getSelectedDate () {
      const start = this.getDateFormat(this.dateRange.start) || this.getDefaultStart()
      const end = this.getDateFormat(this.dateRange.end) || new Date()

      return {
        start: start,
        end: end
      }
    },
    updateShortCut: function (label) {
      this.shortCutButton = label
      this.clearCheckBoxes()
    },
    updateCalendar: function (start, end) {
      if (end.getHours() === 0) {
        end.setHours(23, 59, 59, 999)
      }
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
      this.shortCutButton = this.defaultShortCut || null
      // in case of a default provided shortcut option, we will let the ShortCutButtons functionality
      // take care of resetting to the initial state, i.e. setting the matching shortcut dates
      if (this.shortCutButton) return

      this.appliedStart = null
      this.appliedEnd = null
      this.selectedDate.start = this.getDefaultStart()
      this.selectedDate.end = new Date()
      this.fromPage = {
        month: this.selectedDate.start.getMonth() + 1,
        year: this.selectedDate.start.getFullYear()
      }
      this.lastCheck = false
      this.sinceCheck = false
      this.showDateText = false
      this.$emit('get-dates', {})
      this.$emit('clear')
      this.dateRange.showDateText = false
    },
    formatDateToText: function (inputStart, inputEnd) {
      const startDate = inputStart || this.getDefaultStart()
      const endDate = inputEnd || new Date()
      const options = { year: 'numeric', month: 'numeric', day: 'numeric' }
      if (this.showTime) {
        options.hour = 'numeric'
        options.minute = 'numeric'
      }
      const start = this.dateFormat ? format(startDate, this.dateFormat) : startDate.toLocaleDateString(this.locale, options)
      const end = this.dateFormat ? format(endDate, this.dateFormat) : endDate.toLocaleDateString(this.locale, options)
      if (start === end) {
        return start
      } else {
        const to = this.getTranlation('to')
        return `${start} ${to} ${end}`
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
  },
  watch: {
    dateRange (value) {
      // This is a workaround to make the vue date picker update whenever its dateRange prop changes
      // The following line makes the DateRangePicker reactive to dateRange by
      // updating selectedDate, appliedStart, appliedEnd manually
      // as they are not computed properties but an attribute of "data"

      this.selectedDate = this.getSelectedDate()
      this.appliedStart = this.getDateFormat(value.start)
      this.appliedEnd = this.getDateFormat(value.end)
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
