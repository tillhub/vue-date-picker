import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // count: 0,
        selectedDate: {
            start: new Date(),
            end: new Date()
        },
        // showCustom: true,
        lastCheck: false,
        // lastInput: 5,
        // lastDropdown: 'days',
        sinceCheck: false,
        leftPage: {},
    },
    mutations: {
        updateStart(state, payload){
            state.selectedDate.start = payload;
            const month = payload.getMonth();
            const year = payload.getFullYear();
            state.leftPage = { month: month + 1, year: year }
        },
        updateEnd(state, payload) {
            state.selectedDate.end = payload;
        },
        // updateCustomItem(state, key, value) {
        //     state[key] = value;
        // },
        updateLastCheck(state, boolean) {
            state.lastCheck = boolean
        },
        updateSinceCheck(state, boolean){
            state.sinceCheck = boolean
        },
        clearCheckBoxes(state){
            state.lastCheck = false
            state.sinceCheck = false
        },
        resetCalendar(state) {
            state.selectedDate.start = new Date();
            state.selectedDate.end = new Date();
            // state.showCustom = true;
            state.lastCheck = false;
            // state.lastInput = 5;
            // state.lastDropdown = 'days';
            state.sinceCheck = false;
            // state.sinceInput = 5;
            // state.sinceDropdown = 'days';
            // state.sinceDateTime = null;
        }
    }
})