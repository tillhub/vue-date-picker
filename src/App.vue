<template>
  <div class="examples">
    <div>
      <h3>Default</h3>
      <vue-date-picker/>
    </div>
    <div>
      <h3>German</h3>
      <div>props:</div>
      <div>locale="de"</div>
      <vue-date-picker locale="de"/>
    </div>
    <div>
      <h3>Tint&nbsp;Color</h3>
      <div>props:</div>
      <div>tint&#8209;color="#e67382"</div>
      <vue-date-picker tint-color="#e67382"/>
    </div>
    <div>
      <h3>Button&nbsp;Label</h3>
      <div>props:</div>
      <div>button&#8209;label="All&nbsp;Time"</div>
      <vue-date-picker button-label="All Time"/>
    </div>
    <div>
      <h3>Button&nbsp;Width</h3>
      <div>props:</div>
      <div>button&#8209;width="300px"</div>
      <vue-date-picker
        button-width="300px"
        :show-time="false"/>
    </div>
    <div>
      <h3>ShowTime</h3>
      <div>props:</div>
      <div>:show&#8209;time="false"</div>
      <vue-date-picker :show-time="false"/>
    </div>
    <div>
      <h3>HideDateInButton</h3>
      <div>props:</div>
      <div>:hide&nbsp;date&nbsp;in&nbsp;button="true"</div>
      <vue-date-picker :hide-date-in-button="true"/>
      <vue-date-picker
        locale="en"
        tint-color="#357ebd"
        button-label="All Time"
        button-width="auto"
        :hide-date-in-button="true"
        :show-time="false"
        :date-range="selectedDate"
        @get-dates="printTheDate"/>
    </div>
    <div>
      <h3>Inital&nbsp;Status&nbsp;of&nbsp;Custom&nbsp;Toggle</h3>
      <div>props:</div>
      <div>:init&nbsp;custom&nbsp;toggle="false"</div>
      <vue-date-picker
        :init-custom-toggle="false" />
    </div>
    <div>
      <h3>Custom</h3>
      <vue-date-picker
        locale="en"
        tint-color="#357ebd"
        button-label="All Time"
        button-width="auto"
        :hide-date-in-button="false"
        :show-time="false"
        :init-custom-toggle="false"
        :date-range="selectedDate"
        @get-dates="printTheDate"/>
    </div>
    <div>
      <h3>String&nbsp;Input</h3>
      <vue-date-picker
        locale="en"
        tint-color="#357ebd"
        button-label="All Time"
        button-width="auto"
        date-type="iso"
        :hide-date-in-button="false"
        :show-time="true"
        :init-custom-toggle="true"
        :date-range="stringDateRange"
        @get-dates="setStringDateRange"/>
    </div>
    <div>
      <h3>Simple&nbsp;Date&nbsp;Range&nbsp;Picker</h3>
      <div>props:</div>
      <div>:simple="true"</div>
      <vue-date-picker
        :simple="true"
        :clearable="true"/>
      <vue-date-picker
        locale="en"
        tint-color="#357ebd"
        button-label="All Time"
        button-width="auto"
        :hide-date-in-button="false"
        :show-time="false"
        :init-custom-toggle="false"
        :date-range="stringDateRange"
        :simple="true"
        :clearable="true"
        @get-dates="setStringDateRange"/>
    </div>
    <div>
      <h3>Clearable</h3>
      <div>props:</div>
      <div>:clearable="true"</div>
      <vue-date-picker
        :clearable="true"/>
    </div>
  </div>
</template>

<script>

import VueDatePicker from './components/VueDatePicker.vue'
import 'typeface-lato'
export default {
  name: 'App',
  components: {
    VueDatePicker
  },
  data () {
    const date = new Date()
    const start = new Date(date.getFullYear(), date.getMonth(), 1)
    return {
      selectedDate: {},
      stringDateRange: {
        start: start.toISOString(),
        end: new Date().toISOString(),
        showDateText: true
      }
    }
  },
  methods: {
    printTheDate (dates) {
      console.log(dates)
      this.selectedDate = {
        start: dates.start,
        end: dates.end,
        showDateText: dates.showDateText
      }
    },
    setStringDateRange (dates) {
      console.log(dates)
      this.stringDateRange = {
        start: dates.start,
        end: dates.end,
        showDateText: dates.showDateText
      }
    }
  }
}
</script>

<style scoped>
div {
  font-family: "Lato";
}

.examples {
  margin: 10% 50%;
}

#vueDatePicker {
  margin: 20px 0px;
}
</style>
