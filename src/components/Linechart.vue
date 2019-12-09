<template>
  <div :id="id" class="chart-inner"></div>
</template>

<script>
export default {
  name: "linechart",
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
          // titles: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          // data: [820, 932, 901, 934, 1290, 1330, 1320],
          title: '访问来源',
          description :'单位/人',
          type: 2,
          style: 0,
          colors:['#19D672','#FD517D','#76A5D9'],
          series: [
            {
              name: '一般量级统计',
              data: [
                {value:60, name:'Mon', max:100},
                {value:30, name:'Tue', max:100},
                {value:10, name:'Wed', max:100},
                {value:75, name:'Thu', max:100},
                {value:30, name:'Fri', max:100},
                {value:10, name:'Sat', max:100},
                {value:75, name:'Sun', max:100},
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
  computed: {
    titles(){
      const titles = []
      this.options.series.map( v =>{
        v.data.map( d => {
          if(titles.indexOf(d.name) < 0) titles.push( d.name )
        })
      })
      return titles
    },
    values(){}
  },
  mounted(){
    // console.log(this.options)
    this.drawChart()
  },
  methods: {
    drawChart(){
      let myChart = this.$echarts.init(document.getElementById(this.id))
      let series = []
      Array.isArray(this.options.series) && this.options.series.map( (item, index) => {
        let data = []
        Array.isArray(item.data) && item.data.map( v => {
          data.push( v.value )
        })
        series.push(
          {
              data: data,
              type: 'line',
              name: item.name,
              color: this.options.colors[index]
          }
        )
      })
      console.log(series)
      myChart.setOption({
        title : {
            text: this.options.title,
            x:'left',
            textStyle:{
              color: '#ffffff',//'#76a5d9'
            },
        },
        tooltip : {
            trigger: 'item',
            formatter: '{a}: {c}({b})',
            // padding: [0, 5],
            textStyle:{
              color: '#cccccc',
              fontSize: 12,
            }
        },
        graphic:[
          {
            type:'text',  //中心文字
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
        grid:{
          left: 10,
          right: 20,
          top: 40,
          bottom: 10,
          containLabel : true
        },
        xAxis: {
            type: 'category',
            data: this.titles,
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
        series: series
      });
    }
  }

};
</script>
