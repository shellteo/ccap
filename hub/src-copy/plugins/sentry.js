import Vue from 'vue'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

Raven.config(process.env.SENTRY_DSN, { environment: process.env.NODE_ENV }).addPlugin(RavenVue, Vue).install()

export default Raven
