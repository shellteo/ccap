<template>
  <div :class="['media', {'is-media-centered': centered}]">
    <div
      v-if="$slots.left"
      class="media-left"
    >
      <slot name="left" />
    </div>
    <div
      v-if="$slots.default"
      class="media-content"
    >
      <slot />
    </div>
    <div
      v-if="$slots.right"
      class="media-right"
    >
      <slot name="right" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SMedia',
  props: {
    centered: { type: Boolean, default: false }
  }
}
</script>

<docs>
## Playground

```jsx
  <s-layout background="light" full>
    <s-container>
      <s-div size="full">
        <s-media padding="none">
          <template slot="left">left</template>
          <template>content</template>
          <template slot="right">right</template>
        </s-media>
      </s-div>
      <s-div v-for="i in 12" background="dark">
        a
      </s-div>
    </s-container>
  </s-layout>
```
</docs>
