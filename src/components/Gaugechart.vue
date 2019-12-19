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
          shadowColor1: "rgba(255, 255, 255, 0.5)",
          shadowColor2: "#2584e8",
          borderColor: "#fff"
        },
        light: {
          textColor: "#333333",
          shadowColor1: "rgba(255, 255, 255, 0.5)",
          shadowColor2: "#77022e",
          borderColor: "#77022e"
        },
        blue: {
          textColor: "#dce2f2",
          shadowColor1: "rgba(255, 255, 255, 0.5)",
          shadowColor2: "#2584e8",
          borderColor: "#fff"
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
          name: "访问来源",
          description: "速度表",
          series: [
            {
              name: '速度表',
              data: [
                { value: 100, name: "直接访问", max: 200 },
              ]
            }
          ]
        };
      }
    }
  },
  mounted() {
    console.log(this.options);
    setTimeout(() => {
      this.drawChart();
    });
  },
  computed: {
    theme() {
      return store.state.base.THEME_TYPE;
    }
  },
  watch: {
    options: {
      immediate: true,
      handler: function() {
        setTimeout(() => {
          this.myChart && this.myChart.clear();
          this.drawChart();
        }, 200);
      }
    },
    theme: {
      immediate: true,
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
      this.myChart = this.$echarts.init(this.$el);
      let series = [];
      let divider = parseInt(100 / (this.options.series.length + 1))
      Array.isArray(this.options.series) && this.options.series.length
        this.options.series.map((item, index) => {
          Array.isArray(item.data) && item.data.length
          series.push({
            name: item.name,
            type: "gauge",
            min: 0,
            max: 220,
            splitNumber: 4,
            radius: divider* 1.25 +'%',
            z: index,
            // radius: [25, 33],
            center : [divider + divider * index +'%', '50%'],
            itemStyle: {
              width: 5
            },
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                // color: [[0.09, "lime"], [0.82, "#1e90ff"], [1, "#ff4500"]],
                width: 2,
                // shadowColor: this.themeColors[this.theme].shadowColor, //默认透明
                // shadowBlur: 9
              }
            },
            // axisLabel: {
            //   // 坐标轴小标记
            //   textStyle: {
            //     // 属性lineStyle控制线条样式
            //     // fontWeight: 'bolder',
            //     color: this.themeColors[this.theme].textColor,
            //     // shadowColor: this.themeColors[this.theme].shadowColor, //默认透明
            //     // shadowBlur: 10,
            //     fontSize: 9
            //   }
            // },
            // axisTick: {
            //   // 坐标轴小标记
            //   length: 5, // 属性length控制线长
            //   lineStyle: {
            //     // 属性lineStyle控制线条样式
            //     color: "auto",
            //     // shadowColor: this.themeColors[this.theme].shadowColor, //默认透明
            //     // shadowBlur: 10
            //   }
            // },
            splitLine: {
              // 分隔线
              length: 10, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                width: 3,
                color: this.themeColors[this.theme].textColor,
                // shadowColor: this.themeColors[this.theme].shadowColor, //默认透明
                // shadowBlur: 10
              }
            },
            pointer: {
                width:2,
                // shadowColor : '#fff', //默认透明
                // shadowBlur: 5
            },
            title: {
              show: false
            },
            detail: {
              // backgroundColor: 'rgba(30,144,255,0.8)',
              // borderWidth: 1,
              // borderColor: '#fff',
              // shadowColor : '#fff', //默认透明
              shadowBlur: 5,
              offsetCenter: [0, "60%"], // x, y，单位px
              textStyle: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                // fontWeight: 'bolder',
                color: this.themeColors[this.theme].textColor
              }
            },
            data: item.data.slice(0,1)
          });
        });

      this.myChart.setOption({
        title: {
          text: this.options.title,
          // subtext: '纯属虚构',
          x: "left",
          textStyle: {
            color: this.themeColors[this.theme].textColor
          }
        },
        tooltip: {
          formatter: "{a} <br/>{c} {b}"
        },
        graphic: [
          {
            type: "text", //副标题
            right: 20,
            top: 10,
            z: 3,
            style: {
              text: this.options.description,
              // textAlign:'center',
              fill: this.themeColors[this.theme].textColor,
              fontSize: 12
              // height:60
            }
          }
        ],
        series: series
        // [
          /*
            {
                name:'转速',
                type:'gauge',
                center : ['25%', '55%'],    // 默认全局居中
                radius : '30%',
                min:0,
                max:7,
                endAngle:45,
                splitNumber:7,
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: [[0.29, 'lime'],[0.86, '#1e90ff'],[1, '#ff4500']],
                        width: 2,
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                axisLabel: {            // 坐标轴小标记
                    textStyle: {       // 属性lineStyle控制线条样式
                        fontWeight: 'bolder',
                        color: '#fff',
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                axisTick: {            // 坐标轴小标记
                    length :12,        // 属性length控制线长
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: 'auto',
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                splitLine: {           // 分隔线
                    length :20,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        width:3,
                        color: '#fff',
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                pointer: {
                    width:5,
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 5
                },
                title : {
                    offsetCenter: [0, '-30%'],       // x, y，单位px
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bolder',
                        fontStyle: 'italic',
                        color: '#fff',
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                detail : {
                    //backgroundColor: 'rgba(30,144,255,0.8)',
                  // borderWidth: 1,
                    borderColor: '#fff',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 5,
                    width: 80,
                    height:30,
                    offsetCenter: [25, '20%'],       // x, y，单位px
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bolder',
                        color: '#fff'
                    }
                },
                data:[{value: 1.5, name: 'x1000 r/min'}]
            },
            {
                name:'油表',
                type:'gauge',
                center : ['75%', '50%'],    // 默认全局居中
                radius : '30%',
                min:0,
                max:2,
                startAngle:135,
                endAngle:45,
                splitNumber:2,
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: [[0.2, 'lime'],[0.8, '#1e90ff'],[1, '#ff4500']],
                        width: 2,
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                axisTick: {            // 坐标轴小标记
                    length :12,        // 属性length控制线长
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: 'auto',
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                axisLabel: {
                    textStyle: {       // 属性lineStyle控制线条样式
                        fontWeight: 'bolder',
                        color: '#fff',
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    },
                    formatter:function(v){
                        switch (v + '') {
                            case '0' : return 'E';
                            case '1' : return 'Gas';
                            case '2' : return 'F';
                        }
                    }
                },
                splitLine: {           // 分隔线
                    length :15,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        width:3,
                        color: '#fff',
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                pointer: {
                    width:2,
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 5
                },
                title : {
                    show: false
                },
                detail : {
                    show: false
                },
                data:[{value: 0.5, name: 'gas'}]
            },
            {
                name:'水表',
                type:'gauge',
                center : ['75%', '50%'],    // 默认全局居中
                radius : '30%',
                min:0,
                max:2,
                startAngle:315,
                endAngle:225,
                splitNumber:2,
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: [[0.2, 'lime'],[0.8, '#1e90ff'],[1, '#ff4500']],
                        width: 2,
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                axisTick: {            // 坐标轴小标记
                    show: false
                },
                axisLabel: {
                    textStyle: {       // 属性lineStyle控制线条样式
                        fontWeight: 'bolder',
                        color: '#fff',
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    },
                    formatter:function(v){
                        switch (v + '') {
                            case '0' : return 'H';
                            case '1' : return 'Water';
                            case '2' : return 'C';
                        }
                    }
                },
                splitLine: {           // 分隔线
                    length :15,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        width:3,
                        color: '#fff',
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                pointer: {
                    width:2,
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 5
                },
                title : {
                    show: false
                },
                detail : {
                    show: false
                },
                data:[{value: 0.5, name: 'gas'}]
            }
            */
        // ]
      });
    }
  }
};
</script>
