<template>
  <div>
    <!-- 栅格布局 -->
    <div v-if="layout == 1" :style='{"height": pageHeight - 110 + "px"}'>
      <div class="grid-dialog-group">
        <div class="grid-dialog-outer" :style='{"width": v.width * gridWidth +"px", "height": v.height * gridHeight +"px",
            "left": v.positionX * gridWidth +"px", "top": v.positionY * gridHeight +"px" }'
          v-for="(v,i) in list" :key="'dialog_1_' + i ">
          <div class="grid-dialog-middle">
            <Angleborder type="2"></Angleborder>
            <div class="grid-dialog-inner" :style='{"height": v.height * gridHeight -22 +"px"}'>
              <Piechart v-if="v.type == 0" :options="v" :pageId="pageId" :id="'pie_1_' + i + '_' + pageIndex"></Piechart>
              <Multipiechart v-if="v.type == 1" :options="v" :pageId="pageId" :id="'multipie_1_' + i + '_' + pageIndex"></Multipiechart>
              <SinglePiechart v-if="v.type == 2" :options="v" :pageId="pageId" :id="'singlepie_1_' + i + '_' + pageIndex" ></SinglePiechart>
              <Barchart v-if="v.type == 3 || v.type == 4" :pageId="pageId" :options="v" :id="'bar_1_' + i + '_' + pageIndex"></Barchart>
              <Multibarchart v-if="v.type == 5 || v.type == 6" :pageId="pageId" :options="v" :id="'multibar_1_' + i + '_' + pageIndex"></Multibarchart>
              <Linechart v-if="v.type == 7" :options="v" :pageId="pageId" :id="'line_1_' + i + '_' + pageIndex"></Linechart>
              <Lineareachart v-if="v.type == 8" :options="v" :pageId="pageId" :id="'line_1_' + i + '_' + pageIndex"></Lineareachart>
              <Mixbarlinechart v-if="v.type == 9" :options="v" :pageId="pageId" :id="'line_1_' + i + '_' + pageIndex"></Mixbarlinechart>
              <Radarchart v-if="v.type == 10" :options="v" :pageId="pageId" :id="'radar_1_' + i + '_' + pageIndex"></Radarchart>
              <Funnelchart v-if="v.type == 11" :options="v" :pageId="pageId" :id="'funnel_1_' + i + '_' + pageIndex"></Funnelchart>
              <Gaugechart v-if="v.type == 12" :options="v" :pageId="pageId" :id="'gauge_1_' + i + '_' + pageIndex"></Gaugechart>
              <Treechart v-if="v.type == 13" :options="v" :pageId="pageId" :id="'treechart_1_' + i + '_' + pageIndex"></Treechart>
              <Treemapchart v-if="v.type == 14" :options="v" :pageId="pageId" :id="'treechartmap_1_' + i + '_' + pageIndex"></Treemapchart>
              <Sunburstchart v-if="v.type == 15" :options="v" :pageId="pageId" :id="'sunburst_1_' + i + '_' + pageIndex"></Sunburstchart>
              <Scatterchart v-if="v.type == 16" :options="v" :pageId="pageId" :id="'scatterchart_1_' + i + '_' + pageIndex"></Scatterchart>
              <Bubblechart v-if="v.type == 17" :options="v" :pageId="pageId" :id="'bubblechart_1_' + i + '_' + pageIndex"></Bubblechart>
              <ThemeRiverchart v-if="v.type == 18" :options="v" :pageId="pageId" :id="'themeriverchart_1_' + i + '_' + pageIndex"></ThemeRiverchart>
              <Calendarchart v-if="v.type == 19" :options="v" :pageId="pageId" :id="'calendarchart_1_' + i + '_' + pageIndex"></Calendarchart>
              <Tablechart v-if="v.type == 20" :options="v" :pageId="pageId" :id="'tablechart_1_' + i + '_' + pageIndex"></Tablechart>
              <Statisticchart v-if="v.type == 21" :options="v" :pageId="pageId" :id="'statisticchart_1_' + i + '_' + pageIndex"></Statisticchart>
              <Equipmentchart v-if="v.type == 22" :options="v" :pageId="pageId" :index="i" :id="'equipmentchart_1_' + i + '_' + pageIndex"></Equipmentchart>
              <Iframepage v-if="v.type == 23" :options="v" :pageId="pageId" :index="i" :id="'iframepage_1_' + i + '_' + pageIndex" :innerHeight="v.height * gridHeight -22"></Iframepage>
              <Videopage v-if="v.type == 24" :options="v" :pageId="pageId" :index="i" :id="'videopage_1_' + i + '_' + pageIndex" :innerHeight="v.height * gridHeight -22"></Videopage>
            </div>
          </div>
        </div>
        <!-- 地图 -->
        <div v-if="mapData.gmapmenuid == 1" class="grid-dialog-outer" :style='{"width": mapData.gmapwidth * gridWidth +"px", "height": mapData.gmapheight * gridHeight +"px",
            "left": mapData.gmappositionX * gridWidth +"px", "top": mapData.gmappositionY * gridHeight +"px" }'>
          <div class="grid-dialog-middle">
            <Angleborder type="2"></Angleborder>
            <div class="grid-dialog-inner" :style='{"height": mapData.gmapheight * gridHeight -22 +"px"}'>
              <Mapchart @drag="dragData" :mapData="mapData" :theme="theme"></Mapchart>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 传统布局 -->
    <!-- 左边图表列表 -->
    <!--
    <div v-if="layout == 2" class="aside-lf aside-dialog-group" :style='{"height": pageHeight - 110 + "px"}'>
      <div class="aside-dialog" :key="'dialog_1_' + i " v-for="(v,i) in leftMenu">
        <div class="aside-dialog-inner" :class="{'large': v.size == 1}">
          <Angleborder type="2"></Angleborder>
          <Piechart v-if="v.type == 0" :options="v" :id="'pie_1_' + i + '_' + pageIndex"></Piechart>
          <Multipiechart v-if="v.type == 1" :options="v" :id="'multipie_1_' + i + '_' + pageIndex"></Multipiechart>
          <SinglePiechart v-if="v.type == 2" :options="v" :id="'singlepie_1_' + i + '_' + pageIndex" ></SinglePiechart>
          <Barchart v-if="v.type == 3 || v.type == 4" :options="v" :id="'bar_1_' + i + '_' + pageIndex"></Barchart>
          <Multibarchart v-if="v.type == 5 || v.type == 6" :options="v" :id="'multibar_1_' + i + '_' + pageIndex"></Multibarchart>
          <Linechart v-if="v.type == 7" :options="v" :id="'line_1_' + i + '_' + pageIndex"></Linechart>
          <Lineareachart v-if="v.type == 8" :options="v" :id="'line_1_' + i + '_' + pageIndex"></Lineareachart>
          <Mixbarlinechart v-if="v.type == 9" :options="v" :id="'line_1_' + i + '_' + pageIndex"></Mixbarlinechart>
          <Radarchart v-if="v.type == 10" :options="v" :id="'radar_1_' + i + '_' + pageIndex"></Radarchart>
          <Funnelchart v-if="v.type == 11" :options="v" :id="'funnel_1_' + i + '_' + pageIndex"></Funnelchart>
          <Gaugechart v-if="v.type == 12" :options="v" :id="'gauge_1_' + i + '_' + pageIndex"></Gaugechart>
          <Treechart v-if="v.type == 13" :options="v" :id="'treechart_1_' + i + '_' + pageIndex"></Treechart>
          <Treemapchart v-if="v.type == 14" :options="v" :id="'treechartmap_1_' + i + '_' + pageIndex"></Treemapchart>
          <Sunburstchart v-if="v.type == 15" :options="v" :id="'sunburst_1_' + i + '_' + pageIndex"></Sunburstchart>
          <Scatterchart v-if="v.type == 16" :options="v" :id="'scatterchart_1_' + i + '_' + pageIndex"></Scatterchart>
          <Bubblechart v-if="v.type == 17" :options="v" :id="'bubblechart_1_' + i + '_' + pageIndex"></Bubblechart>
          <ThemeRiverchart v-if="v.type == 18" :options="v" :id="'themeriverchart_1_' + i + '_' + pageIndex"></ThemeRiverchart>
          <Calendarchart v-if="v.type == 19" :options="v" :id="'calendarchart_1_' + i + '_' + pageIndex"></Calendarchart>
          <Tablechart v-if="v.type == 20" :options="v" :id="'tablechart_1_' + i + '_' + pageIndex"></Tablechart>
          <Statisticchart v-if="v.type == 21" :options="v" :id="'statisticchart_1_' + i + '_' + pageIndex"></Statisticchart>
        </div>
      </div>
    </div>
    -->

    <!-- 右边图表列表 -->
    <!--
    <div v-if="layout == 2" class="aside-rt aside-dialog-group" :style='{"height": pageHeight - 110 + "px"}'>
      <div class="aside-dialog" :key="'dialog_2_' + i " v-for="(v,i) in rightMenu">
        <div class="aside-dialog-inner" :class="{'large': v.size == 1}">
          <Angleborder type="2"></Angleborder>
          <Piechart v-if="v.type == 0" :options="v" :id="'pie_2_' + i + '_' + pageIndex" ></Piechart>
          <Multipiechart v-if="v.type == 1" :options="v" :id="'multipie_2_' + i + '_' + pageIndex"></Multipiechart>
          <SinglePiechart v-if="v.type == 2" :options="v" :id="'singlepie_2_' + i + '_' + pageIndex" ></SinglePiechart>
          <Barchart v-if="v.type == 3 || v.type == 4" :options="v" :id="'bar_2_' + i + '_' + pageIndex"></Barchart>
          <Multibarchart v-if="v.type == 5 || v.type == 6" :options="v" :id="'multibar_2_' + i + '_' + pageIndex"></Multibarchart>
          <Linechart v-if="v.type == 7" :options="v" :id="'line_2_' + i + '_' + pageIndex"></Linechart>
          <Lineareachart v-if="v.type == 8" :options="v" :id="'line_2_' + i + '_' + pageIndex"></Lineareachart>
          <Mixbarlinechart v-if="v.type == 9" :options="v" :id="'line_2_' + i + '_' + pageIndex"></Mixbarlinechart>
          <Radarchart v-if="v.type == 10" :options="v" :id="'radar_2_' + i + '_' + pageIndex"></Radarchart>
          <Funnelchart v-if="v.type == 11" :options="v" :id="'funnel_2_' + i + '_' + pageIndex"></Funnelchart>
          <Gaugechart v-if="v.type == 12" :options="v" :id="'gauge_2_' + i + '_' + pageIndex"></Gaugechart>
          <Treechart v-if="v.type == 13" :options="v" :id="'treechart_2_' + i + '_' + pageIndex"></Treechart>
          <Treemapchart v-if="v.type == 14" :options="v" :id="'treechartmap_2_' + i + '_' + pageIndex"></Treemapchart>
          <Sunburstchart v-if="v.type == 15" :options="v" :id="'sunburst_2_' + i + '_' + pageIndex"></Sunburstchart>
          <Scatterchart v-if="v.type == 16" :options="v" :id="'scatterchart_2_' + i + '_' + pageIndex"></Scatterchart>
          <Bubblechart v-if="v.type == 17" :options="v" :id="'bubblechart_2_' + i + '_' + pageIndex"></Bubblechart>
          <ThemeRiverchart v-if="v.type == 18" :options="v" :id="'themeriverchart_2_' + i + '_' + pageIndex"></ThemeRiverchart>
          <Calendarchart v-if="v.type == 19" :options="v" :id="'calendarchart_2_' + i + '_' + pageIndex"></Calendarchart>
          <Tablechart v-if="v.type == 20" :options="v" :id="'tablechart_2_' + i + '_' + pageIndex"></Tablechart>
          <Statisticchart v-if="v.type == 21" :options="v" :id="'statisticchart_2_' + i + '_' + pageIndex"></Statisticchart>
        </div>
      </div>
    </div>
    -->
  </div>
