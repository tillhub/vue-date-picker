import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        count: 0,
        selectedDate: {
            start: new Date(),
            end: new Date()
        },
        // start: new Date(),
        // end: new Date()
    },
    mutations: {
        increment(state) {
            state.count++
        },
        updateStart(state, payload){
            state.selectedDate.start = payload;
        },
        updateEnd(state, payload) {
            state.selectedDate.end = payload;
        },
        resetCalenderDates(state) {
            state.selectedDate.start = new Date();
            state.selectedDate.end = new Date();
        }
    }
})