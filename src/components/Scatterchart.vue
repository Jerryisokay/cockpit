<template>
  <div :id="id" class="chart-inner"></div>
</template>

<script>
export default {
  name: "scatterchart",
  data() {
    return {
      chart: ""
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
          scatterData:[{
            name:"系列1",
            data:[
              [90, 80, 200,'名称1'],
              [80, 60, 140,'名称2'],
              [10, 180, 200,'名称3']
            ]
          }]
        }
      }
    }
  },
  mounted(){
    // console.log(this.options)
    setTimeout( () => {
      this.drawChart()
    },200)
  },
  computed:{
    titles(){
      const titles = []
      Array.isArray(this.options.scatterData) && this.options.scatterData.map( v =>{
        if(titles.indexOf(v.name) < 0) titles.push( v.name )
      })
      return titles
    },
    maxValue(){
      const values = []
      Array.isArray(this.options.scatterData) && this.options.scatterData.map( v =>{
        Array.isArray(v.data) && v.data.map( d => {
          values.push(d[2])
        })
      })
      return Math.max(...values)
    }
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
    }
  },
  methods: {
    drawChart(){
      this.myChart = this.$echarts.init(this.$el)
      let _self = this

      let data = []

      let series = []
      Array.isArray(this.options.scatterData) && this.options.scatterData.map((item, index) => {
        // let innerData = []
        // Array.isArray(item.data) && item.data.map( (v, i) => {
        //   innerData[i] = v.concat([item.name])
        // })
        // data.push(innerData)
        series.push({
          data: item.data,
          type: 'scatter',
          name: item.name,
          color: new this.$echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                    offset: 0,
                    color: '#fff'
                }, {
                    offset: 0.3,
                    color: this.options.colors[index]
                },{
                    offset: 1,
                    color: '#000'
                }]),
          symbolSize: function (data) {
              return 20* data[2] / (_self.maxValue)
          },
          type: 'scatter',
          label: {
              emphasis: {
                  show: true,
                  formatter: function (param) {
                      return param.data[3];
                  },
                  textStyle: {
                    color: '#fff'
                  },
                  position: 'top'
              }
          },
          itemStyle: {
              normal: {
                  shadowBlur: 10,
                  shadowColor: 'rgba(120, 36, 50, 0.5)',
                  shadowOffsetY: 5,
              }
          }
        })
      })

      console.log(series)

      this.myChart.setOption({
        title : {
            text: this.options.title,
            // subtext: '纯属虚构',
            x:'left',
            textStyle:{
              color: '#ffffff',//'#76a5d9'
            },
        },
        graphic:[
          {
            type:'text',  //副标题文字
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
        legend: {
            // orient: 'horizontal',
            data: this.titles,
            x : 'center',
            y : 'top',
            textStyle: {
              color:'#dce2f2',
              fontSize: 11
            }
        },
        xAxis: {
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: 'rgba(255,255,255,0.3)'
                }
            },
            axisLabel: { //设置x轴的字
              show:true,
              interval:0,//使x轴横坐标全部显示
              textStyle: {//x轴字体样式
                color: "#ffffff",
                margin: 15,
                fontSize: 10
              }
            }
        },
        yAxis: {
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: 'rgba(255,255,255,0.3)'
                }
            },
            axisLabel:{
              show:true,
              textStyle:{
                fontSize: 10,
                color: '#ffffff',//'#76a5d9'
              },
            },
            scale: true
        },
        grid: {
          left: 10,
          right: 20,
          top: 40,
          bottom: 10,
          containLabel : true
        },
        series: series
      });
    }
  }

};
</script>
