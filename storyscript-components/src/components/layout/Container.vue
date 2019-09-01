<template>
  <div :class="['columns', ...getClasses, {'is-multiline': !row}, {'is-vcentered': centeredV || centeredVh}, {'is-centered': centeredH || centeredVh}, ...getPadding]">
    <slot />
  </div>
</template>

<script>
import Padding from '@/mixins/Padding'

export default {
  name: 'SContainer',
  mixins: [Padding],
  inject: {
    classes: {
      type: Array,
      default: () => []
    }
  },
  props: {
    row: { type: Boolean, default: false },
    centeredV: { type: Boolean, default: false },
    centeredH: { type: Boolean, default: false },
    centeredVh: { type: Boolean, default: false },
    clean: { type: Boolean, default: false }
  },
  computed: {
    getClasses: function () {
      return this.clean ? [] : this.classes
    }
  }
}
</script>
