import request from '@/utils/request'


export function getNavDataApi(){
  return request({
    url:'/api/getpages',
    method: 'get',
  })
}

export function getChartsByIdApi(id){
  return request({
    url:'/api/getcharts',
    data:{ id },
    method: 'post',
  })
}

