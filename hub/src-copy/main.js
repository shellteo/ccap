import Vue from 'vue'
import Hub from '@/Hub'
import router from '@/router'
import store from '@/store'
import './plugins/axios'
import './plugins/material'
import './plugins/notification'
import apis from './apis/api'
import './icons'
import {
  Raven,
  createProvider
} from '@/plugins'

import moment from 'moment'

Vue.config.productionTip = false
Vue.prototype.apis = apis

moment.locale('zh-CN')

Raven.context(() => {
  new Vue({
    router,
    store,
    apolloProvider: createProvider({
      connectToDevTools: process.env.NODE_ENV === 'development'
    }),
    render: h => h(Hub)
  }).$mount('#hub')
})
