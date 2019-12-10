<template>
  <div :id="id" class="chart-inner"></div>
</template>

<script>

export default {
  name: "treechart",
  data() {
    return {
      themeColor:{

      }
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
          type: 9,
          style: 0,
          colors:['#FD517D','#76A5D9'],
          series:[],
          sunburstData:null,
          treeData: {
            name:'root',
            children:[]
          },
          scatterData:null,
          riverData:null
        }
      }
    }
  },
  computed: {
    values(){}
  },
  mounted(){
    // console.log(this.options)
    this.drawChart()
  },
  watch:{
    options:{
      immediate:true,
      handler:function(){
        setTimeout( () => {
          this.myChart && this.myChart.clear()
          this.drawChart()
        },200)
     }
    }
  },
  methods: {
    drawChart(){
      this.myChart = this.$echarts.init(this.$el)
      let data = this.options.treeData
      Array.isArray(data.children) && data.children.map(function (datum, index) {
          index % 2 === 0 && (datum.collapsed = true);
      });
      console.log(data)
      this.myChart.setOption({
        title : {
            text: this.options.title,
            x:'left',
            textStyle:{
              color: '#ffffff',//'#76a5d9'
            },
        },
        color: this.options.colors,
        graphic:[
          {
            type:'text',  //副标题文字
            left: 20,
            bottom:10,
            z:3,
            style:{
                text: this.options.description,
                // textAlign:'center',
                fill:'#fff',
                fontSize:12,
                // height:60
            }
          }
        ],
        series: [
          {
              type: 'tree',

              data: [data],

              top: '10%',
              left: '3%',
              bottom: '3%',
              right: '15%',

              symbolSize: 7,

              label: {
                  normal: {
                      position: 'left',
                      verticalAlign: 'middle',
                      align: 'right',
                      fontSize: 8,
                      textStyle:{
                        color: '#ffffff',//'#76a5d9'
                      },
                  }
              },

              leaves: {
                  label: {
                      normal: {
                          position: 'right',
                          verticalAlign: 'middle',
                          align: 'left',
                          fontSize: 8,
                      }
                  }
              },

              expandAndCollapse: true,
              animationDuration: 550,
              animationDurationUpdate: 750
          }
        ]
      });
    }
  }

};
</script>
