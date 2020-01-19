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
            BE 🥇 BUILT IN SHANGHAI 🥢
          </s-text>
          <s-button
            :state="dark ? 'dark' : 'light'"
            arrow="arrow-up"
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
              2019. ZX.
            </span>
            <a
              :class="[`has-text-${dark ? 'light' : 'primary'}`]"
              href="https://twitter.com/smbzdm2"
              target="_blank"
              title="CCAP twitter"
            >
              <i class="mdi mdi-twitter" />
            </a>
            <a
              :class="[`has-text-${dark ? 'light' : 'primary'}`]"
              href="https://github.com/shellteo/ccap"
              target="_blank"
              title="CCAP github"
            >
              <i class="mdi mdi-github-face" />
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
