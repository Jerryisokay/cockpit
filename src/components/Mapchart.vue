<template>
  <div id="mapbox" class="map-inner">
    正在加载~~~
  </div>
</template>

<script>
// import AMap from "@/utils/AMap"
import remoteLoad from '@/utils/remoteLoad'
import { MapKey, MapName } from '@/config/config'
import store from '@/store'

export default {
  name: "mapchart",
  data() {
    return {
      map: null,
      placeSearch: null,
      dragStatus: false,
      AMapUI: null,
      AMap: null,
      markers:[],
      styles:{
        dark: 'amap://styles/grey',
        light: 'amap://styles/normal',
        blue: 'amap://styles/blue',
      },
      lng: '',
      lat: ''
    }
  },
  props:{
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
  mounted(){
    this.$store.dispatch('loadMarkersAction')
    .then( (data) => {
      this.markers = data
      let lngs = [], lats = []
      Array.isArray(data) && data.length && data.map( (item) => {
        lngs.push( parseFloat(item.gdmapjd))
        lats.push( parseFloat(item.gdmapwd))
      })

      const num1 = lngs => lngs.reduce((acc, val) => acc + val, 0) / lngs.length
      this.lng = parseFloat(num1(lngs))
      const num2 = lats => lats.reduce((acc, val) => acc + val, 0) / lats.length
      this.lat = parseFloat(num2(lats))
    })
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
          mapStyle: this.mapStyle,
          // zooms: [3, 18], //设置地图级别范围
          zoom: 12, //初始化地图层级
          resizeEnable: true,
        }
        let map = this.map = new AMap.Map('mapbox', mapconfig)
        // 设置城市
        if( this.lat && this.lng ){
          console.log(this.lng, this.lat)
          map.setCenter([this.lng, this.lat])
        }else{
          map.setCity(MapName)
        }
        // map.setCity(MapName)
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
        // let positionPicker = new PositionPicker({
        //   mode: 'dragMarker',
        //   map: map
        // })
        // // 拖拽完成
        // positionPicker.on('success', result => {
        //   if(!this.dragStatus){
        //     this.dragStatus = true
        //   } else{
        //     this.$emit('drag', result)
        //   }
        // })

        // positionPicker.start();
        this.markers.map( (item, index) => {
          let lng = item.gdmapjd , lat = item.gdmapwd, id = item.gdmapxmid
          this.addMarker(lng, lat, id, map)
        })
        //绑定事件
        map.on('click', this.showInfoClick)
      })
    },
    setMapStyle() {
      this.map && this.map.setMapStyle(this.mapStyle)
    },
    // 搜索
    handleSearch(){
      if(this.searchKey){
        this.placeSearch.searchKey(this.searchKey)
      }
    },
    // 创建点标记
    addMarker(lng, lat, id, map) {
      console.log( 'marker at ' + lng+ ','+ lat )
      let marker = new AMap.Marker({
        position: [lng, lat],
        icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
        // offset: new AMap.Pixel(-20, -20)
        offset: new AMap.Pixel(-13, -30)
      });
      //请求获取窗体内容
      this.$store.dispatch('setPositionInfoAction',{ id })
      .then( (data) => {
        let item = {}
        if(data.length){
          item = data[0]
        }
        this.initInfoContent(item, map, marker)
      })

      // this.map.setFitView();
    },
    showInfoClick(e){
        var text = '您在 [ '+e.lnglat.getLng()+','+e.lnglat.getLat()+' ] 的位置单击了地图！'
        console.log(text)
    },
    initInfoContent(item, map, marker){
      let html = ''
      html += "<div class='input-card content-window-card mark-info-content'>" +
      "<div class='mark-info-item'>项目名称 : "+ item.gdxmmc +"</div>" +
      "<div class='mark-info-item'>项目类型 : "+ item.gdxmlx +"</div>" +
      "<div class='mark-info-item'>项目经理 : "+ item.gdxmjlr +"</div>" +
      "<div class='mark-info-item'>项目状态 : "+ item.gdxmstate +"</div>" +
      "<div class='mark-info-item'>项目单位 : "+ item.gdxmdw +"</div>" +
      "<div class='mark-info-item'>项目介绍 : "+ item.gdxmjs +"</div></div>"

      let infoWindow = new AMap.InfoWindow({
          content: html  //使用默认信息窗体框样式，显示信息内容
      });

      marker.setMap(map);
      marker.on('mouseover', () => {
        // 打开窗体
        infoWindow.open(map, marker.getPosition());
      }).on('mouseout',() => {
        // 关闭窗体
        infoWindow.close()
      })
    }
  }
};
</script>
