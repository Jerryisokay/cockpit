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
          lineColor: '#1cd1d4',
          fillColor:'#2584e8',
          emphasisColor: '#2584e8',
        },
        light: {
          textColor: "#333333",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          shadowColor1: "rgba(255, 255, 255, 0.5)",
          shadowColor2: "#77022e",
          borderColor: "#77022e",
          lineColor: '#c6044d',
          fillColor:'#77022e',
          emphasisColor: '#2584e8',
        },
        blue: {
          textColor: "#dce2f2",
          backgroundColor: "#264e94",
          shadowColor1: "rgba(255, 255, 255, 0.5)",
          shadowColor2: "#2584e8",
          borderColor: "#2584e8",
          lineColor: '#1cd1d4',
          fillColor:'#2584e8',
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
    console.log(this.options);
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
      let data = this.options.calendarData;

      this.myChart.setOption({
        title: {
          text: this.options.title,
          // subtext: this.options.description,
          x: "left",
          fontSize: 16,
          textStyle: {
            color: this.themeColors[this.theme].textColor
          }
          // subtextStyle:{
          //   color: this.themeColors[this.theme].textColor
          // }
        },
        tooltip: {
          trigger: "item",
          confine: true,
          formatter: "{b}: <br />{c} ({d}%)",
          backgroundColor: this.themeColors[this.theme].backgroundColor,
          // padding: [0, 5],
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
        color: this.colors,
        textStyle: {
          color: this.themeColors[this.theme].textColor
        },
        calendar: [
          {
            top: 70,
            right: "center",
            range: ["2019-10-01", "2019-12-31"],
            splitLine: {
              show: true,
              lineStyle: {
                color:  this.themeColors[this.theme].borderColor,
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
                color: this.themeColors[this.theme].textColor
              }
            },
            dayLabel: {
              // formatter: '{start}  1st',
              textStyle: {
                color: this.themeColors[this.theme].textColor
              }
            },
            itemStyle: {
              normal: {
                color: 'rgba(0,0,0,0)',
                borderWidth: 1,
                borderColor: this.themeColors[this.theme].lineColor
              }
            }
          }
        ],
        series: []
      });
    }
  }
};
</script>
