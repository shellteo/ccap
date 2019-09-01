<template>
  <div
    :class="{ 'service-choose-template': true, disabled: disabled }"
    :data-tooltip="disabled ? 'You are not an admin of this repository' : undefined"
    @click="select"
  >
    <s-media
      v-if="!isLoading"
      centered
    >
      <template slot="left">
        <div
          :style="{ backgroundColor: color }"
          class="service-image"
        >{{ firstLetterCapitalized }}</div>
      </template>
      <h3 class="is-size-6 has-text-weight-semibold has-text-dark">{{ title }}</h3>
      <p class="is-size-8 has-line-height-7 has-text-gray-3">{{ description | emoji }}</p>
      <template
        v-if="!disabled"
        slot="right"
      >
        <s-button link>
          <s-icon icon="arrow" />
        </s-button>
      </template>
    </s-media>
    <s-media v-else-if="isLoading">
      <template slot="left">
        <div class="loading-shimmer service-image" />
      </template>
      <div class="loading-shimmer title" />
      <div class="loading-shimmer description" />
    </s-media>
  </div>
</template>

<script scoped>
import md5 from 'crypto-js/md5'

export default {
  props: {
    id: {
      type: [String, Number],
      required: true
    },
    title: {
      type: String,
      default: undefined
    },
    description: {
      type: String,
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: undefined
    }
  },
  computed: {
    color: function () {
      const randomNumFromTitle = md5(this.title).words[0]
      const numBetweenZeroAndOne = Math.abs(randomNumFromTitle) / 2147483647
      const hue = numBetweenZeroAndOne * 360
      return `hsla(${hue}, 80%, 50%, 1)`
    },
    firstLetterCapitalized: function () {
      return this.title && this.title.slice(0, 1).toUpperCase()
    },
    isLoading: function () {
      return !this.title
    }
  },
  methods: {
    select: function () {
      if (!this.disabled) {
        this.$emit('select', this.id)
      }
    }
  }
}
</script>

<style lang="scss">
@import "~@storyscript/vue/src/scss/variables/index";

.service-choose-template {
  // border: 1px solid nth($grays, 4);
  box-shadow: rgba(0, 0, 0, 0.5) 0px 2px 10px -5px;
  border-radius: 0.625rem;
  cursor: pointer;
  padding: 1rem;
  transition: box-shadow 0.2s ease-in-out;
  &:not(.disabled):hover {
    box-shadow: rgba(0, 0, 0, 0.5) 0px 4px 15px -7px;
    // background-color: rgba(nth($grays, 4), 0.15);
  }
  &.disabled {
    cursor: not-allowed;
    background-color: $light;
    box-shadow: none;
  }

  .media {
    position: relative;
  }

  .media-right {
    &:after {
      content: "";
      display: block;
      position: absolute;
      width: 1px;
      background-color: #f2f3f9;
      right: calc(1rem + 20px);
      top: -1rem;
      bottom: -1rem;
    }
  }
}
.service-image {
  min-width: 4.5rem;
  height: 4.5rem;
  border-radius: 0.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: bold;
  color: white;
}

.loading-shimmer {
  margin-bottom: 0.8em;

  &.service-image {
    border-color: transparent;
  }

  &.title {
    width: 200px;
    height: 16px;
  }

  &.description {
    width: 250px;
    height: 11px;
  }
}
</style>
