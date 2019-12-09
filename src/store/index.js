import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
// import state from './state'
import base from './module/base'
import charts from './module/charts'
import getters from './getters'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    base,
    charts,
  },
  actions: {
    //  加载图表数据
    loadChartDataAction: function({ commit }, index, list){
      commit('SET_CHART_DATA', { index, list })

    },

  },
  mutations: {
    SET_CHART_DATA: (state, { index, list }) => {
      state.CHART_DATA[index] = list
    }
  },
  getters,
})
export default store
