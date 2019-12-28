/**
 * 单个页面下的图表数据
 */
import { getChartsByIdApi } from '@/api/index'

const base = {
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
    }
  }
}


export default base
