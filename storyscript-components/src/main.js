import components from '@/components'
import directives from '@/directives'
import utils from '@/utils'
import '@/scss/storyscript.scss'

const plugin = {
  install (Vue, options) {
    if (Vue._storyscript_vue_installed) return
    Vue._storyscript_vue_installed = true

    // install componentscomponents
    for (let item in components) {
      if (!options || !options.components || options.components.includes(item)) {
        Vue.component(item, components[item])
      }
    }

    // install directives
    for (let item in directives) {
      if (!options || !options.directives || options.directives.includes(item)) {
        Vue.directive(item, directives[item])
      }
    }

    // install utils
    for (let item in utils) {
      if (!options || !options.utils || options.utils.includes(item)) {
        Vue.use(utils[item])
      }
    }
  }
}

export default plugin
