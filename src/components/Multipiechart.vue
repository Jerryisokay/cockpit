<template>
  <div :id="id" class="chart-inner"></div>
</template>

<script>
import store from '@/store'

export default {
  name: "multipiechart",
  data() {
    return {
      themeColors:{
        dark: {
          textColor: '#dce2f2',
          shadowColor1: 'rgba(0, 0, 0, 0.2)',
          fillColor1:'#282a36',
          backgroundColor: '#264e94',
          borderColor: '#282a36',
        },
        light: {
          textColor: '#333333',
          shadowColor1: '#77022e',
          fillColor1: '#ffffff',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          borderColor: '#ffffff',
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
          colors: ['#19D672','#FD517D','#76A5D9'],
          series: [
            {
              name: '一般量级统计',
              data: [
                {value:60, name:'一般量级统计', max:100}
              ]
            },{
              name: '严重量级统计',
              data: [
                {value:60, name:'严重量级统计', max:100}
              ],
            },{
              name: '高危量级统计',
              data: [
                {value:50, name:'高危量级统计', max:100}
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
    titles(){
      const titles = []
      this.options.series.map( v =>{
        if(titles.indexOf(v.name) < 0) titles.push( v.name )
      })
      return titles
    },
    theme(){  //当前主题
      return store.state.base.THEME_TYPE
    },
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
      let series = []

      if(Array.isArray(this.options.series) && this.options.series.length){
        let divider = parseInt(100 / (this.options.series.length + 1))
        this.options.series.map( (item, index)=> {
          series.push({
            name: item.name,
            type:'pie',
            radius: [0, 33],
            center : [divider + divider * index +'%', '50%'],
            avoidLabelOverlap: false,
            selectedMode: 'single',
            selectedOffset: 0,
            label: {
                normal: {
                    show: false,
                    position: 'outside',
                    formatter: '{b}:{d}',
                    fontSize: 8,
                    // verticalAlign: 'center',
                    color: this.themeColors[this.theme].textColor,
                },
            },
            itemStyle: {
              borderWidth : 1,
              borderColor : this.themeColors[this.theme].borderColor,
              shadowBlur : 5,
              shadowColor: this.themeColors[this.theme].shadowColor1,
            },
            data: item.data,
          })
        })
      }



      console.log(series)

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
        color: this.options.colors,
        textStyle: {
          color: this.themeColors[this.theme].textColor
        },
        legend: {
          x : 'center',
          y : 'bottom',
          data: this.titles,
          textStyle: {
            color: this.themeColors[this.theme].textColor,
            fontSize: 11
          }
        },
        tooltip: {
            trigger: 'item',
            confine: true,
            formatter: "{b}: {c}<br />{d}%",
            backgroundColor: this.themeColors[this.theme].backgroundColor,
            padding: [0, 5],
            textStyle:{
              fontSize: 12
            }
        },
        series: series
      });
    }
  }

};
</script>
