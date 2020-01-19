import 'prismjs'
import 'prismjs/components/prism-coffeescript'
import 'prismjs/plugins/line-numbers/prism-line-numbers'
import 'prismjs/themes/prism-okaidia.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import Vue from 'vue'
import VPrism from 'vue-prism-component'

/* global Prism */
Prism.languages.storyscript = Prism.languages.coffeescript

Vue.component('prism', VPrism)
