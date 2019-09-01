<template>
  <svg
    class="card-svg"
    width="100%"
    height="48px"
    viewBox="0 0 1344 65"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <path
      v-if="position"
      :d="value.d"
      :transform="value.transform"
      fill="#FAFAFC"
      fill-rule="nonzero"
    />
  </svg>
</template>

<script>
export default {
  name: 'CardSvg',
  props: {
    position: {
      type: String,
      required: true,
      validator: v => ['top', 'bottom'].includes(v)
    }
  },
  data: () => ({
    values: [{
      name: 'top',
      d: 'M9.104 29.814C230.07 9.938 451.034 0 672 0c220.965 0 441.93 9.938 662.896 29.814a10 10 0 0 1 9.104 9.96v24.935H0V39.774a10 10 0 0 1 9.104-9.96z'
    }, {
      name: 'bottom',
      d: 'M9.104 741.814C230.07 721.938 451.034 712 672 712c220.965 0 441.93 9.938 662.896 29.814a10 10 0 0 1 9.104 9.96v24.935H0v-24.935a10 10 0 0 1 9.104-9.96z',
      transform: 'matrix(1 0 0 -1 0 776.71)'
    }]
  }),
  computed: {
    value: function () {
      return this.values.filter(v => v.name === this.position)[0]
    }
  }
}
</script>
