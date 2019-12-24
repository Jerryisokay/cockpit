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
          backgroundColor:'#ccc',
          tooltipBackgroundColor: '#264e94',
          backgroundEmphasisColor:'#333'
        },
        light: {
          textColor: '#333333',
          shadowColor1: 'rgba(255, 255, 255, 0.5)',
          tooltipBackgroundColor: '#c6044d',
          backgroundEmphasisColor: '#77022e',
        },
        blue: {
          textColor: '#dce2f2',
          backgroundColor:'#ccc',
          tooltipBackgroundColor: '#264e94',
          backgroundEmphasisColor:'#333'
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
          data: [820, 932, 901, 934, 1290, 1330, 1320],
        }
      }
    }
  },
  computed:{
    indicator(){
      const indicator = []
      const titles = []
      Array.isArray(this.options.series) && this.options.series.map( v =>{
        v.data.map( d => {
          if(titles.indexOf(d.name) < 0){
            indicator.push({
              name: d.name,
              max: d.max
            })
            titles.push( d.name )
          }
        })
      })
      return indicator
    },
    data(){
      const data = []
      Array.isArray(this.options.series) && this.options.series.map( item => {
        let values = []
        Array.isArray(item.data) && item.data.map( v => {
          values.push(v.value)
        })
        data.push({
            value : values,
            name : item.name
        })
      })
      return data
    },
    theme(){
      return store.state.base.THEME_TYPE
    },
    colors(){
      let colors = this.options.colors || []
      return colors.concat(store.state.base.COLOR_REPOSITORY)
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
    getIndexOfKey(key, value, arr){
      let index = -1;
      arr.map( (v, i) => {
        if(v[key] === value) index = i
      } )
      return index
    },
    drawChart(){
      this.myChart = this.$echarts.init(this.$el)
      this.myChart.setOption({
        title : {
            text: this.options.title,
            // subtext: '纯属虚构',
            x:'left',
            textStyle:{
              color: this.themeColors[this.theme].textColor,
            },
        },
        legend:{
            top : 25,
            formatter: (value) => {
                var texts=value;
                // if(texts.length>6){ //限定字数
                //     texts=texts.substr(0,6)+'...';
                // }
                return texts;
            },
            textStyle: {
              color: this.themeColors[this.theme].textColor,
              fontSize: 11
            },
            icon: 'circle'
        },
        radar: {
            name: {
              textStyle: {
                  color: this.themeColors[this.theme].textColor,
                  fontSize: 10
              }
            },
            center: ['50%', '60%'],
            nameGap : 5,
            radius : '60%',
            splitArea : {
                show : false,
                areaStyle : {
                    color: 'rgba(0,0,0,0)', // 图表背景的颜色
                },
            },
            indicator: this.indicator,
        },
        grid: {
            position: 'center',
        },
        tooltip : {
            confine: true,
            backgroundColor: this.themeColors[this.theme].tooltipBackgroundColor,
            padding: [0, 5],
            textStyle:{
              fontSize: 12
            }
        },

        series: [{
            name: '',
            type: 'radar',
            symbol: 'circle', // 拐点的样式，还可以取值'rect','angle'等
            symbolSize: 6, // 拐点的大小
            areaStyle: {
              normal: {
                // color: 'rgba(0,0,0,0)'
                opacity : 0,
              }
            },
            emphasis: {
              areaStyle: {
                // color
                opacity : 0.3,
                // color: this.themeColors[this.theme].backgroundEmphasisColor
              }
            },
            data : this.data
        }],
        color: this.colors,
      });
    }
  }

};
</script>
