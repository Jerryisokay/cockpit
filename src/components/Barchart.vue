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
        pink: {
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
        light: {
          textColor: '#333333',
          textColor2: '#dce2f2',
          emphasisColor: '#01F0D9',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          tooltipEmphasisColor: '#ffffff',
          shadowColor1: 'rgba(255, 255, 255, 0.5)',
          shadowColor2: '#2D88F8',
          fillColor1: '#5985B8',
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
      },
      optionData: {
          title: '',
          description :'',
          type: 3,
          style: 0,
          colors:[],
          series: [
            {
              name: '',
              data: []
            }
          ],
          treeData: null,
          sunburstData:null,
          scatterData:null,
          riverData:null,
        }
    }
  },
  props:{
    id: { type: String, default: new Date().getTime() },
    pageId: { type: String },
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
      this.optionData.series.map( v =>{
        v.data.map( d => {
          if(titles.indexOf(d.name) < 0) titles.push( d.name )
        })
      })
      return titles
    },
    colors(){
      let colors = this.optionData.colors || []
      return colors.concat(store.state.base.COLOR_REPOSITORY)
    },
    values(){
      var values = [];
      Array.isArray(this.optionData.series) && this.optionData.series.map( item => {
        Array.isArray(item.data) && item.data.map( v => {
          values.push(v.value)
        })
      })
      return values
    }
  },
  watch:{
    options:{
      immediate:false,
      handler:function(){
        // console.log('options change')
        setTimeout( () => {
          this.refreshData()
        },200)
     }
    },
    theme:{
      immediate:false,
      handler:function(){
        // console.log('theme change')
        setTimeout( () => {
          this.refreshData()
        },200)
     }
    }
  },
  mounted(){
    this.initialData(this.options)
    if(this.options.refresh){
      let timer = setInterval( () => {
        document.getElementById(this.id) && this.refreshData()
      }, parseInt(this.options.refresh) * 1000)
    }
  },
  methods:{
    initialData( data ){
      const _self = this
      _self.myChart && _self.myChart.clear()
        _self.optionData = Object.assign({}, data)
        _self.drawChart();
    },
    refreshData(){
      const _self = this
      if(_self.options.id && _self.pageId){
        _self.$store.dispatch('getSingleChartAction', { pageId: _self.pageId, id: _self.options.id })
        .then( (data) => {
          _self.initialData(data)
        })
      }
    },
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
        top: 30,
        bottom: 15,
        containLabel : true
      }
      this.myChart.resize();
      this.myChart.setOption({
        title : {
            text: this.optionData.title,
            x:'left',
            textStyle:{
              color: this.themeColors[this.theme].textColor,
              fontSize: 14
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
                text: this.optionData.description,
                // textAlign:'center',
                fill: this.themeColors[this.theme].textColor,
                fontSize:11
            }
          }
        ],
        xAxis: this.optionData.type == 3 ? xAxisOptions : yAxisOptions,
        yAxis: this.optionData.type == 3 ? yAxisOptions : xAxisOptions,
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
