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
          shadowColor1: '#dce2f2',
          fillColor1:'#282a36'
        },
        light: {
          textColor: '#333333',
          shadowColor1: '#77022e',
          fillColor1: '#ffffff',
        },
        blue: {
          textColor: '#dce2f2',
          shadowColor1: '#dce2f2',
          fillColor1:'#282a36',
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
    colors(){
      let colors = this.options.colors || []
      return colors.concat(store.state.base.COLOR_REPOSITORY)
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
      let series = []
      let radius = this.getRadius(this.options.series.length, this.options.size)
      if(Array.isArray(this.options.series) && this.options.series.length){
        this.options.series.map( (item, index)=> {
          let data = item.data[0] || {}
          let max = data.max || data.value
          series.push({
            name: item.name,
            type:'pie',
            radius: radius,
            center : this.getCenterPosition(index, this.options.series.length, this.options.size),
            avoidLabelOverlap: false,
            selectedMode: 'single',
            selectedOffset: 0,
            hoverAnimation: false,
            label: {
                normal: {
                    show: false,
                    position: 'center',
                    formatter: '{d}%',
                    fontSize: 12,
                    verticalAlign: 'center',
                    color: this.themeColors[this.theme].textColor
                },
            },
            itemStyle: {
              // borderWidth: 1,
              // borderColor: this.themeColors[this.theme].fillColor1,
              shadowBlur : 2,
              shadowColor: this.themeColors[this.theme].shadowColor1,
            },
            data: [
              {value: max - parseFloat(data.value), name:'', itemStyle:{ color:this.themeColors[this.theme].fillColor1}},
              {value: data.value, name: data.name, selected:true, label: {show: true}}
            ],
            color: this.colors[index],
          })
        })
      }

      // console.log(series)

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
            fontSize: 10
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
    },
    getRadius( length, size){
      // console.log(length)
      let [colmuns, rows] = this.getColumns(length, size)
      let radius = size == 1 ? Math.min( 75/colmuns , 90/rows ) : Math.min( 75/colmuns , 40/rows )
      return [radius * 0.75, radius]
    },
    getColumns(length, size){   //获取行列数
      if(length <= 3){
        return [length, 1]
      }
      for(let i = 1; i<= length; i++){
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
