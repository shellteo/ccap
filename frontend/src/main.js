import Vue from 'vue'
import './plugins/axios'
import './plugins/element'
import App from './App.vue'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'
import util from './util/utils'
import apis from './apis/api'
//import VeLine from 'v-charts/lib/line.common'

//Vue.component('VeLine', VeLine);

Vue.use(Vant)
Vue.config.productionTip = false

Vue.prototype.utils = util;
Vue.prototype.apis = apis;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
