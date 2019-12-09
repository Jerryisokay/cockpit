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
          name: '访问来源',
          titles: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          data: [820, 932, 901, 934, 1290, 1330, 1320],
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
      let color = ["#19D672", "#FD517D"]
      this.myChart.setOption({
        title : {
            text: this.options.name,
            // subtext: '纯属虚构',
            x:'left',
            textStyle:{
              color: '#ffffff',//'#76a5d9'
            },
        },
        grid:{
          left: 10,
          right: 20,
          top: 40,
          bottom: 10,
          containLabel : true
        },
        xAxis: {
            type: 'category',
            data: this.options.titles,
            axisLabel:{
              show:true,
              textStyle:{
                fontSize: 10,
                color: '#ffffff',//'#76a5d9'
              },
            },
        },
        yAxis: {
            type: 'value',
            splitLine: {
              //  改变轴线颜色
              lineStyle: {
                  // 使用深浅的间隔色
                  color: ['rgba(255,255,255,0.2)'],
                  type: 'dashed'
              },

            },
            axisLabel:{
              show:true,
              textStyle:{
                fontSize: 10,
                color: '#ffffff',//'#76a5d9'
              },
              formatter: (value) => {
                  var texts=value;
                  if(texts.length>3){ // 字数限制
                      texts=texts.substr(0,3)+'...';
                  }
                  return texts;
              },
            },
        },
        series: [
          {
              data: this.options.data,
              type: 'scatter',
              color: color
          }
        ]
      });
    }
  }

};
</script>
