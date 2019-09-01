<template>
  <div class="sitemap section">
    <div class="container">
      <div class="columns">
        <div class="column is-full">
          <h4
            v-for="(page, idx) of pages"
            :key="`page-${idx}`">{{ page.name }} : {{ page.path }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sitemap',
  data: () => ({
    pages: []
  }),
  mounted: function () {
    console.log(this.$router)
    this.pages = this.$router.options.routes
  }
}
</script>
