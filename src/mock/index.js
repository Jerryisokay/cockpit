import Mock from 'mockjs'




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

const charts = {
  'homepage':[
    {
      title: '访问来源',
      description :'单位/人',
      type: 0,
      style: 0,
      colors:['#19D672','#FD517D','#76A5D9'],
      series: [
        {
          name: '答题成功率',
          data: [
            {
              value:60,
              name:'答题成功率1',
              max: 100
            },
            {
              value:70,
              name:'答题成功率2',
              max: 100
            },
            {
              value:50,
              name:'答题成功率3',
              max: 100
            },
            {
              value:90,
              name:'答题成功率4',
              max: 100
            }
          ]
        }
      ],
      treeData: null,
      sunburstData:null,
      scatterData:null,
      riverData:null
    },
    {
      title: '访问来源',
      description :'单位/人',
      type: 0,
      style: 1,
      colors:['#19D672','#FD517D','#76A5D9'],
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
      riverData:null
    },
    {
      title: '访问来源',
      description :'单位/人',
      type: 1,
      style: 1,
      colors:['#19D672','#FD517D','#76A5D9'],
      series: [
        {
          name: '一般量级统计',
          data: [
            {value:60, name:'邮件营销', max:100},
            {value:30, name:'联盟广告', max:100},
            {value:10, name:'视频广告', max:100},
            {value:75, name:'搜索引擎', max:100},
          ]
        }
      ],
      treeData: null,
      sunburstData:null,
      scatterData:null,
      riverData:null
    },
    {
      title: '访问来源',
      description :'单位/人',
      type: 2,
      style: 0,
      colors:['#19D672','#FD517D','#76A5D9'],
      series: [
        {
          name: '一般量级统计',
          data: [
            {value:60, name:'Mon', max:100},
            {value:30, name:'Tue', max:100},
            {value:10, name:'Wed', max:100},
            {value:75, name:'Thu', max:100},
            {value:30, name:'Fri', max:100},
            {value:10, name:'Sat', max:100},
            {value:75, name:'Sun', max:100}
          ]
        },
        {
          name: '一般量级统计1',
          data: [
            {value:30, name:'Mon', max:100},
            {value:10, name:'Tue', max:100},
            {value:10, name:'Wed', max:100},
            {value:65, name:'Thu', max:100},
            {value:20, name:'Fri', max:100},
            {value:10, name:'Sat', max:100},
            {value:55, name:'Sun', max:100},
          ]
        }
      ],
      treeData: null,
      sunburstData:null,
      scatterData:null,
      riverData:null
    },
    {
      title: '访问来源',
      description :'单位/人',
      type: 3,
      style: 0,
      colors:['#19D672','#FD517D','#76A5D9'],
      series: [
        {
          name: '一般量级统计',
          data: [
            {value:60, name:'Mon', max:100},
            {value:30, name:'Tue', max:100},
            {value:10, name:'Wed', max:100},
            {value:75, name:'Thu', max:100},
            {value:30, name:'Fri', max:100},
            {value:10, name:'Sat', max:100},
            {value:75, name:'Sun', max:100}
          ]
        },
        {
          name: '一般量级统计1',
          data: [
            {value:30, name:'Mon', max:100},
            {value:10, name:'Tue', max:100},
            {value:10, name:'Wed', max:100},
            {value:65, name:'Thu', max:100},
            {value:20, name:'Fri', max:100},
            {value:10, name:'Sat', max:100},
            {value:55, name:'Sun', max:100},
          ]
        }
      ],
      treeData: null,
      sunburstData:null,
      scatterData:null,
      riverData:null
    }
  ],
  "menu1":[
    {
      title: '访问来源',
      description :'单位/人',
      type: 3,
      style: 0,
      colors:['#19D672','#FD517D','#76A5D9'],
      series: [
        {
          name: '一般量级统计',
          data: [
            {value:60, name:'Mon', max:100},
            {value:30, name:'Tue', max:100},
            {value:10, name:'Wed', max:100},
            {value:75, name:'Thu', max:100},
            {value:30, name:'Fri', max:100},
            {value:10, name:'Sat', max:100},
            {value:75, name:'Sun', max:100}
          ]
        },
        {
          name: '一般量级统计1',
          data: [
            {value:30, name:'Mon', max:100},
            {value:10, name:'Tue', max:100},
            {value:10, name:'Wed', max:100},
            {value:65, name:'Thu', max:100},
            {value:20, name:'Fri', max:100},
            {value:10, name:'Sat', max:100},
            {value:55, name:'Sun', max:100},
          ]
        }
      ],
      treeData: null,
      sunburstData:null,
      scatterData:null,
      riverData:null
    },
    {
      title: '访问来源',
      description :'单位/人',
      type: 0,
      style: 1,
      colors:['#19D672','#FD517D','#76A5D9'],
      series: [
        {
          name: '一般量级统计',
          data: [
            {value:40, name:'一般量级统计', max:100}
          ]
        },{
          name: '高危量级统计',
          data: [
            {value:30, name:'高危量级统计', max:100}
          ]
        }
      ],
      treeData: null,
      sunburstData:null,
      scatterData:null,
      riverData:null
    },
    {
      title: '访问来源',
      description :'单位/人',
      type: 0,
      style: 1,
      colors:['#19D672','#FD517D','#76A5D9'],
      series: [
        {
          name: '一般量级统计',
          data: [
            {value:33, name:'一般量级统计', max:100}
          ]
        },{
          name: '严重量级统计',
          data: [
            {value:22, name:'严重量级统计', max:100}
          ],
        },{
          name: '高危量级统计',
          data: [
            {value:44, name:'高危量级统计', max:100}
          ]
        }
      ],
      treeData: null,
      sunburstData:null,
      scatterData:null,
      riverData:null
    },
    {
      title: '访问来源',
      description :'单位/人',
      type: 4,
      style: 0,
      colors:['#19D672','#FD517D','#76A5D9'],
      series: [
        {
          name: '一般量级统计',
          data: [
            {value:60, name:'Mon', max:100},
            {value:30, name:'Tue', max:100},
            {value:10, name:'Wed', max:100},
            {value:75, name:'Thu', max:100},
            {value:30, name:'Fri', max:100},
            {value:10, name:'Sat', max:100},
            {value:75, name:'Sun', max:100}
          ]
        },
        {
          name: '一般量级统计1',
          data: [
            {value:30, name:'Mon', max:100},
            {value:10, name:'Tue', max:100},
            {value:10, name:'Wed', max:100},
            {value:65, name:'Thu', max:100},
            {value:20, name:'Fri', max:100},
            {value:10, name:'Sat', max:100},
            {value:55, name:'Sun', max:100},
          ]
        }
      ],
      treeData: null,
      sunburstData:null,
      scatterData:null,
      riverData:null
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
    return charts[id] || []
  },
}


Mock.mock(/\/api\/getpages/, 'get', output.getMenu)
Mock.mock(/\/api\/getcharts/, 'post', output.getChartsById)


export default Mock
