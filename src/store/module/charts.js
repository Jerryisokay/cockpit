import { getChartsByIdApi } from '@/api/index'

const base = {
  state:{
    CHARTS_DATA: {}
  },
  mutations: {
    SET_PAGE_DATA: (state, { id, data}) => {
      state.CHARTS_DATA[id] = data
    }
  },
  actions: {
    getNavDataAction({commit}, { id }){
      // console.log('id ' + id)
      return new Promise((resolve, reject) => {
        getChartsByIdApi( id )
        .then( res => {
          if(!res.data){
            reject('error')
          }
          const data = res.data
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
