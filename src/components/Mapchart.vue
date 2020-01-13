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
import defaultIcon from '@/images/position-default.png'
import lightIcon from '@/images/position-light.png'
import blueIcon from '@/images/position-blue.png'


export default {
  name: "mapchart",
  data() {
    return {
      map: null,
      placeSearch: null,
      dragStatus: false,
      AMapUI: null,
      AMap: null,
      markersData: [],
      markers:[],
      styles:{
        dark: 'amap://styles/grey',
        light: 'amap://styles/normal',
        blue: 'amap://styles/blue',
      },
      icons:{
        dark: defaultIcon,
        light: lightIcon,
        blue: blueIcon,
      },
      lng: '',
      lat: '',
      status:{
        1:'未建',
        2:'在建',
        3:'施工',
        4:'验收',
        5:'完成',
      }
    }
  },
  props:{
    // theme: {
    //   type: String,
    //   default: 'light'
    // }
  },
  computed: {
    theme(){
      return store.state.base.THEME_TYPE
    },
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
    theme:{
      mapStyle:false,
      handler:function(){
        console.log('theme changes');
        // 切换主题
        this.setMapStyle()
        //删除标记
        this.removeMakers()
        //添加标记
        this.addMarkersGroup()
     }
    }
  },
  mounted(){
    this.$store.dispatch('loadMarkersAction')
    .then( (data) => {
      this.markersData = data
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
          // console.log(this.lng, this.lat)
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


        this.addMarkersGroup()
        //绑定事件
        map.on('click', this.showInfoClick)
      })
    },
    setMapStyle() {
      this.map && this.map.setMapStyle(this.mapStyle)
    },
    addMarkersGroup(){
      this.markersData.map( (item, index) => {
        let lng = item.gdmapjd , lat = item.gdmapwd, id = item.gdmapxmid
        this.addMarker(lng, lat, id, this.map)
      })
    },
    removeMakers(){
      if(this.map){
        this.map.remove(this.markers);
        this.markers = []
      }
    },
    // 搜索
    handleSearch(){
      if(this.searchKey){
        this.placeSearch.searchKey(this.searchKey)
      }
    },
    // 创建点标记
    addMarker(lng, lat, id, map) {
      // console.log( 'marker at ' + lng+ ','+ lat )
      let marker = new AMap.Marker({
        position: [lng, lat],
        icon: this.icons[this.theme],//"https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
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
      this.markers.push(marker)

      // this.map.setFitView();
    },
    showInfoClick(e){
        var text = '您在 [ '+e.lnglat.getLng()+','+e.lnglat.getLat()+' ] 的位置单击了地图！'
        console.log(text)
    },
    initInfoContent(item, map, marker){


      let html = '', status = ''
      let group = item.gdxmstategroup,
      index = group.indexOf(item.gdxmstate)
      Array.isArray(group) && group.length && group.map( (v, i) => {
        status += "<div class='mark-status-item "+ (i <= index ? "on" : "") +"'>"+
          "<div class='mark-status-order'>"+ parseInt(i + 1)  +"</div>"+
          "<div class='mark-status-label'>"+ v +"</div>"+
           (i !== 0 ? "<span class='mark-status-line mark-status-line-left'></span>" : "")+ (i !== group.length - 1 ? "<span class='mark-status-line mark-status-line-right'></span>" : "") +
          "</div>"
      })

      html += "<div class='input-card content-window-card mark-info-content'>" +
      "<div class='mark-info-item'>项目名称 : "+ item.gdxmmc +"</div>" +
      "<div class='mark-info-item'>项目类型 : "+ item.gdxmlx +"</div>" +
      "<div class='mark-info-item'>项目经理 : "+ item.gdxmjlr +"</div>" +
      // "<div class='mark-info-item'>项目状态 : "+ item.gdxmstate +"</div>" +
      "<div class='mark-info-item'>项目单位 : "+ item.gdxmdw +"</div>" +
      "<div class='mark-info-item'>项目介绍 : "+ item.gdxmjs +"</div></div>" +
      // "<div class='mark-status-group'>" + this.getStatusLabels(item.gdxmstate) + "</div>"
      "<div class='mark-status-group'>"+
        status +
      "</div>"

      let infoWindow = new AMap.InfoWindow({
          // content: html,  //使用默认信息窗体框样式，显示信息内容
          isCustom: true,  //使用自定义窗体
          content: this.createInfoWindow('项目信息', html),
          offset: new AMap.Pixel(16, -45)
      });

      marker.setMap(map);
      marker.on('mouseover', () => {
        // 打开窗体
        infoWindow.open(map, marker.getPosition());
      }).on('mouseout',() => {
        // 关闭窗体
        infoWindow.close()
      })
    },

    //构建自定义信息窗体
    createInfoWindow(title, content) {
        var info = document.createElement("div");
        info.className = "custom-info input-card content-window-card";

        //可以通过下面的方式修改自定义窗体的宽高
        // 定义顶部标题
        var top = document.createElement("div")
        top.className = "mark-info-title"
        top.innerHTML = title
        info.appendChild(top)

        // 定义内容
        var middle = document.createElement("div");
        middle.className = "mark-info-content";
        middle.innerHTML = content;
        info.appendChild(middle);

        return info;
    },
    // 获取状态的进度条
    getStatusLabels(state){
      let obj = this.status , html = ''
      for(item in obj){
        html += '<span class="mark-status-item '+ (item <= state ? 'on' : '') +'">'+ item +'</span>'
      }
    }
  }
};
</script>
