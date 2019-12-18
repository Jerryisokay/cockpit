import Mock from 'mockjs'
import treeData from './tree.json'
import riverData from './river.js'
import scoreData from './score.js'



const menus = [
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
          name: '访问来源',
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
              max: 100
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
      size: 0,
      colors: ['#19D672', '#FD517D', '#76A5D9'],
      type: 12,
      multiple: 1,
      series: [
        {
          name: '速度表',
          data: [
            { value: 60, name: 'Km/h', max: 100 },
          ]
        },
        {
          name: '油表',
          data: [
            { value: 60, name: 'L', max: 100 },
          ]
        },
        {
          name: '电量表',
          data: [
            { value: 60, name: 'xx', max: 100 },
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
      colors: ['#19D672', '#FD517D', '#76A5D9'],
      type: 16,
      multiple: 1,
      series: [],
      treeData: null,
      sunburstData: null,
      scatterData: [
        {
          name: "系列1",
          data: [
            [90, 80, '名称1'],
            [80, 60, '名称2'],
            [10, 180, '名称3'],
            [170, 200, '名称4'],
            [60, 180, '名称5'],
            [40, 60, '名称6'],
          ]
        },
        {
          name: "系列2",
          data: [
            [110, 90, '名称1'],
            [176, 62, '名称2'],
            [210, 80, '名称3'],
            [70, 100, '名称4'],
            [30, 180, '名称5'],
            [10, 30, '名称6'],
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
      colors: ['#19D672', '#FD517D', '#76A5D9'],
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
            [90, 80, 200, '名称1'],
            [80, 60, 140, '名称2'],
            [10, 180, 200, '名称3'],
            [170, 200, 260, '名称4'],
            [60, 180, 270, '名称5'],
            [40, 60, 100, '名称6'],
          ]
        },
        {
          name: "系列2",
          data: [
            [110, 90, 170, '名称1'],
            [176, 62, 140, '名称2'],
            [210, 80, 230, '名称3'],
            [70, 100, 260, '名称4'],
            [30, 180, 220, '名称5'],
            [10, 30, 50, '名称6'],
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
        ['2015/11/08', 10, 'DQ'], ['2015/11/09', 15, 'DQ'], ['2015/11/10', 35, 'DQ'],
        ['2015/11/11', 38, 'DQ'], ['2015/11/12', 22, 'DQ'], ['2015/11/13', 16, 'DQ'],
        ['2015/11/14', 7, 'DQ'], ['2015/11/15', 2, 'DQ'], ['2015/11/16', 17, 'DQ'],
        ['2015/11/17', 33, 'DQ'], ['2015/11/18', 40, 'DQ'], ['2015/11/19', 32, 'DQ'],
        ['2015/11/20', 26, 'DQ'], ['2015/11/21', 35, 'DQ'], ['2015/11/22', 40, 'DQ'],
        ['2015/11/23', 32, 'DQ'], ['2015/11/24', 26, 'DQ'], ['2015/11/25', 22, 'DQ'],
        ['2015/11/26', 16, 'DQ'], ['2015/11/27', 22, 'DQ'], ['2015/11/28', 10, 'DQ'],
        ['2015/11/08', 35, 'TY'], ['2015/11/09', 36, 'TY'], ['2015/11/10', 37, 'TY'],
        ['2015/11/11', 22, 'TY'], ['2015/11/12', 24, 'TY'], ['2015/11/13', 26, 'TY'],
        ['2015/11/14', 34, 'TY'], ['2015/11/15', 21, 'TY'], ['2015/11/16', 18, 'TY'],
        ['2015/11/17', 45, 'TY'], ['2015/11/18', 32, 'TY'], ['2015/11/19', 35, 'TY'],
        ['2015/11/20', 30, 'TY'], ['2015/11/21', 28, 'TY'], ['2015/11/22', 27, 'TY'],
        ['2015/11/23', 26, 'TY'], ['2015/11/24', 15, 'TY'], ['2015/11/25', 30, 'TY'],
        ['2015/11/26', 35, 'TY'], ['2015/11/27', 42, 'TY'], ['2015/11/28', 42, 'TY'],
        ['2015/11/08', 21, 'SS'], ['2015/11/09', 25, 'SS'], ['2015/11/10', 27, 'SS'],
        ['2015/11/11', 23, 'SS'], ['2015/11/12', 24, 'SS'], ['2015/11/13', 21, 'SS'],
        ['2015/11/14', 35, 'SS'], ['2015/11/15', 39, 'SS'], ['2015/11/16', 40, 'SS'],
        ['2015/11/17', 36, 'SS'], ['2015/11/18', 33, 'SS'], ['2015/11/19', 43, 'SS'],
        ['2015/11/20', 40, 'SS'], ['2015/11/21', 34, 'SS'], ['2015/11/22', 28, 'SS'],
        ['2015/11/23', 26, 'SS'], ['2015/11/24', 37, 'SS'], ['2015/11/25', 41, 'SS'],
        ['2015/11/26', 46, 'SS'], ['2015/11/27', 47, 'SS'], ['2015/11/28', 41, 'SS'],
        ['2015/11/08', 10, 'QG'], ['2015/11/09', 15, 'QG'], ['2015/11/10', 35, 'QG'],
        ['2015/11/11', 38, 'QG'], ['2015/11/12', 22, 'QG'], ['2015/11/13', 16, 'QG'],
        ['2015/11/14', 7, 'QG'], ['2015/11/15', 2, 'QG'], ['2015/11/16', 17, 'QG'],
        ['2015/11/17', 33, 'QG'], ['2015/11/18', 40, 'QG'], ['2015/11/19', 32, 'QG'],
        ['2015/11/20', 26, 'QG'], ['2015/11/21', 35, 'QG'], ['2015/11/22', 40, 'QG'],
        ['2015/11/23', 32, 'QG'], ['2015/11/24', 26, 'QG'], ['2015/11/25', 22, 'QG'],
        ['2015/11/26', 16, 'QG'], ['2015/11/27', 22, 'QG'], ['2015/11/28', 10, 'QG'],
        ['2015/11/08', 10, 'SY'], ['2015/11/09', 15, 'SY'], ['2015/11/10', 35, 'SY'],
        ['2015/11/11', 38, 'SY'], ['2015/11/12', 22, 'SY'], ['2015/11/13', 16, 'SY'],
        ['2015/11/14', 7, 'SY'], ['2015/11/15', 2, 'SY'], ['2015/11/16', 17, 'SY'],
        ['2015/11/17', 33, 'SY'], ['2015/11/18', 40, 'SY'], ['2015/11/19', 32, 'SY'],
        ['2015/11/20', 26, 'SY'], ['2015/11/21', 35, 'SY'], ['2015/11/22', 4, 'SY'],
        ['2015/11/23', 32, 'SY'], ['2015/11/24', 26, 'SY'], ['2015/11/25', 22, 'SY'],
        ['2015/11/26', 16, 'SY'], ['2015/11/27', 22, 'SY'], ['2015/11/28', 10, 'SY'],
        ['2015/11/08', 10, 'DD'], ['2015/11/09', 15, 'DD'], ['2015/11/10', 35, 'DD'],
        ['2015/11/11', 38, 'DD'], ['2015/11/12', 22, 'DD'], ['2015/11/13', 16, 'DD'],
        ['2015/11/14', 7, 'DD'], ['2015/11/15', 2, 'DD'], ['2015/11/16', 17, 'DD'],
        ['2015/11/17', 33, 'DD'], ['2015/11/18', 4, 'DD'], ['2015/11/19', 32, 'DD'],
        ['2015/11/20', 26, 'DD'], ['2015/11/21', 35, 'DD'], ['2015/11/22', 40, 'DD'],
        ['2015/11/23', 32, 'DD'], ['2015/11/24', 26, 'DD'], ['2015/11/25', 22, 'DD'],
        ['2015/11/26', 16, 'DD'], ['2015/11/27', 22, 'DD'], ['2015/11/28', 10, 'DD']
      ],
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
        [
          1485878400000,
          260
        ],
        [
          1486137600000,
          200
        ],
        [
          1486569600000,
          279
        ],
        [
          1486915200000,
          847
        ],
        [
          1487347200000,
          241
        ],
        [
          1487779200000,
          411
        ],
        [
          1488124800000,
          985
        ]
      ]
    }
  ],
  "menu6": [
    {
      title: '访问来源',
      description: '单位/人',
      type: 5,
      style: 0,
      colors: ['#19D672', '#FD517D', '#76A5D9'],
      series: [
        {
          name: '一般量级统计',
          data: [
            { value: 60, name: 'Mon', max: 100 },
          ]
        }
      ],
      treeData: null,
      sunburstData: null,
      scatterData: null,
      riverData: null
    },
    {
      title: '访问来源',
      description: '单位/人',
      type: 7,
      style: 0,
      colors: ['#19D672', '#FD517D', '#76A5D9'],
      series: [],
      treeData: null,
      sunburstData: {
        name: 'root',
        children: [{
          name: 'Grandpa',
          children: [{
            name: 'Uncle Leo',
            value: 15,
            children: [{
              name: 'Cousin Jack',
              value: 2
            }, {
              name: 'Cousin Mary',
              value: 5,
              children: [{
                name: 'Jackson',
                value: 2
              }]
            }, {
              name: 'Cousin Ben',
              value: 4
            }]
          }, {
            name: 'Father',
            value: 10,
            children: [{
              name: 'Me',
              value: 5
            }, {
              name: 'Brother Peter',
              value: 1
            }]
          }]
        }, {
          name: 'Nancy',
          children: [{
            name: 'Uncle Nike',
            children: [{
              name: 'Cousin Betty',
              value: 1
            }, {
              name: 'Cousin Jenny',
              value: 2
            }]
          }]
        }]
      },
      scatterData: null,
      riverData: null
    },
    {
      title: '访问来源',
      description: '单位/人',
      type: 6,
      style: 0,
      colors: ['#19D672', '#FD517D', '#76A5D9'],
      series: [],
      sunburstData: null,
      treeData: treeData,
      scatterData: null,
      riverData: null
    },
    {
      title: '访问来源',
      description: '单位/人',
      type: 9,
      style: 0,
      colors: ['#19D672', '#FD517D', '#76A5D9'],
      series: [],
      sunburstData: null,
      treeData: null,
      scatterData: null,
      riverData: riverData.data
    },
  ]
}


const output = {
  getMenu: () => {
    return menus
  },
  getChartsById: (data) => {
    let { body } = data
    let { id } = JSON.parse(body)
    return charts[id] || []
  },
}


Mock.mock(/\/api\/getpages/, 'get', output.getMenu)
Mock.mock(/\/api\/getcharts/, 'post', output.getChartsById)


export default Mock
