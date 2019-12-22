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
        },
        blue: {
          textColor: '#dce2f2',
          shadowColor1: 'rgba(0, 0, 0, 0.2)',
          fillColor1:'#282a36',
          backgroundColor: '#264e94',
          borderColor: '#282a36',
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
      let radius = this.getRadius(this.options.series.length, this.options.size)
      if(Array.isArray(this.options.series) && this.options.series.length){
        let divider = parseInt(100 / (this.options.series.length + 1))
        this.options.series.map( (item, index)=> {
          series.push({
            name: item.name,
            type:'pie',
            radius: radius,//[0, 33],
            center : this.getCenterPosition(index, this.options.series.length, this.options.size),//[divider + divider * index +'%', '50%'],
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
    },
    getRadius( length, size){
      // console.log(length)
      let [colmuns, rows] = this.getColumns(length, size)
      let radius = size == 1 ? Math.min( 75/colmuns , 90/rows ) : Math.min( 75/colmuns , 40/rows )
      return [radius * 0.7, radius]
    },
    getColumns(length, size){   //获取行列数
      if(length <= 3){
        return [length, 1]
      }
      for(let i = 1; i<=length; i++){
        if(i*i >= length){
          return [i,i]
        }else if(i * i+ 1 >= length){
          return size == 1 ? [i, i+1] : [i+1, i]
        }
      }
    },
    getCenterPosition( index, length, size){  //获取单个图表的位置
      let [colmuns, rows] = this.getColumns(length, size)
      //每行数量 行数
      // console.log('====================================');
      let yNth = Math.ceil((index + 1)/ colmuns)  //当前行数
      // console.log('yNth '  + yNth)
      let xNth = index + 1 - (yNth - 1) * colmuns
      // console.log('xNth '  + xNth)
      let singleW = (yNth == rows) ? (150 / (length + colmuns - colmuns * rows)) : (150 / colmuns)
      let singleH = size == 1 ? 160 / rows : 80 /rows

      // console.log('====================================');

      return [singleW * (xNth * 2 - 1) , singleH * ( yNth * 2 - 1) + 40 ]

    }
  }

};
</script>
