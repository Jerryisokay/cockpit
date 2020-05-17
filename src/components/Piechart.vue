<template>
  <div :id="id" class="chart-inner"></div>
</template>

<script>
import store from '@/store'

//单维度的
export default {
  name: "piechart",
  data() {
    return {
      themeColors:{
        dark: {
          textColor: '#dce2f2',
          emphasisColor: '#dce2f2',
          backgroundColor: '#264e94',
          shadowColor1: 'rgba(255, 255, 255, 0.5)',
          shadowColor2: '#2584e8',
          fillColor1:'#2584e8',
          fillColor2:'#01162d',
          fillColor3:'#040312',
        },
        light: {
          textColor: '#333333',
          emphasisColor: '#c6044d',
          backgroundColor: 'rgba(0,0,0,0.5)',
          shadowColor1: 'rgba(255, 255, 255, 0.5)',
          shadowColor2: '#77022e',
          fillColor1: '#77022e',
          fillColor2: '#c6044d',
          fillColor3: '#444',
        },
        blue: {
          textColor: '#dce2f2',
          emphasisColor: '#dce2f2',
          backgroundColor: '#264e94',
          shadowColor1: 'rgba(255, 255, 255, 0.5)',
          shadowColor2: '#2584e8',
          fillColor1:'#2584e8',
          fillColor2:'#01162d',
          fillColor3:'#040312',
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
          description :'单位/人',
          type: 0,
          style: 0,
          colors:['#19D672','#FD517D','#76A5D9'],
          series: [
            {
              name: '答题成功率',
              data: [
                {
                  value:60,
                  name:'答题成功率',
                  max: 100
                }
              ]
            }
          ],
          treeData: null,
          sunburstData:null,
          scatterData:null,
          riverData:null
        }
      }
    }
  },
  computed:{
    titles(){
      const titles = []
      Array.isArray(this.options.series) && this.options.series.length && Array.isArray(this.options.series[0].data) &&
      this.options.series[0].data.map( v =>{
        if(titles.indexOf(v.name) < 0) titles.push( v.name )
      })
      return titles
    },
    theme(){
      return store.state.base.THEME_TYPE
    },
    colors(){
      let colors = this.options.colors || []
      return colors.concat(store.state.base.COLOR_REPOSITORY)
    }
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
  mounted(){
    // console.log(' Pie chart mounted ')
    setTimeout( () => {
      this.drawChart()
    },200)
  },
  methods: {
    drawChart(){
      this.myChart = this.$echarts.init(this.$el)

      let data = [], name = ''
      if(Array.isArray(this.options.series) && this.options.series.length && Array.isArray(this.options.series[0].data)){
        name = this.options.series[0].name
        data = this.options.series[0].data
      }

      this.myChart.resize();
      this.myChart.setOption({
        title : {
            text: this.options.title,
            // subtext: this.options.description,
            x:'left',
            textStyle: {
              color: this.themeColors[this.theme].textColor,
              fontSize: 14
            }
        },
        grid:{
          left: 10,
          right: 20,
          top: 30,
          bottom: 15,
          containLabel : true
        },
        tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} ({d}%)",
            backgroundColor : this.themeColors[this.theme].backgroundColor,
        },
        legend: {
            // orient: 'horizontal',
            data: this.options.titles,
            x : 'center',
            y : 'bottom',
            textStyle: {
              color: this.themeColors[this.theme].textColor,
              fontSize: 11
            }
        },
        color: this.colors,
        textStyle: {
          color: this.themeColors[this.theme].textColor
        },
        series: [
          {
            name: name,
            type:'pie',
            radius: [33, 45],
            avoidLabelOverlap: false,
            itemStyle:{
              shadowColor: this.themeColors[this.theme].shadowColor1,
              shadowBlur: 2,
            },
            label: {
                normal: {
                    show: true,
                    position: 'outside',
                    formatter: '{b}:{d}%',
                    fontSize: 10,
                    verticalAlign: 'center'
                },
            },
            labelLine: {
                normal: {
                    show: true,
                    lineStyle: {
                        color: this.themeColors[this.theme].textColor,
                    },
                    smooth: 0.2
                }
            },
            color: this.colors,
            // animationType: 'scale',
            animationEasing: 'elasticOut',
            data: data
          }
        ],
        graphic:[
          {
            type:'circle',  //外层光环
            left:'center',
            top:'center',
            shape: {
                cx: 0,
                cy: 0,
                r: 52,
                // r0: 52
            },
            style:{
                fill: this.themeColors[this.theme].fillColor1,
                stroke:"#001f3c",
                shadowBlur : 5,
                shadowColor: this.themeColors[this.theme].shadowColor2
            },
            z:-2
          },{
            type:'circle',  //黑色圆底
            left:'center',
            top:'center',
            shape: {
                cx: 0,
                cy: 0,
                r:50,
            },
            style:{
                fill: this.themeColors[this.theme].fillColor3,//'#040312',
            },
            z: -1
          },{
            type:'circle',  //内层圆形
            left:'center',
            top:'center',
            shape: {
                cx: 0,
                cy: 0,
                r:25,
            },
            style:{
                fill: this.themeColors[this.theme].fillColor2,
                stroke: this.themeColors[this.theme].fillColor1,
                // height:60
            },
            z:1
          },{
            type:'ring',  // 中心圆环
            left:'center',
            top:'center',
            shape: {
                cx: 0,
                cy: 0,
                r: 30,
                r0: 29
            },
            style:{
                fill:this.themeColors[this.theme].fillColor2,
            },
            z:2
          },{
            type:'text',  //中心文字
            left:'center',
            top:'center',
            z:3,
            style:{
                text: name,
                textAlign:'center',
                fill:'#fff',
                width:25,
                fontSize:14,
                // height:60
            }
          },
          {
            type:'text',  //副标题文字
            right: 10,
            top:8,
            z:3,
            style:{
                text: this.options.description,
                // textAlign:'center',
                fill: this.themeColors[this.theme].textColor,
                fontSize:11,
            }
          }
        ]
      });
    }
  }

};
</script>
