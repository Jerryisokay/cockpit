<template>
  <div class="chart-inner">
      <div class="video-title" :style="{'color':textColor }">{{optionData.title}}</div>
      <video ref='video' :id="id"
        class="video-js vjs-fluid vjs-big-play-centered"
        controls
        style="height: 100%;object-fit: fill;"
        data-setup='{}'>
        <p class="vjs-no-js">您的浏览器不支持HTML5，请升级浏览器。</p>
      </video>
  </div>

</template>

<script>
import store from '@/store'
import videojs from 'video.js';
import "videojs-flash"
import "video.js/dist/video-js.min.css"

export default {
  name: "videopage",
  data() {
    return {
     themeColors:{
        dark: {
          textColor: '#dce2f2',
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
          textColor: '#dce2f2',
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
    }
  },
  computed: {
    theme(){
      return store.state.base.THEME_TYPE
    },
    textColor(){
      return this.themeColors[this.theme].textColor
    },
    colors(){
      let colors = this.optionData.colors || []
      return colors.concat(store.state.base.COLOR_REPOSITORY)
    }
  },
  beforeDestroy(){
    this.player && this.player.dispose();//销毁
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

      // 创建播放器
      _self.player = videojs(_self.id, {
        muted: true,
        controls : true,
        loop : true,
        fluid: true,
        preload: "auto"
      });
      // 获取链接
      _self.player.src(_self.optionData.url);
      console.log(_self.innerHeight)
      _self.player.height(_self.innerHeight);
      _self.player.play();
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
  .video-title{
    position: absolute;
    left: 12px;
    top: 12px;
    font-size: 14px;
    font-weight: bold;
    z-index: 100;
  }
</style>
