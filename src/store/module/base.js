import { getNavDataApi } from '@/api/index'
import { rejects } from 'assert'

const base = {
  state:{
    THEME_TYPE: 'blue',
    THEMES: [
      {
        name: '默认皮肤',
        value:'dark',
        color:'#0b3262',
      },
      {
        name: '亮色皮肤',
        value:'light',
        color:'#c6044d',
      },
      {
        name: '深蓝皮肤',
        value:'blue',
        color:'#0b4757',
      },
    ],
    //默认颜色库
    COLOR_REPOSITORY: ['#ffc343','#01f0d9','#3c95fb','#07fe1d','#eaab05','#f54806','#0fd187','#c6044d','#0a9ba6','#c6044d','#f36098','#55db87','#f36098','#e7cc72'],
    NAV_DATA: [],
    PAGE_INDEX: 0,
    CURRENT_PAGE_ID: '',
    REFRESH_INTERVAL: 100,
    PAGE_HEIGHT: document.documentElement.clientHeight
  },
  mutations: {
    SET_PAGE_INDEX: (state, { index }) => {
      state.PAGE_INDEX = index
    },
    SET_THEME_TYPE: (state, { theme }) => {
      state.THEME_TYPE = theme
    },
    SET_NAV_DATA: (state, { data }) => {
      state.NAV_DATA = data
    },
    SET_PAGE_HEIGHT: (state, { height }) => {
      state.PAGE_HEIGHT = height
    },
    SET_CURRENT_PAGE_ID: (state, {id}) => {
      console.log('id ---- '+ id)
      state.CURRENT_PAGE_ID = id
    }
  },
  actions: {
    loadNavDataAction({commit}){
      return new Promise((resolve, reject) => {
        getNavDataApi()
        .then( res => {
          if(!res.data){
            reject('error')
          }
          if(!res.data.success){
            reject('error')
          }
          const data = res.data.data[0] || {menu:[]}
          commit('SET_NAV_DATA', { data: data.menu})
          // resolve(data.menu)
        })
        .catch(err => {
          reject(err)
        })
      })
    },
    //  切换路由导航
    setPageIndexAction: function({commit}, {index}){
      commit('SET_PAGE_INDEX', { index })
    },
    //  切换主题
    setThemeTypeAction: function({commit}, {theme}){
      commit('SET_THEME_TYPE', { theme })
    },
    //  页面高度变化时自适应
    setPageHeightAction: function({commit}){
      let height = document.documentElement.clientHeight
      commit('SET_PAGE_HEIGHT', { height })
    },
    // 设置当前页面ID
    setCurrentPageIdAction: function({commit},{id}){
      commit('SET_CURRENT_PAGE_ID', {id})
    }
  }
}


export default base
