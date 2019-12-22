<template>
  <div :id="id" class="chart-inner">

  </div>
</template>

<script>
import store from '@/store'

export default {
  name: 'barchart',
  data(){
    return {
      themeColors:{
        dark: {
          textColor: '#dce2f2',
          textColor2: '#cccccc',
          emphasisColor: '#ffc911',
          backgroundColor: '#264e94',
          tooltipEmphasisColor: '#1eee10',
          shadowColor1: 'rgba(255, 255, 255, 0.5)',
          shadowColor2: '#2584e8',
          fillColor1:'#2584e8',
          fillColor2:'rgba(255,255,255,0.05)',
          fillColor3:'rgba(255,255,255,0.1)',
          lineColor:'rgba(255,255,255,0.2)'
        },
        light: {
          textColor: '#333333',
          textColor2: '#dce2f2',
          emphasisColor: '#c6044d',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          tooltipEmphasisColor: '#ffffff',
          shadowColor1: 'rgba(255, 255, 255, 0.5)',
          shadowColor2: '#77022e',
          fillColor1: '#77022e',
          fillColor2: 'rgba(0,0,0,0.05)',
          fillColor3: 'rgba(0,0,0,0.1)',
          lineColor: '#dddddd'
        },
        blue: {
          textColor: '#dce2f2',
          textColor2: '#cccccc',
          emphasisColor: '#ffc911',
          backgroundColor: '#264e94',
          tooltipEmphasisColor: '#1eee10',
          shadowColor1: 'rgba(255, 255, 255, 0.5)',
          shadowColor2: '#2584e8',
          fillColor1:'#2584e8',
          fillColor2:'rgba(255,255,255,0.05)',
          fillColor3:'rgba(255,255,255,0.1)',
          lineColor:'rgba(255,255,255,0.2)'
        }
      }
    }
  },
  props:{
    id: { type: String, default: new Date().getTime() },
    options:{
      type:Object,
      default(){
        return {
          title: '访问来源',
          description :'单位/人',
          type: 3,
          style: 0,
          colors:['#19D672','#FD517D','#76A5D9'],
          series: [
            {
              name: '一般量级统计',
              data: [
                {value:60, name:'邮件营销', max:100},
                {value:30, name:'联盟广告', max:100},
                {value:10, name:'视频广告', max:100},
                {value:75, name:'搜索引擎', max:100},
              ]
            }
          ],
          treeData: null,
          sunburstData:null,
          scatterData:null,
          riverData:null,
        }
      }
    }
  },
  computed:{
    // categorys(){
    //   var arr = [];
    //   this.options.data.maps( (item) => {
    //     arr.push(item.name)
    //   })
    //   return arr
    // },
    theme(){
      return store.state.base.THEME_TYPE
    },
    titles(){
      const titles = []
      this.options.series.map( v =>{
        v.data.map( d => {
          if(titles.indexOf(d.name) < 0) titles.push( d.name )
        })
      })
      return titles
    },
    colors(){
      let colors = this.options.colors || []
      return colors.concat(store.state.base.COLOR_REPOSITORY)
    },
    values(){
      var values = [];
      Array.isArray(this.options.series) && this.options.series.map( item => {
        Array.isArray(item.data) && item.data.map( v => {
          values.push(v.value)
        })
      })
      return values
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
  mounted(){
    this.drawChart()
  },
  methods:{
    getDataMax( num ){
      let divider = Math.pow( 10, num.toString().length - 1)
      return Math.ceil(num/ divider ) * divider
    },
    drawChart(){
      // console.log(this.colors)

      this.myChart = this.$echarts.init(this.$el)
      let dataShadow = []
      var max = this.getDataMax(Math.max(...this.values))
      this.values.map( ( v ) =>{
        dataShadow.push( max )
      })

      let xAxisOptions = {
        type: 'category',
        data: this.titles,
        axisTick: {
            show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            width: 1,
            type: "solid"
          }
        },
        axisLabel: { //设置x轴的字
          show:true,
          interval:0,//使x轴横坐标全部显示
          textStyle: {//x轴字体样式
            color: this.themeColors[this.theme].textColor,
            margin: 15,
            fontSize: 10
          },
          formatter: (value) => {
              var texts=value;
              if(texts.length>4){ // 具体多少字就看自己了
                  texts=texts.substr(0,4)+'...';
              }
              return texts;
          }
        },
        z: 10
      }
      let yAxisOptions = {
        type: 'value',
        axisLabel:{
          show:true,
          textStyle:{
            fontSize: 10,
            color: this.themeColors[this.theme].textColor
          },
        },
        splitLine: {
          show: true,
          //  改变轴线颜色
          lineStyle: {
              // 使用深浅的间隔色
            color:  this.themeColors[this.theme].lineColor,
            type: 'dashed'
          }
        },
      }

      let gridOptions = {
        left: 10,
        right: 20,
        top: 40,
        bottom: 20,
        containLabel : true
      }
      console.log(this.options.style)
      this.myChart.setOption({
        title : {
            text: this.options.title,
            x:'left',
            textStyle:{
              color: this.themeColors[this.theme].textColor
            },
        },
        tooltip : {
            trigger: 'axis',
            formatter: '{b}: <span style="color:'+ this.themeColors[this.theme].tooltipEmphasisColor +'">{c1}</span>',  //1eee10
            backgroundColor: this.themeColors[this.theme].backgroundColor,//'#264e94',
            padding: [0, 5],
            textStyle:{
              color: this.themeColors[this.theme].textColor2,
              fontSize: 12,
            }
        },
        grid: gridOptions,
        graphic:[
          {
            type:'text',  //副标题文字
            left: 10,
            bottom:0,
            z:3,
            style:{
                text: this.options.description,
                // textAlign:'center',
                fill: this.themeColors[this.theme].textColor,
                fontSize:12
            }
          }
        ],
        xAxis: this.options.type == 3 ? xAxisOptions : yAxisOptions,
        yAxis: this.options.type == 3 ? yAxisOptions : xAxisOptions,
        series: [
          { // For shadow
              type: 'bar',
              itemStyle: {
                  normal: {color: this.themeColors[this.theme].fillColor2},
                  emphasis: {
                    color: this.themeColors[this.theme].fillColor3
                  }
              },
              barGap:'-100%',
              barMaxWidth : 10,
              data: dataShadow,
              animation: false,
          },
          {
              data: this.values,
              type: 'bar',
              barMaxWidth : 10,
              itemStyle: {
                normal: {
                    color: this.colors[0]
                    // color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    //     offset: 0,
                    //     color: this.colors[0]
                    // }, {
                    //     offset: 1,
                    //     color: '#ffffff'
                    // }]),
                },
                emphasis: {
                    color: this.themeColors[this.theme].emphasisColor,
                }
              },
          }
        ]
      });
    }
  }
}
</script>
