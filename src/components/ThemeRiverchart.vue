<template>
  <div :id="id" class="chart-inner"></div>
</template>

<script>
import store from '@/store'

export default {
  name: "radarchart",
  data() {
    return {
      themeColors:{
        dark: {
          textColor: '#dce2f2',
          shadowColor1: 'rgba(0, 0, 0, 0.2)',
          backgroundColor: '#264e94',
          fillColor1:'#282a36'
        },
        light: {
          textColor: '#333333',
          shadowColor1: '#77022e',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          fillColor1: '#ffffff',
        },
        blue: {
          textColor: '#dce2f2',
          shadowColor1: 'rgba(0, 0, 0, 0.2)',
          backgroundColor: '#264e94',
          fillColor1:'#282a36'
        }
      },
      optionData: {
        title: '',
        description: '',
        type: 18,
        style: 0,
        colors: [],
        series: [],
        sunburstData: null,
        treeData: null,
        scatterData: null,
        riverData: []
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
          title: '访问来源',
          description: '单位/人',
          type: 18,
          style: 0,
          colors: ['#19D672', '#FD517D', '#76A5D9'],
          series: [],
          sunburstData: null,
          treeData: null,
          scatterData: null,
          riverData: [['2015/11/08',10,'DQ'],['2015/11/09',15,'DQ'],['2015/11/10',35,'DQ']]
        }
      }
    }
  },
  computed:{
    titles(){
      const titles = []
      Array.isArray(this.optionData.riverData) && this.optionData.riverData.map( v =>{
        titles.push(v.name)
      })
      return titles
    },
    data(){
      //把数据转成echart需要的二维数组
      let data = []
      Array.isArray(this.optionData.riverData) && this.optionData.riverData.map( v =>{
        Array.isArray(v.data) && v.data.length && v.data.map( d => {
          data.push([
            d.date,
            d.value,
            v.name
          ])
        })
      })
      return data
    },
    categories(){
      const categories = []
      Array.isArray(this.data) && this.data.map( v =>{
        Array.isArray(v) && v.length >= 2 && v.map( d => {
          if(categories.indexOf(d[0]) < 0){
            categories.push( d[0] )
          }
        })
      })
      return categories
    },
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

      this.myChart.resize();
      this.myChart.setOption({
        title : {
            text: this.optionData.title,
            // subtext: '纯属虚构',
            x:'left',
            textStyle:{
              color: this.themeColors[this.theme].textColor,
              fontSize: 14
            },
        },
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
            trigger: 'axis',
            axisPointer: {
              type: 'line',
              lineStyle: {
                  // color: 'rgba(0,0,0,0.2)',
                  width: 1,
                  type: 'solid'
              }
            },
            textStyle:{
              fontSize: 12
            },
            backgroundColor: this.themeColors[this.theme].backgroundColor,
            position:  function (pos, params, dom, rect, size) {
                // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                var obj = {top: 60};
                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                return obj;
            }
        },
        singleAxis: {
            top: 30,
            bottom: 50,
            axisTick: {},
            axisLabel: {
              fontSize: 10,
              color: this.themeColors[this.theme].textColor
            },
            type: 'time',
            axisPointer: {
                animation: true,
                label: {
                    show: true
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    opacity: 0.2
                }
            }
        },
        series: [
        {
            type: 'themeRiver',
            itemStyle: {
              emphasis: {
                  shadowBlur: 20,
                  shadowColor: 'rgba(0, 0, 0, 0.8)'
              }
            },
            label:{
              color: this.themeColors[this.theme].textColor,
              fontSize: 10
            },
            avoidLabelOverlap: false,
            data: this.data
        }],
        color: this.colors,
      });
    }
  }

};
</script>
