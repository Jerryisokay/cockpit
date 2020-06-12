<template>
  <div :id="id" class="chart-inner"></div>
</template>

<script>
import store from '@/store'

export default {
  name: "funnelchart",
  data() {
    return {
      themeColors:{
        dark: {
          textColor: '#dce2f2',
          backgroundColor: '#264e94',
          shadowColor1: 'rgba(255, 255, 255, 0.5)',
          shadowColor2: '#2584e8',
          borderColor:'#fff'
        },
        light: {
          textColor: '#333333',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          shadowColor1: 'rgba(255, 255, 255, 0.5)',
          shadowColor2: '#77022e',
          borderColor: '#77022e'
        },
        blue: {
          textColor: '#dce2f2',
          backgroundColor: '#264e94',
          shadowColor1: 'rgba(255, 255, 255, 0.5)',
          shadowColor2: '#2584e8',
          borderColor:'#fff'
        }
      },
      optionData: {
        title: '',
        description:'',
        series:[]
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
          description:'',
          // titles: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
          series:[
            {
              data: [
                {value:100, name:'直接访问'},
                {value:220, name:'邮件营销'},
                {value:280, name:'联盟广告'},
                {value:400, name:'视频广告'},
                {value:500, name:'搜索引擎'}
              ]
            }
          ]

        }
      }
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
  computed:{
    theme(){
      return store.state.base.THEME_TYPE
    },
    colors(){
      let colors = this.optionData.colors || []
      return colors.concat(store.state.base.COLOR_REPOSITORY)
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
      let data = [], name = ''
      if(Array.isArray(this.optionData.series) && this.optionData.series.length && Array.isArray(this.optionData.series[0].data)){
        name = this.optionData.series[0].name
        data = this.optionData.series[0].data
      }

      this.myChart.resize();
      this.myChart.setOption({
        title : {
            text: this.optionData.title,
            // subtext: this.optionData.description,
            x:'left',
            textStyle: {
              fontSize: 14,
              color: this.themeColors[this.theme].textColor
            },
            // subtextStyle:{
            //   color: this.themeColors[this.theme].textColor
            // }
        },
        graphic:[
          {
            type:'text',  //副标题文字
            left: 10,
            bottom: 0,
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
            formatter: "{b}: <br />{c} ({d}%)",
            backgroundColor: this.themeColors[this.theme].backgroundColor,
            // padding: [0, 5],
            textStyle:{
              fontSize: 12
            }
        },
        // legend: {
        //     // orient: 'horizontal',
        //     x: 'left',
        //     data: this.optionData.titles
        // },
        calculable: true,
        color: this.colors,
        textStyle: {
          color: this.themeColors[this.theme].textColor
        },
        series: [
          {
              name: name,
              type:'funnel',
              left: '10%',
              top: 30,
              bottom: 10,
              width: '70%',
              min: 0,
              minSize: '0%',
              maxSize: '100%',
              sort: 'descending',
              gap: 2,
              label: {
                  show: true,
                  textStyle:{
                    fontSize: 10,
                  },
                  position: 'right'
              },
              labelLine: {
                  length: 10,
                  lineStyle: {
                      width: 1,
                      type: 'solid'
                  }
              },
              itemStyle: {
                  borderColor: this.themeColors[this.theme].borderColor,
                  borderWidth: 1
              },
              emphasis: {
                  label: {
                      fontSize: 12
                  }
              },
              data: data
          }
        ]
      });
    }
  }

};
</script>
