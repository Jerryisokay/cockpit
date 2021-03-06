// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store'
import '@/styles/index.css'
import '@/styles/iconfont.css'

import '@/styles/buttons/iconfont.css'
//echart
import echarts from 'echarts'

import 'babel-polyfill'
// mock模拟接口数据，仅用于开发
// import '@/mock'

Vue.use(Vuex)

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
