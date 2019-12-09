<template>
  <div :id="id" class="chart-inner"></div>
</template>

<script>
export default {
  name: "singlepiechart",
  data() {
    return {
      chart: ""
    };
  },
  props: {
    id: { type: String },
    width: { type: String, default: "200px" },
    height: { type: String, default: "200px" },
    options:{
      type:Object,
      default(){
        return {
          title: '访问来源',
          description :'单位/人',
          colors: ['#19D672','#FD517D','#76A5D9'],
          series: [
            {
              name: '一般量级统计',
              data: [
                {value:60, name:'一般量级统计', max:100}
              ]
            },{
              name: '严重量级统计',
              data: [
                {value:60, name:'严重量级统计', max:100}
              ],
            },{
              name: '高危量级统计',
              data: [
                {value:50, name:'高危量级统计', max:100}
              ]
            }
          ],
          treeData: null,
          sunburstData:null,
          scatterData:null,
          riverData:null,
        }
      }
    }
  },
  computed:{
    titles(){
      const titles = []
      this.options.series.map( v =>{
        v.data.map( d => {
          if(titles.indexOf(d.name) < 0) titles.push( d.name )
        })
      })
      return titles
    }
  },
  mounted(){
    console.log(this.options)
    this.drawPie()
  },
  methods: {
    drawPie(){
      let myChart = this.$echarts.init(document.getElementById(this.id))
      let color = ["#19D672", "#FD517D"];
      let series = []

      if(Array.isArray(this.options.series) && this.options.series.length){
        let divider = parseInt(100 / (this.options.series.length + 1))
        this.options.series.map( (item, index)=> {
          let data = item.data[0] || {}
          series.push({
            name: item.name,
            type:'pie',
            radius: [25, 33],
            center : [divider + divider * index +'%', '50%'],
            avoidLabelOverlap: false,
            selectedMode: 'single',
            selectedOffset: 0,
            hoverAnimation: false,
            label: {
                normal: {
                    show: false,
                    position: 'center',
                    formatter: '{d}',
                    fontSize: 16,
                    verticalAlign: 'center'
                },
            },
            itemStyle: {
              shadowBlur : 5,
              // shadowColor: 'rgba(255,255,255,0.2)',
            },
            data: [
              {value:100 - parseFloat(data.value), name:'', itemStyle:{ color:'#282a36'}},
              {value: data.value, name: data.name, selected:true, label: {show: true}}
            ],
            color: this.options.colors[index],
          })
        })
      }



      console.log(series)

      myChart.setOption({
        title : {
            text: this.options.title,
            subtext: this.options.description,
            x:'left',
            fontSize: 16,
            textStyle: {
              color:'#dce2f2'
            }
        },
        color: ['#ffc03d','#01edd9','#3c95fb'],
        textStyle: {
          color:'#dce2f2'
        },
        legend: {
          x : 'center',
          y : 'bottom',
          data: this.titles,
          textStyle: {
            color:'#dce2f2',
            fontSize: 11
          }
        },
        // tooltip: {
        //     trigger: 'item',
        //     confine: true,
        //     formatter: "{b}: <br />{d}%",
        //     backgroundColor: '#264e94',
        //     padding: [0, 5],
        //     textStyle:{
        //       fontSize: 12
        //     }
        // },
        series: series
      });
    }
  }

};
</script>
