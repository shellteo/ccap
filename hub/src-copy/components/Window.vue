<template>
  <div :class="['window', type]">
    <div
      v-if="typeof(title) === 'string'"
      class="frame"
    >
      <div>
        <span class="menu" />
        <span class="menu" />
        <span class="menu" />
      </div>
      <div
        v-if="type ==='browser'"
        class="browser-title"
      >
        <s-icon icon="search" />
        <span class="title">{{ title }}</span>
      </div>
      <span
        v-else
        class="title text--bold"
        v-text="title"
      />
    </div>
    <div class="content">
      <v-scrollbar class="scrollable">
        <pre
          v-if="type !== 'browser' && code && !updateCode"
          :class="[`language-${lang}`, {'line-numbers': type === 'code'}]"
        ><code :class="`language-${lang}`">{{ code }}</code></pre>
        <pre
          v-if="type !== 'browser' && !code && !updateCode"
          :class="[`language-${lang}`, {'line-numbers': type === 'code'}]"
        ><code :class="`language-${lang}`"><slot /></code></pre>
        <slot v-else />
      </v-scrollbar>
      <s-button
        v-if="copy && type !== 'browser'"
        :icon="`clipboard-${copied ? 'check-' : ''}outline`"
        state="light"
        size="small"
        link
        class="copy-btn"
        title="Copy"
        @click="clipboard"
      >
        {{ copied ? 'Copied !' : 'Copy' }}
      </s-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Window',
  props: {
    title: {
      type: String,
      default: undefined,
      description: 'The window title name (default: none)'
    },
    code: {
      type: String,
      default: '',
      description: 'The terminal code'
    },
    type: {
      type: String,
      default: 'code',
      validator: v => ['browser', 'code', 'terminal'].includes(v),
      description: 'The window type (values: browser|code|terminal)'
    },
    lang: {
      type: String,
      default: 'coffeescript',
      description: 'The code language'
    },
    copy: {
      type: Boolean,
      default: true,
      description: 'Whether to show or not the copy button (default: true)'
    }
  },
  data: () => ({
    copied: false,
    updateCode: false
  }),
  watch: {
    code: 'update'
  },
  mounted: function () {
    /* global Prism */
    this.$nextTick(Prism.highlightAll)
  },
  methods: {
    update: function () {
      this.updateCode = true
      this.$nextTick(() => {
        this.updateCode = false
        this.$nextTick(Prism.highlightAll)
      })
    },
    clipboard: function () {
      if (!this.copied) {
        this.copied = true
        this.$copyText(this.code ? this.code : this.$slots.default[0].text)
        setTimeout(() => {
          this.copied = false
        }, 1500)
      }
    }
  }
}
</script>

<style lang="scss">
@import "~@storyscript/vue/src/scss/variables/index";

.window {
  background-color: darken($dark, 8%);
  border-radius: 0.25rem;
  overflow: hidden;
  padding: 0;
  margin: 0;
  display: block;
  position: relative;
  height: auto;
  width: 100%;

  & + .window {
    margin-top: 1rem;
  }

  &.browser {
    background-color: gray(400);
    height: 100%;
    .frame {
      .menu {
        border: 0.05rem solid gray(600);
      }
      .browser-title {
        flex: 1 1 auto;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 0.25rem;
        margin: 0 1rem;
        text-align: left;
        padding: 0;
        padding-left: 0.5rem;
        align-items: center;
        display: flex;
        height: 1.75rem;
        position: relative;
        svg {
          color: gray(600);
          margin-right: 0.5rem;
        }
        .title {
          text-overflow: ellipsis;
          white-space: nowrap;
          color: gray(600);
          margin-left: 1rem;
          margin: 0;
          padding: 0;
        }
      }
    }
    .content {
      padding: 0;
      background-color: $light;
      color: $dark;
      height: 100%;
    }
    border: 1px solid gray(400);
  }

  &:hover {
    .content {
      .copy-btn {
        visibility: visible;
      }
    }
  }

  .frame {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 0;
    margin: 0;
    height: 2.5rem;
    div {
      display: flex;
      flex: 0 0 auto;
    }
    .title {
      margin-left: auto;
      margin-right: auto;
      padding-right: 4.25rem;
      color: $light;
    }
    span.menu {
      width: 0.75rem;
      height: 0.75rem;
      border-radius: 1rem;
      background-color: lighten($warning, 7%);
      margin-left: 0.75rem;
      & + .menu {
        margin-left: 0.5rem;
      }
      &:first-child {
        background-color: lighten($danger, 7%);
      }
      &:last-child {
        background-color: lighten($success, 7%);
      }
    }
  }
  .content {
    margin: 0;
    position: relative;
    padding: 0;
    background-color: darken($dark, 5.5%);
    overflow: hidden;
    display: block;
    max-width: 100%;

    .scrollable {
      overflow: auto;
      width: 100%;
      height: 100%;
      max-width: 100%;
      max-height: 400px;

      &.ps {
        &:hover,
        &:active,
        &:focus {
          .ps__scrollbar-x-rail,
          .ps__scrollbar-y-rail {
            &:hover,
            &:active,
            &:focus {
              background-color: transparent;
            }
          }
        }
      }
    }

    .copy-btn {
      position: absolute;
      visibility: hidden;
      right: 0.5rem;
      top: 0;
    }
    pre {
      overflow: auto;
      white-space: pre;
      padding: 0.5rem;
      font-size: .75rem !important;
      &.line-numbers {
        padding-left: 3rem;
      }
      margin: 0;
      // background-color: transparent;
      code {
        span {
          font-family: inherit;
          &.line-numbers-rows {
            border-right: none;
            top: -0.2rem;
          }
        }
      }
    }
  }
}
</style>
