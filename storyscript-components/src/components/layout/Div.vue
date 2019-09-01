<template>
  <div
    :class="['column', {[`is-${size}`]: size}, ...getPadding]"
  >
    <div :class="getBackground">
      <slot />
    </div>
  </div>
</template>

<script>
import Background from '@/mixins/Background'
import Padding from '@/mixins/Padding'

export default {
  name: 'SDiv',
  mixins: [Background, Padding],
  props: {
    size: { type: String, default: undefined }
  }
}
</script>
