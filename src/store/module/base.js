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
    NAV_DATA: [],
    PAGE_INDEX: 0,
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
      // console.log('set data')
      state.NAV_DATA = data
    },
    SET_PAGE_HEIGHT: (state, { height }) => {
      state.PAGE_HEIGHT = height
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
          const data = res.data
          commit('SET_NAV_DATA', { data: res.data})
          resolve(data)
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
    }
  }
}


export default base
