<template>
  <div class="root-container" :class="theme">
    <div class="container" :style='{"min-height": pageHeight + "px"}'>
      <!-- 导航 -->
      <Navigator></Navigator>

      <!-- <div v-if="theme == 'light'" class="nav">
        <div class="nav-title">蓝色科技管理指挥平台</div>
        <div class="nav-menu">
          <div @click="navClickFun(v, i)" class="nav-item" v-for="(v,i) in navData" :key="i" :class="{'active': pageIndex === i}">
            <span :class="{'nav-border-rt': i != navData.length -1}">{{v.name}}</span>
          </div>
        </div>
      </div> -->

      <div class="main-container" :style='{"height": pageHeight - 160 + "px"}'>
        <div class="mid-container-outer">
          <div class="mid-container-inner">
            <Angleborder type="1"></Angleborder>
            <!-- <Mapchart @drag="dragData" :theme="theme"></Mapchart> -->
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
      charts:[
        {
          id: 'pie1',
          options:{
            type:'line',
            name: '陈昌辉体重变化(单位：kg)',
            titles: ['一月','二月','三月','四月','五月'],
            data: [190, 190, 192, 191, 200],
          }
        },
        {
          id: 'line1',
          options:{
            type:'pie',
            name: '陈昌辉早餐种类及次数',
            titles: ['包子','汉堡','煎饼'],
            data: [
                {value:335, name:'包子'},
                {value:310, name:'汉堡'},
                {value:234, name:'煎饼'},
            ]
          }
        }
      ]
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
    let timer = setInterval(() => {
      this.initial()
    }, parseInt(this.refreshInterval) * 1000)

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
      let routes = this.$route.path.split('/')
      let id = routes[ routes.length - 1 ] || 'homepage'

      this.$store.dispatch('loadNavDataAction')
      .then( data => {
        let isCurrent = false
        data.map( (item, index ) => {
          if(item.id == id){
            isCurrent = true
            this.$store.dispatch('setPageIndexAction', {index})
          }
        })
        if(!isCurrent){
          throw new Errow()
        }
      })
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
