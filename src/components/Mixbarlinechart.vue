<template>
  <div :id="id" class="chart-inner"></div>
</template>

<script>
import store from '@/store'

export default {
  name: "mixbarlinechart",
  data() {
    return {
     themeColors:{
        dark: {
          textColor: '#dce2f2',
          textColor2: '#cccccc',
          emphasisColor: '#ffc911',
          backgroundColor: '#264e94',
          tooltipEmphasisColor: '#1eee10',
          shadowColor1: 'rgba(255, 255, 255, 0.5)',
          shadowColor2: '#2584e8',
          fillColor1:'#83bff6',
          fillColor2:'rgba(255,255,255,0.05)',
          fillColor3:'rgba(255,255,255,0.1)',
          lineColor:'rgba(255,255,255,0.2)'
        },
        light: {
          textColor: '#333333',
          textColor2: '#dce2f2',
          emphasisColor: '#01f0d9',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          tooltipEmphasisColor: '#ffffff',
          shadowColor1: 'rgba(255, 255, 255, 0.5)',
          shadowColor2: '#2D88F8',
          fillColor1: '#2D88F8',
          fillColor2: 'rgba(0,0,0,0.05)',
          fillColor3: 'rgba(0,0,0,0.1)',
          lineColor: '#dddddd'
        },
        blue: {
          textColor: '#dce2f2',
          textColor2: '#cccccc',
          emphasisColor: '#ffc911',
          backgroundColor: '#264e94',
          tooltipEmphasisColor: '#1eee10',
          shadowColor1: 'rgba(255, 255, 255, 0.5)',
          shadowColor2: '#2584e8',
          fillColor1:'#83bff6',
          fillColor2:'rgba(255,255,255,0.05)',
          fillColor3:'rgba(255,255,255,0.1)',
          lineColor:'rgba(255,255,255,0.2)'
        }
      },
      optionData: {
        title: '',
        description :'',
        type: 9,
        colors:[],
        series: [],
        treeData: null,
        sunburstData:null,
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
          title: '',
          description :'',
          type: 9,
          style: 0,
          colors:[],
          series: [],
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
      this.optionData.series.map( v =>{
        v.data.map( d => {
          if(titles.indexOf(d.name) < 0) titles.push( d.name )
        })
      })
      return titles
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
      let series = []
      let arr = []
      Array.isArray(this.optionData.series) && this.optionData.series.length && this.optionData.series.map( (item, index) => {
        if(index < 2){
          let data = []
          Array.isArray(item.data) && item.data.map( v => {
            data.push( v.value )
          })
          series.push(
            {
                data: data,
                type: index == 0 ? 'line' : 'bar',
                name: item.name,
                barMaxWidth: 10,
                color: this.colors[index]
            }
          )
        }
      })
      // console.log(series)
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
        tooltip : {
            trigger: 'item',
            formatter: '{a}: <br />{b}: <span style="color: '+ this.themeColors[this.theme].tooltipEmphasisColor +'">{c}</span>',
            padding: [0, 5],
            // position: 'inside',
            backgroundColor: this.themeColors[this.theme].backgroundColor,
            textStyle:{
              color: this.themeColors[this.theme].textColor2,
              fontSize: 12,
            }
        },
        graphic:[
          {
            type:'text',  //中心文字
            left: 10,
            bottom:0,
            z:3,
            style:{
                text: this.optionData.description,
                // textAlign:'center',
                fill: this.themeColors[this.theme].textColor,
                fontSize:11,
                // height:60
            }
          }
        ],
        grid:{
          left: 10,
          right: 20,
          top: 30,
          bottom: 15,
          containLabel : true
        },
        xAxis: {
            type: 'category',
            data: this.titles,
            axisLabel:{
              show:true,
              textStyle:{
                fontSize: 10,
                color: this.themeColors[this.theme].textColor,//'#76a5d9'
              },
            },
        },
        yAxis: {
            type: 'value',
            splitLine: {
              //  改变轴线颜色
              lineStyle: {
                  // 使用深浅的间隔色
                  color: this.themeColors[this.theme].lineColor,
                  type: 'dashed'
              },

            },
            axisLabel:{
              show:true,
              textStyle:{
                fontSize: 10,
                color: this.themeColors[this.theme].textColor,//'#76a5d9'
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
