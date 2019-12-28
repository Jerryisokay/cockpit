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
        <!-- 动态路由表 -->
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

    //监听屏幕大小
    window.onresize = () =>{
      this.$store.dispatch('setPageHeightAction')
    }

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
    }
  },
  methods: {
    //地图拖拽数据
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
