<template>
  <div class="root-container" :class="theme">
    <div class="container" :style='{"min-height": pageHeight + "px"}'>
      <!-- 导航 -->
      <Navigator></Navigator>
      <!-- 地图部分 -->
      <div class="main-container" :style='{"height": pageHeight - 160 + "px"}'>
        <div class="mid-container-outer">
          <div class="mid-container-inner">
            <Angleborder type="1"></Angleborder>
            <Mapchart @drag="dragData" :theme="theme"></Mapchart>
          </div>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Mapchart from '@/components/Mapchart'
import Piechart from '@/components/Piechart'
import Linechart from '@/components/Linechart'

import Navigator from '@/components/Navigator'
import Angleborder from '@/components/Angleborder'

import store from '@/store'

export default {
  name: 'container',
  data(){
    return {
      status: 1,
      // pageHeight: document.documentElement.clientHeight,
      dragData: {
        lng: null,
        lat: null,
        address: null,
        nearestJunction: null,
        nearestRoad: null,
        nearestPOI: null
      },
      charts:[]
    }
  },
  components:{
    Navigator,
    Piechart,
    Linechart,
    Mapchart,
    Angleborder,
  },
  mounted(){

    this.initial()

    //监听屏幕大小
    window.onresize = () =>{
      this.$store.dispatch('setPageHeightAction')
    }

    // 定时刷新
    // let timer = setInterval(() => {
    //   this.initial()
    // }, parseInt(this.refreshInterval) * 1000)

  },
  computed : {
    pageIndex(){
      return store.state.base.PAGE_INDEX
    },
    theme(){
      return store.state.base.THEME_TYPE
    },
    pageHeight(){
      return store.state.base.PAGE_HEIGHT
    },
    refreshInterval(){
      return store.state.base.REFRESH_INTERVAL
    }
  },
  methods: {
    initial(){
      // 初始化
      console.log('====================================');
      console.log('initial');
      console.log('====================================');
      let routes = this.$route.path.split('/')
      let id = routes[ routes.length - 1 ] || ''

      this.$store.dispatch('loadNavDataAction')
      .catch(() =>{
        this.$store.dispatch('setPageIndexAction', {index: 0})
        this.$router.push({ path: '/' })
      })
    },
    dragMap (data) {
      this.dragData = {
        lng: data.position.lng,
        lat: data.position.lat,
        address: data.address,
        nearestJunction: data.nearestJunction,
        nearestRoad: data.nearestRoad,
        nearestPOI: data.nearestPOI
      }
    },

  }

}

</script>
