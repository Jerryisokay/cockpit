import request from '@/utils/request'


export function getNavDataApi(){
  return request({
    // url:'/api/getpages',
    url:'/ksh/fg',
    method: 'get',
  })
}

export function getChartsByIdApi(id){
  return request({
    // url:'/api/getcharts',
    url:'ksh/zsmkbj?zsmkbjZsmkId=' + id,
    // data:{ id },
    method: 'get',
    // method: 'post',
  })
}

