import Mock from 'mockjs'
import treeData from './tree.json'



const menus = {
  "code": "1",
  "data": [
    {
      menu: [
        {
          name: '主页',
          id: 'homepage',
        },
        {
          name: '菜单1',
          id: 'menu1',
        },
        {
          name: '菜单2',
          id: 'menu2',
        },
        {
          name: '菜单3',
          id: 'menu3',
        },
        {
          name: '菜单4',
          id: 'menu4',
        },
        {
          name: '菜单5',
          id: 'menu5',
        },
      ]
    }
  ]
}

/*
0 单系列饼图,
1 多系列饼图,
2 多系列百分比饼图,
 3 单系列横向柱形图,
4  单系列纵向柱形图,
5 多系列横向柱形图,
6 多系列纵向柱形图,
7 折线图, 8 数据面积图,
 9 柱形折线混合图,
 10 雷达图,
11 漏斗图,
12 仪表盘图,
13 树图,
14  矩形树图,
15 旭日图,
16 散点图,
17 气泡图,
18 主题河流图 ,
19 日历坐标系
*/

const charts = {
  'homepage': [
    //单系列饼图
    {
      title: '单系列饼图',
      description: '单系列饼图展示',
      type: 0,
      order: 0,
      size: 0,
      colors: ['#ffbc38', '#19D672', '#76A5D9'],
      series: [
        {
          name: '访问\n来源',
          data: [
            {
              value: 460,
              name: '网站',
              max: ''
            },
            {
              value: 230,
              name: '问卷调查',
              max: ''
            },
            {
              value: 310,
              name: '微信公众号',
              max: ''
            }
          ]
        }
      ],
      treeData: null,
      sunburstData: null,
      scatterData: null,
      bubbleData: null,
      riverData: null,
      calendarData: null
    },
    //多系列饼图数据示例
    {
      title: '多系列饼图数据示例',
      description: '多系列饼图展示',
      order: 0,
      size: 0,
      colors: ['#19D672', '#FD517D', '#76A5D9'],
      type: 1,
      multiple: 1,
      series: [
        {
          name: '访问来源',
          id: '',
          data: [
            {
              value: 460,
              name: '网站',
              max: ''
            },
            {
              value: 230,
              name: '问卷调查',
              max: ''
            },
            {
              value: 310,
              name: '微信公众号',
              max: ''
            }
          ]
        }, {
          name: '营销方式',
          id: '',
          data: [
            {
              value: 310,
              name: '淘宝',
              max: ''
            },
            {
              value: 250,
              name: '线下',
              max: ''
            },
            {
              value: 110,
              name: '京东',
              max: ''
            }
          ]
        }
      ],
      treeData: null,
      sunburstData: null,
      scatterData: null,
      bubbleData: null,
      riverData: null,
      calendarData: null
    },
    //多系列百分比饼图数据示例
    {
      title: '多系列百分比饼图数据示例',
      description: '多系列百分比饼图展示',
      order: 0,
      size: 0,
      colors: ['#19D672', '#FD517D', '#76A5D9'],
      type: 2,
      multiple: 1,
      series: [
        {
          name: '完成率',
          id: '',
          data: [
            {
              value: 80,
              name: '空气检测达标',
              max: 100
            }
          ]
        },
        {
          name: '完成率',
          id: '',
          data: [
            {
              value: 75,
              name: '污水治理达标',
              max: 100
            },
          ]
        },
        {
          name: '完成率',
          id: '',
          data: [
            {
              value: 60,
              name: '固废治理达标',
              max: 200
            }
          ]
        },
      ],
      treeData: null,
      sunburstData: null,
      scatterData: null,
      bubbleData: null,
      riverData: null,
      calendarData: null
    },
    //单系列横向显示柱形图数据示例
    {
      title: '单系列横向显示柱形图数据示例',
      description: '单位/人',
      order: 0,
      size: 0,
      colors: ['#19D672', '#FD517D', '#76A5D9'],
      type: 3,
      multiple: 0,
      series: [
        {
          name: '访问来源',
          id: '',
          data: [
            {
              value: 460,
              name: '网站',
              max: ''
            },
            {
              value: 230,
              name: '问卷调查',
              max: ''
            },
            {
              value: 310,
              name: '微信公众号',
              max: ''
            }
          ]
        }
      ],
      treeData: null,
      sunburstData: null,
      scatterData: null,
      riverData: null,
      calendarData: null
    }
  ],
  "menu1": [
    //单系列纵向显示柱形图数据示例
    {
      title: '单系列纵向显示柱形图数据示例',
      description: '单系列纵向显示柱形图展示',
      order: 0,
      size: 0,
      colors: ['#19D672', '#FD517D', '#76A5D9'],
      type: 4,
      multiple: 0,
      series: [
        {
          name: '访问来源',
          id: '',
          data: [
            {
              value: 460,
              name: '网站',
              max: ''
            },
            {
              value: 230,
              name: '问卷调查',
              max: ''
            },
            {
              value: 310,
              name: '微信公众号',
              max: ''
            }
          ]
        }
      ],
      treeData: null,
      sunburstData: null,
      scatterData: null,
      riverData: null,
      calendarData: null
    },
    //多系列横向显示柱形图数据示例
    {
      title: '多系列横向显示柱形图数据示例',
      description: '单位/人',
      order: 0,
      size: 0,
      colors: ['#19D672', '#FD517D', '#76A5D9'],
      type: 5,
      multiple: 1,
      series: [
        {
          name: '一月份销售数据',
          id: '',
          data: [
            {
              value: 460,
              name: '淘宝',
              max: ''
            },
            {
              value: 230,
              name: '线下',
              max: ''
            },
            {
              value: 310,
              name: '京东',
              max: ''
            }
          ]
        }, {
          name: '二月份销售数据',
          id: '',
          data: [
            {
              value: 310,
              name: '淘宝',
              max: ''
            },
            {
              value: 250,
              name: '线下',
              max: ''
            },
            {
              value: 110,
              name: '京东',
              max: ''
            }
          ]
        }
      ],
      treeData: null,
      sunburstData: null,
      scatterData: null,
      riverData: null,
      calendarData: null
    },
    //多系列纵向显示柱形图数据示例
    {
      title: '多系列纵向显示柱形图数据示例',
      description: '单位/人',
      order: 0,
      size: 0,
      colors: ['#19D672', '#FD517D', '#76A5D9'],
      type: 6,
      multiple: 1,
      series: [
        {
          name: '一月份利润数据',
          id: '',
          data: [
            {
              value: 460,
              name: '淘宝',
              max: ''
            },
            {
              value: -230,
              name: '线下',
              max: ''
            },
            {
              value: 310,
              name: '京东',
              max: ''
            }
          ]
        }, {
          name: '二月份销售数据',
          id: '',
          data: [
            {
              value: 310,
              name: '淘宝',
              max: ''
            },
            {
              value: 250,
              name: '线下',
              max: ''
            },
            {
              value: -110,
              name: '京东',
              max: ''
            }
          ]
        }
      ],
      treeData: null,
      sunburstData: null,
      scatterData: null,
      riverData: null,
      calendarData: null
    },
    //折线图
    {
      title: '折线图',
      description: '折线图展示',
      order: 0,
      size: 0,
      colors: ['#19D672', '#FD517D', '#76A5D9'],
      type: 7,
      multiple: 1,
      series: [
        {
          name: '2019销售数据',
          id: '',
          data: [
            {
              value: 460,
              name: '第一周',
              max: ''
            },
            {
              value: 230,
              name: '第二周',
              max: ''
            },
            {
              value: 310,
              name: '第三周',
              max: ''
            },
            {
              value: 360,
              name: '第四周',
              max: ''
            },
            {
              value: 300,
              name: '第五周',
              max: ''
            },
            {
              value: 110,
              name: '第六周',
              max: ''
            }
          ]
        }, {
          name: '2020售数据',
          id: '',
          data: [
            {
              value: 310,
              name: '第一周',
              max: ''
            },
            {
              value: 250,
              name: '第二周',
              max: ''
            },
            {
              value: 110,
              name: '第三周',
              max: ''
            },
            {
              value: 260,
              name: '第四周',
              max: ''
            },
            {
              value: 400,
              name: '第五周',
              max: ''
            },
            {
              value: 220,
              name: '第六周',
              max: ''
            }
          ]
        }
      ],
      treeData: null,
      sunburstData: null,
      scatterData: null,
      riverData: null,
      calendarData: null
    }
  ],
  "menu2": [
    //数据面积图数据示例
    {
      title: '数据面积图数据示例',
      description: '单位/人',
      order: 0,
      size: 0,
      colors: ['#19D672', '#FD517D', '#76A5D9'],
      type: 8,
      multiple: 0,
      series: [
        {
          name: '一月份销售数据',
          id: '',
          data: [
            {
              value: 460,
              name: '2019-01-01',
              max: ''
            },
            {
              value: 230,
              name: '2019-01-02',
              max: ''
            },
            {
              value: 310,
              name: '2019-01-03',
              max: ''
            },
            {
              value: 330,
              name: '2019-01-04',
              max: ''
            },
            {
              value: 110,
              name: '2019-01-05',
              max: ''
            },
            {
              value: 120,
              name: '2019-01-06',
              max: ''
            },
            {
              value: 160,
              name: '2019-01-07',
              max: ''
            },
            {
              value: 360,
              name: '2019-01-08',
              max: ''
            },
            {
              value: 310,
              name: '2019-01-09',
              max: ''
            },
            {
              value: 550,
              name: '2019-01-10',
              max: ''
            },
            {
              value: 410,
              name: '2019-01-11',
              max: ''
            },
            {
              value: 360,
              name: '2019-01-12',
              max: ''
            },
            {
              value: 290,
              name: '2019-01-03',
              max: ''
            }
          ]
        }
      ],
      treeData: null,
      sunburstData: null,
      scatterData: null,
      riverData: null,
      calendarData: null
    },
    //柱形折线混合图数据示例
    {
      title: '柱形折线混合图数据示例',
      description: '单位/人',
      order: 0,
      size: 0,
      colors: ['#19D672', '#FD517D', '#76A5D9'],
      type: 9,
      multiple: 1,
      series: [
        {
          name: '一月份销售数据',
          id: '',
          data: [
            {
              value: 460,
              name: '2019-01-01',
              max: ''
            },
            {
              value: 230,
              name: '2019-01-02',
              max: ''
            },
            {
              value: 310,
              name: '2019-01-03',
              max: ''
            }
          ]
        }, {
          name: '一月份利润数据',
          id: '',
          data: [
            {
              value: 160,
              name: '2019-01-01',
              max: ''
            },
            {
              value: 30,
              name: '2019-01-02',
              max: ''
            },
            {
              value: 110,
              name: '2019-01-03',
              max: ''
            }
          ]
        }
      ],
      treeData: null,
      sunburstData: null,
      scatterData: null,
      bubbleData: null,
      riverData: null,
      calendarData: null
    },
    //雷达图数据示例
    {
      title: '雷达图数据示例',
      description: '单位/人',
      order: 0,
      size: 0,
      colors: ['#19D672', '#FD517D', '#76A5D9'],
      type: 10,
      multiple: 1,
      series: [
        {
          name: '一般量级统计',
          data: [
            { value: 60, name: 'Mon', max: 100 },
            { value: 30, name: 'Tue', max: 100 },
            { value: 10, name: 'Wed', max: 100 },
            { value: 75, name: 'Thu', max: 100 },
            { value: 30, name: 'Fri', max: 100 },
            { value: 10, name: 'Sat', max: 100 },
            { value: 75, name: 'Sun', max: 100 }
          ]
        },
        {
          name: '一般量级统计1',
          data: [
            { value: 30, name: 'Mon', max: 100 },
            { value: 10, name: 'Tue', max: 100 },
            { value: 10, name: 'Wed', max: 100 },
            { value: 65, name: 'Thu', max: 100 },
            { value: 20, name: 'Fri', max: 100 },
            { value: 10, name: 'Sat', max: 100 },
            { value: 55, name: 'Sun', max: 100 },
          ]
        }
      ],
      treeData: null,
      sunburstData: null,
      scatterData: null,
      bubbleData: null,
      riverData: null,
      calendarData: null
    },
    //漏斗图数据示例
    {
      title: '漏斗图数据示例',
      description: '单位/人',
      order: 0,
      size: 0,
      colors: ['#19D672', '#FD517D', '#76A5D9'],
      type: 11,
      multiple: 0,
      series: [
        {
          name: '一般量级统计',
          data: [
            { value: 60, name: 'Mon', max: 100 },
            { value: 30, name: 'Tue', max: 100 },
            { value: 10, name: 'Wed', max: 100 },
            { value: 75, name: 'Thu', max: 100 },
            { value: 30, name: 'Fri', max: 100 },
            { value: 10, name: 'Sat', max: 100 },
            { value: 75, name: 'Sun', max: 100 }
          ]
        }
      ],
      treeData: null,
      sunburstData: null,
      scatterData: null,
      bubbleData: null,
      riverData: null,
      calendarData: null
    }
  ],
  "menu3": [
    //仪表盘示例
    {
      title: '仪表盘示例',
      description: '仪表盘数据展示',
      order: 0,
      size: 1,
      colors: ['#19D672', '#FD517D', '#76A5D9', '#ff9600', '#ee332e'],
      type: 12,
      multiple: 1,
      series: [
        {
          name: '速度表',
          data: [
            { value: 90, name: 'Km/h', max: 100 },
          ]
        },
        {
          name: '油表',
          data: [
            { value: 15, name: 'L', max: 100 },
          ]
        },
        {
          name: '电量表',
          data: [
            { value: 60, name: 'xx', max: 100 },
          ]
        },
        // {
        //   name: '电量表1',
        //   data: [
        //     { value: 60, name: 'xx', max: 100 },
        //   ]
        // },
        // {
        //   name: '电量表2',
        //   data: [
        //     { value: 60, name: 'xx', max: 100 },
        //   ]
        // },
        // {
        //   name: '电量表3',
        //   data: [
        //     { value: 60, name: 'xx', max: 100 },
        //   ]
        // },
        // {
        //   name: '电量表4',
        //   data: [
        //     { value: 60, name: 'xx', max: 100 },
        //   ]
        // }
      ],
      treeData: null,
      sunburstData: null,
      scatterData: null,
      bubbleData: null,
      riverData: null,
      calendarData: null
    },
    //树图示例
    {
      title: '树图示例',
      description: '树图数据展示',
      order: 0,
      size: 0,
      colors: ['#19D672', '#FD517D', '#76A5D9'],
      type: 13,
      multiple: 1,
      series: [],
      treeData: treeData,
      sunburstData: null,
      scatterData: null,
      bubbleData: null,
      riverData: null,
      calendarData: null
    },
    //矩形树图示例
    {
      title: '矩形树图示例',
      description: '矩形树图数据展示',
      order: 0,
      size: 0,
      colors: ['#19D672', '#FD517D', '#76A5D9'],
      type: 14,
      multiple: 1,
      series: [],
      treeData: treeData,
      sunburstData: null,
      scatterData: null,
      bubbleData: null,
      riverData: null,
      calendarData: null
    },
    //旭日图数据示例
    {
      title: '旭日图数据示例',
      description: '旭日图数据展示',
      order: 0,
      size: 0,
      colors: ['#19D672', '#FD517D', '#76A5D9'],
      type: 15,
      multiple: 1,
      series: [],
      treeData: null,
      sunburstData: {
        "name": "flare",
        "children": [
          {
            "name": "analytics",
            "children": [
              {
                "name": "cluster",
                "children": [
                  {
                    "name": "AgglomerativeCluster",
                    "value": 3938
                  },
                  {
                    "name": "CommunityStructure",
                    "value": 3812
                  },
                  {
                    "name": "HierarchicalCluster",
                    "value": 6714
                  },
                  {
                    "name": "MergeEdge",
                    "value": 743
                  }
                ]
              }]
          }
        ]
      },
      scatterData: null,
      bubbleData: null,
      riverData: null,
      calendarData: null
    }
  ],
  "menu4": [
    //散点图数据示例
    {
      title: '散点图数据示例',
      description: '散点图数据展示',
      order: 0,
      size: 0,
      colors: ['#ff9600', '#FD517D', '#76A5D9'],
      type: 16,
      multiple: 1,
      series: [],
      treeData: null,
      sunburstData: null,
      scatterData: [
        {
          name: "系列1",
          data: [
            {
              "x": 90,
              "y": 80,
              "name": "名称1"
            },
            {
              "x": 80,
              "y": 60,
              "name": "名称2"
            },
            {
              "x": 10,
              "y": 180,
              "name": "名称3"
            },
            {
              "x": 170,
              "y": 200,
              "name": "名称4"
            },
            {
              "x": 60,
              "y": 180,
              "name": "名称5"
            },
            {
              "x": 40,
              "y": 60,
              "name": "名称6"
            }
          ]
        },
        {
          name: "系列2",
          data: [
            {
              "x": 110,
              "y": 90,
              "name": "名称1"
            },
            {
              "x": 176,
              "y": 62,
              "name": "名称2"
            },
            {
              "x": 210,
              "y": 80,
              "name": "名称3"
            },
            {
              "x": 70,
              "y": 100,
              "name": "名称4"
            },
            {
              "x": 30,
              "y": 180,
              "name": "名称5"
            },
            {
              "x": 10,
              "y": 30,
              "name": "名称6"
            }
          ]
        }
      ],
      bubbleData: null,
      riverData: null,
      calendarData: null
    },
    //气泡图数据示例
    {
      title: '气泡图数据示例',
      description: '气泡图数据展示',
      order: 0,
      size: 0,
      colors: ['#ff9600', '#FD517D', '#76A5D9'],
      type: 17,
      multiple: 1,
      series: [],
      treeData: null,
      sunburstData: null,
      scatterData: null,
      bubbleData: [
        {
          name: "系列1",
          data: [
            {
              "x": 90,
              "y": 80,
              "value": 200,
              "name": "名称1"
            },
            {
              "x": 80,
              "y": 60,
              "value": 140,
              "name": "名称2"
            },
            {
              "x": 10,
              "y": 180,
              "value": 200,
              "name": "名称3"
            },
            {
              "x": 170,
              "y": 200,
              "value": 260,
              "name": "名称4"
            },
            {
              "x": 60,
              "y": 180,
              "value": 270,
              "name": "名称5"
            },
            {
              "x": 40,
              "y": 60,
              "value": 100,
              "name": "名称6"
            }
          ]
        },
        {
          name: "系列2",
          data: [
            {
              "x": 110,
              "y": 90,
              "value": 170,
              "name": "名称1"
            },
            {
              "x": 176,
              "y": 62,
              "value": 140,
              "name": "名称2"
            },
            {
              "x": 210,
              "y": 80,
              "value": 230,
              "name": "名称3"
            },
            {
              "x": 70,
              "y": 100,
              "value": 260,
              "name": "名称4"
            },
            {
              "x": 30,
              "y": 180,
              "value": 220,
              "name": "名称5"
            },
            {
              "x": 10,
              "y": 30,
              "value": 50,
              "name": "名称6"
            }
          ]
        }
      ],
      riverData: null,
      calendarData: null
    },
    //主题河流图数据示例
    {
      title: '主题河流图数据示例',
      description: '主题河流图数据展示',
      order: 0,
      size: 0,
      colors: ['#19D672', '#FD517D', '#76A5D9'],
      type: 18,
      multiple: 1,
      series: [],
      treeData: null,
      sunburstData: null,
      scatterData: null,
      bubbleData: null,
      riverData: [
        {
          "name": "DQ",
          "data": [
            { "date": "2015/11/08", "value": 10 },
            { "date": "2015/11/09", "value": 15 },
            { "date": "2015/11/10", "value": 35 },
            { "date": "2015/11/11", "value": 38 },
            { "date": "2015/11/12", "value": 22 },
            { "date": "2015/11/13", "value": 16 },
            { "date": "2015/11/14", "value": 7 },
            { "date": "2015/11/15", "value": 2 },
            { "date": "2015/11/16", "value": 17 },
            { "date": "2015/11/17", "value": 33 },
            { "date": "2015/11/18", "value": 40 },
            { "date": "2015/11/19", "value": 32 },
            { "date": "2015/11/20", "value": 26 },
            { "date": "2015/11/21", "value": 35 },
            { "date": "2015/11/22", "value": 40 },
            { "date": "2015/11/23", "value": 32 },
            { "date": "2015/11/24", "value": 26 },
            { "date": "2015/11/25", "value": 22 },
            { "date": "2015/11/26", "value": 16 },
            { "date": "2015/11/27", "value": 22 },
            { "date": "2015/11/28", "value": 10 }
          ]
        },
        {
          "name": "TY",
          "data": [
            { "date": "2015/11/08", "value": 35 },
            { "date": "2015/11/09", "value": 36 },
            { "date": "2015/11/10", "value": 37 },
            { "date": "2015/11/11", "value": 22 },
            { "date": "2015/11/12", "value": 24 },
            { "date": "2015/11/13", "value": 26 },
            { "date": "2015/11/14", "value": 34 },
            { "date": "2015/11/15", "value": 21 },
            { "date": "2015/11/16", "value": 18 },
            { "date": "2015/11/17", "value": 45 },
            { "date": "2015/11/18", "value": 32 },
            { "date": "2015/11/19", "value": 35 },
            { "date": "2015/11/20", "value": 30 },
            { "date": "2015/11/21", "value": 28 },
            { "date": "2015/11/22", "value": 27 },
            { "date": "2015/11/23", "value": 26 },
            { "date": "2015/11/24", "value": 15 },
            { "date": "2015/11/25", "value": 30 },
            { "date": "2015/11/26", "value": 35 },
            { "date": "2015/11/27", "value": 42 },
            { "date": "2015/11/28", "value": 42 }
          ]
        },
        {
          "name": "SS",
          "data": [
            { "date": "2015/11/08", "value": 21 },
            { "date": "2015/11/09", "value": 25 },
            { "date": "2015/11/10", "value": 27 },
            { "date": "2015/11/11", "value": 23 },
            { "date": "2015/11/12", "value": 24 },
            { "date": "2015/11/13", "value": 21 },
            { "date": "2015/11/14", "value": 35 },
            { "date": "2015/11/15", "value": 39 },
            { "date": "2015/11/16", "value": 40 },
            { "date": "2015/11/17", "value": 36 },
            { "date": "2015/11/18", "value": 33 },
            { "date": "2015/11/19", "value": 43 },
            { "date": "2015/11/20", "value": 40 },
            { "date": "2015/11/21", "value": 34 },
            { "date": "2015/11/22", "value": 28 },
            { "date": "2015/11/23", "value": 26 },
            { "date": "2015/11/24", "value": 37 },
            { "date": "2015/11/25", "value": 41 },
            { "date": "2015/11/26", "value": 46 },
            { "date": "2015/11/27", "value": 47 },
            { "date": "2015/11/28", "value": 41 }
          ]
        },
        {
          "name": "QG",
          "data": [{ "date": "2015/11/08", "value": 10 }, { "date": "2015/11/09", "value": 15 }, { "date": "2015/11/10", "value": 35 }, { "date": "2015/11/11", "value": 38 }, { "date": "2015/11/12", "value": 22 }, { "date": "2015/11/13", "value": 16 }, { "date": "2015/11/14", "value": 7 }, { "date": "2015/11/15", "value": 2 }, { "date": "2015/11/16", "value": 17 }, { "date": "2015/11/17", "value": 33 }, { "date": "2015/11/18", "value": 40 }, { "date": "2015/11/19", "value": 32 }, { "date": "2015/11/20", "value": 26 }, { "date": "2015/11/21", "value": 35 }, { "date": "2015/11/22", "value": 40 }, { "date": "2015/11/23", "value": 32 }, { "date": "2015/11/24", "value": 26 }, { "date": "2015/11/25", "value": 22 }, { "date": "2015/11/26", "value": 16 }, { "date": "2015/11/27", "value": 22 }, { "date": "2015/11/28", "value": 10 }]
        }, { "name": "SY", "data": [{ "date": "2015/11/08", "value": 10 }, { "date": "2015/11/09", "value": 15 }, { "date": "2015/11/10", "value": 35 }, { "date": "2015/11/11", "value": 38 }, { "date": "2015/11/12", "value": 22 }, { "date": "2015/11/13", "value": 16 }, { "date": "2015/11/14", "value": 7 }, { "date": "2015/11/15", "value": 2 }, { "date": "2015/11/16", "value": 17 }, { "date": "2015/11/17", "value": 33 }, { "date": "2015/11/18", "value": 40 }, { "date": "2015/11/19", "value": 32 }, { "date": "2015/11/20", "value": 26 }, { "date": "2015/11/21", "value": 35 }, { "date": "2015/11/22", "value": 4 }, { "date": "2015/11/23", "value": 32 }, { "date": "2015/11/24", "value": 26 }, { "date": "2015/11/25", "value": 22 }, { "date": "2015/11/26", "value": 16 }, { "date": "2015/11/27", "value": 22 }, { "date": "2015/11/28", "value": 10 }] }, { "name": "DD", "data": [{ "date": "2015/11/08", "value": 10 }, { "date": "2015/11/09", "value": 15 }, { "date": "2015/11/10", "value": 35 }, { "date": "2015/11/11", "value": 38 }, { "date": "2015/11/12", "value": 22 }, { "date": "2015/11/13", "value": 16 }, { "date": "2015/11/14", "value": 7 }, { "date": "2015/11/15", "value": 2 }, { "date": "2015/11/16", "value": 17 }, { "date": "2015/11/17", "value": 33 }, { "date": "2015/11/18", "value": 4 }, { "date": "2015/11/19", "value": 32 }, { "date": "2015/11/20", "value": 26 }, { "date": "2015/11/21", "value": 35 }, { "date": "2015/11/22", "value": 40 }, { "date": "2015/11/23", "value": 32 }, { "date": "2015/11/24", "value": 26 }, { "date": "2015/11/25", "value": 22 }, { "date": "2015/11/26", "value": 16 }, { "date": "2015/11/27", "value": 22 }, { "date": "2015/11/28", "value": 10 }] }],
      calendarData: null
    },
    //日历热图数据示例
    {
      title: '日历热图数据示例',
      description: '日历热图数据展示',
      order: 0,
      size: 0,
      colors: ['#19D672', '#FD517D', '#76A5D9'],
      type: 19,
      multiple: 1,
      series: [],
      treeData: null,
      sunburstData: null,
      scatterData: null,
      bubbleData: null,
      riverData: null,
      calendarData: [
        {
          date: '2019-10-01',
          value: 260
        },
        {
          date: '2019-10-02',
          value: 200
        },
        {
          date: '2019-10-03',
          value: 279
        },
        {
          date: '2019-10-04',
          value: 847
        },
        {
          date: '2019-10-05',
          value: 241
        },
        {
          date: '2019-10-06',
          value: 411
        },
        {
          date: '2019-10-07',
          value: 98
        },
        {
          date: '2019-10-08',
          value: 122
        },
        {
          date: '2019-10-09',
          value: 333
        },
        {
          date: '2019-10-10',
          value: 126
        },
        {
          date: '2019-10-11',
          value: 211
        },
        {
          date: '2019-10-12',
          value: 160
        },
      ]
    }
  ]
}


const output = {
  getMenu: () => {
    return menus
  },
  getChartsById: (data) => {
    let { body } = data
    let { id } = JSON.parse(body)
    let chart = charts[id] || []
    return {
      "code": "1",
      "data": chart,
      "success": true
    }
  },
}


Mock.mock(/\/api\/getpages/, 'get', output.getMenu)
Mock.mock(/\/api\/getcharts/, 'post', output.getChartsById)


export default Mock
