const getters = {
  menuData: state => {
    const data =  state.base.NAV_DATA
    data.map( item => {
      item.path = item.id == 'homepage' ? '/' : '/page/' + item.id
    })
    return data
  },
  leftMenu: state => {
    let data =  state.base.NAV_DATA
    // const length = Math.ceil( Math.min(data.length, 6))/2
    return data.slice(0, 3).map( item => {
      item.path = item.id == 'homepage' ? '/' : '/page/' + item.id
      return item
    })
  },
  rightMenu: state => {
    let data =  state.base.NAV_DATA
    // const length = Math.ceil( Math.min(data.length, 6))/2
    return data.slice(3, 6).map( item => {
      item.path = item.id == 'homepage' ? '/' : '/page/' + item.id
      return item
    })
  }
}

export default getters
