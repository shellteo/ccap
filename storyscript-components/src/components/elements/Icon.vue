<template>
  <component
    :is="`s-icon-${icon}`"
    v-if="icon"
    v-bind="props"
  />
</template>

<script>
// All icons must be named SIconName
// names is an array of the names, previously removed from SIcon and kebab-cased (e.g. SIconMyIconTest => my-icon-test)
import Icons from './icons'
const names = Object.keys(Icons).reduce((arr, i) => [...arr, i.slice(5, i.length).replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase()], [])

export default {
  name: 'SIcon',
  components: { ...Icons },
  props: {
    icon: {
      type: String,
      default: undefined,
      required: true,
      validator: v => names.includes(v)
    },
    props: {
      type: Object,
      default: undefined,
      required: false
    }
  }
}
</script>

<docs>
### Playground

```vue
new Vue({
  template: `<s-container centered-vh>
    <s-div
      v-for="icon of names"
      :key="'icon-list-' + _uid + '-' + icon">
      <s-text small>{{ icon }}</s-text>
      <s-icon
        :title="icon"
        :icon="icon" />
    </s-div>
  </s-container>`,
  computed: {
    names: function () {
      return this.$icons
    }
  }
});
```
</docs>
