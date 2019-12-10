<template>
  <div :id="id" class="chart-inner"></div>
</template>

<script>
export default {
  name: "sunburstchart",
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
          description :'单位/人',
          type: 9,
          style: 0,
          colors:['#FD517D','#76A5D9'],
          series:[],
          sunburstData: {
            name:'root',
            children:[{
              name: 'parent',
              value: 100
            }]
          },
          treeData: null,
          scatterData:null,
          riverData:null
        }
      }
    }
  },
  computed: {
    values(){}
  },
  mounted(){
    // console.log(this.options)
    this.drawChart()
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
      let data = this.options.sunburstData

      console.log(data)
      this.myChart.setOption({
        title : {
            text: this.options.title,
            x:'left',
            textStyle:{
              color: '#ffffff',//'#76a5d9'
            },
        },
        color: this.options.colors,
        graphic:[
          {
            type:'text',  //副标题文字
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
        series: [
          {
              data: [data],
              type: 'sunburst',
              name: '',
              radius: [0, '95%'],
              label: {
                  rotate: 'radial',
                  fontSize: 10,
                  // textBorderColor: 'auto'
              },
              itemStyle:{
                borderWidth: 1
              },
              levels:{
                itemStyle:{
                  color:['#FD517D','#76A5D9']
                }
              }
          }
        ]
      });
    }
  }

};
</script>
