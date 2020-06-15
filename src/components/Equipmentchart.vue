<template>
  <div :id="id" class="chart-inner">
    <div class="chart-title">{{this.options.title}}
      <span :click="refreshData" :class="{onloading: loading}" class="refresh-chart iconfont icon-refresh equipment-c-number"></span>
    </div>
    <div class="chart-equipment-box" :style="{'max-height': tableHeight + 'px'}">
      <div class="chart-equipment-container" v-if="specialList.length">
        <div class="equipment-item-hor" v-for="(item, $i) in specialList" :key="'special_'+ $i">
          <span class="item-left item-sign iconfont" :class="'icon-equipment-' + item.prop"></span>
          <span class="item-right">
            <div class="equipment-accuracy equipment-c-number">{{ item.value }}</div>
            <div class="equipment-name equipment-c-active">{{ item.name }}</div>
          </span>
        </div>
      </div>
      <div class="chart-equipment-container" v-if="iconList.length">
        <div class="equipment-item-ver" v-for="(item, $i) in iconList" :key="'icon_'+ $i">
          <div><span class="item-sign iconfont" :class="getClassName( item )"></span></div>
          <div class="equipment-name">{{ item.name }}</div>
        </div>
      </div>
      <div class="chart-equipment-container" v-if="numberList.length">
        <div class="equipment-item-hor" v-for="(item, $i) in numberList" :key="'num_'+ $i">
          <span class="item-left equipment-number-name equipment-c-number">{{ item.name }}</span>
          <span class="item-right">
            <div class="equipment-number-accuracy equipment-c-active" :title="getNumberAccuracy(item)">{{ getNumberAccuracy(item) }}</div>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'

export default {
  name: "equipmentchart",
  data() {
    return {
      unitsData: {
        "PM1": {"unit":"ug/m3", "decimals": null},
        "PM25": {"unit":"ug/m3", "decimals": null},
        "PM10": {"unit":"ug/m3", "decimals": null},
        "TVOC": {"unit":"mg/m3/1000", "decimals": 2},
        "CO2": {"unit":"ppm", "decimals": null},
        "HCHO": {"unit":"mg/m3/1000", "decimals": 2},
        "SO2": {"unit":"mg/m3/1000", "decimals": 3},
      },
      optionData: {
        title: '',
        description :'',
        type: 22,
        style: 0,
        refresh: 20,
        colors:['#19D672','#FD517D','#76A5D9'],
        series: [],
        treeData: null,
        sunburstData:null,
        scatterData:null,
        riverData:null,
        equipmentData: [],
      },
      loading: false
    }
  },
  props: {
    id: { type: String },
    pageId: { type: String },
    width: { type: String, default: "200px" },
    height: { type: String, default: "200px" },
    index: { type: Number },
    options:{
      type:Object,
      default(){
        return {
          title: '访问来源',
          description :'单位/人',
          type: 22,
          style: 0,
          refresh: 20,
          colors:['#19D672','#FD517D','#76A5D9'],
          series: [],
          treeData: null,
          sunburstData:null,
          scatterData:null,
          riverData:null,
          equipmentData: [],
        }
      }
    }
  },
  computed: {
    theme(){
      return store.state.base.THEME_TYPE
    },
    colors(){
      let colors = this.options.colors || []
      return colors.concat(store.state.base.COLOR_REPOSITORY)
    },
    gridHeight(){
      return parseInt((store.state.base.PAGE_HEIGHT - 110)/36)
    },
    tableHeight(){
      return this.gridHeight * this.options.height - 62
    },
    // 温度湿度
    specialList(){
      let data = []
      this.optionData.equipmentData.map( v =>{
        if(v.type == 0 && (v.num1 == 'WD' || v.num1 == 'SD'))
        data.push({
          name: v.name,
          prop: v.num1.toLowerCase(),
          type: 0,
          value: v.value
        })
      })
      return data
    },
    // 小图标列表
    iconList(){
      let data = []
      this.optionData.equipmentData.map( v =>{
        if(v.type == 1 || v.type == 2)
        data.push({
          name: v.name,
          prop: v.num1.toLowerCase(),
          type: v.type,
          value: v.value
        })
      })
      return data
    },
    // 数字列表
    numberList(){
      let data = []
      this.optionData.equipmentData.map( v =>{
        if(v.type == 0 && v.num1 != 'WD' && v.num1 != 'SD')
        data.push({
          name: v.name,
          prop: v.num1.toLowerCase(),
          type: 0,
          value: v.value
        })
      })
      return data
    }
  },
  mounted(){
    // console.log(this.options)
    this.initialData( this.options );
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
      _self.optionData = Object.assign({}, data)
    },
    refreshData(){
      const _self = this
      // console.log(_self.options.id, _self.pageId)
      if(_self.options.id && _self.pageId){
        _self.loading = true
        _self.$store.dispatch('getSingleChartAction', { pageId: _self.pageId, id: _self.options.id })
        .then( (data) => {
          _self.initialData(data)
          _self.loading = false
        })
      }
    },
    // 获取图标和效果
    getClassName( item ){
      let cname = 'icon-equipment-' + item.prop
      if( item.type == 1 && item.value == 1 ){
        cname += ' equipment-c-active'
      }else if( item.type == 2 && item.value == 1 ){
        cname += ' equipment-c-warning'
      }
      return cname
    },
    // 获取示数
    getNumberAccuracy( item ){
      let prop = item.prop.toUpperCase()
      let accuracy = this.unitsData[ prop ]
      return (accuracy && accuracy.decimals ? parseFloat(item.value).toFixed( accuracy.decimals ) : item.value) + accuracy.unit
    }
  }

};
</script>
