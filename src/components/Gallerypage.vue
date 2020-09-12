<template>
  <div class="gallery-wrap">
      <!-- <video ref='video' :id="id"
        class="video-js vjs-fluid vjs-big-play-centered"
        controls
        style="height: 100%;object-fit: fill;"
        data-setup='{}'>
        <p class="vjs-no-js">您的浏览器不支持HTML5，请升级浏览器。</p>
      </video> -->

      <div :class="{'gallery-active':currentIndex == $i}" class="gallery-item" v-for="(item, $i) in options.gallerys" :key="$i">
        <video muted controls autoplay v-if="item.type == 1" ref='video' :id="'gallery_'+ $i"
          class="video-js vjs-fluid vjs-big-play-centered"
          style="height: 100%;object-fit: fill;"
          data-setup='{}'>
          <p class="vjs-no-js">您的浏览器不支持HTML5，请升级浏览器。</p>
        </video>
        <div v-if="item.type == 0" :class="getRenderStyle" :style="{'background-image': 'url(' + item.url + ')'}" class="gallery-img" ></div>
      </div>
  </div>

</template>

<script>
import store from '@/store'
import videojs from 'video.js';
import "videojs-flash"
import "video.js/dist/video-js.min.css"

export default {
  name: "gallerypage",
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
        pink: {
          textColor: '#333333',
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
        type: 26,
        colors:[],
        series: [],
        url: '',
      },
      currentIndex: 0,
      fadeInStatus: false,
      fadeOutStatus: false,
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
    },
    onfadeIn(){
      return this.fadeInStatus
    },
    onfadeOut(){
      return this.fadeInStatus
    },
    getRenderStyle(){
      let styles = ['rotation','fadeIn','fromRight','fromTop','resize']
      let index = Math.floor(Math.random() * 5)
      return this.fadeInStatus ? styles[index] : ''
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
      // _self.myChart && _self.myChart.clear()
      // _self.optionData = Object.assign({}, data)

      // 创建播放器
      // _self.player = videojs(_self.id, {
      //   muted: true,
      //   controls : true,
      //   loop : true,
      //   fluid: true,
      //   preload: "auto",
      //   autoplay: true
      // });
      // // 获取链接
      // _self.player.src('http://zhaopin.cscec3b.com.cn:9100/video02.mp4');
      // console.log(_self.innerHeight)
      // _self.player.height(_self.innerHeight);
      // _self.player.play();
      this.autoPlay();
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
    autoPlay(){
      const _self = this;
      const option = _self.options.gallerys && _self.options.gallerys[this.currentIndex]
      if(option && option.type == 1){
        // 视频
        _self.player = videojs("gallery_" + this.currentIndex,{
          autoplay: true,
          muted: true,
          controls : true,
          loop : true,
          fluid: true,
          preload: "auto"
        }, function onPlayerReady() {
          // this.play()
        });
        // 获取链接
        console.log(_self.player)
        _self.player.src(option.url);
        _self.player.height(_self.innerHeight);
        _self.player.play();
      }else{
        _self.fadeInStatus = true
        setTimeout(() => {
          _self.fadeInStatus = false
        },1000)
      }
      setTimeout(() => {
        if(option && option.type == 1){
          _self.player && _self.player.pause();
        }
        if(this.currentIndex === _self.options.gallerys.length - 1){
          this.currentIndex = 0
        }else{
          this.currentIndex += 1
        }
        _self.autoPlay()
      }, option.time * 1000)
    },
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
