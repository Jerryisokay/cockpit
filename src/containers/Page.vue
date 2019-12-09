<template>
  <div>
    <div class="aside-lf aside-dialog-group" :style='{"height": pageHeight - 110 + "px"}'>
      <div class="aside-dialog" :key="'dialog_1_' + i " v-for="(v,i) in leftMenu">
        <div class="aside-dialog-inner">
          <Angleborder type="2"></Angleborder>
          <Piechart v-if="v.type == 0 && v.style != 1" :options="v" :id="'pie_1_' + i + '_' + pageIndex " ></Piechart>
          <SinglePiechart v-if="v.type == 0 && v.style == 1" :options="v" :id="'singlepie_1_' + i" ></SinglePiechart>
          <Barchart v-if="v.type == 1" :options="v" :id="'bar_1_' + i"></Barchart>
          <Linechart v-if="v.type == 2" :options="v" :id="'line_1_' + i"></Linechart>
          <Radarchart v-if="v.type == 3" :options="v" :id="'radar_1_' + i"></Radarchart>
        </div>
      </div>
      <!-- <div class="aside-dialog">
        <div class="aside-dialog-inner">
          <Angleborder type="2"></Angleborder>
          <Piechart id="pie1"></Piechart>
        </div>
      </div>
      <div class="aside-dialog">
        <div class="aside-dialog-inner">
          <Angleborder type="2"></Angleborder>
          <SinglePiechart id="pie2"></SinglePiechart>
        </div>
      </div>
      <div class="aside-dialog">
        <div class="aside-dialog-inner">
          <Angleborder type="2"></Angleborder>
          <Linechart id="line1"></Linechart>
        </div>
      </div>
      <div class="aside-dialog">
        <div class="aside-dialog-inner">
          <Angleborder type="2"></Angleborder>
          <Barchart id="bar1"></Barchart>
        </div>
      </div>
      <div class="aside-dialog">
        <div class="aside-dialog-inner">
          <Angleborder type="2"></Angleborder>
          <Barchart id="bar2" direction="1"></Barchart>
        </div>
      </div> -->

    </div>
    <div class="aside-rt aside-dialog-group" :style='{"height": pageHeight - 110 + "px"}'>
      <div class="aside-dialog" :key="'dialog_2_' + i " v-for="(v,i) in rightMenu">
        <div class="aside-dialog-inner">
          <Angleborder type="2"></Angleborder>
          <Piechart v-if="v.type == 0 && v.style != 1" :options="v" :id="'pie_2_' + i" ></Piechart>
          <SinglePiechart v-if="v.type == 0 && v.style == 1" :options="v" :id="'singlepie_2_' + i" ></SinglePiechart>
          <Barchart v-if="v.type == 1" :options="v" :id="'bar_2_' + i"></Barchart>
          <Linechart v-if="v.type == 2" :options="v" :id="'line_2_' + i"></Linechart>
          <Radarchart v-if="v.type == 3" :options="v" :id="'radar_2_' + i"></Radarchart>
        </div>
      </div>

      <!-- <div class="aside-dialog">
        <div class="aside-dialog-inner">
          <Angleborder type="2"></Angleborder>
          <Gaugechart id="gauge1"></Gaugechart>
        </div>
      </div>
      <div class="aside-dialog">
        <div class="aside-dialog-inner">
          <Angleborder type="2"></Angleborder>
          <Scatterchart id="scatter1"></Scatterchart>
        </div>
      </div>
      <div class="aside-dialog">
        <div class="aside-dialog-inner">
          <Angleborder type="2"></Angleborder>
          <Radarchart id="radar1"></Radarchart>
        </div>
      </div>
      <div class="aside-dialog">
        <div class="aside-dialog-inner">
          <Angleborder type="2"></Angleborder>
          <Funnelchart id="funnel1"></Funnelchart>
        </div>
      </div> -->
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
      pageHeight :  document.documentElement.clientHeight
    }
  },
  computed:{
    pageIndex(){
      return store.state.base.PAGE_INDEX
    },
    // leftMenu(){
    //   const list = this.list
    //   console.log('====================================');
    //   console.log(list);
    //   console.log('====================================');
    //   const length = Math.ceil(list.length /2)
    //   return list.slice(0, length)
    // },
    // rightMenu(){
    //   const list = this.list
    //   const length = Math.ceil(list.length /2)
    //   return list.slice(length, list.length)
    // },
  },
  mounted(){
    window.onresize = () =>{
      this.pageHeight =  document.documentElement.clientHeight
    }
    this.initial()
  },
  watch:{ //监听路由变化
    $route(to,from){
      this.initial()
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
      console.log('1')
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
    Sunburstchart,
    ThemeRiverchart,
  }
}
</script>
