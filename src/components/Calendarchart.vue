<template>
  <div :id="id" class="chart-inner"></div>
</template>

<script>
import store from "@/store";

export default {
  name: "calendarchart",
  data() {
    return {
      themeColors: {
        dark: {
          textColor: "#dce2f2",
          backgroundColor: "#264e94",
          shadowColor1: "rgba(255, 255, 255, 0.5)",
          shadowColor2: "#2584e8",
          borderColor: "#2584e8",
          lineColor: 'rgba(255, 255, 255, 0.2)',//'#1cd1d4',
          fillColor:'#2584e8',
          emphasisColor: '#2584e8',
        },
        light: {
          textColor: "#333333",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          shadowColor1: "rgba(255, 255, 255, 0.5)",
          shadowColor2: "#77022e",
          borderColor: "#c6044d",
          lineColor: 'rgba(0, 0, 0, 0.2)',//'#c6044d',
          fillColor:'#77022e',
          emphasisColor: '#2584e8',
        },
        blue: {
          textColor: "#dce2f2",
          backgroundColor: "#264e94",
          shadowColor1: "rgba(255, 255, 255, 0.5)",
          shadowColor2: "#3aaafe",
          borderColor: "#3aaafe",
          lineColor: 'rgba(255, 255, 255, 0.2)',//'#1cd1d4',
          fillColor:'#3aaafe',
          emphasisColor: '#2584e8',
        }
      }
    };
  },
  props: {
    id: { type: String },
    width: { type: String, default: "200px" },
    height: { type: String, default: "200px" },
    options: {
      type: Object,
      default() {
        return {
          title: "访问来源",
          description: "",
          // titles: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
          series: [
            {
              data: [
                { value: 100, name: "直接访问" },
                { value: 220, name: "邮件营销" },
                { value: 280, name: "联盟广告" },
                { value: 400, name: "视频广告" },
                { value: 500, name: "搜索引擎" }
              ]
            }
          ]
        };
      }
    }
  },
  mounted() {
    // console.log(this.options);
    setTimeout(() => {
      this.drawChart();
    });
  },
  computed: {
    theme() {
      return store.state.base.THEME_TYPE;
    },
    colors() {
      let colors = this.options.colors || [];
      return colors.concat(store.state.base.COLOR_REPOSITORY);
    },
    data(){
      let data = []
      Array.isArray(this.options.calendarData) && this.options.calendarData.length &&
      this.options.calendarData.map(v => {
        data.push(
          [
            v.date,
            v.value
          ]
        )
      })
      return data
    },
    maxValue(){
      const values = []
      Array.isArray(this.data) && this.data.map( v =>{
        values.push(v[1])
      })
      return Math.max(...values)
    },
    Top3(){
      let top = []
      if(Array.isArray(this.data) && this.data.length){
        top = this.data.sort(function (a, b) {
            return b[1] - a[1];
        }).slice(0, 3)
      }
      return top
    },
    layout(){
      return store.state.base.LAYOUT_TYPE
    },
    //单元宽度
    gridWidth(){
      return parseInt((document.documentElement.clientWidth - 40)/12)
    },
    gridHeight(){
      return parseInt((store.state.base.PAGE_HEIGHT - 110)/12)
    },
  },
  watch: {
    options: {
      immediate: false,
      handler: function() {
        setTimeout(() => {
          this.myChart && this.myChart.clear();
          this.drawChart();
        }, 200);
      }
    },
    theme: {
      immediate: false,
      handler: function() {
        setTimeout(() => {
          this.myChart && this.myChart.clear();
          this.drawChart();
        }, 200);
      }
    }
  },
  methods: {
    drawChart() {
      let _self = this
      _self.myChart = _self.$echarts.init(_self.$el)

      // console.log(data)
      let now = new Date()
      let start = new Date(now.getFullYear(), now.getMonth() - 2, 1)
      let end = new Date(now.getFullYear(), now.getMonth() + 1, -1)
      let range = [
        _self.$echarts.format.formatTime('yyyy-MM-dd', start),
        _self.$echarts.format.formatTime('yyyy-MM-dd', end)
      ]
      // console.log(range)
      this.myChart.resize();

      this.myChart.setOption({
        title: {
          text: _self.options.title,
          // subtext: this.options.description,
          x: "left",
          textStyle: {
            fontSize: 14,
            color: _self.themeColors[_self.theme].textColor
          }
          // subtextStyle:{
          //   color: this.themeColors[this.theme].textColor
          // }
        },
        tooltip: {
          trigger: "item",
          confine: true,
          backgroundColor: _self.themeColors[_self.theme].backgroundColor,
          padding: [0, 5],
          textStyle: {
            fontSize: 12
          }
        },
        // legend: {
        //     // orient: 'horizontal',
        //     x: 'left',
        //     data: this.options.titles
        // },
        calculable: true,
        // color: this.colors,
        textStyle: {
          color: _self.themeColors[_self.theme].textColor
        },
        graphic:[
          {
            type:'text',  //副标题文字
            left: 10,
            bottom: 0,
            z:3,
            style:{
                text: _self.options.description,
                // textAlign:'center',
                fill: _self.themeColors[_self.theme].textColor,
                fontSize:11,
            }
          }
        ],
        calendar: [
          {
            top: 40,
            right: "center",
            range: range,
            splitLine: {
              show: true,
              lineStyle: {
                color:  _self.themeColors[_self.theme].borderColor,
                width: 2,
                type: "solid"
              }
            },
            yearLabel: {
              show: false
            },
            cellSize: 18,
            monthLabel: {
              textStyle: {
                color: _self.themeColors[_self.theme].textColor
              }
            },
            dayLabel: {
              textStyle: {
                color: _self.themeColors[_self.theme].textColor
              }
            },
            itemStyle: {
              normal: {
                color: 'rgba(0,0,0,0)',
                borderWidth: 0.5,
                borderType : 'solid',
                borderColor: _self.themeColors[_self.theme].lineColor
              }
            }
          }
        ],
        series: [
          {
            type: 'scatter',
            coordinateSystem: 'calendar',
            calendarIndex: 0,
            symbolSize: function (val) {
                return 3 + 12* val[1] / (_self.maxValue)
            },
            itemStyle: {
              color: _self.colors[0],
            },
            data: _self.data,
          },{
            type: 'effectScatter',
            coordinateSystem: 'calendar',
            calendarIndex: 0,
            symbolSize: function (val) {
                return 3 + 12* val[1] / (_self.maxValue)
            },
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            itemStyle: {
              color: _self.colors[0],
            },
            hoverAnimation: true,
            data: _self.Top3,
          }
        ]
      });
    }
  }
};
</script>
