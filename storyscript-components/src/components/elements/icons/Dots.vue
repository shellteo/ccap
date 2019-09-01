<template>
  <svg
    width="7px"
    height="76px"
    viewBox="0 0 7 76"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <g
      stroke="none"
      stroke-width="1"
      fill="none"
      fill-rule="evenodd"
    >
      <g fill-rule="nonzero">
        <path
          d="M3.5,7 L3.5,72.5"
          stroke="#464769"
        />
        <circle
          :fill="stepColor(idx, 0)"
          cx="3.5"
          cy="3.5"
          r="3.5"
        />
        <circle
          :fill="stepColor(idx, 1)"
          cx="3.5"
          cy="26.5"
          r="3.5"
        />
        <circle
          :fill="stepColor(idx, 2)"
          cx="3.5"
          cy="49.5"
          r="3.5"
        />
        <circle
          :fill="stepColor(idx, 3)"
          cx="3.5"
          cy="72.5"
          r="3.5"
        />
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'SIconDots',
  props: {
    idx: {
      type: Number,
      default: 0
    }
  },
  methods: {
    stepColor: (idx, currentIdx) => (idx === currentIdx ? '#03DAC5' : '#464769')
  }
}
</script>
