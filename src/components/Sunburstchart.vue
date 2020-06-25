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
          shadowColor1: '#01F0D9',
          fillColor1: '#ffffff',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          borderColor: '#2D88F8',
        },
        blue: {
          textColor: '#dce2f2',
          shadowColor1: 'rgba(0, 0, 0, 0.2)',
          fillColor1:'#282a36',
          backgroundColor: '#264e94',
          borderColor: '#282a36',
        }
      },
      optionData: {
        title: '',
        description :'',
        type: 15,
        colors:[],
        series:[],
        sunburstData: {},
        treeData: null,
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
          type: 15,
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
      let name = this.optionData.sunburstData.name
      // 递归遍历数据, 把value转成数字型
      data = this.setData(this.optionData.sunburstData.children, true)

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
            left: 10,
            bottom:0,
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
          backgroundColor: this.themeColors[this.theme].backgroundColor,
          textStyle:{
            fontSize: 12
          },
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
              radius: [0, '88%'],
              center: ['50%','55%'],
              label: {
                  fontSize: 9,
                  silent: false,
                  color: this.themeColors[this.theme].textColor,
                  padding: 1,
                  textBorderColor: this.themeColors[this.theme].borderColor
              },
              itemStyle:{
                borderWidth: 1,
                borderColor: this.themeColors[this.theme].borderColor
              },
              levels: [{}, {
                  r0: '15%',
                  r: '38%',
                  label:{
                    rotate: 'tangential',
                  },
                  itemStyle: {
                      borderWidth: 2,
                      borderColor: this.themeColors[this.theme].borderColor
                  },
              }, {
                  r0: '38%',
                  r: '73%',
                  label: {
                      // align: 'right'
                  },
                  itemStyle:{
                    borderWidth: 1,
                    borderColor: this.themeColors[this.theme].borderColor
                  }
              }, {
                  r0: '73%',
                  r: '88%',
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
