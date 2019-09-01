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
              2019. MaxWell, Co.Ltd.
            </span>
            <a
              :class="[`has-text-${dark ? 'light' : 'primary'}`]"
              href="https://twitter.com/smbzdm"
              target="_blank"
              title="什么币值得买推特"
            >
              <i class="mdi mdi-twitter" />
            </a>
            <a
              :class="[`has-text-${dark ? 'light' : 'primary'}`]"
              href="https://weibo.com/u/7277604767"
              target="_blank"
              title="什么币值得买新浪微博"
            >
              <i class="mdi mdi-sina-weibo" />
            </a>
            <a
              :class="[`has-text-${dark ? 'light' : 'primary'}`]"
              href="https://t.me/smbzdm_official"
              target="_blank"
              title="什么币值得买电报群"
            >
              <i class="mdi mdi-telegram" />
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