</template>

<script>
import store from '@/store'
import { mapGetters } from 'vuex'
import Angleborder from '@/components/Angleborder'

import Piechart from '@/components/Piechart'
import Multipiechart from '@/components/Multipiechart'
import SinglePiechart from '@/components/SinglePiechart'
import Barchart from '@/components/Barchart'
import Multibarchart from '@/components/Multibarchart'
import Linechart from '@/components/Linechart'
import Lineareachart from '@/components/Lineareachart'
import Mixbarlinechart from '@/components/Mixbarlinechart'
import Radarchart from '@/components/Radarchart'
import Funnelchart from '@/components/Funnelchart'
import Gaugechart from '@/components/Gaugechart'
import Treechart from '@/components/Treechart'
import Treemapchart from '@/components/Treemapchart'
import Sunburstchart from '@/components/Sunburstchart'
import Scatterchart from '@/components/Scatterchart'
import Bubblechart from '@/components/Bubblechart'
import ThemeRiverchart from '@/components/ThemeRiverchart'
import Calendarchart from '@/components/Calendarchart'
import Tablechart from '@/components/Tablechart'
import Statisticchart from '@/components/Statisticchart'
import Equipmentchart from '@/components/Equipmentchart'
import Videopage from '@/components/Videopage'
import Iframepage from '@/components/Iframepage'

