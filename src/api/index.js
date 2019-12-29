import request from '@/utils/request'

//获取基础数据
export function getNavDataApi(){
  return request({
    // url:'/api/getpages',
    url:'/ksh/fg',
    method: 'get',
  })
}

//获取页面图表数据
export function getChartsByIdApi(id){
  return request({
    // url:'/api/getcharts',
    url:'ksh/zsmkbj?zsmkbjZsmkId=' + id,
    // data:{ id },
    method: 'get',
    // method: 'post',
  })
}

//获取地图标记信息
export function getMapApi(){
  return request({
    url:'ksh/map',
    method: 'get',
  })
}

//获取标记点的项目信息
export function getPositionInfoApi(id){
  return request({
    url:'ksh/mapxm?xmId=' + id,
    method: 'get',
  })
}
