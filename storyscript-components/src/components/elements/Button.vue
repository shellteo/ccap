<template>
  <component
    :is="url ? 'a' : to ? 'router-link' : 'button'"
    class="button"
    :href="getUrl"
    :target="getTarget"
    :title="getTitle"
    :to="to"
    :type="type"
    :class="['button', `is-${state}`, { [`is-${size}`]: size !== 'normal' }, { 'is-loading': loading }, { 'is-fullwidth': full }, { 'is-rounded': rounded }, { 'is-link': link }, { 'is-outlined': outlined }, { 'is-borderless': borderless }, { 'has-arrow': arrow }, { 'has-mobile-arrow': arrowMobile }]"
    @click="handleClick"
  >
    <span
      v-if="icon || iconLeft"
      :class="['icon', {'round-left': iconLeft}]"
    >
      <i
        v-if="typeof icon === typeof '' || typeof iconLeft === typeof ''"
        :class="`mdi mdi-${icon || iconLeft}`"
      />
      <s-icon
        v-else
        v-bind="iconLeft"
      />
    </span>
    <!-- @slot Use this slot to place the button content -->
    <span
      v-if="$slots.default"
      :class="{ 'is-hidden-mobile': arrowMobile }"
    >
      <slot />
    </span>
    <template v-if="arrow">
      <s-icon
        :class="[{arrow: arrowIcon === 'arrow'}, 'btn-icon', {search: arrowIcon === 'search'}]"
        :icon="arrowIcon"
      />
    </template>
    <span
      v-if="iconRight"
      :class="['icon']"
    >
      <i :class="`mdi mdi-${iconRight}`" />
    </span>
    <template v-else-if="arrowMobile">
      <s-icon
        class="arrow is-hidden-tablet"
        icon="arrow"
      />
    </template>
  </component>
</template>

<script>
export default {
  name: 'SButton',
  props: {
    /**
     * Sets the button state
     */
    state: {
      type: String,
      default: 'primary'
    },
    /**
     * Sets the button as a link
     */
    link: {
      type: Boolean,
      default: false
    },
    /**
     * Sets background color of the button
     */
    size: {
      type: String,
      default: 'normal',
      validator: v => ['small', 'normal', 'medium', 'large'].includes(v)
    },
    /**
     * Sets the button full-width
     */
    full: {
      type: Boolean,
      default: false
    },
    /**
     * Sets the button type
     */
    type: {
      type: String,
      default: undefined
    },
    /**
     * Sets the button rounded
     */
    rounded: {
      type: Boolean,
      default: true
    },
    /**
     * Sets the button state to loading
     */
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * Sets arrow at the right of the button
     */
    arrow: {
      type: [Boolean, String],
      default: false
    },
    /**
     * Replace the button text by an arrow (for mobile sizes only)
     */
    arrowMobile: {
      type: Boolean,
      default: false
    },
    /**
     * Sets the outlined style button
     */
    outlined: {
      type: Boolean,
      default: false
    },
    /**
     * Sets the button icon
     */
    icon: {
      type: String,
      default: undefined
    },
    /**
     * Sets the button icon in a left round, set an object with SIcon props to set an internal icon
     */
    iconLeft: {
      type: [String, Object],
      default: undefined
    },
    /**
     * Sets a right icon
     */
    iconRight: {
      type: String,
      default: undefined
    },
    /**
     * Remove the button padding
     */
    borderless: {
      type: Boolean,
      default: false
    },
    /**
     * the url te redirect to (button as link)
     *
     * `url="//domain.tld" or :url="{ href: '//domain.tld', target: '_blank' }"`
     */
    url: {
      type: [String, Object],
      default: undefined,
      validator: v => ((typeof v === typeof '') || (Object.keys(v || {}).length === 2 && Object.keys(v).includes('href') && Object.keys(v).includes('target')))
    },
    /**
     * the route to redirect (button as router-link)
     */
    to: {
      type: [String, Object],
      default: undefined
    }
  },
  computed: {
    getUrl: function () {
      return (this.url && typeof this.url !== typeof '') ? this.url.href : this.url
    },
    getTarget: function () {
      return (this.url && typeof this.url !== typeof '') ? this.url.target : undefined
    },
    getTitle: function () {
      return ((this.$slots.default || [{ text: undefined }])[0].text || '').trim()
    },
    arrowIcon: function () {
      return typeof this.arrow === typeof true ? 'arrow' : this.arrow
    }
  },
  methods: {
    /** Triggered when button is clicked
     * @event click
     * @type {Event}
     * @returns {Void}
     * @argument {Event} e
     */
    handleClick: function (e) {
      this.$emit('click', e)
    }
  }
}
</script>

<docs>
### Playground

```jsx
<s-container centered-h>
  <s-div>
    <s-button state="primary">Primary</s-button>
  </s-div>
  <s-div>
    <s-button state="primary" link>Push Me</s-button>
  </s-div>
  <s-div>
    <s-button state="secondary" arrow>Secondary</s-button>
    <s-button state="primary" outlined :url="{ href: '//storyscript.io', target: '_blank' }">storyscript.io</s-button>
  </s-div>
  <s-div>
    <s-button state="primary" outlined icon="check-circle" size="small">Small</s-button>
  </s-div>
  <s-div>
    <s-button state="primary" icon-left="account-circle">Join Beta</s-button>
    <s-button state="secondary" size="small" borderless icon-right="github-face">Secondary</s-button>
  </s-div>
  <s-div>
      <s-button :icon-left="{ icon: 'pen' }">Documentation</s-button>
  </s-div>
</s-container>
```
</docs>
