<template>
  <div :id="id" class="chart-inner"></div>
</template>

<script>
import store from '@/store'

export default {
  name: "bubblechart",
  data() {
    return {
      themeColors:{
        dark: {
          textColor: '#dce2f2',
          textColor2: '#cccccc',
          emphasisColor: '#ffc911',
          backgroundColor: '#264e94',
          shadowColor1: 'rgba(0, 0, 0, 0.5)',
          shadowColor2: '#2584e8',
          lineColor:'rgba(255,255,255,0.2)'
        },
        light: {
          textColor: '#333333',
          textColor2: '#dce2f2',
          emphasisColor: '#c6044d',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          shadowColor1: 'rgba(0, 0, 0, 0.5)',
          shadowColor2: '#77022e',
          lineColor: '#dddddd'
        },
        blue: {
          textColor: '#dce2f2',
          textColor2: '#cccccc',
          emphasisColor: '#ffc911',
          backgroundColor: '#264e94',
          shadowColor1: 'rgba(0, 0, 0, 0.5)',
          shadowColor2: '#2584e8',
          lineColor:'rgba(255,255,255,0.2)'
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
          bubbleData:[{
            name:"系列1",
            data:[
              [90, 80, 200,'名称1'],
              [80, 60, 140,'名称2'],
              [10, 180, 200,'名称3']
            ]
          }]
        }
      }
    }
  },
  mounted(){
    // console.log(this.options)
    setTimeout( () => {
      this.drawChart()
    },200)
  },
  computed:{
    titles(){
      const titles = []
      Array.isArray(this.options.bubbleData) && this.options.bubbleData.map( v =>{
        if(titles.indexOf(v.name) < 0) titles.push( v.name )
      })
      return titles
    },
    maxValue(){
      const values = []
      Array.isArray(this.options.bubbleData) && this.options.bubbleData.map( v =>{
        Array.isArray(v.data) && v.data.map( d => {
          values.push(d[2])
        })
      })
      return Math.max(...values)
    },
    theme(){
      return store.state.base.THEME_TYPE
    }
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
      let _self = this

      let data = []

      let series = []
      Array.isArray(this.options.bubbleData) && this.options.bubbleData.map((item, index) => {
        // let innerData = []
        // Array.isArray(item.data) && item.data.map( (v, i) => {
        //   innerData[i] = v.concat([item.name])
        // })
        // data.push(innerData)
        series.push({
          data: item.data,
          type: 'scatter',
          name: item.name,
          color: new this.$echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                    offset: 0,
                    color: '#fff'
                }, {
                    offset: 0.3,
                    color: this.options.colors[index]
                },{
                    offset: 1,
                    color: '#000'
                }]),
          symbolSize: function (data) {
              return 20* data[2] / (_self.maxValue)
          },
          type: 'scatter',
          label: {
              emphasis: {
                  show: true,
                  formatter: function (param) {
                      return param.data[3];
                  },
                  textStyle: {
                    color: this.themeColors[this.theme].textColor,
                  },
                  position: 'top'
              }
          },
          itemStyle: {
              normal: {
                  shadowBlur: 5,
                  shadowColor: this.themeColors[this.theme].shadowColor1,
                  shadowOffsetY: 5,
              }
          }
        })
      })

      console.log(series)

      this.myChart.setOption({
        title : {
            text: this.options.title,
            x:'left',
            textStyle:{
              color: this.themeColors[this.theme].textColor,//'#76a5d9'
            },
        },
        graphic:[
          {
            type:'text',  //副标题文字
            left: 10,
            bottom: 0,
            z:3,
            style:{
                text: this.options.description,
                // textAlign:'center',
                fill: this.themeColors[this.theme].textColor,
                fontSize:12,
            }
          }
        ],
        legend: {
            // orient: 'horizontal',
            data: this.titles,
            x : 'center',
            y : 20,
            textStyle: {
              color: this.themeColors[this.theme].textColor,
              fontSize: 11
            }
        },
        xAxis: {
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: this.themeColors[this.theme].lineColor,
                }
            },
            axisLabel: { //设置x轴的字
              show:true,
              interval:0,//使x轴横坐标全部显示
              textStyle: {//x轴字体样式
                color: this.themeColors[this.theme].textColor,
                margin: 15,
                fontSize: 10
              }
            }
        },
        yAxis: {
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: this.themeColors[this.theme].lineColor,
                }
            },
            axisLabel:{
              show:true,
              textStyle:{
                fontSize: 10,
                color: this.themeColors[this.theme].textColor,
              },
            },
            scale: true
        },
        grid: {
          left: 10,
          right: 10,
          top: 45,
          bottom: 20,
          containLabel : true
        },
        series: series
      });
    }
  }

};
</script>
