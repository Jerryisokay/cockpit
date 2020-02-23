<template>
  <div :id="id" class="chart-inner">
    <div class="chart-title">{{this.options.title}}</div>
    <div class="chart-statistic-box" :style="{'max-height': tableHeight + 'px'}">
        <div v-for="(item, $index) in series" :key="$index" class="chart-statistic-item">
          <div class="chart-statistic-value"><span :style="{'color': colors[$index]}">{{item.value}}</span>{{item.name}}</div>
          <div class="chart-statistic-title">{{item.title}}</div>
        </div>
    </div>
    <div class="chart-subtitle">{{this.options.description}}</div>
  </div>
</template>

<script>
import store from '@/store'

export default {
  name: "statisticchart",
  data() {
    return {
      themeColors:{},
      sortByAsc: false,
      sortByName: '降序',
      sortProperty: '',
      series: [],
    };
  },
  props: {
    id: { type: String },
    width: { type: String, default: "200px" },
    height: { type: String, default: "200px" },
    options:{
      type:Object,
      default(){
        return {
          title: '访问来源',
          description :'单位/人',
          type: 20,
          style: 0,
          colors:['#19D672','#FD517D','#76A5D9'],
          series: [],
          treeData: null,
          sunburstData:null,
          scatterData:null,
          riverData:null
        }
      }
    }
  },
  computed: {
    titles(){
      const titles = []
      this.options.series.map( v =>{
        v.data.map( d => {
          if(titles.indexOf(d.name) < 0) titles.push( d.name )
        })
      })
      return titles
    },
    theme(){
      return store.state.base.THEME_TYPE
    },
    colors(){
      let colors = this.options.colors || []
      return colors.concat(store.state.base.COLOR_REPOSITORY)
    },
    gridHeight(){
      return parseInt((store.state.base.PAGE_HEIGHT - 110)/12)
    },
    tableHeight(){
      return this.gridHeight * this.options.height - 62
    }
  },
  mounted(){
    // console.log(this.options)
    this.drawChart()
  },
  watch:{
    options:{
      immediate:false,
      handler:function(){
        setTimeout( () => {
          this.myChart && this.myChart.clear()
          this.drawChart()
        },200)
     }
    },
    theme:{
      immediate:false,
      handler:function(){
        setTimeout( () => {
          this.myChart && this.myChart.clear()
          this.drawChart()
        },200)
     }
    }
  },
  methods: {
    drawChart(){
      this.series = []
      Array.isArray(this.options.series) && this.options.series.map( (item, index) => {
        var values = {}
        if(Array.isArray(item.data) && item.data.length){
          let data = item.data[0]
          data.title = item.name
          this.series.push(data)
        }
      })
      console.log(this.series)
    }
  }

};
</script>
