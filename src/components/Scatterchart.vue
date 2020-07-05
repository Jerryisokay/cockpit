<template>
  <div :id="id" class="chart-inner"></div>
</template>

<script>
import store from '@/store'

export default {
  name: "scatterchart",
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
        pink: {
          textColor: '#333333',
          textColor2: '#dce2f2',
          emphasisColor: '#c6044d',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          shadowColor1: 'rgba(0, 0, 0, 0.5)',
          shadowColor2: '#77022e',
          lineColor: '#dddddd'
        },
        light: {
          textColor: '#333333',
          textColor2: '#dce2f2',
          emphasisColor: '#2D88F8',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          shadowColor1: 'rgba(0, 0, 0, 0.5)',
          shadowColor2: '#2D88F8',
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
      },
      optionData: {
        title: '',
        colors: [],
        scatterData:[]
      }
    };
  },
  props: {
    id: { type: String },
    pageId: { type: String },
    width: { type: String, default: "200px" },
    height: { type: String, default: "200px" },
    options:{
      type:Object,
      default(){
        return {
          title: '',
          colors: [],
          scatterData:[]
        }
      }
    }
  },
  mounted(){
    // console.log(this.options)
    this.initialData( this.options )
    if(this.options.refresh){
      let timer = setInterval( () => {
        document.getElementById(this.id) && this.refreshData()
      }, parseInt(this.options.refresh) * 1000)
    }
  },
  computed:{
    titles(){
      const titles = []
      Array.isArray(this.optionData.scatterData) && this.optionData.scatterData.map( v =>{
        if(titles.indexOf(v.name) < 0) titles.push( v.name )
      })
      return titles
    },
    data(){
      let data = []
      Array.isArray(this.optionData.scatterData) && this.optionData.scatterData.map( v =>{
        let values = []
        Array.isArray(v.data) && v.data.map( d => {
          values.push([
            d.x,
            d.y,
            d.name
          ])
        })
        data.push({
          name: v.name,
          data: values
        })
      })
      return data
    },
    theme(){
      return store.state.base.THEME_TYPE
    },
    colors(){
      let colors = this.optionData.colors || []
      return colors.concat(store.state.base.COLOR_REPOSITORY)
    }
  },
  watch:{
    options:{
      immediate:false,
      handler:function(){
        setTimeout( () => {
          this.refreshData()
        },200)
     }
    },
    theme:{
      immediate:false,
      handler:function(){
        setTimeout( () => {
          this.refreshData()
        },200)
     }
    }
  },
  methods: {
    initialData( data ){
      const _self = this
      _self.myChart && _self.myChart.clear()
      _self.optionData = Object.assign({}, data)
      _self.drawChart();
    },
    refreshData(){
      const _self = this
      // console.log(_self.options.id, _self.pageId)
      if(_self.options.id && _self.pageId){
        _self.$store.dispatch('getSingleChartAction', { pageId: _self.pageId, id: _self.options.id })
        .then( (data) => {
          _self.initialData(data)
        })
      }
    },
    drawChart(){
      this.myChart = this.$echarts.init(this.$el)
      let series = []
      Array.isArray(this.data) && this.data.map((item, index) => {
        series.push({
          data: item.data,
          type: 'scatter',
          name: item.name,
          type: 'scatter',
          label: {
              emphasis: {
                  show: true,
                  formatter: function (param) {
                      return param.data[2];
                  },
                  textStyle: {
                    color: this.themeColors[this.theme].textColor,
                  },
                  position: 'top'
              }
          },
          itemStyle: {
              normal: {
              }
          }
        })
      })

      // console.log(series)

      this.myChart.resize();
      this.myChart.setOption({
        title : {
            text: this.optionData.title,
            x:'left',
            textStyle:{
              color: this.themeColors[this.theme].textColor,//'#76a5d9'
              fontSize: 14
            },
        },
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
                fontSize:11,
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
                    type: 'solid',
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
          top: 40,
          bottom: 15,
          containLabel : true
        },
        color: this.colors,
        series: series
      });
    }
  }

};
</script>
