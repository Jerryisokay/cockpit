<template>
  <div id="mapbox" class="map-inner">
    正在加载~~~
  </div>
</template>

<script>
// import AMap from "@/utils/AMap"
import remoteLoad from '@/utils/remoteLoad'
import { MapKey, MapName } from '@/config/config'

export default {
  name: "mapchart",
  data() {
    return {
      map: null,
      placeSearch: null,
      dragStatus: false,
      AMapUI: null,
      AMap: null,
      styles:{
        dark: 'amap://styles/grey',
        light: 'amap://styles/normal',
        blue: 'amap://styles/blue',
      }
    };
  },
  props:{
    lng: {
      type: String,
      default: '22.574405'
    },
    lat: {
      type: String,
      default: '114.095388'
    },
    theme: {
      type: String,
      default: 'light'
    }
  },
  computed: {
    mapStyle (){
      return this.styles[this.theme]
    }
  },
  watch : {
    searchKey (){
      if ( this.searchKey === '') {
        this.placeSearch.clear()
      }
    },
    mapStyle:{
      immediate:false,
      handler:function(){
        console.log('theme changes');
        this.setMapStyle()
     }
    }
  },
  async created() {
    // 已载入高德地图API，则直接初始化地图
    if (window.AMap && window.AMapUI) {
      this.initAMap()
    // 未载入高德地图API，则先载入API再初始化
    } else {
      await remoteLoad(`http://webapi.amap.com/maps?v=1.3&key=${MapKey}`)
      await remoteLoad('http://webapi.amap.com/ui/1.0/main.js')
      this.initAMap()
    }
  },
  methods: {
    initAMap() {
      // try {
      //   const res = await AMap();
      //   this.map = new res.Map("map", {
      //     resizeEnable: true, //是否监控地图容器尺寸变化
      //     zoom: 11, //初始化地图层级
      //     center: [116.397428, 39.90923] //初始化地图中心点
      //   });
      //   this.addMarker()
      // } catch (err) {
      //   console.error(err);
      // }

      let AMapUI = this.AMapUI = window.AMapUI
      let AMap = this.AMap = window.AMap
      AMapUI.loadUI(['misc/PositionPicker'], PositionPicker => {
        let mapconfig = {
          // zoom: 17,
          mapStyle: this.mapStyle,
          zooms: [3, 18], //设置地图级别范围
          zoom: 14, //初始化地图层级
          resizeEnable: true,
        }
        if( this.lat && this.lng ){
          mapconfig.center = [this.lng, this.lat]
        }
        let map = this.map = new AMap.Map('mapbox', mapconfig)
        // 设置城市
        map.setCity(MapName)
        // 加载地图搜索插件
        // AMap.service('AMap.PlaceSearch', () => {
        //   this.placeSearch = new AMap.PlaceSearch({
        //     //
        //   })
        // })
        AMap.plugin(['AMap.ToolBar'], () => {
          map.addControl( new AMap.ToolBar({
            position: 'LB'
          }) )
        })
        // 创建地图拖拽
        let positionPicker = new PositionPicker({
          mode: 'dragMarker',
          map: map
        })
        // 拖拽完成
        positionPicker.on('success', result => {
          if(!this.dragStatus){
            this.dragStatus = true
          } else{
            this.$emit('drag', result)
          }
        })

        positionPicker.start();

        // this.addMarker()
        //绑定事件
        this.map.on('click', this.showInfoClick)
      })
    },
    setMapStyle() {
      this.map.setMapStyle(this.mapStyle)
    },
    // 搜索
    handleSearch(){
      if(this.searchKey){
        this.placeSearch.searchKey(this.searchKey)
      }
    },
    // 创建点标记
    // addMarker() {
    //   this.marker = new this.resMap.Marker({
    //     icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
    //     position:  [this.lng, this.lat],
    //     offset: new this.resMap.Pixel(-13, -30)
    //   });

    //   this.map.add(this.marker);
    //   this.map.setFitView();
    // },
    // 创建点标记
    addMarker() {
      console.log( 'marker at ' + this.lng+ ','+ this.lat )
      this.marker = new AMap.Marker({
        position: this.map.getCenter(),//[this.lng, this.lat],
        icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
        // offset: new AMap.Pixel(-20, -20)
        offset: new AMap.Pixel(-13, -30)
      });
      this.marker.setMap(this.map);

      // this.map.setFitView();
    },
    showInfoClick(e){
        var text = '您在 [ '+e.lnglat.getLng()+','+e.lnglat.getLat()+' ] 的位置单击了地图！'
        console.log(text)
    }
  }
};
</script>
