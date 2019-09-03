import Vue from 'vue'
import axios from 'axios'
import { getCookie } from '@/utils'
import { Loading } from 'element-ui';
import 'element-ui/lib/theme-chalk/loading.css'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  baseURL: process.env.VUE_APP_API
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
}

// this.$axios.request({loading:true})
// get this.$axios.get(url, { params: {email}, noLoading: true })
// post this.$axios.post(url, { email }, { noLoading: true })
const _axios = axios.create(config)
let loadingInstance = null;
_axios.interceptors.request.use(
  function (config) {
    console.log(config);
    if (config.loading) loadingInstance = Loading.service({
      background: 'rgba(0, 0, 0, 0.5)'
    });
    if (getCookie('access_token')) {
      config.headers.authorization = 'Bearer ' + getCookie('access_token')
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    if(loadingInstance) loadingInstance.close();
    // Do something with response data
    return response.data
  },
  function (error) {
    if(loadingInstance) loadingInstance.close();
    // Do something with response error
    return Promise.reject(error)
  }
)

export {
  _axios
}

Plugin.install = function (Vue, options) {
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get () {
        return _axios
      }
    },
    $axios: {
      get () {
        return _axios
      }
    }
  })
}

Vue.use(Plugin)

export default Plugin
