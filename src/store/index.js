import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    visableBox: false,
    appliedStart: null,
    appliedEnd: null,  
    selectedDate: {
      start: new Date(),
      end: new Date()
    },
    leftPage: {},
    selectedButton: null,
    lastCheck: false,
    sinceCheck: false,
    showDateText: false
  },
  getters: {
    buttonText: state => showTime => {
      if (!state.appliedStart && !state.appliedEnd){
        return null;
      } 
      const options = { year: 'numeric', month: 'numeric', day: 'numeric'};
      if(showTime) {
        options.hour = 'numeric'
        options.minute = 'numeric' 
      }
      const start = state.appliedStart.toLocaleDateString(state.locale, options);
      const end = state.appliedEnd.toLocaleDateString(state.locale, options);
      if(start == end){
        return start
      }else{
        return start + ' to ' + end
      }
    },
    dateText: state => showTime => {
      const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
      if (showTime) {
        options.hour = 'numeric'
        options.minute = 'numeric'
      }
      const start = state.selectedDate.start.toLocaleDateString(state.locale, options);
      const end = state.selectedDate.end.toLocaleDateString(state.locale, options);
      if (start == end) {
        return start
      } else {
        return start + ' to ' + end
      }
    }
  },
  mutations: {
    showBox(state){
      state.visableBox = true
    },
    hideBox(state){
      state.visableBox = false
    },
    updateStart(state, payload) {
      state.selectedDate.start = payload
      state.leftPage = {
        month: payload.getMonth() + 1,
        year: payload.getFullYear()
      }
    },
    updateEnd(state, payload) {
      state.selectedDate.end = payload
      if (!state.showDateText){
        state.showDateText = true
      }
    },
    updateDateStatus(state) {
      state.showDateText = true
    },
    updateSelectedButton(state, payload) {
      state.selectedButton = payload
    },
    clearSelectedButton(state) {
      if (state.selectedButton !== null) {
        state.selectedButton = null
      }
    },
    updateLastCheck(state, boolean) {
      state.lastCheck = boolean
    },
    updateSinceCheck(state, boolean) {
      state.sinceCheck = boolean
    },
    clearCheckBoxes(state) {
      if (state.lastCheck) {
        state.lastCheck = false
      } else if (state.sinceCheck) {
        state.sinceCheck = false
      }
    },
    applyDate(state) {
      state.appliedStart = state.selectedDate.start
      state.appliedEnd = state.selectedDate.end
    },
    setInitialDates(state, start, end) {
      state.appliedStart = state.start
      state.appliedEnd = state.end
    },
    resetCalendar(state) {
      state.selectedDate.start = new Date()
      state.selectedDate.end = new Date()
      state.lastCheck = false
      state.sinceCheck = false
      state.selectedButton = null
      state.showDateText = false
    }
  }
})
