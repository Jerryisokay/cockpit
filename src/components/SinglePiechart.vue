<template>
  <div :id="id" class="chart-inner"></div>
</template>

<script>
import store from '@/store'

export default {
  name: "singlepiechart",
  data() {
    return {
      themeColors:{
        dark: {
          textColor: '#dce2f2',
          shadowColor1: '#dce2f2',
          fillColor1:'#282a36'
        },
        pink: {
          textColor: '#333333',
          shadowColor1: '#77022e',
          fillColor1: '#ffffff',
        },
        light: {
          textColor: '#333333',
          shadowColor1: '#2D88F8',
          fillColor1: '#ffffff',
        },
        blue: {
          textColor: '#dce2f2',
          shadowColor1: '#dce2f2',
          fillColor1:'#282a36',
        }
      },
      optionData: {
        title: '',
        description :'',
        type: 2,
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
          title: '访问来源',
          description :'单位/人',
          colors: ['#19D672','#FD517D','#76A5D9'],
          series: [
            {
              name: '一般量级统计',
              data: [
                {value:60, name:'一般量级统计', max:100}
              ]
            },{
              name: '严重量级统计',
              data: [
                {value:60, name:'严重量级统计', max:100}
              ],
            },{
              name: '高危量级统计',
              data: [
                {value:50, name:'高危量级统计', max:100}
              ]
            }
          ],
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
        v.data.map( d => {
          if(titles.indexOf(d.name) < 0) titles.push( d.name )
        })
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
      return parseFloat((document.documentElement.clientWidth - 40)/36)
    },
    navHeight(){
      return store.state.base.HIDE_NAV ? 0 : 85;
    },
    gridHeight(){
      return parseFloat((store.state.base.PAGE_HEIGHT - 25 - this.navHeight)/36)
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
      this.innerHeight = this.gridHeight * this.optionData.height - 62
      if(this.innerWidth < 0){
        this.innerWidth = 200
      }
      if(this.innerHeight < 0){
        this.innerHeight = 100
      }

      this.myChart = this.$echarts.init(this.$el)
      let series = []
      let radius = this.getRadius(this.optionData.series.length, this.optionData.size)
      if(Array.isArray(this.optionData.series) && this.optionData.series.length){
        this.optionData.series.map( (item, index)=> {
          let data = item.data[0] || {}
          let max = data.max || data.value
          series.push({
            name: item.name,
            type:'pie',
            radius: radius,
            center : this.getCenterPosition(index, this.optionData.series.length, this.optionData.size),
            avoidLabelOverlap: false,
            selectedMode: 'single',
            selectedOffset: 0,
            hoverAnimation: false,
            label: {
                normal: {
                    show: false,
                    position: 'center',
                    formatter: '{d}%',
                    fontSize: 12,
                    verticalAlign: 'center',
                    color: this.themeColors[this.theme].textColor
                },
            },
            itemStyle: {
              // borderWidth: 1,
              // borderColor: this.themeColors[this.theme].fillColor1,
              shadowBlur : 2,
              shadowColor: this.themeColors[this.theme].shadowColor1,
            },
            data: [
              {value: max - parseFloat(data.value), name:'', itemStyle:{ color:this.themeColors[this.theme].fillColor1}},
              {value: data.value, name: data.name, selected:true, label: {show: true}}
            ],
            color: this.colors[index],
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
        // color: ['#ffc03d','#01edd9','#3c95fb'],
        textStyle: {
          color: this.themeColors[this.theme].textColor
        },
        legend: {
          x : 'center',
          y : 'bottom',
          data: this.titles,
          textStyle: {
            color: this.themeColors[this.theme].textColor,
            fontSize: 10
          }
        },
        // tooltip: {
        //     trigger: 'item',
        //     confine: true,
        //     formatter: "{b}: <br />{d}%",
        //     backgroundColor: '#264e94',
        //     padding: [0, 5],
        //     textStyle:{
        //       fontSize: 12
        //     }
        // },
        series: series
      });
    },
    getRadius( length, size){
      // console.log(length)
      let [colmuns, rows] = this.getColumns(length)
      let radius = Math.min( this.innerWidth/ 4 /colmuns , this.innerHeight/ 4 /rows )
      // let radius = size == 1 ? Math.min( this.innerWidth/(colmuns * 4) , this.innerHeight/(rows * 4) ) : Math.min( 75/colmuns , 40/rows )
      // console.log(this.innerWidth/ 3 /colmuns , this.innerHeight/ 3 /rows)
      return [radius * 0.75, radius]
    },
    getColumns(length, size){   //获取行列数
      if(length <= 3){
        return [length, 1]
      }
      for(let i = 1; i<= length; i++){
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
