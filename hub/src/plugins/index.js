import {
  createProvider
} from '@/plugins/vue-apollo'
import Raven from '@/plugins/sentry'
import '@/plugins/components'
import '@/plugins/filters'
import '@/plugins/prism'
import '@/plugins/chart'
// import '@/plugins/scrollspy'
import '@/plugins/scrollbar'
import '@/plugins/markdown'

export {
  createProvider,
  Raven
}
