<template>
  <div :class="['home-description-template', 'columns', 'is-vcentered', {'is-reversed': idx % 2 === 0}]">
    <div :class="['column', 'is-6', {'is-offset-2': idx % 2 === 0}]">
      <div class="image">
        <img
          :alt="name"
          :src="picture"
          :srcset="`${picture2x} 2x, ${picture3x} 3x`"
        >
      </div>
    </div>
    <div :class="['column', 'is-4', {'is-offset-2': idx % 2 === 1}]">
      <div class="pin">
        <pin :idx="idx" />
      </div>
      <h3 class="is-size-3 has-text-gray-2 hdt-title has-text-weight-semibold">
        {{ name }}
      </h3>
      <p class="is-size-6 content has-text-gray-3">
        <slot name="content" />
        <template v-if="!$slots.content">{{ content }}</template>
      </p>
      <s-button
        v-if="link"
        :url="link.href"
        :to="link.name ? link : undefined"
        state="secondary"
        arrow
        class="hdt-button"
        size="small"
      >
        View More
      </s-button>
    </div>
  </div>
</template>

<script>
import Pin from '@/components/svgs/Pin'

export default {
  name: 'HomeDescriptionTemplate',
  components: { Pin },
  props: {
    idx: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: false,
      default: ''
    },
    link: {
      type: Object,
      required: false,
      default: undefined
    },
    picture: {
      type: String,
      required: false,
      default: undefined
    },
    picture2x: {
      type: String,
      required: false,
      default: undefined
    },
    picture3x: {
      type: String,
      required: false,
      default: undefined
    }
  }
}
</script>

<style lang="scss">
.home-description-template {
  margin: 5rem 0 !important;
  &:first-child {
    margin-top: 0 !important;
  }

  .pin {
    width: 3.75rem;
    height: 3.75rem;
  }

  .hdt-button {
    margin-top: 0.5rem;
    span {
      margin-right: 3rem;
    }
  }

  .hdt-title {
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }
}
</style>
