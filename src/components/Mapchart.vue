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
import points from '@/mock/markers.json'

export default {
  name: "mapchart",
  data() {
    return {
      map: null,
      placeSearch: null,
      dragStatus: false,
      AMapUI: null,
      AMap: null,
      cluster:null,
      markers:[],
      styles:{
        dark: 'amap://styles/grey',
        pink: 'amap://styles/normal',
        light: 'amap://styles/normal',
        blue: 'amap://styles/blue',
      },
      icons:{
        dark: defaultIcon,
        pink: lightIcon,
        light: defaultIcon,
        blue: blueIcon,
      },
      status:{
        1:'未建',
        2:'在建',
        3:'施工',
        4:'验收',
        5:'完成',
      },
      themeColors:{
        dark: {
          textColor: '#dce2f2',
          backgroundColor: '#264e94',
        },
        pink: {
          textColor: '#333333',
          backgroundColor: '#c6044d',
        },
        light: {
          textColor: '#333333',
          backgroundColor: '#01f0d9',
        },
        blue: {
          textColor: '#ffffff',
          backgroundColor: '#264e94'
        }
      }
    }
  },
  props:{
    // theme: {
    //   type: String,
    //   default: 'light'
    // }
    mapData:{
      dataList: {
        type: Array,
        default: []
      },
      gmapmc: {
        type: String,
        default: ''
      }
    }
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
    mapData:{
      immediate:false,
      handler:function(){
        console.log('mapData changes');
        // 切换主题
        // this.setMapStyle()
        //删除标记
        this.removeMakers()
        //添加标记
        this.addMarkersGroup()
     }
    },
    // theme:{
    //   immediate:false,
    //   handler:function(){
    //     console.log('theme changes');
    //     // 切换主题
    //     this.setMapStyle()
    //     //删除标记
    //     this.removeMakers()
    //     //添加标记
    //     this.addMarkersGroup()
    //  }
    // }
  },
  mounted(){
    // this.$store.dispatch('loadMarkersAction', {id: 2})
    // .then( (data) => {
    //   this.markersData = data
    //   // 计算标记点中心，考虑到数量级较大，已作废
    //   // let lngs = [], lats = []
    //   // Array.isArray(data) && data.length && data.map( (item) => {
    //   //   lngs.push( parseFloat(item.gdmapjd))
    //   //   lats.push( parseFloat(item.gdmapwd))
    //   // })

    //   // const num1 = lngs => lngs.reduce((acc, val) => acc + val, 0) / lngs.length
    //   // this.lng = parseFloat(num1(lngs))
    //   // const num2 = lats => lats.reduce((acc, val) => acc + val, 0) / lats.length
    //   // this.lat = parseFloat(num2(lats))
    // })
  },
  async created() {
    // 已载入高德地图API，则直接初始化地图
    if (window.AMap && window.AMapUI) {
      this.initAMap()
    // 未载入高德地图API，则先载入API再初始化
    } else {
      await remoteLoad(`http://webapi.amap.com/maps?v=1.4.15&key=${MapKey}&plugin=AMap.MarkerClusterer`)
      await remoteLoad('http://webapi.amap.com/ui/1.0/main.js')
      this.initAMap()
    }
  },
  methods: {
    initAMap() {
      let AMapUI = this.AMapUI = window.AMapUI
      let AMap = this.AMap = window.AMap
      AMapUI.loadUI(['misc/PositionPicker'], PositionPicker => {
        let mapconfig = {
          mapStyle: this.mapStyle,
          // zooms: [3, 18], //设置地图级别范围
          zoom: 8, //初始化地图层级
          resizeEnable: true,
        }
        let map = this.map = new AMap.Map('mapbox', mapconfig)
        // 设置城市
        if( this.mapData.gmapmc ){
          map.setCity(MapName)
        }
        AMap.plugin(['AMap.ToolBar','AMap.Scale'], () => {
          map.addControl( new AMap.ToolBar({
            position: 'LB'
          }) )
          map.addControl( new AMap.Scale({
            position: 'RB'
          }) )

        })

        this.addMarkersGroup()
        //绑定事件
        // map.on('click', this.showInfoClick)
      })
    },
    setMapStyle() {
      this.map && this.map.setMapStyle(this.mapStyle)
    },
    addMarkersGroup(){
      this.mapData.dataList.map( (item, index) => {
        let lng = item.gdmapjd , lat = item.gdmapwd, id = item.gdmapxmid
        this.addMarker(lng, lat, id, this.map)
      })
      // points.points.map((item, index) => {
      //   let lng = item.lnglat[0] , lat = item.lnglat[1], id = ''
      //   this.addMarker(lng, lat, id, this.map )
      // })

      this.cluster = new this.AMap.MarkerClusterer(this.map, this.markers, {
          gridSize: 80,
          // renderClusterMarker: this._renderClusterMarker
      });
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
       marker.on('mouseover', () => {
        //请求获取窗体内容
        this.$store.dispatch('setPositionInfoAction',{ id })
        .then( (data) => {
          let item = {}
          if(data.length){
            item = data[0]
          }
          this.initInfoContent(item, map, marker)
        })
      })
      marker.off('mouseover', () => {
        console.log('解绑')
      })

      this.markers.push(marker)

      // this.map.setFitView();
    },
    // showInfoClick(e){
    //     var text = '您在 [ '+e.lnglat.getLng()+','+e.lnglat.getLat()+' ] 的位置单击了地图！'
    //     console.log(text)
    // },
    // 初始化弹窗
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

      // marker.setMap(map);
      marker.on('click', () => {
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
    },
    // 创建聚合自定义样式
    _renderClusterMarker(context){
      let count = this.markers.length
      var factor = Math.pow(context.count / count, 1 / 18);
        var div = document.createElement('div');
        var Hue = 180 - factor * 180;
        // var bgColor = 'hsla(' + Hue + ',100%,50%,0.7)';
        var fontColor = this.themeColors[this.theme].textColor;//'hsla(' + Hue + ',100%,20%,1)';
        // var borderColor = 'hsla(' + Hue + ',100%,40%,1)';
        // var shadowColor = 'hsla(' + Hue + ',100%,50%,1)';
        div.style.backgroundColor = this.themeColors[this.theme].backgroundColor;
        var size = Math.round(30 + Math.pow(context.count / count, 1 / 5) * 20);
        div.style.width = div.style.height = size + 'px';
        // div.style.border = 'solid 1px ' + borderColor;
        div.style.borderRadius = size / 2 + 'px';
        // div.style.boxShadow = '0 0 1px ' + shadowColor;
        div.innerHTML = context.count;
        div.style.lineHeight = size + 'px';
        div.style.color = fontColor;
        div.style.fontSize = '14px';
        div.style.textAlign = 'center';
        context.marker.setOffset(new this.AMap.Pixel(-size / 2, -size / 2));
        context.marker.setContent(div)
    }
  }
};
</script>
