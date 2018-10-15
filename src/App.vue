<template>
  <div id="app">
      <el-popover
        placement="bottom"
        trigger="click"
        :value="visableBox">
          <div class="p-sm">
            <div>
              <h3>{{ getMessage() }}</h3>
            </div>
            <v-date-picker
              mode="range"
              v-bind:tint-color="tintColor"
              is-inline
              is-double-paned
              is-linked
              update-on-input
              :value="selectedDate"
              :fromPage="leftPage"
              :pane-width="200"
              :theme-styles="themeStyles"
              @input="selectCalenderFromGui">
            </v-date-picker>
            <ShortCutButtons />
            <CustomComponent v-bind:applyAction="applyAction"/>
          </div>
        <el-button 
          slot="reference" 
          icon="el-icon-date"
          :style="buttonStyle"
          @click="showBox">
          {{ getButtonText() }}
        </el-button>
      </el-popover>
  </div>
</template>

<script>
import { setupCalendar } from "v-calendar";
import { mapState, mapGetters } from 'vuex'
import ShortCutButtons from './components/ShortCutButtons.vue'
import CustomComponent from './components/CustomComponent.vue'

export default {
  name: 'DatePicker',
  components: {
    ShortCutButtons,
    CustomComponent
  },
  computed: {
    ...mapState([
      'visableBox',
      'selectedDate',
      'leftPage',
      'showDateText',
      'appliedStart',
      'appliedEnd'
    ]),
    ...mapGetters([
      'buttonText',
      'dateText'
    ])
  },
    props: {
    locale: {
      type: String,
      default: 'en-US'
    },
    tintColor: {
      type: String,
      default: '#357ebd'
    },
    buttonLabel: {
      type: String,
      default: 'All Time'
    },
    hideDate: {
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
    applyAction: {
      type: Function,
      default: (selectedDate)=>{ }
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
  mount() {
    if(this.start && this.end) {
      this.$store.commit('applyInitialDates', this.start, this.end)
    }
  },
  data () {
    return {
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
      buttonStyle: {
        width: this.buttonWidth
      }
    }
  },
  methods: {
    showBox: function () {
      this.$store.commit('showBox')
    },
    updateCalenderDates: function (start, end) {
      this.$store.commit('updateStart', start)
      this.$store.commit('updateEnd', end)
    },
    clearSelectedButton: function () {
      this.$store.commit('clearSelectedButton')
    },
    clearCheckBoxes: function () {
      this.$store.commit('clearCheckBoxes')
    },
    selectCalenderFromGui: function (selectedDates) {
      const start = selectedDates.start
      const end = selectedDates.end
      this.updateCalenderDates(start, end)
      this.clearOpitons()
    },
    clearOpitons: function () {
      this.clearSelectedButton()
      this.clearCheckBoxes()
    },
    getButtonText: function () {
      if(this.hideDate || !this.appliedStart) {
        return this.buttonLabel
      }else {
        return this.buttonText(this.showTime)
      }
    },
    getMessage: function () {
      if(!this.showDateText) {
        return 'Select a date range or one of the presets below'
      }else {
        return this.dateText(this.showTime)
      }
    }
  },
  created() {
    setupCalendar({
      locale: this.locale ? this.locale : 'en',
      datePickerShowDayPopover: false, 
      formats: {
        title: 'MMMM YYYY',
        weekdays: 'WW',
        navMonths: 'MMM',
        input: ['L', 'YYYY-MM-DD', 'YYYY/MM/DD'],
        dayPopover: 'L',
        data: ['L', 'YYYY-MM-DD', 'YYYY/MM/DD']
      }
    });
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
