<template>
  <el-popover
    placement="bottom"
    trigger="click">
      <div class="p-sm">
        <div>
          <h3>Select a date range or one of the presets below</h3>
        </div>
        <v-date-picker
          mode="range"
          is-inline
          is-double-paned
          is-linked
          update-on-input
          tint-color="#357ebd"
          :value="selectedDate"
          :fromPage="leftPage"
          :pane-width="200"
          :theme-styles="themeStyles"
          @input="selectCalenderFromGui">
        </v-date-picker>
        <ShortCutButtons />
        <CustomComponent/>
      </div>
    <el-button slot="reference" icon="el-icon-date">All Time<i class="el-icon-arrow-down"/></el-button>
  </el-popover>
</template>

<script>
import { mapState } from 'vuex'
import ShortCutButtons from './ShortCutButtons.vue'
import CustomComponent from './CustomComponent.vue'

export default {
  name: 'DatePicker',
  computed: mapState([
    'selectedDate',
    'leftPage',
    'rightPage'
  ]),
  components: {
    ShortCutButtons,
    CustomComponent
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
      }
    }
  },
  methods: {
    updateCalenderDates: function (start, end) {
      this.$store.commit('updateStart', start);
      this.$store.commit('updateEnd', end);

    },
    selectCalenderFromGui: function (selectedDates) {
      const start = selectedDates.start;
      const end = selectedDates.end;
      this.updateCalenderDates(start, end);
      this.clearCheckBoxes();
    },
    clearCheckBoxes: function () {
      this.$store.commit('clearCheckBoxes')
    }
  }
}
</script>

<style scoped>
</style>
