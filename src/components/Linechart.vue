<template>
  <div :id="id" class="chart-inner"></div>
</template>

<script>
import store from '@/store'

export default {
  name: "linechart",
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
          emphasisColor: '#c6044d',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          tooltipEmphasisColor: '#ffffff',
          shadowColor1: 'rgba(255, 255, 255, 0.5)',
          shadowColor2: '#77022e',
          fillColor1: '#77022e',
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
        type: 7,
        colors:[],
        series: [],
        treeData: null,
        sunburstData:null,
        scatterData:null,
        riverData:null
      }
    }
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
      Array.isArray(this.optionData.series) && this.optionData.series.map( (item, index) => {
        let data = []
        Array.isArray(item.data) && item.data.map( v => {
          data.push( v.value )
        })
        series.push(
          {
              data: data,
              type: 'line',
              name: item.name,
              color: this.colors[index]
          }
        )
      })
      // console.log(series)
      this.myChart.resize();
      this.myChart.setOption({
        title : {
            text: this.optionData.title,
            x:'left',
            textStyle:{
              color: this.themeColors[this.theme].textColor,//'#76a5d9'
              fontSize: 14
            },
        },
        tooltip : {
            trigger: 'item',
            formatter: '{a}: {c}({b})',
            // padding: [0, 5],
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
                fontSize: 11,
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
