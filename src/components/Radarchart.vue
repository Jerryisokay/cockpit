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
          backgroundColor:'#ccc',
          tooltipBackgroundColor: '#264e94',
          backgroundEmphasisColor:'#333'
        },
        light: {
          textColor: '#333333',
          shadowColor1: 'rgba(255, 255, 255, 0.5)',
          tooltipBackgroundColor: '#c6044d',
          backgroundEmphasisColor: '#77022e',
        },
        blue: {
          textColor: '#dce2f2',
          backgroundColor:'#ccc',
          tooltipBackgroundColor: '#264e94',
          backgroundEmphasisColor:'#333'
        }
      },
      optionData: {
        title: '',
        type: 10,
        series: [],
        colors: []
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
          title: '',
          type: 10,
          series: [],
          colors: []
        }
      }
    }
  },
  computed:{
    indicator(){
      const indicator = []
      const titles = []
      Array.isArray(this.optionData.series) && this.optionData.series.map( v =>{
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
      Array.isArray(this.optionData.series) && this.optionData.series.map( item => {
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
    getIndexOfKey(key, value, arr){
      let index = -1;
      arr.map( (v, i) => {
        if(v[key] === value) index = i
      } )
      return index
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
        legend:{
            top : 25,
            formatter: (value) => {
                var texts=value;
                // if(texts.length>6){ //限定字数
                //     texts=texts.substr(0,6)+'...';
                // }
                return texts;
            },
            textStyle: {
              color: this.themeColors[this.theme].textColor,
              fontSize: 11
            },
            icon: 'circle'
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
        radar: {
            name: {
              textStyle: {
                  color: this.themeColors[this.theme].textColor,
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
        },
        grid: {
            position: 'center',
        },
        tooltip : {
            confine: true,
            backgroundColor: this.themeColors[this.theme].tooltipBackgroundColor,
            padding: [0, 5],
            textStyle:{
              fontSize: 12
            }
        },

        series: [{
            name: '',
            type: 'radar',
            symbol: 'circle', // 拐点的样式，还可以取值'rect','angle'等
            symbolSize: 6, // 拐点的大小
            areaStyle: {
              normal: {
                // color: 'rgba(0,0,0,0)'
                opacity : 0,
              }
            },
            emphasis: {
              areaStyle: {
                // color
                opacity : 0.3,
                // color: this.themeColors[this.theme].backgroundEmphasisColor
              }
            },
            data : this.data
        }],
        color: this.colors,
      });
    }
  }

};
</script>
