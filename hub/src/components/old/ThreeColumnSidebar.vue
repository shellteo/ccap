<template>
  <div class="section index">
    <div class="columns is-centered is-multiline">
      <div
        :class="sidebarClass"
        class="column is-one-fifth sidebar">
        <slot name="sidebar"/>
      </div>
      <div
        :class="mainClass"
        class="column is-two-fifths main">
        <slot name="body"/>
      </div>
      <div
        :class="rightClass"
        class="column is-two-fifths right">
        <slot name="body-right"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThreeColumnSidebar',
  props: {
    sidebarClass: {
      type: String,
      default: undefined,
      description: 'The right column classes'
    },
    mainClass: {
      type: String,
      default: undefined,
      description: 'The right column classes'
    },
    rightClass: {
      type: String,
      default: undefined,
      description: 'The right column classes'
    }
  }
}
</script>

<style lang="scss">
@include touch {
  .sidebar {
    order: 2;
    flex-basis: 100%;
    flex-grow: 1;
  }
}

.index {
  min-height: 350px;
  margin-top: 1.5rem;
}
</style>
