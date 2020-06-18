<template>
  <div class="chart-inner">
      <div class="iframe-title" :style="{'color':textColor }">{{optionData.title}}</div>
      <iframe :id="id" :src="optionData.url" class="iframe-window" :height="innerHeight - 40" scrolling="auto" frameborder="no" border="0"></iframe>
  </div>
</template>

<script>
import store from '@/store'

export default {
  name: "iframepage",
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
        type: 24,
        colors:[],
        series: [],
        url: '',
      }
    }
  },
  props: {
    id: { type: String },
    pageId: { type: String },
    innerHeight: { type: Number, default: 200 },
    options:{
      type:Object,
      default(){
        return {
          title: '',
          description :'',
          type: 24,
          colors:[],
          series: [],
          url: '',
        }
      }
    },
  },
  computed: {
    theme(){
      return store.state.base.THEME_TYPE
    },
    colors(){
      let colors = this.optionData.colors || []
      return colors.concat(store.state.base.COLOR_REPOSITORY)
    },
    textColor(){
      return this.themeColors[this.theme].textColor
    },
    backgroundColor(){
      return this.themeColors[this.theme].backgroundColor
    }
  },
  mounted(){
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
    }
  }

};
</script>

<style scoped>
  .iframe-window{
    width: 100%;
  }
  .iframe-title{
    padding: 5px 5px 15px;
    font-size: 14px;
    font-weight: bold;  }
</style>
