import Vue from 'vue'
import Vuex from 'vuex'
import base from './module/base'
import charts from './module/charts'
import map from './module/map'
import getters from './getters'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    // 基础模块
    base,
    // 图表展示模块
    charts,
    // 地图模块
    map,
  },
  getters,
})
export default store
