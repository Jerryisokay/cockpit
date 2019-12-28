<template>
  <div :id="id" class="chart-inner"></div>
</template>

<script>
import store from '@/store'

export default {
  name: "funnelchart",
  data() {
    return {
      themeColors:{
        dark: {
          textColor: '#dce2f2',
          backgroundColor: '#264e94',
          shadowColor1: 'rgba(255, 255, 255, 0.5)',
          shadowColor2: '#2584e8',
          borderColor:'#fff'
        },
        light: {
          textColor: '#333333',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          shadowColor1: 'rgba(255, 255, 255, 0.5)',
          shadowColor2: '#77022e',
          borderColor: '#77022e'
        },
        blue: {
          textColor: '#dce2f2',
          backgroundColor: '#264e94',
          shadowColor1: 'rgba(255, 255, 255, 0.5)',
          shadowColor2: '#2584e8',
          borderColor:'#fff'
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
          description:'',
          // titles: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
          series:[
            {
              data: [
                {value:100, name:'直接访问'},
                {value:220, name:'邮件营销'},
                {value:280, name:'联盟广告'},
                {value:400, name:'视频广告'},
                {value:500, name:'搜索引擎'}
              ]
            }
          ]

        }
      }
    }
  },
  mounted(){
    // console.log(this.options)
    setTimeout( () => {
      this.drawChart()
    })

  },
  computed:{
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
  methods: {
    drawChart(){
      this.myChart = this.$echarts.init(this.$el)
      let data = [], name = ''
      if(Array.isArray(this.options.series) && this.options.series.length && Array.isArray(this.options.series[0].data)){
        name = this.options.series[0].name
        data = this.options.series[0].data
      }


      this.myChart.setOption({
        title : {
            text: this.options.title,
            subtext: this.options.description,
            x:'left',
            fontSize: 16,
            textStyle: {
              color: this.themeColors[this.theme].textColor
            },
            subtextStyle:{
              color: this.themeColors[this.theme].textColor
            }
        },
        tooltip: {
            trigger: 'item',
            confine: true,
            formatter: "{b}: <br />{c} ({d}%)",
            backgroundColor: this.themeColors[this.theme].backgroundColor,
            // padding: [0, 5],
            textStyle:{
              fontSize: 12
            }
        },
        // legend: {
        //     // orient: 'horizontal',
        //     x: 'left',
        //     data: this.options.titles
        // },
        calculable: true,
        color: this.colors,
        textStyle: {
          color: this.themeColors[this.theme].textColor
        },
        series: [
          {
              name: name,
              type:'funnel',
              left: '10%',
              top: 60,
              bottom: 20,
              width: '70%',
              min: 0,
              minSize: '0%',
              maxSize: '100%',
              sort: 'descending',
              gap: 2,
              label: {
                  show: true,
                  textStyle:{
                    fontSize: 10,
                  },
                  position: 'right'
              },
              labelLine: {
                  length: 10,
                  lineStyle: {
                      width: 1,
                      type: 'solid'
                  }
              },
              itemStyle: {
                  borderColor: this.themeColors[this.theme].borderColor,
                  borderWidth: 1
              },
              emphasis: {
                  label: {
                      fontSize: 12
                  }
              },
              data: data
          }
        ]
      });
    }
  }

};
</script>
