<template>
  <div class="root-container" :class="theme">
    <div class="container" :style='{"min-height": pageHeight + "px"}'>
      <!-- 导航 -->
      <Navigator v-if="!hideNav"></Navigator>
      <!-- 地图部分 -->
      <div class="main-container" :style='{"height": pageHeight - 25 - navHeight + "px"}'>
        <!-- <div v-if="showMap" class="mid-container-outer">
          <div class="mid-container-inner">
            <Angleborder type="1"></Angleborder>
            <Mapchart @drag="dragData" :theme="theme"></Mapchart>
          </div>
        </div> -->
        <!-- 动态路由表 -->
        <!-- <router-view></router-view> -->
        <Page></Page>
      </div>
    </div>
  </div>
</template>

<script>
import Page from './Page'
import Mapchart from '@/components/Mapchart'
import Piechart from '@/components/Piechart'
import Linechart from '@/components/Linechart'

import Navigator from '@/components/Navigator'
import Angleborder from '@/components/Angleborder'
import { mapGetters } from 'vuex'

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
    Page,
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

    // this.initial()


  },
  computed : {
    // pageIndex(){
    //   return store.state.base.PAGE_INDEX
    // },
    theme(){
      return store.state.base.THEME_TYPE
    },
    pageHeight(){
      return store.state.base.PAGE_HEIGHT
    },
    hideNav(){
      return store.state.base.HIDE_NAV
    },
    navHeight(){
      return this.hideNav ? 0 : 85;
    },
    showMap(){
      return store.state.map.SHOW_MAP
    }
  },
  methods: {
    // //地图拖拽数据
    // dragMap (data) {
    //   this.dragData = {
    //     lng: data.position.lng,
    //     lat: data.position.lat,
    //     address: data.address,
    //     nearestJunction: data.nearestJunction,
    //     nearestRoad: data.nearestRoad,
    //     nearestPOI: data.nearestPOI
    //   }
    // },
    initial(){
      let sysid = this.$route.params.sysid
      if(sysid){
        console.log('sysid ' + sysid)
        this.$store.dispatch('setSystemIdAction', {sysid})
        .then( () => {
          this.$store.dispatch('loadNavDataAction', {sysid})
        })
      }
    }
  }

}

</script>
