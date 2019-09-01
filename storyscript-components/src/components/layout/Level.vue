<template>
  <div class="level">
    <div
      v-if="$slots.left"
      class="level-left"
    >
      <div class="level-item">
        <slot name="left" />
      </div>
    </div>
    <div
      v-if="$slots.default"
      class="level-item"
    >
      <slot />
    </div>
    <div
      v-if="$slots.right"
      class="level-right"
    >
      <div class="level-item">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SLevel'
}
</script>

<docs>
## Playground

```jsx
  <s-layout background="light" full>
    <s-container>
      <s-div size="full">
        <s-level padding="none">
          <template slot="left">left</template>
          <template>center</template>
          <template slot="right">right</template>
        </s-level>
      </s-div>
      <s-div v-for="i in 12" background="dark">
        a
      </s-div>
    </s-container>
  </s-layout>
```
</docs>
