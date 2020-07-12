const getters = {
  // 完整导航菜单
  menuData: state => {
    return state.base.NAV_DATA
  },
  // 左边菜单
  // leftMenu: state => {
  //   let data =  state.base.NAV_DATA
  //   return data.slice(0, 3).map( item => {
  //     item.path = item.id == 'homepage' ? '/' : '/page/' + item.id
  //     return item
  //   })
  // },
  // // 右边菜单
  // rightMenu: state => {
  //   let data =  state.base.NAV_DATA
  //   return data.slice(3, 6).map( item => {
  //     item.path = item.id == 'homepage' ? '/' : '/page/' + item.id
  //     return item
  //   })
  // }
}

export default getters
