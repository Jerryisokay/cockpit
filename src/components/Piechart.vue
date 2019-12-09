<template>
  <div :id="id" class="chart-inner"></div>
</template>

<script>
//单维度的
export default {
  name: "piechart",
  data() {
    return {
      themeColors:{
        dark: {
          textColor: 'dce2f2'
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
          title: '访问来源',
          description :'单位/人',
          type: 0,
          style: 0,
          colors:['#19D672','#FD517D','#76A5D9'],
          series: [
            {
              name: '答题成功率',
              data: [
                {
                  value:60,
                  name:'答题成功率',
                  max: 100
                }
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
  computed:{
    titles(){
      const titles = []
      Array.isArray(this.options.series) && this.options.series.length && Array.isArray(this.options.series[0].data) &&
      this.options.series[0].data.map( v =>{
        if(titles.indexOf(v.name) < 0) titles.push( v.name )
      })
      return titles
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
  mounted(){
    // console.log(' Pie chart mounted ')
    setTimeout( () => {
      this.drawChart()
    },200)
  },
  methods: {
    drawChart(){
      this.myChart = this.$echarts.init(this.$el)
      // let color = ["#19D672", "#FD517D"]
      let data = []
      if(Array.isArray(this.options.series) && this.options.series.length && Array.isArray(this.options.series[0].data)){
        let name = this.options.series.name
        data = this.options.series[0].data
      }


      this.myChart.setOption({
        title : {
            text: this.options.title,
            subtext: this.options.description,
            x:'left',
            fontSize: 16,
            textStyle: {
              color:'#dce2f2'
            }
        },
        grid:{
          left: 10,
          right: 20,
          top: 40,
          bottom: 10,
          containLabel : true
        },
        tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} ({d}%)",
            backgroundColor : 'rgba(0,0,0,0.6)'
        },
        legend: {
            // orient: 'horizontal',
            data: this.options.titles,
            x : 'center',
            y : 'bottom',
            textStyle: {
              color:'#dce2f2',
              fontSize: 11
            }
        },
        color: this.options.colors || ['#ffc03d','#01edd9','#3c95fb'],
        textStyle: {
          color:'#dce2f2'
        },
        series: [
          {
            name: name,
            type:'pie',
            radius: [33, 45],
            avoidLabelOverlap: false,
            itemStyle:{
              shadowColor: 'rgba(255, 255, 255, 0.5)',
              shadowBlur: 2,
            },
            label: {
                normal: {
                    show: true,
                    position: 'outside',
                    formatter: '{b}:{d}%',
                    fontSize: 10,
                    verticalAlign: 'center'
                },
            },
            labelLine: {
                normal: {
                    show: true,
                    lineStyle: {
                        color: '#fff'
                    },
                    smooth: 0.2
                }
            },
            color: this.options.colors || ['#ffc03d','#01edd9','#3c95fb'],
            // animationType: 'scale',
            animationEasing: 'elasticOut',
            data: data
          }
        ],
        graphic:[
          {
            type:'circle',  //外层光环
            left:'center',
            top:'center',
            shape: {
                cx: 0,
                cy: 0,
                r: 52,
                // r0: 52
            },
            style:{
                fill:'#2584e8',
                stroke:"#001f3c",
                shadowBlur : 5,
                shadowColor: '#2584e8'
            },
            z:-2
          },{
            type:'circle',  //黑色圆底
            left:'center',
            top:'center',
            shape: {
                cx: 0,
                cy: 0,
                r:50,
            },
            style:{
                fill:'#040312',
            },
            z: -1
          },{
            type:'circle',  //内层圆形
            left:'center',
            top:'center',
            shape: {
                cx: 0,
                cy: 0,
                r:25,
            },
            style:{
                fill:'#001f3c',
                stroke:"#001f3c",
                // height:60
            },
            z:1
          },{
            type:'ring',  // 中心圆环
            left:'center',
            top:'center',
            shape: {
                cx: 0,
                cy: 0,
                r: 30,
                r0: 29
            },
            style:{
                fill:'#097090',
            },
            z:2
          },{
            type:'text',  //中心文字
            left:'center',
            top:'center',
            z:3,
            style:{
                text:'标题\n名称',
                textAlign:'center',
                fill:'#fff',
                stroke:"#3c95fb",
                width:25,
                fontSize:14,
                // height:60
            }
          }
        ]
      });
    }
  }

};
</script>
