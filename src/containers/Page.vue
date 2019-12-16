<template>
  <div>
    <div class="aside-lf aside-dialog-group" :style='{"height": pageHeight - 110 + "px"}'>
      <div class="aside-dialog" :key="'dialog_1_' + i " v-for="(v,i) in leftMenu">
        <div class="aside-dialog-inner">
          <Angleborder type="2"></Angleborder>
          <Piechart v-if="v.type == 0 && v.style != 1" :options="v" :id="'pie_1_' + i + '_' + pageIndex"></Piechart>
          <SinglePiechart v-if="v.type == 0 && v.style == 1" :options="v" :id="'singlepie_1_' + i + '_' + pageIndex" ></SinglePiechart>
          <Barchart v-if="v.type == 1" :options="v" :id="'bar_1_' + i + '_' + pageIndex"></Barchart>
          <Linechart v-if="v.type == 2" :options="v" :id="'line_1_' + i + '_' + pageIndex"></Linechart>
          <Radarchart v-if="v.type == 3" :options="v" :id="'radar_1_' + i + '_' + pageIndex"></Radarchart>
          <Funnelchart v-if="v.type == 4" :options="v" :id="'funnel_1_' + i + '_' + pageIndex"></Funnelchart>
          <Gaugechart v-if="v.type == 5" :id="'gauge_1_' + i + '_' + pageIndex"></Gaugechart>
          <Treechart v-if="v.type == 6" :options="v" :id="'treechart_1_' + i + '_' + pageIndex"></Treechart>
          <Sunburstchart v-if="v.type == 7" :options="v" :id="'sunburst_1_' + i + '_' + pageIndex"></Sunburstchart>
          <Scatterchart v-if="v.type == 8" :options="v" :id="'scatterchart_1_' + i + '_' + pageIndex"></Scatterchart>
          <ThemeRiverchart v-if="v.type == 9" :options="v" :id="'themeriverchart_1_' + i + '_' + pageIndex"></ThemeRiverchart>
        </div>
      </div>
    </div>

    <div class="aside-rt aside-dialog-group" :style='{"height": pageHeight - 110 + "px"}'>
      <div class="aside-dialog" :key="'dialog_2_' + i " v-for="(v,i) in rightMenu">
        <div class="aside-dialog-inner">
          <Angleborder type="2"></Angleborder>
          <Piechart v-if="v.type == 0 && v.style != 1" :options="v" :id="'pie_2_' + i + '_' + pageIndex" ></Piechart>
          <SinglePiechart v-if="v.type == 0 && v.style == 1" :options="v" :id="'singlepie_2_' + i + '_' + pageIndex" ></SinglePiechart>
          <Barchart v-if="v.type == 1" :options="v" :id="'bar_2_' + i + '_' + pageIndex"></Barchart>
          <Linechart v-if="v.type == 2" :options="v" :id="'line_2_' + i + '_' + pageIndex"></Linechart>
          <Radarchart v-if="v.type == 3" :options="v" :id="'radar_2_' + i + '_' + pageIndex"></Radarchart>
          <Funnelchart v-if="v.type == 4" :options="v" :id="'funnel_2_' + i + '_' + pageIndex"></Funnelchart>
          <Gaugechart v-if="v.type == 5" :id="'gauge_2_' + i + '_' + pageIndex"></Gaugechart>
          <Treechart v-if="v.type == 6" :options="v" :id="'treechart_2_' + i + '_' + pageIndex"></Treechart>
          <Sunburstchart v-if="v.type == 7" :options="v" :id="'sunburst_2_' + i + '_' + pageIndex"></Sunburstchart>
          <Scatterchart v-if="v.type == 8" :options="v" :id="'scatterchart_2_' + i + '_' + pageIndex"></Scatterchart>
          <ThemeRiverchart v-if="v.type == 9" :options="v" :id="'themeriverchart_2_' + i + '_' + pageIndex"></ThemeRiverchart>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import store from '@/store'
import { mapGetters } from 'vuex'

import Barchart from '@/components/Barchart'
import Piechart from '@/components/Piechart'
import SinglePiechart from '@/components/SinglePiechart'
import Linechart from '@/components/Linechart'
import Gaugechart from '@/components/Gaugechart'
import Scatterchart from '@/components/Scatterchart'
import Radarchart from '@/components/Radarchart'
import Funnelchart from '@/components/Funnelchart'
import Treechart from '@/components/Treechart'
import Sunburstchart from '@/components/Sunburstchart'
import ThemeRiverchart from '@/components/ThemeRiverchart'

import Angleborder from '@/components/Angleborder'


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
      console.log(document.documentElement.clientHeight)
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
    Barchart,
    Piechart,
    SinglePiechart,
    Linechart,
    SinglePiechart,
    Gaugechart,
    Scatterchart,
    Radarchart,
    Funnelchart,
    Treechart,
    Sunburstchart,
    ThemeRiverchart,
  }
}
</script>
