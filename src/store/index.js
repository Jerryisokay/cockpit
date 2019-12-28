import Vue from 'vue'
import Vuex from 'vuex'
import base from './module/base'
import charts from './module/charts'
import getters from './getters'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    // 基础模块
    base,
    // 图表展示模块
    charts,
  },
  getters,
})
export default store
