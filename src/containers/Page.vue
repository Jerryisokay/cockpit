<template>
  <div>
    <div class="aside-lf aside-dialog-group" :style='{"height": pageHeight - 110 + "px"}'>
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
        </div>
      </div>
    </div>

    <div class="aside-rt aside-dialog-group" :style='{"height": pageHeight - 110 + "px"}'>
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
        </div>
      </div>

    </div>
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




export default {
  name: 'page',
  data(){
    return {
      list: [],
      leftMenu: [],
      rightMenu: [],
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
  },
  mounted(){
    window.onresize = () =>{
      // console.log(document.documentElement.clientHeight)
      this.pageHeight =  document.documentElement.clientHeight
    }
    this.initial()
  },
  watch:{ //监听路由变化
    $route(to,from){
      setTimeout(() => {
        this.initial()
      },50)
    }
  },
  methods:{
    initial(){
      let routes = this.$route.path.split('/')
      let id = routes[ routes.length - 1 ] || 'homepage'
      this.$store.dispatch('getNavDataAction', { id })
      .then( () => {
        let list = this.list = store.state.charts.CHARTS_DATA[id] || []
        const length = Math.ceil(list.length /2)
        this.leftMenu = list.slice(0, length)
        this.rightMenu = list.slice(length)
      })
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
  }
}
</script>
