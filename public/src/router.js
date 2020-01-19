import Vue from 'vue'
import Router from 'vue-router'
import CoinIndex from '@/views/Coin/Index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'services',
    component: () => import('@/views/Services'),
    props: function (route) {
      return {
        search: route.query.search,
        category: route.query.c
      }
    }
  },
  {
    path: '/user',
    name: 'user',
    meta: {
      light: true,
      theme: 'light'
    },
    component: () => import('@/views/User')
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      light: true,
      theme: 'light'
    },
    component: () => import('@/views/About')
  },
  {
    path: '/submit',
    name: 'submit',
    meta: {
      light: true,
      theme: 'light'
    },
    component: () => import('@/views/SubmitCoin')
  },
  {
    path: '/coin/:symbol',
    name: 'coin',
    meta: {
      light: true,
      theme: 'light'
    },
    component: CoinIndex
  },
  {
    path: '*',
    name: 'not-found',
    component: () => import('@/views/PageNotFound')
  }
  ],
  scrollBehavior: function (to, from, savedPosition) {
    if (to.hash) {
      return ({
        selector: to.hash
      })
    } else if (to.name === from.name || savedPosition) {
      return (savedPosition)
    } else {
      return ({
        x: 0,
        y: 0
      })
    }
  }
})
