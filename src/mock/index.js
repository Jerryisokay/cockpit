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

const charts = {
  'homepage': [
    {
      title: '访问来源',
      description: '单位/人',
      type: 0,
      style: 0,
      colors: ['#19D672', '#FD517D', '#76A5D9'],
      series: [
        {
          name: '答题成功率',
          data: [
            {
              value: 60,
              name: '答题成功率1',
              max: 100
            },
            {
              value: 70,
              name: '答题成功率2',
              max: 100
            },
            {
              value: 50,
              name: '答题成功率3',
              max: 100
            },
            {
              value: 90,
              name: '答题成功率4',
              max: 100
            }
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
      type: 0,
      style: 1,
      colors: ['#19D672', '#FD517D', '#76A5D9'],
      series: [
        {
          name: '一般量级统计',
          data: [
            { value: 60, name: '一般量级统计', max: 100 }
          ]
        }, {
          name: '严重量级统计',
          data: [
            { value: 60, name: '严重量级统计', max: 100 }
          ],
        }, {
          name: '高危量级统计',
          data: [
            { value: 50, name: '高危量级统计', max: 100 }
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
      type: 1,
      style: 1,
      colors: ['#19D672', '#FD517D', '#76A5D9'],
      series: [
        {
          name: '一般量级统计',
          data: [
            { value: 60, name: '邮件营销', max: 100 },
            { value: 30, name: '联盟广告', max: 100 },
            { value: 10, name: '视频广告', max: 100 },
            { value: 75, name: '搜索引擎', max: 100 },
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
      type: 2,
      style: 0,
      colors: ['#19D672', '#FD517D', '#76A5D9'],
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
      riverData: null
    }
  ],
  "menu1": [
    {
      title: '访问来源',
      description: '单位/人',
      type: 3,
      style: 0,
      colors: ['#19D672', '#FD517D', '#76A5D9'],
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
      riverData: null
    },
    {
      title: '访问来源',
      description: '单位/人',
      type: 8,
      style: 0,
      colors: ['#19D672', '#FD517D', '#76A5D9'],
      series: [],
      treeData: null,
      sunburstData: null,
      scatterData: scoreData.data,
      riverData: null
    },
    {
      title: '访问来源',
      description: '单位/人',
      type: 0,
      style: 1,
      colors: ['#19D672', '#FD517D', '#76A5D9'],
      series: [
        {
          name: '一般量级统计',
          data: [
            { value: 33, name: '一般量级统计', max: 100 }
          ]
        }, {
          name: '严重量级统计',
          data: [
            { value: 22, name: '严重量级统计', max: 100 }
          ],
        }, {
          name: '高危量级统计',
          data: [
            { value: 44, name: '高危量级统计', max: 100 }
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
      type: 4,
      style: 0,
      colors: ['#19D672', '#FD517D', '#76A5D9'],
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
      riverData: null
    }
  ],
  "menu2": [
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
        children:[{
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
