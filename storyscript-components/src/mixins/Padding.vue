<script>
export default {
  name: 'PaddingMixin',
  props: {
    padding: { type: [Array, String], default: 'none' }
  },
  computed: {
    getPadding: function () {
      if (typeof this.padding === typeof '') {
        return [`has-padding-${this.padding}`]
      } else if (this.padding.length === 1) {
        return [`has-padding-${this.padding[0]}`]
      }
      return [
        `has-padding-top-${this.padding[0]}`,
        `has-padding-bottom-${this.padding[1]}`
      ]
    }
  }
}
</script>
