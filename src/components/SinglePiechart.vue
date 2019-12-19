<template>
  <div :id="id" class="chart-inner"></div>
</template>

<script>
import store from '@/store'

export default {
  name: "singlepiechart",
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
        },
        blue: {
          textColor: '#dce2f2',
          shadowColor1: 'rgba(0, 0, 0, 0.2)',
          fillColor1:'#282a36'
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
        v.data.map( d => {
          if(titles.indexOf(d.name) < 0) titles.push( d.name )
        })
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
      let divider = parseInt(100 / (this.options.series.length + 1))
      if(Array.isArray(this.options.series) && this.options.series.length){
        this.options.series.map( (item, index)=> {
          let data = item.data[0] || {}
          series.push({
            name: item.name,
            type:'pie',
            radius: [25, 33],
            center : [divider + divider * index +'%', '50%'],
            avoidLabelOverlap: false,
            selectedMode: 'single',
            selectedOffset: 0,
            hoverAnimation: false,
            label: {
                normal: {
                    show: false,
                    position: 'center',
                    formatter: '{d}',
                    fontSize: 16,
                    verticalAlign: 'center',
                    color: this.themeColors[this.theme].textColor
                },
            },
            itemStyle: {
              shadowBlur : 5,
              shadowColor: this.themeColors[this.theme].shadowColor1,
            },
            data: [
              {value:100 - parseFloat(data.value), name:'', itemStyle:{ color:this.themeColors[this.theme].fillColor1}},
              {value: data.value, name: data.name, selected:true, label: {show: true}}
            ],
            color: this.options.colors[index],
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
        // color: ['#ffc03d','#01edd9','#3c95fb'],
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
        // tooltip: {
        //     trigger: 'item',
        //     confine: true,
        //     formatter: "{b}: <br />{d}%",
        //     backgroundColor: '#264e94',
        //     padding: [0, 5],
        //     textStyle:{
        //       fontSize: 12
        //     }
        // },
        series: series
      });
    }
  }

};
</script>
