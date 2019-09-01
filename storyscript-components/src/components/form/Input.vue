<template>
  <div
    :class="[
      'field',
      {disabled},
      {'is-group-vertical': groupVertical },
      {'has-addons': (hasAddons && isGrouped === undefined)},
      {[`has-addons-${hasAddons}`]: typeof hasAddons === typeof '' && isGrouped === undefined},
      {'is-grouped': isGrouped},
      {[`is-grouped-${isGrouped}`]: typeof isGrouped === typeof ''},
      {'tags input':tags}]"
    @click="onFocusField"
  >
    <label
      v-if="(label || $slots.label) && !['switch', 'checkbox', 'radio'].includes(type)"
      class="label"
      :for="`input-${_uid}`"
    >
      <slot name="label" />
      {{ label }}
    </label>
    <div
      v-if="(hasAddons || isGrouped) && $slots.left"
      class="control"
    >
      <slot name="left" />
    </div>
    <template v-if="tags">
      <s-tag
        v-for="(tag, id) of tags"
        :key="`list-${_uid}-tags-${id}`"
        :color="tagsColor"
        class="control"
        deletable
        @click="deleteTag($event, id)"
      >
        {{ tag }}
      </s-tag>
    </template>
    <div :class="['control', {'has-icons-left': iconLeft}, {'has-icons-right': iconRight || valid !== undefined }, {'is-loading': loading}]">
      <textarea
        v-if="type ==='textarea'"
        :id="`input-${_uid}`"
        :value="value"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="[{'input': !['textarea', 'checkbox', 'radio'].includes(type)}, {'is-radio': type === 'radio'}, {'textarea': type === 'textarea'}, {'has-fixed-size': fixed}, {'is-rtl': type === 'switch'}, {[`is-${size}`]: size !== 'normal'}, {'switch': type === 'switch'}, {'is-rounded': rounded}, {[`is-${valid ? 'success' : 'danger'}`]: valid !== undefined }, {[`has-background-${background}`]: background}]"
        :readonly="readonly"
        :rows="rows"
        v-on="listeners"
      />
      <input
        v-else
        :id="`input-${_uid}`"
        ref="input"
        :name="name"
        :disabled="disabled"
        :placeholder="placeholder"
        :class="[{'input': !['textarea', 'checkbox', 'radio'].includes(type)}, {'is-radio': type === 'radio'}, {'textarea': type === 'textarea'}, {'has-fixed-size': fixed}, {'is-rtl': type === 'switch'}, {[`is-${size}`]: size !== 'normal'}, {'switch': type === 'switch'}, {'is-rounded': rounded}, {[`is-${valid ? 'success' : 'danger'}`]: valid !== undefined }, {[`has-background-${background}`]: background}]"
        :readonly="readonly"
        :type="type === 'switch' ? 'checkbox' : type"
        :checked="['switch', 'radio'].includes(type) ? value : undefined"
        :value="!['switch', 'radio'].includes(type) ? value : undefined"
        :aria-autocomplete="autocomplete"
        :autocomplete="autocomplete"
        :required="required"
        v-on="listeners"
      >
      <label
        v-if="label && ['switch', 'radio', 'checkbox'].includes(type)"
        :class="['label', {'is-rtl': type === 'switch'}]"
        :for="`input-${_uid}`"
      >{{ label }}</label>
      <span
        v-if="iconLeft"
        :class="['icon', 'is-left', {[`is-${size}`]: size !== 'normal'}]"
      >
        <i
          v-if="typeof iconLeft === typeof ''"
          :class="`mdi mdi-${iconLeft}`"
        />
        <component
          :is="iconLeft[0]"
          v-else
          v-bind="iconLeft[1]"
        />
      </span>
      <span
        v-if="valid !== undefined"
        :class="['icon', 'is-right', {[`is-${size}`]: size !== 'normal'}]"
        @click="$emit('icon-valid')"
      >
        <i :class="`mdi mdi-${valid ? 'check' : 'close'} has-text-${valid ? 'success' : 'danger'}`" />
      </span>
      <span
        v-else-if="iconRight"
        :class="['icon', 'is-right', {[`is-${size}`]: size !== 'normal'}]"
      >
        <i
          v-if="typeof iconRight === typeof ''"
          :class="`mdi mdi-${iconRight}`"
        />
        <component
          :is="iconRight[0]"
          v-else
          v-bind="iconRight[1]"
        />
      </span>
    </div>
    <div
      v-if="(hasAddons || isGrouped) && $slots.right"
      class="control"
    >
      <slot name="right" />
    </div>
    <p
      v-if="help"
      :class="['help', {[`is-${valid ? 'success' : 'danger'}`]: typeof valid === typeof true }]"
    >
      {{ help }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'SInput',
  props: {
    disabled: { type: Boolean, default: undefined },
    hasAddons: { type: [Boolean, String], default: undefined, validator: v => [true, false, 'centered', 'right'].includes(v) },
    isGrouped: { type: [Boolean, String], default: undefined, validator: v => [true, false, 'centered', 'right', 'multiline'].includes(v) },
    background: { type: String, default: undefined },
    label: { type: String, default: undefined },
    autocomplete: { type: String, default: undefined, validator: v => ['on', 'off'].includes(v) },
    type: {
      type: String,
      default: 'text',
      validator: v => ['text', 'email', 'password', 'tel', 'textarea', 'switch', 'radio', 'tags'].includes(v)
    },
    value: { type: [String, Boolean], default: '' },
    placeholder: { type: String, default: undefined },
    name: { type: String, default: undefined },
    size: {
      type: String,
      default: 'normal',
      validator: v => ['small', 'normal', 'medium', 'large'].includes(v)
    },
    required: { type: Boolean, default: false },
    groupVertical: { type: Boolean, default: false },
    rounded: { type: Boolean, default: false },
    fixed: { type: Boolean, default: false },
    rows: { type: Number, default: undefined },
    readonly: { type: Boolean, default: undefined },
    loading: { type: Boolean, default: false },
    iconLeft: { type: [String, Array], default: undefined },
    iconRight: { type: [String, Array], default: undefined },
    valid: { type: Boolean, default: undefined },
    help: { type: String, default: undefined },
    tags: { type: Array, default: undefined },
    tagsColor: { type: String, default: 'primary' }
  },
  computed: {
    getType: function () {
      return this.type === 'textarea' ? 'textarea' : 'input'
    },
    listeners: function () {
      return {
        blur: this.onBlur,
        change: this.onChange,
        click: this.onClick,
        focus: this.onFocus,
        input: this.onInput,
        keydown: this.onKeydown,
        keyup: this.onKeyup
      }
    }
  },
  methods: {
    onBlur: function (e) { this.$emit('blur', e) },
    onChange: function (e) {
      this.$emit('change', e)
    },
    deleteTag: function (e, id) {
      if (e.type === 'delete') {
        this.tags.splice(id, 1)
      }
    },
    onClick: function (e) { this.$emit('click', e) },
    onFocus: function (e) { this.$emit('focus', e) },
    onInput: function (e) {
      const val = this.type === 'switch' ? e.target.checked : e.target.value || ''
      this.$emit('update', val)
      this.$emit('input', val)
    },
    onKeydown: function (e) {
      if (this.type === 'tags') {
        if (['Backspace', 'Delete'].includes(e.code) && e.target.value.length === 0) {
          e.preventDefault()
          this.tags.splice(-1)
        } else if (['Space', 'Comma', 'Tab', 'Enter'].includes(e.code)) {
          e.preventDefault()
          if (!this.tags.includes(e.target.value.trim()) && e.target.value.trim().length > 0) {
            this.tags.push(e.target.value.trim())
            this.$emit('input', '')
            this.$emit('update', '')
          }
        } else {
          this.$emit('keydown', e)
        }
      } else {
        this.$emit('keydown', e)
      }
    },
    onKeyup: function (e) { this.$emit('keyup', e) },
    onFocusField: function () {
      if (this.$refs.input) {
        this.$refs.input.focus()
      }
    }
  }
}
</script>