import Mapchart from '@/components/Mapchart'



export default {
  name: 'page',
  data(){
    return {
      list: [],
      leftMenu: [],
      rightMenu: [],
      dragData: {
        lng: null,
        lat: null,
        address: null,
        nearestJunction: null,
        nearestRoad: null,
        nearestPOI: null
      },
      mapData: {
        gmapmenuid: 0,
        gmapwidth: 6,
        gmapheight: 6,
        gmappositionX: 6,
        gmappositionY: 6,
      },
      pageId: '',
      // pageHeight :  document.documentElement.clientHeight
    }
  },
  computed:{
    pageIndex(){
      return store.state.base.PAGE_INDEX
    },
    pageHeight(){
      return store.state.base.PAGE_HEIGHT
    },
    gridHeight(){
      return parseFloat((this.pageHeight - 110)/36)
    },
    gridWidth(){
      return parseFloat((document.documentElement.clientWidth - 40)/36)
    },
    refreshInterval(){
      return store.state.base.REFRESH_INTERVAL
    },
    theme(){
      return store.state.base.THEME_TYPE
    },
    layout(){
      return store.state.base.LAYOUT_TYPE
    }
  },
  mounted(){
    window.onresize = () =>{
      this.pageHeight =  document.documentElement.clientHeight
    }

    // 定时刷新
    // let timer = setInterval(() => {
    //   this.initial()
    // }, parseInt(this.refreshInterval) * 1000)
    setTimeout(() => {
      // console.log('路由变化')
      this.initial()
    },50)
  },
  watch:{ //监听路由变化
    $route(to,from){
      setTimeout(() => {
        // console.log('路由变化')
        this.initial()
      },50)
    }
  },
  methods:{
    initial(){
      let nav = store.state.base.NAV_DATA
      //是否已获取导航
      if(!nav.length){
        if(this.pageIndex == 0){
          // 超出菜单长度，跳转回首页
          this.$router.push({ path: '/' })
        }
        //获取导航
        this.$store.dispatch('loadNavDataAction')
        .then( (data) => {
          // console.log('首次获取导航');
          // 获取页面ID
          if(Array.isArray(data) && data.length){
            if(data.length > this.pageIndex){
              let id = this.pageId =  data[this.pageIndex].id
              // console.log('id ' + id)
              // console.log('pageIndex ' + this.pageIndex)
              //获取图表
              // console.log('获取第'+ parseInt(this.pageIndex + 1) +'页图表');
              this.$store.dispatch('getNavDataAction', { id })
              .then( () => {
                let list = this.list = store.state.charts.CHARTS_DATA[id] || []
                // const length = Math.ceil(list.length /2)
                // this.leftMenu = list.slice(0, length)
                // this.rightMenu = list.slice(length)
              })

              // 获取地图信息
              this.$store.dispatch('loadMarkersAction', { id })
              .then( (data) => {
                // console.log(data.gmapmenuid)
                this.mapData = data
              })

            }else{
              // 超出菜单长度，跳转回首页
              this.$store.dispatch('setPageIndexAction', {index: 0})
              this.$router.push({ path: '/' })
            }
          }
        })
        .catch( err => {
          this.$store.dispatch('setPageIndexAction', {index: 0})
          this.$router.push({ path: '/' })
        } )
      }else{
        let routes = this.$route.path.split('/')
        let id = routes[ routes.length - 1 ] || nav[this.pageIndex].id

        if(id == nav[this.pageIndex].id ||( id == '' && this.pageIndex == 0)){
          this.pageId = id
          this.$store.dispatch('getNavDataAction', { id })
          .then( () => {
            // console.log('获取第'+ parseInt(this.pageIndex + 1) +'页图表');
            let list = this.list = store.state.charts.CHARTS_DATA[id] || []
            // const length = Math.ceil(list.length /2)
            // this.leftMenu = list.slice(0, length)
            // this.rightMenu = list.slice(length)
            // 获取地图信息
              this.$store.dispatch('loadMarkersAction', { id })
              .then( (data) => {
                // console.log(data.gmapmenuid)
                this.mapData = data
              })
          })
        }else{
          // 当前路由不对,跳转回首页
          this.$store.dispatch('setPageIndexAction', {index: 0})
          this.$router.push({ path: '/' })
        }

      }

    },
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
    }
  },
  components:{
    Angleborder,
    Piechart,
    Multipiechart,
    SinglePiechart,
    Barchart,
    Multibarchart,
    Linechart,
    Lineareachart,
    Mixbarlinechart,
    Radarchart,
    Funnelchart,
    Gaugechart,
    Treechart,
    Treemapchart,
    Sunburstchart,
    Scatterchart,
    Bubblechart,
    ThemeRiverchart,
    Calendarchart,
    Tablechart,
    Statisticchart,
    Mapchart,
    Equipmentchart,
    Iframepage,
    Videopage,
  }
}
</script>
