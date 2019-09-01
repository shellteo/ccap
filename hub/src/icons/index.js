// https://github.com/PanJiaChen/vue-element-admin/blob/master/src/icons/index.js
import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon/index' // svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)

// 引入 name
/* <svg-icon icon-class="back" /> */
