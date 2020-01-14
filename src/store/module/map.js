/**
 * 地图标记信息
 */
import { getMapApi, getPositionInfoApi } from '@/api/index'

const map = {
  state: {
    SHOW_MAP: false,
    MAP_LEVEL: 1,
    MAP_AREA: '',
    // 标记点
    MARKERS:[],
    // 标记点的项目信息
    MARKER_INFOS : {}
  },
  mutations: {
    // 获取全部标记点
    SET_MARKERS: (state, { data}) => {
      state.MARKERS = data
    },
    // 获取到单个标记点的信息
    SET_MARKER_INFO: (state, { id, data}) => {
      state.MARKER_INFOS[id] = data
    },
  },
  actions: {
    // 获取全部标记点
    loadMarkersAction({commit}){
      return new Promise((resolve, reject) => {
        getMapApi()
        .then( res => {
          if(!res.data){
            reject('error')
          }
          if(!res.data.success){
            reject('error')
          }
          const data = res.data.data || []
          commit('SET_MARKERS', { data })
          resolve( data )
        })
        .catch(err => {
          reject(err)
        })
      })
    },
    // 通过标记点ID获取项目信息
    setPositionInfoAction({commit}, { id }){
      return new Promise((resolve, reject) => {
        getPositionInfoApi( id )
        .then( res => {
          if(!res.data){
            reject('error')
          }
          if(!res.data.success){
            reject('error')
          }
          const data = res.data.data
          commit('SET_MARKER_INFO', {id, data})
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
      })
    }
  }
}


export default map
