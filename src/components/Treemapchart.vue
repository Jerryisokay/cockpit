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
          shadowColor1: '#2D88F8',
          fillColor1: '#ffffff',
          backgroundColor: 'rgba(0,0,0,0.5)',
        },
        blue: {
          textColor: '#dce2f2',
          shadowColor1: 'rgba(0, 0, 0, 0.2)',
          fillColor1:'#282a36',
          backgroundColor: '#264e94',
        }
      },
      optionData: {
        title: '',
        description :'',
        type: 14,
        style: 0,
        colors:[],
        series:[],
        sunburstData:null,
        treeData: {
          name:'root',
          children:[]
        },
        scatterData:null,
        riverData:null
      }
    };
  },
  props: {
    id: { type: String },
    pageId: { type: String },
    width: { type: String, default: "200px" },
    height: { type: String, default: "200px" },
    options:{
      type:Object,
      default(){
        return {
          title: '访问来源',
          description :'单位/人',
          type: 14,
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
    theme(){
      return store.state.base.THEME_TYPE
    },
    colors(){
      let colors = this.optionData.colors || []
      return colors.concat(store.state.base.COLOR_REPOSITORY)
    }
  },
  mounted(){
    // console.log(this.options)
    this.initialData( this.options )
    if(this.options.refresh){
      let timer = setInterval( () => {
        document.getElementById(this.id) && this.refreshData()
      }, parseInt(this.options.refresh) * 1000)
    }
  },
  watch:{
    options:{
      immediate:false,
      handler:function(){
        setTimeout( () => {
          this.refreshData()
        },200)
     }
    },
    theme:{
      immediate:false,
      handler:function(){
        setTimeout( () => {
          this.refreshData()
        },200)
     }
    }
  },
  methods: {
    initialData( data ){
      const _self = this
      _self.myChart && _self.myChart.clear()
      _self.optionData = Object.assign({}, data)
      _self.drawChart();
    },
    refreshData(){
      const _self = this
      // console.log(_self.options.id, _self.pageId)
      if(_self.options.id && _self.pageId){
        _self.$store.dispatch('getSingleChartAction', { pageId: _self.pageId, id: _self.options.id })
        .then( (data) => {
          _self.initialData(data)
        })
      }
    },
    drawChart(){
      this.myChart = this.$echarts.init(this.$el)
      let formatUtil = this.$echarts.format
      let data = []
      let name = this.optionData.treeData.name
      if(Array.isArray(this.optionData.treeData.children)){
        data = this.optionData.treeData.children
      }
      // console.log(data)
      this.myChart.resize();
      this.myChart.setOption({
        title : {
            text: this.optionData.title,
            x:'left',
            textStyle:{
              color: this.themeColors[this.theme].textColor,
              fontSize: 14
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
                text: this.optionData.description,
                // textAlign:'center',
                fill: this.themeColors[this.theme].textColor,
                fontSize:11,
            }
          }
        ],
        tooltip: {
          trigger: 'item',
          confine: true,
          textStyle:{
            fontSize: 12
          },
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
