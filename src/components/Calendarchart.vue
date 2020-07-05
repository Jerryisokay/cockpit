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
        pink: {
          textColor: "#333333",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          shadowColor1: "rgba(255, 255, 255, 0.5)",
          shadowColor2: "#77022e",
          borderColor: "#c6044d",
          lineColor: 'rgba(0, 0, 0, 0.2)',//'#c6044d',
          fillColor:'#77022e',
          emphasisColor: '#2584e8',
        },
        light: {
          textColor: "#333333",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          shadowColor1: "rgba(255, 255, 255, 0.5)",
          shadowColor2: "#2D88F8",
          borderColor: "#2D88F8",
          lineColor: 'rgba(0, 0, 0, 0.2)',//'#c6044d',
          fillColor:'#5985B8',
          emphasisColor: '#01F0D9',
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
      },
      optionData: {
        title: "",
        description: "",
        type: 19,
        series: [],
        calendarData: []
      }
    };
  },
  props: {
    id: { type: String },
    pageId: { type: String },
    width: { type: String, default: "200px" },
    height: { type: String, default: "200px" },
    options: {
      type: Object,
      default() {
        return {
          title: "",
          description: "",
          type: 19,
          series: [],
          calendarData: []
        };
      }
    }
  },
  mounted() {
    // console.log(this.options);
    this.initialData( this.options )
    if(this.options.refresh){
      let timer = setInterval( () => {
        document.getElementById(this.id) && this.refreshData()
      }, parseInt(this.options.refresh) * 1000)
    }
  },
  computed: {
    theme() {
      return store.state.base.THEME_TYPE;
    },
    colors() {
      let colors = this.optionData.colors || [];
      return colors.concat(store.state.base.COLOR_REPOSITORY);
    },
    data(){
      let data = []
      Array.isArray(this.optionData.calendarData) && this.optionData.calendarData.length &&
      this.optionData.calendarData.map(v => {
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
    navHeight(){
      return store.state.base.HIDE_NAV ? 0 : 85;
    },
    gridWidth(){
      return parseFloat((document.documentElement.clientWidth - 40)/36)
    },
    gridHeight(){
      return parseFloat((store.state.base.PAGE_HEIGHT - 25 - this.navHeight)/36)
    },
  },
  watch: {
    options: {
      immediate: false,
      handler: function() {
        setTimeout(() => {
          this.refreshData();
        }, 200);
      }
    },
    theme: {
      immediate: false,
      handler: function() {
        setTimeout(() => {
          this.refreshData();
        }, 200);
      }
    }
  },
  methods: {
    initialData( data ){
      const _self = this
      _self.myChart && _self.myChart.clear()
      _self.optionData = Object.assign({}, data)
      _self.drawChart();
    },
    refreshData(){
      const _self = this
      // console.log(_self.options.id, _self.pageId)
      if(_self.options.id && _self.pageId){
        _self.$store.dispatch('getSingleChartAction', { pageId: _self.pageId, id: _self.options.id })
        .then( (data) => {
          _self.initialData(data)
        })
      }
    },
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
          text: _self.optionData.title,
          // subtext: this.optionData.description,
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
        //     data: this.optionData.titles
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
                text: _self.optionData.description,
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
