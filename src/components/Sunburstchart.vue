<template>
  <div :id="id" class="chart-inner"></div>
</template>

<script>
import store from '@/store'

export default {
  name: "sunburstchart",
  data() {
    return {
      themeColors:{
        dark: {
          textColor: '#dce2f2',
          shadowColor1: 'rgba(0, 0, 0, 0.2)',
          fillColor1:'#282a36'
        },
        light: {
          textColor: '#333333',
          shadowColor1: '#77022e',
          fillColor1: '#ffffff',
        },
        blue: {
          textColor: '#dce2f2',
          shadowColor1: 'rgba(0, 0, 0, 0.2)',
          fillColor1:'#282a36'
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
    values(){},
    theme(){
      return store.state.base.THEME_TYPE
    },
    colors(){
      let colors = this.options.colors || []
      return colors.concat(store.state.base.COLOR_REPOSITORY)
    }
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
    },
    theme:{
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
              color: this.themeColors[this.theme].textColor
            },
        },
        color: this.colors,
        graphic:[
          {
            type:'text',  //副标题文字
            left: 10,
            bottom:0,
            z:3,
            style:{
                text: this.options.description,
                // textAlign:'center',
                fill: this.themeColors[this.theme].textColor,
                fontSize:12,
            }
          }
        ],
        series: [
          {
              data: [data],
              type: 'sunburst',
              name: '',
              radius: [0, '85%'],
              center: ['50%','55%'],
              label: {
                  rotate: 'radial',
                  fontSize: 10,
                  color: this.themeColors[this.theme].textColor
                  // textBorderColor: 'auto'
              },
              itemStyle:{
                borderWidth: 1
              },
              levels:{
                itemStyle:{
                  // color:['#FD517D','#76A5D9']
                }
              }
          }
        ]
      });
    }
  }

};
</script>
