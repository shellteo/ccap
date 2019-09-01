<template>
  <component
    :is="getTag"
    :class="[`is-size-${getSize}`, `has-text-${getColor}`, {'has-text-uppercase': highlight && !preserveCase }, {[`has-text-${alignment}`]: alignment}, {'has-text-weight-semibold': semiBold && !bold}, {'has-text-weight-bold': highlight || bold}, {[`has-letter-spacing-${getLetterSpacing}`]: highlight || letterSpacing}, ...getPadding]"
  >
    <slot />
  </component>
</template>

<script>
import Padding from '@/mixins/Padding'

export default {
  name: 'SText',
  mixins: [Padding],
  props: {
    color: {
      type: String,
      default: undefined
    },
    head: {
      type: String,
      default: undefined,
      validator: v => ['1', '2', '3'].includes(v)
    },
    p: {
      type: String,
      default: '1',
      validator: v => ['0', '1', '2'].includes(v)
    },
    preserveCase: {
      type: Boolean,
      default: false
    },
    bold: {
      type: Boolean,
      default: false
    },
    semiBold: {
      type: Boolean,
      default: false
    },
    li: {
      type: Boolean,
      default: false
    },
    highlight: {
      type: Boolean,
      default: false
    },
    letterSpacing: {
      type: String,
      default: undefined,
      validator: v => ['medium', 'large'].includes(v)
    },
    small: {
      type: Boolean,
      default: false
    },
    span: {
      type: Boolean,
      default: false
    },
    alignment: {
      type: String,
      default: undefined,
      validator: v => ['left', 'centered', 'right'].includes(v)
    }
  },
  computed: {
    getSize: function () {
      return this.small ? '8' : this.highlight ? '7' : this.head ? this.head : this.p === '0' ? '4' : this.p === '1' ? '5' : '6'
    },
    getColor: function () {
      return this.color ? this.color : this.highlight ? 'gray-4' : this.head ? 'dark-blue' : this.p === '2' ? 'dark' : 'gray-2'
    },
    getTag: function () {
      return this.span ? 'span' : this.li ? 'li' : this.head ? `h${this.head}` : 'p'
    },
    getLetterSpacing: function () {
      return this.letterSpacing ? this.letterSpacing : this.highlight ? 'medium' : undefined
    }
  }
}
</script>
