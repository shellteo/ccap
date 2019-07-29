<template>
  <div class="about">
    <header>
      <div id="global-search">
        <div class="search-inner">
          <h1 id="logo" class="index-logo">
            <a href="#">
              <img src="" alt="logo">
            </a>
          </h1>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'PC',
  components: {},
  data() {
    return {}
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
#header {
  position: relative;
  padding-bottom: 0;
  #global-search {
    margin-bottom: 0;
    padding-top: 0;
    height: auto;
    .search-inner {
      padding: 30px 0 0;
      height: auto;
      position: relative;
    }
    .search-inner {
      position: relative;
      width: 1200px;
      margin: 0 auto;
      padding: 22px 0;
      height: 56px;
    }
  }
}
</style>
