import Vue from 'vue'
import Router from 'vue-router'
//组件
import Container from '@/containers/Container'
import Page from '@/containers/Page'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'container',
      component: Container,
      children:[
        {
          path: '/:sysid',
          name: 'sysid',
          component: Container,
          children: [{
            path: 'page/:id',
            name: 'id',
            component: Container
          }]
        },
      ]
    }
  ]
})
