import Vue from 'vue'
import emoji from 'node-emoji'

Vue.filter('emoji', value => emoji.emojify(value, () => ''))

Vue.filter('from-topic', (value) => {
  const values = value.split('-')
  const capitalized = values.map(v => v.charAt(0).toUpperCase() + v.slice(1))
  return capitalized.join(' ')
})

Vue.filter('capitalize', (value) => {
  if (value) {
    const str = value.toString()
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
  return ''
})
