<template>
  <div :class="['modal', {'is-active': open }]">
    <div class="modal-background" />
    <div
      v-click-outside="hide"
      class="modal-content is-rounded"
    >
      <s-layout
        foreground="white"
        rounded
      >
        <s-container center-vh>
          <s-div
            size="full"
            padding="medium"
          >
            <button
              class="modal-close is-inside is-large"
              aria-label="close"
              @click="hide"
            />
            <s-text
              head="3"
              alignment="centered"
            >
              Write your own story.
            </s-text>
            <s-container
              clean
              centered-vh
            >
              <s-div size="8">
                <form
                  :class="{ error, success }"
                  action
                  class="modal-form-beta"
                  @submit.prevent="submit"
                >
                  <s-input
                    v-model="email"
                    group-vertical
                    name="beta-email"
                    placeholder="Email address"
                    type="email"
                    required
                    autocomplete="off"
                  />
                  <s-input
                    v-model="username"
                    group-vertical
                    name="beta-username"
                    placeholder="GitHub Username"
                    required
                    autocomplete="off"
                  />
                  <s-button
                    full
                    type="submit"
                    :loading="sending"
                  >
                    {{ success ? 'Thanks !' : 'Request Access' }}
                  </s-button>
                </form>
              </s-div>
            </s-container>
          </s-div>
        </s-container>
      </s-layout>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SModalBeta',
  props: {
    blur: { type: Boolean, default: false },
    /**
     * The process function called after submit Should return a Promise
     *
     * default: clevertap push
     * @param {String} email
     * @param {String} username
     */
    process: {
      type: Function,
      default: function (email, username) {
        return new Promise((resolve, reject) => {
          if (typeof window['clevertap'] !== 'undefined') {
            window['clevertap'].profile.push({ Site: { Email: email, 'GitHub Username': username, Identity: email } })
            window['clevertap'].event.push('Interested in beta', { Source: 'Website', 'GitHub Username': username, Email: email })
            resolve()
          } else { reject(new Error('clevertap undefined')) }
        })
      }
    }
  },
  data: () => ({ open: false, email: '', username: '', sending: false, error: false, success: false }),
  computed: {
    isEmail: function () {
      return this.email.trim().length === 0 ? undefined : (/^(([^<>()\\[\]\\.,;:\s@\\"]+(\.[^<>()\\[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/i).test(this.email)
    }
  },
  watch: {
    success: function () { if (this.success) { setTimeout(() => { this.success = false }, 1000) } },
    error: function () { if (this.error) { setTimeout(() => { this.error = false }, 1000) } },
    open: function () {
      if (this.open) {
        document.documentElement.classList.add('is-clipped')
        if (this.blur) {
          document.documentElement.classList.add('is-modal-blur')
        }
      } else {
        document.documentElement.classList.remove('is-clipped')
        if (this.blur) {
          document.documentElement.classList.remove('is-modal-blur')
        }
      }
    }
  },
  methods: {
    show () { setTimeout(() => (this.open = true), 50) },
    hide () { if (this.open) this.open = false },
    submit (e) {
      if (this.sending) return
      if (!this.isEmail) {
        this.error = true
      } else {
        this.sending = true
        setTimeout(() => {
          this.process(this.email, this.username).then(() => {
            this.success = true
            this.email = ''
            this.username = ''
          }).catch(() => {
            this.error = true
          }).then(() => { this.sending = false })
        }, 200)
      }
    }
  }
}
</script>

<docs>
## Playground

```
<div>
  <s-modal-beta ref="toto"/>
  <s-button @click="$refs.toto.show()">open</s-button>
</div>
```
</docs>

<style lang="scss">
@import "~@/scss/custom/_animations.scss";

.modal-form-beta {
  &.error {
    @include animate-shake;
  }
}
</style>
