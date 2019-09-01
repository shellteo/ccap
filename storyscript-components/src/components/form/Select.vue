<template>
  <div
    v-click-outside="close"
    class="field select-box"
  >
    <div
      :class="['control', 'has-icons-right', {'has-icons-left': avatar}]"
      @click="openOrClose"
    >
      <span
        v-if="avatar"
        class="icon is-left"
      >
        <img
          :src="avatar"
          class="avatar"
          alt="avatar"
        >
      </span>
      <input
        :class="['input', {[`is-${size}`]: size !== 'normal'}, {'is-rounded': rounded}, {open}, {'is-loading': loading}, {'is-readonly': readonly}]"
        disabled="true"
        type="text"
        :value="value"
      >
      <span :class="['icon', 'is-right']">
        <i
          v-if="!foldIcon"
          :class="`mdi mdi-${open ? 'chevron-up' : 'chevron-down'}`"
        />
        <i
          v-else
          :class="`mdi mdi-${open ? 'unfold-less-horizontal' : 'unfold-more-horizontal'}`"
        />
      </span>
    </div>
    <div
      v-if="open && $slots.default"
      :class="['selectable', {absolute}]"
    >
      <ul class="selectable-items">
        <slot />
      </ul>
    </div>
  </div>
</template>

<script>
import ClickOutside from '@/directives/ClickOutside'

export default {
  name: 'SSelect',
  directives: { ClickOutside },
  props: {
    readonly: { type: Boolean, default: false },
    absolute: { type: Boolean, default: false },
    foldIcon: { type: Boolean, default: false },
    value: { type: String, default: '' },
    avatar: { type: String, default: undefined },
    rounded: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    isOpen: { type: Boolean, default: false },
    size: {
      type: String,
      default: 'normal',
      validator: v => ['small', 'normal', 'medium', 'large'].includes(v)
    }
  },
  data: () => ({ invalidate: true, open: false }),
  watch: {
    isOpen: function () {
      this.invalidate = true
      this.open = this.isOpen
    }
  },
  mounted: function () {
    this.open = this.isOpen
  },
  methods: {
    close: function () {
      if (this.open && !this.invalidate) {
        this.open = false
        this.$emit('close')
      }
      this.invalidate = false
    },
    openOrClose: function () {
      if (!this.readonly) {
        this.open = !this.open
        this.$emit(this.open ? 'open' : 'close')
      }
    }
  }
}
</script>

<docs>
### Playground

```
new Vue({
  template: `<section>
              <section>
                <s-select
                  value="Username"
                  avatar="//source.unsplash.com/64x64/?profile"
                />
              </section>
              <section>
                <s-select
                  fold-icon
                  value="Quick Start"
                  :is-open.sync="isQSOpen"
                />
              </section>
              <section class="has-padding-top-large">
                <s-select value="Quick Start" />
                <s-select @open="isQSOpen = true" @close="isQSOpen = false" value="Storyscript" />
                <s-select value="Blabla">
                  <li>Hello</li>
                  <li>Salut</li>
                </s-select>
              </section>
            </section>`,
  data: () => ({ input: 'value', isQSOpen: false }),
  watch: { input: function () { console.log('value :', this.input) } }
})
```
</docs>
