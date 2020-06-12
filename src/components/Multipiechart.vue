<template>
  <div :id="id" class="chart-inner"></div>
</template>

<script>
import store from '@/store'

export default {
  name: "multipiechart",
  data() {
    return {
      themeColors:{
        dark: {
          textColor: '#dce2f2',
          shadowColor1: '#dce2f2',
          fillColor1:'#282a36',
          backgroundColor: '#264e94',
          borderColor: '#282a36',
        },
        light: {
          textColor: '#333333',
          shadowColor1: '#77022e',
          fillColor1: '#ffffff',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          borderColor: '#ffffff',
        },
        blue: {
          textColor: '#dce2f2',
          shadowColor1: '#dce2f2',
          fillColor1:'#282a36',
          backgroundColor: '#264e94',
          borderColor: '#282a36',
        }
      },
      optionData: {
        title: '',
        description :'',
        type: 1,
        width: 4,
        height: 4,
        colors: [],
        series: [],
        treeData: null,
        sunburstData:null,
        scatterData:null,
        riverData:null,
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
          width: 4,
          height: 4,
          colors: [],
          series: [],
          treeData: null,
          sunburstData:null,
          scatterData:null,
          riverData:null,
        }
      }
    }
  },
  computed:{
    titles(){
      const titles = []
      this.optionData.series.map( v =>{
        if(titles.indexOf(v.name) < 0) titles.push( v.name )
      })
      return titles
    },
    theme(){  //当前主题
      return store.state.base.THEME_TYPE
    },
    colors(){
      let colors = this.optionData.colors || []
      return colors.concat(store.state.base.COLOR_REPOSITORY)
    },
    layout(){
      return store.state.base.LAYOUT_TYPE
    },
    //单元宽度
    gridWidth(){
      return parseInt((document.documentElement.clientWidth - 40)/12)
    },
    gridHeight(){
      return parseInt((store.state.base.PAGE_HEIGHT - 110)/12)
    },
  },
  mounted(){
    // console.log(this.options)
    this.initialData(this.options)
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
      this.innerWidth = this.gridWidth * this.optionData.width - 24
      this.innerHeight = this.gridHeight * this.optionData.height - 42
      if(this.innerWidth < 0){
        this.innerWidth = 300
      }
      if(this.innerHeight < 0){
        this.innerWidth = 150
      }

      this.myChart = this.$echarts.init(this.$el)
      let series = []
      let radius = this.getRadius(this.optionData.series.length, this.optionData.size)
      if(Array.isArray(this.optionData.series) && this.optionData.series.length){
        let divider = parseInt(100 / (this.optionData.series.length + 1))
        this.optionData.series.map( (item, index)=> {
          series.push({
            name: item.name,
            type:'pie',
            radius: radius,//[0, 33],
            center : this.getCenterPosition(index, this.optionData.series.length, this.optionData.size),//[divider + divider * index +'%', '50%'],
            avoidLabelOverlap: false,
            selectedMode: 'single',
            selectedOffset: 0,
            label: {
                normal: {
                    show: true,
                    position: 'outside',
                    formatter: '{b}:{d}',
                    fontSize: 8,
                    // verticalAlign: 'center',
                    color: this.themeColors[this.theme].textColor,
                },
            },
            itemStyle: {
              borderWidth : 1,
              borderColor : this.themeColors[this.theme].borderColor,
              shadowBlur : 2,
              shadowColor: this.themeColors[this.theme].shadowColor1,
            },
            data: item.data,
          })
        })
      }



      // console.log(series)

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
        color: this.colors,
        textStyle: {
          color: this.themeColors[this.theme].textColor
        },
        graphic:[
          {
            type:'text',  //说明文字
            right: 10,
            top:8,
            z:3,
            style:{
                text: this.optionData.description,
                fill: this.themeColors[this.theme].textColor,
                fontSize:11
            }
          }
        ],
        legend: {
          x : 'center',
          y : 'bottom',
          data: this.titles,
          textStyle: {
            color: this.themeColors[this.theme].textColor,
            fontSize: 11
          }
        },
        tooltip: {
            trigger: 'item',
            confine: true,
            formatter: "{b}: {c}<br />{d}%",
            backgroundColor: this.themeColors[this.theme].backgroundColor,
            padding: [0, 5],
            textStyle:{
              fontSize: 12
            }
        },
        series: series
      });
    },
    getRadius( length, size){
      // console.log(length)
      let [colmuns, rows] = this.getColumns(length)
      let radius = Math.min( this.innerWidth/ 4 /colmuns , this.innerHeight/ 4 /rows )
      // let radius = size == 1 ? Math.min( this.innerWidth/(colmuns * 4) , this.innerHeight/(rows * 4) ) : Math.min( 75/colmuns , 40/rows )
      // console.log(this.innerWidth/ 3 /colmuns , this.innerHeight/ 3 /rows)
      return [radius * 0.7, radius]
    },
    getColumns(length, size){   //获取行列数
      if(length <= 2){
        return [length, 1]
      }
      for(let i = 1; i<=length; i++){
        if(i*i >= length){
          return [i,i]
        }else if(i * i+ 1 >= length){
          return this.innerWidth <= this.innerHeight ? [i, i+1] : [i+1, i]
        }
      }
    },
    getCenterPosition( index, length, size){  //获取单个图表的位置
      let [colmuns, rows] = this.getColumns(length)
      //每行数量 行数
      // console.log('====================================');
      let yNth = Math.ceil((index + 1)/ colmuns)  //当前行数
      // console.log('yNth '  + yNth)
      let xNth = index + 1 - (yNth - 1) * colmuns
      // console.log('xNth '  + xNth)
      let singleW = (yNth == rows) ? (this.innerWidth/ 2 / (length + colmuns - colmuns * rows)) : (this.innerWidth/ 2 / colmuns)
      let singleH = this.innerHeight/ 2 / rows
      // console.log('====================================');

      return [singleW * (xNth * 2 - 1) , singleH * ( yNth * 2 - 1) + 20 ]

    }
  }

};
</script>
