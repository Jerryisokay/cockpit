import request from '@/utils/request'
// 注释部分为前端模拟数据的测试接口 需在main.js中启用mock,且注释掉/utils/request中的 baseURL
//获取基础数据
export function getNavDataApi(id){
  return request({
    url:'/ksh/fg',
    params: {id},
    method: 'get',
    // url:'/api/getpages',
    // data: { id },
    // method: 'post',
  })
}

//获取页面图表数据
export function getChartsByIdApi(id){
  return request({
    url:'ksh/zsmkbj?zsmkbjZsmkId=' + id,
    method: 'get',
    // url:'/api/getcharts',
    // data:{ id },
    // method: 'post',
  })
}
// 获取单个图表信息
export function getSingleChartByIdApi(pageId, id) {
  return request({
    url: 'ksh/zsmkbj/findzsmkbj',
    params: {
      zsmkbjZsmkId: pageId,
      id,
    },
    method: 'get',
    // url: '/api/getsinglechart',
    // data: { pageId, id },
    // method: 'post',
  })
}


//获取地图标记信息
export function getMapApi(id){
  return request({
    url:'ksh/map?zsmkId=' + id,
    method: 'get',
    // url:'/api/getmap',
    // data:{ id },
    // method: 'post',
  })
}

//获取标记点的项目信息
export function getPositionInfoApi(id){
  return request({
    url:'ksh/mapxm?xmId=' + id,
    method: 'get',
  })
}
