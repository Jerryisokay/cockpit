<template>
  <div :id="id" class="chart-inner">
    <div class="chart-title">{{this.optionData.title}}</div>
    <div class="chart-tablebox" :style="{'max-height': tableHeight + 'px'}">
        <table border="0" cellpadding='2' cellspacing ='0' class="chart-table">
        <thead>
          <tr>
            <th>排序</th>
            <th>名称</th>
            <th v-for="(title, i) in titles" :key="'title_'+i"
              :style="{'color': title == sortProperty ? colors[0] : '' }" @click="changeSort(title)">
              {{ title }}
              <i class="iconfont" :title="sortByName" :class="{'icon-sort-asc': sortByAsc && title == sortProperty,'icon-sort-desc': !sortByAsc && title== sortProperty  }"></i>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(v, $index) in series" :key="'rank_' + $index">
            <th>
              <span v-if="$index < 3" :class="'price price-' + $index" ></span>
              <span v-if="$index >= 3">{{$index + 1}}</span>
            </th>
            <th :title="v.name">{{v.name}}</th>
            <th v-for="(title,$i) in titles" :key="'value_'+ $index +'_'+$i"
              :style="{'color': title == sortProperty ? colors[0] : '' }">{{ v.values[title] }}</th>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="chart-subtitle">{{this.optionData.description}}</div>
  </div>
</template>

<script>
import store from '@/store'

export default {
  name: "tablechart",
  data() {
    return {
      themeColors:{},
      sortByAsc: false,
      sortByName: '降序',
      sortProperty: '',
      series: [],
      optionData: {
        title: '访问来源',
        description :'单位/人',
        type: 20,
        style: 0,
        colors:['#19D672','#FD517D','#76A5D9'],
        series: [],
        treeData: null,
        sunburstData:null,
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
          type: 20,
          style: 0,
          colors:['#19D672','#FD517D','#76A5D9'],
          series: [],
          treeData: null,
          sunburstData:null,
          scatterData:null,
          riverData:null
        }
      }
    }
  },
  computed: {
    titles(){
      const titles = []
      this.optionData.series.map( v =>{
        v.data.map( d => {
          if(titles.indexOf(d.name) < 0) titles.push( d.name )
        })
      })
      return titles
    },
    theme(){
      return store.state.base.THEME_TYPE
    },
    colors(){
      let colors = this.optionData.colors || []
      return colors.concat(store.state.base.COLOR_REPOSITORY)
    },
    gridHeight(){
      return parseInt((store.state.base.PAGE_HEIGHT - 110)/12)
    },
    tableHeight(){
      return this.gridHeight * this.options.height - 62
    }
  },
  mounted(){
    // console.log(this.options)
    this.initialData(this.options)
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
      // if(Array.isArray(this.optionData.series) && this.optionData.series.length){
      //   let data = this.optionData.series[0].data
      //   if(Array.isArray(data) && data.length){
      //     this.sortProperty = data[0].name
      //   }
      // }
      //设置默认排序规则
      if(Array.isArray(this.titles) && this.titles.length){
        this.sortProperty = this.titles[0]
      }

      this.series = []
      Array.isArray(this.optionData.series) && this.optionData.series.map( (item, index) => {
        var values = {}
        Array.isArray(item.data) && item.data.map( v => {
          values[v.name] = v.value
        })
        this.series.push({
          values,
          name: item.name
        })
      })
      //开始排序
      this.sortData()

    },
    changeSort: function(title){
      if(title == this.sortProperty){
        this.sortByAsc = !this.sortByAsc
      }else{
        //切换字段
        this.sortProperty = title;
        this.sortByAsc = false
      }
      this.sortByName = this.sortByAsc ? '升序' : '降序'
      this.sortData()
    },
    sortData: function(){
      let sortByAsc = this.sortByAsc, sortProperty = this.sortProperty
      this.series.sort(function(prev, next){
        return sortByAsc ? prev.values[sortProperty] - next.values[sortProperty] : next.values[sortProperty] - prev.values[sortProperty]
      })
      // console.log(this.series)
    }
  }

};
</script>
