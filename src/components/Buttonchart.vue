<template>
  <div :id="id" class="chart-inner">
    <div class="chart-title">{{optionData.title}}
      <span v-if="optionData.moreUrl" v-on:click="moreAction(optionData.moreUrl)" class="chart-more">更多<i class="iconfont icon-angle-right"></i></span>
      <span v-on:click="refreshData" :class="{onloading: loading}" class="refresh-chart iconfont icon-refresh equipment-c-number"></span>
    </div>
    <div class="chart-equipment-box" :style="{'max-height': tableHeight + 'px'}">
      <div class="chart-equipment-container" v-if="optionData.btnData.length">
        <div v-on:click="btnAction(item)" class="button-item" v-for="(item, $i) in optionData.btnData" :key="'special_'+ $i">
          <span class="item-left item-sign iconbtn" :class="'iconbtn-' + item.icon"></span>
          <span class="item-right">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'

export default {
  name: "buttonchart",
  data() {
    return {
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
        btnData: [],
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
          btnData: [],
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
    navHeight(){
      return store.state.base.HIDE_NAV ? 0 : 85;
    },
    gridHeight(){
      return parseInt((store.state.base.PAGE_HEIGHT - 25 - this.navHeight)/36)
    },
    tableHeight(){
      return this.gridHeight * this.options.height - 62
    },
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
    btnAction(item){
      let script = item.script
      if(item.scriptType == 0){
        eval(script)
      }else{
        window.open(script)
      }
    },
    moreAction(url){
      if(url){
        window.open(url)
      }

    }
  }

};
</script>
