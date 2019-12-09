<template>
  <div :id="id" class="chart-inner">

  </div>
</template>

<script>
export default {
  name: 'barchart',
  data(){
    return {
      themeColors:{
        dark: {
          textColor: 'dce2f2',
          lineColor: 'rgba(0,0,0,0.2)'
        }
      }
    }
  },
  props:{
    id: { type: String, default: new Date().getTime() },
    direction: { type: String, default: '0' },
    options:{
      type:Object,
      default(){
        return {
          title: '访问来源',
          description :'单位/人',
          type: 1,
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
    titles(){
      const titles = []
      this.options.series.map( v =>{
        v.data.map( d => {
          if(titles.indexOf(d.name) < 0) titles.push( d.name )
        })
      })
      return titles
    },
    values(){
      var values = [];
      Array.isArray(this.options.series) && this.options.series.map( item => {
        Array.isArray(item.data) && item.data.map( v => {
          values.push(v.value)
        })
      })
      return values
    }
  },
  mounted(){
    this.drawChart()
  },
  methods:{
    getDataMax( num ){
      let divider = Math.pow( 10, num.toString().length - 1)
      return Math.ceil(num/ divider ) * divider
    },
    drawChart(){
      let myChart = this.$echarts.init(document.getElementById(this.id))
      let color = ["#19D672", "#FD517D"]
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
            color: "#ffffff",
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
        // nameTextStyle:{
        //   fontSize: 10,
        //   color: '#ffffff'
        // },
        axisLabel:{
          show:true,
          textStyle:{
            fontSize: 10,
            color: '#ffffff',//'#76a5d9'
          },
        },
        splitLine: {
          show: true,
          //  改变轴线颜色
          lineStyle: {
              // 使用深浅的间隔色
            color: ['rgba(255,255,255,0.2)'],
            type: 'dashed'
          }
        },
      }

      let gridOptions = {
        left: 10,
        right: 20,
        top: 40,
        bottom: 10,
        containLabel : true
      }
      // console.log(this.options.direction)
      myChart.setOption({
        title : {
            text: this.options.title,
            x:'left',
            textStyle:{
              color: '#ffffff',//'#76a5d9'
            },
            // subtext: '单位：人',
            // subtextStyle :{
            //   color: '#ffffff'
            // }
        },
        tooltip : {
            trigger: 'axis',
            formatter: '{b}: <span style="color:#12ee10">{c1}</span>',
            backgroundColor: '#264e94',
            padding: [0, 5],
            textStyle:{
              color: '#cccccc',
              fontSize: 12,
            }
        },
        grid: gridOptions,
        graphic:[
          {
            type:'text',  //中心文字
            right: 20,
            top:10,
            z:3,
            style:{
                text: this.options.description,
                // textAlign:'center',
                fill:'#fff',
                fontSize:12,
                // height:60
            }
          }
        ],
        xAxis: this.options.style == 0 ? xAxisOptions : yAxisOptions,
        yAxis: this.options.style == 0 ? yAxisOptions : xAxisOptions,
        series: [
          { // For shadow
              type: 'bar',
              itemStyle: {
                  normal: {color: 'rgba(255,255,255,0.05)'},
                  emphasis: {
                    color: 'rgba(255,255,255,0.1)'
                  }
              },
              barGap:'-100%',
              barWidth: 10,
              data: dataShadow,
              animation: false,
          },
          {
              data: this.values,
              type: 'bar',
              barWidth: 10,
              itemStyle: {
                normal: {
                    color: new this.$echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#83bff6'},
                            {offset: 0.5, color: '#188df0'},
                            {offset: 1, color: '#188df0'}
                        ]
                    ),
                },
                emphasis: {
                    color: new this.$echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#ffc911'},
                            {offset: 0.7, color: '#ffb902'},
                            {offset: 1, color: '#ff9a00'}
                        ]
                    )
                }
              },
          }
        ]
      });
    }
  }
}
</script>
