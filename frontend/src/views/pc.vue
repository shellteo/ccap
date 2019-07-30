<template>
  <div class="pc">
    <header>
      <div id="global-search">
        <div class="search-inner">
          <h1 id="logo" class="index-logo">
            <a href="#">
                <img src="//res.smzdm.com/resources/public/img/pc_global/logo.png?v=2019063015" alt="logo" height="57" width="181" />
            </a>
          </h1>
          <el-input placeholder="请输入内容" v-model="searchText" class="search-input">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </div>
      <div class="menu-container">
        <div class="my-menu">
          <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">IEOs</el-menu-item>
            <el-menu-item index="2">STOs</el-menu-item>
            <el-menu-item index="3">ICOs</el-menu-item>
          </el-menu>
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
    return {
      activeIndex: '1',
      searchText: ''
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  margin: 0;
  padding: 0;
}
header {
  position: relative;
  padding-bottom: 0;
  background-color: #ffffff;
  #global-search {
    padding-top: 30px;
    height: auto;
    margin: auto;
    @include mw();
    .search-inner {
      @include flexSetting(row, center, flex-start);
    }
    #logo {
      width: 278px;
      margin: 0;
    }
  }
  .search-input {
    width: 600px;
  }
}
</style>
<style lang="scss">
html, body {
  background-color: #f5f5f5;
  color: #333;
}
.menu-container{
  border-bottom: solid 1px #e6e6e6;
  .my-menu {
    @include mw();
    margin: auto;
    .el-menu.el-menu--horizontal {
      border-bottom: none;
    }
  }
}
</style>
