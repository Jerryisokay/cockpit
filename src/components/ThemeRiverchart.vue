<template>
  <div :id="id" class="chart-inner"></div>
</template>

<script>
import store from '@/store'

export default {
  name: "radarchart",
  data() {
    return {
      themeColors:{
        dark: {
          textColor: '#dce2f2',
          shadowColor1: 'rgba(0, 0, 0, 0.2)',
          fillColor1:'#282a36'
        },
        light: {
          textColor: '#333333',
          shadowColor1: '#77022e',
          fillColor1: '#ffffff',
        }
      }
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
          title: '访问来源',
          description: '单位/人',
          type: 9,
          style: 0,
          colors: ['#19D672', '#FD517D', '#76A5D9'],
          series: [],
          sunburstData: null,
          treeData: null,
          scatterData: null,
          riverData: [['2015/11/08',10,'DQ'],['2015/11/09',15,'DQ'],['2015/11/10',35,'DQ']]
        }
      }
    }
  },
  computed:{
    titles(){
      const titles = []
      Array.isArray(this.options.riverData) && this.options.riverData.map( v =>{
        Array.isArray(v) && v.length >= 2 && v.map( d => {
          if(titles.indexOf(d[2]) < 0){
            titles.push( d[2] )
          }
        })
      })
      return titles
    },
    categories(){
      const categories = []
      Array.isArray(this.options.riverData) && this.options.riverData.map( v =>{
        Array.isArray(v) && v.length >= 2 && v.map( d => {
          if(categories.indexOf(d[0]) < 0){
            categories.push( d[0] )
          }
        })
      })
      return categories
    },
    theme(){
      return store.state.base.THEME_TYPE
    }
  },
  mounted(){
    // console.log(this.options)
    setTimeout( () => {
      this.drawChart()
    },200)
  },
  watch:{
    options:{
      immediate:true,
      handler:function(){
        setTimeout( () => {
          this.myChart && this.myChart.clear()
          this.drawChart()
        },200)
     }
    },
    theme:{
      immediate:true,
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
      this.myChart = this.$echarts.init(this.$el)

      let data = this.options.riverData
      this.myChart.setOption({
        title : {
            text: this.options.title,
            // subtext: '纯属虚构',
            x:'left',
            textStyle:{
              color: this.themeColors[this.theme].textColor,
            },
        },
        graphic:[
          {
            type:'text',  //副标题文字
            right: 20,
            top:10,
            z:3,
            style:{
                text: this.options.description,
                // textAlign:'center',
                fill: this.themeColors[this.theme].textColor,
                fontSize:12,
            }
          }
        ],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'line',
              lineStyle: {
                  // color: 'rgba(0,0,0,0.2)',
                  width: 1,
                  type: 'solid'
              }
            },
            position:  function (pos, params, dom, rect, size) {
                // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                var obj = {top: 60};
                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                return obj;
            }
        },
        singleAxis: {
            top: 50,
            bottom: 50,
            axisTick: {},
            axisLabel: {
              fontSize: 10,
              color: this.themeColors[this.theme].textColor
            },
            type: 'time',
            axisPointer: {
                animation: true,
                label: {
                    show: true
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    opacity: 0.2
                }
            }
        },
        series: [
        {
            type: 'themeRiver',
            itemStyle: {
              emphasis: {
                  shadowBlur: 20,
                  shadowColor: 'rgba(0, 0, 0, 0.8)'
              }
            },
            label:{
              color: this.themeColors[this.theme].textColor,
              fontSize: 10
            },
            avoidLabelOverlap: false,
            data: data
        }],
        color: this.options.colors,
      });
    }
  }

};
</script>
