<script>
export default {
  name: 'BackgroundMixin',
  props: {
    background: { type: String, default: undefined }
  },
  computed: {
    getBackground: function () {
      return [this.background ? `has-background-${this.background}` : '']
    }
  }
}
</script>
