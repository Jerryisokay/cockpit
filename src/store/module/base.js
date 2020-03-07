/**
 * 基础数据
 */
import { getNavDataApi } from '@/api/index'
import { rejects } from 'assert'

const base = {
  state:{
    // 主题样式
    THEME_TYPE: 'dark',
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
    //默认颜色库 用于后台数据未返回颜色或者颜色数量不足时补充
    COLOR_REPOSITORY: ['#01f0d9','#3c95fb','#07fe1d','#eaab05','#f54806','#0fd187','#c6044d','#0a9ba6','#c6044d','#f36098','#55db87','#f36098','#e7cc72'],
    // 导航菜单
    NAV_DATA: [],
    // 当前导航
    PAGE_INDEX: 0,
    // 页面标题
    PAGE_TITLE: '',
    LAYOUT_TYPE: 1,   //1 栅格布局, 2 传统布局 当前接口逻辑下,只能使用栅格布局
    // 刷新间隔
    REFRESH_INTERVAL: 100,
    // 页面高度，用于自适应
    PAGE_HEIGHT: document.documentElement.clientHeight
  },
  mutations: {
    SET_PAGE_INDEX: (state, { index }) => {
      state.PAGE_INDEX = index
    },
    SET_THEME_TYPE: (state, { theme }) => {
      state.THEME_TYPE = theme
    },
    SET_PAGE_TITLE: (state, {title}) => {
      state.PAGE_TITLE = title
    },
    SET_NAV_DATA: (state, { data }) => {
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
          .then(res => {
          console.log(res.data)
          if(!res.data){
            reject('error')
          }
          if(!res.data.success){
            reject('error')
          }
          const data = res.data.data[0] || {menu:[]}
          const title = data.title
          const themeType = data.themeType == 2 ? 'blue' : ( data.themeType == 1 ? 'light' : 'dark')
          //设置初始参数
          //主题
          commit('SET_THEME_TYPE', { theme: themeType })
          //标题
          commit('SET_PAGE_TITLE', { title })
          //导航菜单
          commit('SET_NAV_DATA', { data: data.menu })
          resolve(data.menu)
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
    setPageTitleAction: function({commit},{title}){
      commit('SET_PAGE_TITLE', {title})
    }
  }
}


export default base
