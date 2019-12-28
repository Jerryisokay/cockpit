<template>
  <div :id="id" class="chart-inner"></div>
</template>

<script>
import store from '@/store'
export default {
  name: "treemapchart",
  data() {
    return {
      themeColors:{
        dark: {
          textColor: '#dce2f2',
          shadowColor1: 'rgba(0, 0, 0, 0.2)',
          fillColor1:'#282a36',
          backgroundColor: '#264e94',
        },
        light: {
          textColor: '#333333',
          shadowColor1: '#77022e',
          fillColor1: '#ffffff',
          backgroundColor: 'rgba(0,0,0,0.5)',
        },
        blue: {
          textColor: '#dce2f2',
          shadowColor1: 'rgba(0, 0, 0, 0.2)',
          fillColor1:'#282a36',
          backgroundColor: '#264e94',
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
          sunburstData:null,
          treeData: {
            name:'root',
            children:[]
          },
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
      immediate:false,
      handler:function(){
        setTimeout( () => {
          this.myChart && this.myChart.clear()
          this.drawChart()
        },200)
     }
    },
    theme:{
      immediate:false,
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
      let formatUtil = this.$echarts.format
      let data = []
      let name = this.options.treeData.name
      if(Array.isArray(this.options.treeData.children)){
        data = this.options.treeData.children
      }
      // console.log(data)
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
            right: 10,
            top:10,
            z:3,
            style:{
                text: this.options.description,
                // textAlign:'center',
                fill: this.themeColors[this.theme].textColor,
                fontSize:12,
            }
          }
        ],
        tooltip: {
          trigger: 'item',
          confine: true,
          backgroundColor: this.themeColors[this.theme].backgroundColor,
          formatter: function (info) {
            var value = info.value;
            var treePathInfo = info.treePathInfo;
            var treePath = [];
            let pathHtml = name
            // console.log(info.treePathInfo)
            for (var i = 1; i < treePathInfo.length; i++) {
                treePath.push(treePathInfo[i].name);
                pathHtml +=  '<br />' + '<span>'+ treePathInfo[i].name + '</span>'
            }
            pathHtml += ' : ' + formatUtil.addCommas(value)

            return '<div style="white-space: pre-wrap;">' + pathHtml + '</div>'
          }
        },
        series: [
          {
              type: 'treemap',
              name: name,
              data: data,

              top: 30,
              left: 10,
              bottom: 20,
              right: 10,
              height: '70%',
              center: ['50%','55%'],
              symbolSize: 7,

              label: {
                show: true,
                formatter: '{b}',
                normal: {
                    fontSize: 10,
                    textStyle:{
                      color: this.themeColors[this.theme].textColor,//'#76a5d9'
                    },
                }
              },
              levels: this.getLevelOption(),
              leaves: {
                  label: {
                      normal: {
                          position: 'right',
                          verticalAlign: 'middle',
                          align: 'left',
                          fontSize: 8,
                      }
                  }
              },
              expandAndCollapse: true,
              animationDuration: 550,
              animationDurationUpdate: 750
          }
        ]
      });
    },
    getLevelOption() {
        return [
            {
                itemStyle: {
                    normal: {
                        borderWidth: 0,
                        gapWidth: 2
                    }
                }
            },
            {
                itemStyle: {
                    normal: {
                        gapWidth: 1
                    }
                }
            },
            {
                colorSaturation: [0.35, 0.5],
                itemStyle: {
                    normal: {
                        gapWidth: 1,
                        borderColorSaturation: 0.6
                    }
                }
            }
        ];
    }
  }

};
</script>
