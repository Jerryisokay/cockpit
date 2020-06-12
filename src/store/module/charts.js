/**
 * 单个页面下的图表数据
 */
import { getChartsByIdApi, getSingleChartByIdApi  } from '@/api/index'

const charts = {
  state:{
    CHARTS_DATA: {}
  },
  mutations: {
    // 单页图表数据存入vuex
    SET_PAGE_DATA: (state, { id, data}) => {
      state.CHARTS_DATA[id] = data
    }
  },
  actions: {
    // 通过ID获取图表数据列表
    getNavDataAction({commit}, { id }){
      return new Promise((resolve, reject) => {
        getChartsByIdApi( id )
        .then( res => {
          if(!res.data){
            reject('error')
          }
          if(!res.data.success){
            reject('error')
          }
          const data = res.data.data
          commit('SET_PAGE_DATA', {id, data})
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
      })
    },
    getSingleChartAction({commit}, {pageId, id}) {
      return new Promise((resolve, reject) => {
        getSingleChartByIdApi( pageId, id )
        .then( res => {
          if(!res.data){
            reject('error')
          }
          if(!res.data.success){
            reject('error')
          }
          if (!Array.isArray(res.data.data)) {
            reject('接口数据格式错误')
          }
          resolve(res.data.data[0])
        })
        .catch(err => {
          console.log(err)
        })
      })
    }
  }
}


export default charts
