<template>
  <s-layout
    :background="dark ? 'dark' : dark === false ? 'gray-4' : undefined"
    class="has-border-top-gray"
  >
    <s-container>
      <s-div padding="normal">
        <s-level>
          <s-text
            slot="left"
            highlight
            letter-spacing="large"
            small
            class="build-container"
            color="gray-2"
          >
            BUILT WITH
            <s-icon
              icon="heart"
              :props="{ height: '14', width: '16' }"
            />
            IN AMSTERDAM
          </s-text>
          <s-button
            arrow="arrow-up"
            :state="dark ? 'dark' : 'light'"
            size="small"
            @click="scrollTop"
          />
          <s-text
            slot="right"
            highlight
            small
            color="gray-2"
            style="position:relative"
          >
            <span class="has-text-bottom">
              2019. Asyncy, Inc.
            </span>
            <a
              :class="[`has-text-${dark ? 'light' : 'primary'}`]"
              href="//asyncy.click/slack"
              title="Storyscript Slack"
            >
              <i class="mdi mdi-slack" />
            </a>
            <a
              :class="[`has-text-${dark ? 'light' : 'primary'}`]"
              href="//twitter.com/storyscript_"
              title="Storyscript Twitter"
            >
              <i class="mdi mdi-twitter" />
            </a>
            <a
              :class="[`has-text-${dark ? 'light' : 'primary'}`]"
              href="//github.com/storyscript"
              title="Storyscript Github"
            >
              <i class="mdi mdi-github-circle" />
            </a>
          </s-text>
        </s-level>
      </s-div>
    </s-container>
  </s-layout>
</template>

<script>
export default {
  name: 'SFooter',
  props: {
    dark: {
      type: Boolean,
      default: undefined
    }
  },
  methods: {
    scrollTop: function () {
      window.scrollTo(0, 0)
    }
  }
}
</script>

<docs>
### Playground

```jsx
<section>
  <s-footer />
  <s-footer dark />
  <s-footer :dark="false" />
</section>
```
</docs>
