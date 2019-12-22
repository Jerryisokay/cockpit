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
          shadowColor1: "rgba(255, 255, 255, 0.5)",
          shadowColor2: "#2584e8",
          borderColor: "#fff"
        },
        light: {
          textColor: "#333333",
          backgroundColor: 'rbga(0, 0, 0, 0.5)',
          shadowColor1: "rgba(255, 255, 255, 0.5)",
          shadowColor2: "#77022e",
          borderColor: "#77022e"
        },
        blue: {
          textColor: "#dce2f2",
          backgroundColor: 'rbga(0, 0, 0, 0.5)',
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
    },
    legendData(){
      let data = []
      this.options.series.map( (item, index) => {
        data.push({
          name: item.name,
          textStyle:{
            color: this.options.colors[index]
          }
        })
      })
      return data
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
      let divider = parseInt(100 / (this.options.series.length * 2))
      Array.isArray(this.options.series) && this.options.series.length
        this.options.series.map((item, index) => {
          // console.log(this.options.colors[ index ])
          Array.isArray(item.data) && item.data.length
          series.push({
            name: item.name,
            type: "gauge",
            min: 0,
            max:  item.data[0].max,
            splitNumber: 2,
            // radius: divider* 1.25 +'%',
            z: index,
            radius: this.getRadius(this.options.series.length, this.options.size),
            center: this.getCenterPosition(index, this.options.series.length, this.options.size),
            // center : [divider + divider * index +'%', '50%'],
            itemStyle: {
              width: 5
            },
            axisLine: {
              // 坐标轴线
              lineStyle: {
                color: this.options.colors[ index ] ? [[1, this.options.colors[ index ]]] : [[1, this.themeColors[this.theme].borderColor]],
                width: 5,
              }
            },
            axisLabel:{
              show: true,
              distance : 2,
              fontSize: 8
            },
            axisTick: {
              show: false
            },
            splitLine: {
              // 分隔线
              length: 8, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                width: 2,
                color: this.themeColors[this.theme].textColor,
              }
            },
            pointer: {
                width: 3,
            },
            title: {
              // show: false
              offsetCenter: [0, '80%'],
              fontSize: 12,
              color: this.themeColors[this.theme].textColor,
            },
            detail: {
              show:false
            },
            data: item.data.slice(0,1),
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
        // tooltip: {
        //   formatter: "{a} <br/>{c} {b}",
        //   backgroundColor: this.themeColors[this.theme].backgroundColor,
        // },
        tooltip: {
            trigger: 'item',
            // confine: true,
            formatter: "{a} <br/>{c} {b}",
            backgroundColor: this.themeColors[this.theme].backgroundColor,
            textStyle:{
              fontSize: 12
            }
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
        color: this.options.colors,
        series: series
      });
    },
    getRadius( length, size){
      // console.log(length)
      let [colmuns, rows] = this.getColumns(length, size)
      return size == 1 ? Math.min( 100/colmuns , 120/rows ) : Math.min( 100/colmuns , 60/rows )

      if(length <= 1){
        return 75
      }if(length == 2){
        return 50
      }else if(size == 1){    //尺寸大的图表 双层展示
        return parseInt(100 / Math.ceil(length/2))
      }else{
        return parseInt(100 / length)
      }

    },
    getColumns(length, size){   //获取行列数
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
      let singleH = size == 1 ? 180 / rows : 90 /rows

      // console.log('====================================');

      return [singleW * (xNth * 2 - 1) , singleH * ( yNth * 2 - 1) + 40 ]

    }
  }
};
</script>
