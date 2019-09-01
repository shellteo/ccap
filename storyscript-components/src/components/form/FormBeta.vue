<template>
  <form
    :class="{ error, success, dark }"
    action
    class="form-beta"
    @submit.prevent="submit"
  >
    <input
      v-model="email"
      name="beta-email"
      placeholder="Email address"
      type="email"
      autocomplete="off"
    >
    <s-button
      type="submit"
      arrow-mobile
      :loading="sending"
    >
      {{ success ? 'Thanks !' : 'Join Beta' }}
    </s-button>
  </form>
</template>

<script>
export default {
  name: 'SFormBeta',
  props: {
    /**
     * The process function called after submit Should return a Promise
     *
     * default: clevertap push
     * @param {String} email
     */
    process: {
      type: Function,
      default: function (email) {
        return new Promise((resolve, reject) => {
          if (typeof window['clevertap'] !== 'undefined') {
            window['clevertap'].profile.push({ 'Site': { 'Email': email } })
            window['clevertap'].event.push('Interested in beta', { 'Source': 'Website' })
            resolve()
          } else { reject(new Error('clevertap undefined')) }
        })
      }
    },
    dark: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    email: '',
    sending: false,
    error: false,
    success: false
  }),
  computed: {
    isEmail: function () {
      return this.email.trim().length === 0 ? undefined : (/^(([^<>()\\[\]\\.,;:\s@\\"]+(\.[^<>()\\[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/i).test(this.email)
    }
  },
  watch: {
    success: function () { if (this.success) { setTimeout(() => { this.success = false }, 1000) } },
    error: function () { if (this.error) { setTimeout(() => { this.error = false }, 1000) } }
  },
  methods: {
    submit: function (e) {
      if (this.sending) return
      if (!this.isEmail) {
        this.error = true
      } else {
        this.sending = true
        setTimeout(() => {
          this.process(this.email).then(() => {
            this.success = true
            this.email = ''
          }).catch(() => {
            this.error = true
          }).then(() => { this.sending = false })
        }, 200)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/scss/variables/index.scss";
@import "~@/scss/custom/_animations.scss";

.form-beta {
  background-color: nth($grays, 4);
  border: 1px solid darken(nth($grays, 4), 10%);
  &.dark {
    background-color: $white;
    border: 1px solid $primary;
  }
  display: flex;
  align-items: center;
  flex: 1 1 100%;
  margin: 0 auto;
  max-width: 450px;
  justify-content: space-between;
  padding: 0.2rem 0.25rem;
  border-radius: 2rem;
  &.error {
    @include animate-shake;
  }

  input {
    width: max-content;
    min-width: 50px;
    border: none;
    outline: none;
    background: none;
    padding: 1rem 1rem 1rem 1.5rem;
    color: $dark;
    &:-webkit-autofill {
      &,
      &:hover,
      &:focus {
        -webkit-text-fill-color: $dark;
        transition: background-color 5000s ease-in-out 0s;
        background: none !important;
      }
    }
  }
}
</style>

<docs>
### Playground

```jsx
<s-form-beta />
```
</docs>
