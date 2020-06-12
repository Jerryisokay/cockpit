<template>
  <div :id="id" class="chart-inner"></div>
</template>

<script>
import store from "@/store";

export default {
  name: "gaugechart",
  data() {
    return {
      themeColors: {
        dark: {
          textColor: "#dce2f2",
          backgroundColor: '#264e94',
          shadowColor1: "rgba(255, 255, 255, 0.6)",
          shadowColor2: "#2584e8",
          borderColor: "#fff"
        },
        light: {
          textColor: "#333333",
          backgroundColor: 'rgba(0,0,0,0.5)',
          shadowColor1: "rgba(0, 0, 0, 0)",
          shadowColor2: "#77022e",
          borderColor: "#77022e"
        },
        blue: {
          textColor: "#dce2f2",
          backgroundColor: '#264e94',
          shadowColor1: "rgba(255, 255, 255, 0.6)",
          shadowColor2: "#2584e8",
          borderColor: "#fff"
        }
      },
      optionData: {
        name: "",
        description: "",
        colors: [],
        series: []
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
          name: "",
          description: "",
          colors: [],
          series: []
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
    colors(){
      let colors = this.optionData.colors || []
      return colors.concat(store.state.base.COLOR_REPOSITORY)
    },
    legendData(){
      let data = []
      this.optionData.series.map( (item, index) => {
        data.push({
          name: item.name,
          textStyle:{
            color: this.colors[index]
          }
        })
      })
      return data
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
      immediate: true,
      handler: function() {
        setTimeout(() => {
          this.refreshData();
        }, 200);
      }
    },
    theme: {
      immediate: true,
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
      this.innerWidth = this.gridWidth * this.optionData.width - 24
      this.innerHeight = this.gridHeight * this.optionData.height - 62
      if(this.innerWidth < 0){
        this.innerWidth = 300
      }
      if(this.innerHeight < 0){
        this.innerWidth = 150
      }
      this.myChart = this.$echarts.init(this.$el);
      let series = [], data = [];
      let graphic = [
        {
          type: "text", //副标题
          right: 10,
          top: 8,
          z: 3,
          style: {
            text: this.optionData.description,
            // textAlign:'center',
            fill: this.themeColors[this.theme].textColor,
            fontSize: 11
            // height:60
          }
        }
      ];
      let divider = parseInt(100 / (this.optionData.series.length * 2))
      if(Array.isArray(this.optionData.series) && this.optionData.series.length){
        data = this.optionData.series.slice(0, 3)
        // console.log(data.length)
        data.map((item, index) => {
          series.push({
            name: item.name,
            type: 'gauge',
            min: 0,
            max: item.data[0].max,
            splitNumber: this.isMajor(index, data.length) ? 10 : 4,
            startAngle: data.length == 3 && index == 2 ? 135: 225,
            endAngle: data.length == 3 && index == 0 ? 45: -45,
            radius: this.getRadius(index, data.length),
            center: this.getCenterPosition(index, data.length), //['50%', '55%'],
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: [[0.2, 'lime'], [0.8, '#1e90ff'], [1, '#ff4500']],
                    width: 2,
                    shadowColor: this.themeColors[this.theme].shadowColor1, //阴影
                    shadowBlur: this.isMajor(index, data.length) ? 5 : 2
                }
            },
            axisLabel: {            // 坐标轴小标记
                fontWeight: 'bolder',
                // color: '#fff',
                // shadowColor: this.themeColors[this.theme].shadowColor1, //默认透明
                // shadowBlur: 5,
                fontSize: data.length == 0? 10: (this.isMajor(index, data.length) ? 8 : 6)
            },
            axisTick: {            // 坐标轴小标记
                length: data.length == 0? 10: (this.isMajor(index, data.length) ? 5 : 3),        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: 'auto',
                    shadowColor: this.themeColors[this.theme].shadowColor1, //默认透明
                    shadowBlur: 5
                },
                show: this.isMajor(index, data.length) ? true : false,
            },
            splitLine: {           // 分隔线
                length: data.length == 0? 10: (this.isMajor(index, data.length) ? 8 : 5),         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    width: 2,
                    color: 'auto',
                    shadowColor: this.themeColors[this.theme].shadowColor1, //默认透明
                    shadowBlur: this.isMajor(index, data.length) ? 5 : 2
                }
            },
            pointer: {           // 分隔线
                shadowColor: this.themeColors[this.theme].shadowColor1, //默认透明
                shadowBlur: 5,
                width: this.isMajor(index, data.length) ? 5 : 3,
            },
            title: {
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder',
                    fontSize: this.isMajor(index, data.length) ? 14 : 12,
                    // fontStyle: 'italic',
                    color: this.themeColors[this.theme].textColor,
                    shadowColor: this.themeColors[this.theme].shadowColor1, //默认透明
                    shadowBlur: 5
                }
            },
            detail: {
                offsetCenter: [0, '60%'],       // x, y，单位px
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder',
                    color: this.themeColors[this.theme].textColor,
                    fontSize: this.isMajor(index, data.length) ? 18 : 14
                }
            },
            data: item.data.slice(0,1)
          });

          //
          graphic.push({
            type: "text", //副标题
            // left: this.getCenterPosition(index, this.optionData.series.length, this.optionData.size)[0],
            // top: this.getCenterPosition(index, this.optionData.series.length, this.optionData.size)[1],
            position: this.getTextPosition(index, data.length, this.optionData.size),
            z: 3,
            style: {
              text: item.name,
              width: 60,
              height: 40,
              textAlign: 'center',
              fontWeight: 'bold',
              fill: this.themeColors[this.theme].textColor,
              fontSize: this.isMajor(index, data.length) ? 14 : 11
            }
          })
        });
      }

      this.myChart.resize();
      this.myChart.setOption({
        title: {
          text: this.optionData.title,
          // subtext: '纯属虚构',
          x: "left",
          textStyle: {
            color: this.themeColors[this.theme].textColor,
            fontSize: 14
          }
        },
        tooltip: {
            trigger: 'item',
            // confine: true,
            formatter: "{a} <br/>{c} {b}",
            backgroundColor: this.themeColors[this.theme].backgroundColor,
            textStyle:{
              fontSize: 12,
              color: '#ffffff'
            }
        },
        graphic: graphic,
        color: this.colors,
        series: series
      });
    },
    isMajor(index, length){
      return length < 3 || index == 1
    },
    getRadius(index, length){
      let r = Math.min( this.innerWidth/ 2.5 , this.innerHeight/ 2.5 )
      if(length == 2){
        r = Math.min( this.innerWidth/ 5 , this.innerHeight/ 2.5 )
      }else if(length == 3){
        r = index == 1 ? Math.min( this.innerWidth/ 5 , this.innerHeight/ 2.5 ) : Math.min( this.innerWidth/ 8 , this.innerHeight/ 4 )
      }
      return r

    },
    getCenterPosition( index, length){  //获取单个图表的位置
      let x = '50%', y = '55%'
      if(length == 2){
        // y = index == 0 ? '25%' : '75%'
        x = (0.5 * index + 0.25) * this.innerWidth
      }else if(length == 3){
        x = (0.28 * index + 0.22) * this.innerWidth
      }
      return [x, y]
    },
    getTextPosition( index, length){  //获取单个图表的位置
    let x = this.innerWidth/2, y = this.innerHeight * 1.1
      if(length == 2){
        // y = index == 0 ? '25%' : '75%'
        x = (0.5 * index + 0.25) * this.innerWidth
      }else if(length == 3){
        x = (0.28 * index + 0.22) * this.innerWidth
        y = index == 1 ? this.innerHeight * 1.1 : this.innerHeight
      }
      return [x, y]
    }
  }
};
</script>
