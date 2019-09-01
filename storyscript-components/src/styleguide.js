import Vue from 'vue'
import directives from '@/directives'
import components from '@/components'
import Icons from '@/components/elements/icons'

for (let item in directives) {
  Vue.directive(item, directives[item])
}

for (let item in components) {
  Vue.component(item, components[item])
}

Vue.prototype.$icons = Object.keys(Icons).reduce((arr, i) => [...arr, i.slice(5, i.length).replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase()], [])

export default {}
