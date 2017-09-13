import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
      path:'/',
      name:'home',
      component:require('@/pages/Index')
    },{
      path:'/history',
      name:'history',
      component:require('@/pages/History')
    },{
      path: '/landing',
      name: 'landing-page',
      component: require('@/components/LandingPage')
    },{
      path: '*',
      redirect: '/'
    }]
})