<docs>
### Playground

```
new Vue({
  template: `
  <section>
    <s-input
      v-model="input"
      :icon-right="['s-icon', { icon: 'search' }]"
      size="large"
    />
    <s-input
      v-model="input"
      @keyup.enter="input = ''"
      label="hello world"
      placeholder="hello world"
    >
      <template slot="label">
  Docker pull URL
  <s-text
    span
    data-tooltip="The Docker Hub Url to your public repository. We only pull images with the 'latest' tag."
    data-tooltip-right
  >
    <s-icon icon="question-mark" />
  </s-text>
</template>
    </s-input>
    <s-input
      background="light"
      placeholder="hello world"
    />
    <s-input has-addons="centered" icon-left="email">
      <a slot="right" class="button"><i class="mdi mdi-magnify" /></a>
    </s-input>
    <s-input
      type="switch"
      v-model="checked"
      label="hello world"
      background="light"
      placeholder="hello world"
    />
    <div class="field">
      <div class="control">
        <label class="label">Topics <small>(separate with spaces)</small></label>
        <s-input
          type="tags"
          is-grouped="multiline"
          :tags="tags"
          placeholder="Topic name"
          label="Topics (separate by commas)" />
      </div>
    </div>
    <s-input
      type="tags"
      is-grouped="multiline"
      :tags="tags"
      placeholder="Topic name"
      label="Topics (separate by commas)" />
    <s-input
      type="radio"
      label="PUBLIC"
      name="radio" />
    <s-input
      type="radio"
      label="PRIVATE"
      name="radio" />
  </section>`,
  data: () => ({ input: 'value', checked: false, tags: ['tag1', 'tag2'] }),
  watch: { input: function () { console.log('value :', this.input) }, checked: function () { console.log('checked', this.checked) }, tags: { deep: true, handler: function() { console.log(this.tags) } } },
  methods: {
    reset: function () {
      console.log('reset')
    }
  }
})
```
</docs>
