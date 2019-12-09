<template>
  <div :id="id" class="chart-inner"></div>
</template>

<script>
export default {
  name: "radarchart",
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
          data: [820, 932, 901, 934, 1290, 1330, 1320],
        }
      }
    }
  },
  computed:{
    indicator(){
      const indicator = []
      const titles = []
      Array.isArray(this.options.series) && this.options.series.map( v =>{
        v.data.map( d => {
          if(titles.indexOf(d.name) < 0){
            indicator.push({
              name: d.name,
              max: d.max
            })
            titles.push( d.name )
          }
        })
      })
      return indicator
    },
    data(){
      const data = []
      Array.isArray(this.options.series) && this.options.series.map( item => {
        let values = []
        Array.isArray(item.data) && item.data.map( v => {
          values.push(v.value)
        })
        data.push({
            value : values,
            name : item.name
        })
      })
      return data
    }
  },
  mounted(){
    // console.log(this.options)
    this.drawPie()
  },
  methods: {
    getIndexOfKey(key, value, arr){
      let index = -1;
      arr.map( (v, i) => {
        if(v[key] === value) index = i
      } )
      return index
    },
    drawPie(){
      let myChart = this.$echarts.init(document.getElementById(this.id))
      let color = ["#19D672", "#FD517D"]
      myChart.setOption({
        title : {
            text: this.options.title,
            // subtext: '纯属虚构',
            x:'left',
            textStyle:{
              color: '#ffffff',//'#76a5d9'
            },
        },
        legend:{
            top : 25,
            formatter: (value) => {
                var texts=value;
                if(texts.length>6){ //限定字数
                    texts=texts.substr(0,6)+'...';
                }
                return texts;
            },
            textStyle: {
              color: '#ffffff',
              fontSize: 11
            },
            icon: 'circle'
        },
        radar: {
            name: {
              textStyle: {
                  color: '#fff',
                  fontSize: 10
              }
            },
            center: ['50%', '60%'],
            nameGap : 5,
            radius : '60%',
            splitArea : {
                show : false,
                areaStyle : {
                    color: 'rgba(0,0,0,0)', // 图表背景的颜色
                },
            },
            indicator: this.indicator,
            // [
            //   { name: '销售（sales）', max: 6500},
            //   { name: '管理（Administration）', max: 16000},
            //   { name: '信息技术（Information Techology）', max: 30000},
            //   { name: '客服（Customer Support）', max: 38000},
            //   { name: '研发（Development）', max: 52000},
            //   { name: '市场（Marketing）', max: 25000}
            // ]
        },
        grid: {
            position: 'center',
        },
        tooltip : {
            confine: true,
            backgroundColor: '#264e94',
            padding: [0, 5],
            textStyle:{
              fontSize: 12
            }
        },

        series: [{
            name: '预算 vs 开销（Budget vs spending）',
            type: 'radar',
            symbol: 'circle', // 拐点的样式，还可以取值'rect','angle'等
            symbolSize: 8, // 拐点的大小
            areaStyle: {
              normal: {
                color: '#ccc'
              }
            },
            emphasis: {
              areaStyle: {
                color:"#222"
              }
            },
            data : this.data
        }],
        color: color,
      });
    }
  }

};
</script>
