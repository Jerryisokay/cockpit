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
          fillColor1:'#282a36',
          backgroundColor: '#264e94',
          borderColor: '#282a36',
        },
        light: {
          textColor: '#333333',
          shadowColor1: '#77022e',
          fillColor1: '#ffffff',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          borderColor: '#77022e',
        },
        blue: {
          textColor: '#dce2f2',
          shadowColor1: 'rgba(0, 0, 0, 0.2)',
          fillColor1:'#282a36',
          backgroundColor: '#264e94',
          borderColor: '#282a36',
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
      let name = this.options.sunburstData.name
      // 递归遍历数据, 把value转成数字型
      data = this.setData(this.options.sunburstData.children, true)

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
                pathHtml +=  ' > ' + '<span>'+ treePathInfo[i].name + '</span>'
            }
            pathHtml += '<br />' + value
            return '<div style="white-space: pre-wrap;">' + pathHtml + '</div>'
          }
        },
        series: [
          {
              data: data,
              name: name,
              type: 'sunburst',
              highlightPolicy: 'ancestor',
              sort: null,
              radius: [0, '85%'],
              center: ['50%','55%'],
              label: {
                  fontSize: 12,
                  silent: false,
                  color: this.themeColors[this.theme].textColor,
                  padding: 2,
                  textBorderColor: this.themeColors[this.theme].borderColor
              },
              itemStyle:{
                borderWidth: 1,
                borderColor: this.themeColors[this.theme].borderColor
              },
              levels: [{}, {
                  r0: '15%',
                  r: '35%',
                  itemStyle: {
                      borderWidth: 1,
                      borderColor: this.themeColors[this.theme].borderColor
                  },
              }, {
                  r0: '35%',
                  r: '70%',
                  label: {
                      align: 'right'
                  },
                  itemStyle:{
                    borderWidth: 1,
                    borderColor: this.themeColors[this.theme].borderColor
                  }
              }, {
                  r0: '70%',
                  r: '85%',
                  label: {
                      position: 'outside',
                      padding: 1,
                      silent: false
                  },
                  itemStyle: {
                      borderWidth: 2
                  }
              }]
          }
        ]
      });
    },
    setData(source, isroot){
      let data = []
      Array.isArray(source) && source.length && source.map( (item, index) => {
        let trait = {
          name: item.name
        }
        if(item.value){
          trait.value = parseFloat(item.value)
        }
        if(item.children){
          trait.children = this.setData(item.children)
        }
        if(isroot){
          trait.itemStyle = {
              color: this.colors[index]
          }
        }
        data.push(trait)
      })
      return data
    }
  }

};
</script>
