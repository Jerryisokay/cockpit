<template>
  <div :id="id" class="chart-inner"></div>
</template>

<script>
import store from '@/store'
export default {
  name: "treechart",
  data() {
    return {
      themeColors:{
        dark: {
          textColor: '#dce2f2',
          shadowColor1: 'rgba(0, 0, 0, 0.2)',
          fillColor1:'#282a36'
        },
        light: {
          textColor: '#333333',
          shadowColor1: '#77022e',
          fillColor1: '#ffffff',
        },
        blue: {
          textColor: '#dce2f2',
          shadowColor1: 'rgba(0, 0, 0, 0.2)',
          fillColor1:'#282a36'
        }
      },
      optionData: {
        title: '',
        description :'',
        type: 13,
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
          type: 13,
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
      let data = this.optionData.treeData
      Array.isArray(data.children) && data.children.map(function (datum, index) {
          index % 2 === 0 && (datum.collapsed = true);
      });
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
        series: [
          {
              type: 'tree',

              data: [data],

              top: '10%',
              left: '3%',
              bottom: '3%',
              right: '15%',

              symbolSize: 7,

              label: {
                  normal: {
                      position: 'left',
                      verticalAlign: 'middle',
                      align: 'right',
                      fontSize: 8,
                      textStyle:{
                        color: this.themeColors[this.theme].textColor,//'#76a5d9'
                      },
                  }
              },

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
    }
  }

};
</script>
