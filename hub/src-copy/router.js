import Vue from 'vue'
import Router from 'vue-router'
// import Index from '@/views/Index'
import ServiceIndex from '@/views/Service/Index'
import CoinIndex from '@/views/Coin/Index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    //   path: '/',
    //   name: 'home',
    //   component: Index
    // },
    // {
    path: '/',
    name: 'services',
    component: () => import('@/views/Services2'),
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
    path: '/document',
    name: 'document',
    meta: {
      light: true,
      theme: 'light'
    },
    component: () => import('@/views/Document')
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
    path: '/functions',
    name: 'functions',
    component: () => import('@/views/PageNotFound')
  },
  {
    path: '/apps',
    name: 'apps',
    component: () => import('@/views/PageNotFound')
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
    path: '/r/:alias/:repo?',
    alias: '/service/:alias:repo?',
    component: ServiceIndex,
    props: function (route) {
      return {
        // add the alias only if the route is /service/:alias
        alias: route.path.includes('/service/') ? route.params.alias + route.params.repo : undefined,
        // otherwise, add the owner/repo
        owner: !route.path.includes('/service/') ? route.params.alias : undefined,
        repo: !route.path.includes('/service/') ? route.params.repo : undefined
      }
    },
    children: [{
      path: '',
      name: 'service',
      meta: {
        light: true,
        theme: 'light'
      },
      component: () => import('@/views/Service/Home')
    }, {
      path: 'guide',
      name: 'guide',
      meta: {
        light: true,
        theme: 'light'
      },
      component: () => import('@/views/Service/Guide')
    }, {
      path: 'actions',
      name: 'actions',
      meta: {
        light: true,
        theme: 'light'
      },
      component: () => import('@/views/Service/Actions')
    }]
  },
    // {
    //   path: '/r/:owner',
    //   component: () => import('@/views/Organization'),
    //   name: 'organization',
    //   meta: {
    //     hasSearch: true
    //   },
    //   props: function (route) {
    //     return { owner: route.params.owner }
    //   }
    // },
  {
    path: '/old/dashboard',
    name: 'old-faq',
    component: () => import('@/views/old/Faq')
  },
  {
    path: '/sync/',
    component: () => import('@/views/SubmitService'),
    children: [{
      path: '',
      name: 'submit-service-login',
      meta: {
        light: true,
        theme: 'light'
      },
      component: () => import('@/views/SubmitService/Login')
    }, {
      path: 'submit/:installationName?',
      name: 'submit-service-choose',
      props: (route) => ({
        installationName: route.params.installationName,
        page: route.query.page
      }),
      meta: {
        light: true,
        theme: 'light'
      },
      component: () => import('@/views/SubmitService/Choose')
    }, {
      path: 'submit/:installationName/:repo',
      name: 'submit-service-infos',
      props: (route) => ({
        installationName: route.params.installationName,
        repo: route.params.repo
      }),
      meta: {
        light: true,
        theme: 'light'
      },
      component: () => import('@/views/SubmitService/Infos')
    }]
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
