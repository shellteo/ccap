<template>
  <section :class="[...getBackground, ...getMargin, {hero}]">
    <slot name="absolute" />
    <div
      v-if="$slots.default && !hero"
      :class="['container', {'is-fluid': full}, ...getContainerClasses(!narrow), ...getPadding, ...isOutside]"
    >
      <slot />
    </div>
    <template v-if="hero">
      <div class="hero-head">
        <slot name="head" />
      </div>
      <div class="hero-body">
        <div class="container">
          <s-container centered-vh>
            <slot name="body" />
          </s-container>
        </div>
      </div>
      <div class="hero-footer">
        <slot name="footer" />
      </div>
    </template>
  </section>
</template>

<script>
import Background from '@/mixins/Background'
import Padding from '@/mixins/Padding'

export default {
  name: 'SLayout',
  mixins: [Background, Padding],
  provide () {
    return {
      classes: this.getContainerClasses(this.narrow)
    }
  },
  props: {
    foreground: { type: String, default: undefined },
    rounded: { type: Boolean, default: false },
    shadow: { type: Boolean, default: false },
    full: { type: Boolean, default: false },
    margin: { type: [Array, String], default: 'none' },
    outside: { type: Boolean, default: false },
    narrow: { type: Boolean, default: false },
    hero: { type: Boolean, default: false }
  },
  computed: {
    isOutside: function () {
      const top = typeof this.margin === typeof '' ? this.margin : this.margin[0]
      return this.outside ? [`has-top-outside-${top}`] : []
    },
    getContainerClasses: function () {
      return (slot) => {
        return slot ? [`${this.foreground ? 'has-background-' + this.foreground : ''} ${this.rounded ? 'is-rounded' : ''} ${this.shadow ? 'has-shadow' : ''}`] : []
      }
    },
    getMargin: function () {
      if (typeof this.margin === typeof '') {
        return [`has-padding-${this.margin}`]
      } else if (this.margin.length === 1) {
        return [`has-padding-${this.margin[0]}`]
      }
      return [`has-padding-top-${this.margin[0]}`, `has-padding-bottom-${this.margin[1]}`]
    }
  }
}
</script>

<docs>
```jsx
<s-layout background="light" foreground="white" rounded shadow padding="large" margin="max" outside>
  <s-container centered-vh>
    <s-div size="one-quarter" background="light">
      hello
    </s-div>
    <s-div size="half">
      <s-container>
        <s-div size="1" v-for="i in 6" :key="`list-div-1-${i}`" background="black">
          <p>d</p>
        </s-div>
        <s-div background="dark">a</s-div>
      </s-container>
    </s-div>
    <s-div v-for="i in 15" size="1" :key="`list-div-2-${i}`" background="dark">
      hello
    </s-div>
  </s-container>
</s-layout>
```
</docs>
