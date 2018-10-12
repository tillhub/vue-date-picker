<template>
  <el-popover
    placement="bottom"
    trigger="click"
    :value="visableBox">
      <div class="p-sm">
        <div>
          <h3>'Select a date range or one of the presets below'</h3>
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
        <CustomComponent/>
      </div>
    <el-button slot="reference" icon="el-icon-date" @click="showBox">{{ getButtonText() }}</el-button>
  </el-popover>
</template>

<script>
import { mapState } from 'vuex'
import ShortCutButtons from './ShortCutButtons.vue'
import CustomComponent from './CustomComponent.vue'

export default {
  name: 'DatePicker',
  components: {
    ShortCutButtons,
    CustomComponent
  },
  computed: mapState([
    'visableBox',
    'selectedDate',
    'leftPage',
    'rightPage',
    'formattedSelected'
  ]),
  props: ['tintColor', 'buttonLabel', 'hideDate'],
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
      if(this.hideDate || !this.formattedSelected) {
        return this.buttonLabel
      }else {
        return this.formattedSelected
      }
    }
  }
}
</script>
