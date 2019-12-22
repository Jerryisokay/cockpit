<template>
  <div :id="id" class="chart-inner"></div>
</template>

<script>
import store from '@/store'

export default {
  name: "lineareachart",
  data() {
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
          fillColor1:'#83bff6',
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
          fillColor1:'#83bff6',
          fillColor2:'rgba(255,255,255,0.05)',
          fillColor3:'rgba(255,255,255,0.1)',
          lineColor:'rgba(255,255,255,0.2)'
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
          // titles: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          // data: [820, 932, 901, 934, 1290, 1330, 1320],
          title: '访问来源',
          description :'单位/人',
          type: 2,
          style: 0,
          colors:['#19D672','#FD517D','#76A5D9'],
          series: [
            {
              name: '一般量级统计',
              data: [
                {value:60, name:'Mon', max:100},
                {value:30, name:'Tue', max:100},
                {value:10, name:'Wed', max:100},
                {value:75, name:'Thu', max:100},
                {value:30, name:'Fri', max:100},
                {value:10, name:'Sat', max:100},
                {value:75, name:'Sun', max:100},
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
  computed: {
    titles(){
      const titles = []
      this.options.series.map( v =>{
        v.data.map( d => {
          if(titles.indexOf(d.name) < 0) titles.push( d.name )
        })
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
  mounted(){
    // console.log(this.options)
    this.drawChart()
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
      let data = []

      Array.isArray(this.options.series) && this.options.series.length &&
       Array.isArray(this.options.series[0].data) && this.options.series[0].data.map( v => {
        data.push( v.value )
      })
      console.log(data)
      this.myChart.setOption({
        title : {
            text: this.options.title,
            x:'left',
            textStyle:{
              color: this.themeColors[this.theme].textColor,//'#76a5d9'
            },
        },
        tooltip : {
            trigger: 'axis',
            formatter: '{a}: <br />{b}: <span style="color: '+ this.themeColors[this.theme].tooltipEmphasisColor +'">{c}</span>',
            padding: [0, 5],
            backgroundColor : this.themeColors[this.theme].backgroundColor,
            textStyle:{
              color: this.themeColors[this.theme].textColor2,
              fontSize: 12,
            }
        },
        graphic:[
          {
            type:'text',  //副标题文字
            left: 10,
            bottom: 0,
            z:3,
            style:{
                text: this.options.description,
                // textAlign:'center',
                fill: this.themeColors[this.theme].textColor,
                fontSize:12,
            }
          }
        ],
        grid:{
          left: 10,
          right: 20,
          top: 40,
          bottom: 20,
          containLabel : true
        },
        xAxis: {
            type: 'category',
            data: this.titles,
            boundaryGap: false,
            axisLabel:{
              show:true,
              textStyle:{
                fontSize: 10,
                color: this.themeColors[this.theme].textColor,//'#76a5d9'
              },
            },
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
              //  改变轴线颜色
              lineStyle: {
                  // 使用深浅的间隔色
                  color: this.themeColors[this.theme].lineColor,
                  type: 'dashed'
              },

            },
            axisLabel:{
              show:true,
              textStyle:{
                fontSize: 10,
                color: this.themeColors[this.theme].textColor,//'#76a5d9'
              },
              // formatter: (value) => {
              //     var texts=value;
              //     if(texts.length>3){ // 字数限制
              //         texts=texts.substr(0,3)+'...';
              //     }
              //     return texts;
              // },
            },
        },
        // dataZoom: [{
        //     type: 'inside',
        //     start: 0,
        //     end: 10
        // }, {
        //     start: 0,
        //     end: 10,
        //     handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        //     handleSize: '100%',
        //     handleStyle: {
        //         color: '#fff',
        //         shadowBlur: 3,
        //         shadowColor: 'rgba(0, 0, 0, 0.6)',
        //         shadowOffsetX: 2,
        //         shadowOffsetY: 2
        //     }
        // }],
        series: [{
            name:'模拟数据',
            type:'line',
            smooth: false,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
                color: this.colors[0]
            },
            areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: this.colors[0]
                }, {
                    offset: 1,
                    color: this.colors[1]
                }])
            },
            data: data
        }]
      });
    }
  }

};
</script>
