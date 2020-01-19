export default {
  bind: function (el, binding, vnode) {
    let classes = binding.value
    el.classList.add('tags')
    if (['normal', 'medium', 'large'].includes((classes || {}).size)) {
      el.classList.add(`are-${classes.size}`)
    }
    if ((classes || {}).addons) {
      el.classList.add('has-addons')
    }
  },
  unbind: function (el) {
    el.classList.remove('tags')
    el.classList.remove('has-addons')
    el.classList.remove('are-normal')
    el.classList.remove('are-medium')
    el.classList.remove('are-large')
  }
}
