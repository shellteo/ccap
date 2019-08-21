<template>
    <div>
      spider
      <div v-html="res.data"></div>
      <h1>{{list.length}}</h1>
      <!--<table>
        <tr v-for="item in list">
          <td><img :src="imgUrl(item)" alt=""></td>
          <td><a :href="item.link">{{item.name}}</a></td>
          <td><b>{{item.symbol}}</b></td>
          <td><b>{{item.platform}}</b></td>
        </tr>
      </table>-->

      <el-form :inline="true" class="search-list">
        <el-form-item label="symbol">
          <el-input v-model="symbol" placeholder="请输入coin symbol" clearable size="small"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchCoin">查询ajax</el-button>
        </el-form-item>
      </el-form>
      <el-form :inline="true" class="search-list">
        <el-form-item label="crawler">
          <el-input v-model="crawler" placeholder="请输入" clearable size="small"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchCrawler">查询crawler</el-button>
        </el-form-item>
      </el-form>
      <el-form :inline="true" class="search-list">
        <el-form-item>
          <el-button type="primary" @click="updateCoin">更新coin</el-button>
        </el-form-item>
      </el-form>
      <!--<el-form :inline="true" class="search-list">
        <el-form-item>
          <el-button type="primary" @click="createStage">创建stage</el-button>
        </el-form-item>
      </el-form>-->
      <el-form :inline="true" class="search-list">
        <el-form-item>
          <el-button type="primary" @click="createNews">创建news</el-button>
        </el-form-item>
      </el-form>

      <el-form :inline="true" class="search-list">
        <el-form-item>
          <el-button type="primary" @click="getList">update list</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      res: {},
      list: [],
      baseurl: `https://max-well.oss-cn-shanghai.aliyuncs.com`,
      crawler: null,
      symbol: null
    }
  },
  methods: {
    updateCoin() {
      this.request({
        url: this.apis.insertCoin,
        method: 'get'
      }).then(res => {
        console.log(res);
      })
    },
    createStage() {
      this.request({
        url: this.apis.createStage,
        method: 'get'
      }).then(res => {
        console.log(res);
      })
    },
    createNews() {
      this.request({
        url: this.apis.createNews,
        method: 'get'
      }).then(res => {
        console.log(res);
      })
    },
    searchCoin() {
      this.request({
        url: `${this.apis.get_coin}/${this.symbol}`,
        method: 'get',
      }).then(res => {
        console.log(res);
      })
    },
    searchCrawler() {
      this.request({
        url: this.apis.crawler,
        params: {
          coin: this.crawler
        },
        method: 'get'
      }).then(res => {
        console.log(res);
      })
    },
    imgUrl(item) {
      return `${this.baseurl}${item.logo}?x-oss-process=image/resize,w_32`
    },
    getSpider() {
      this.request({
        url: this.apis.spider,
        method: 'get'
      }).then(res => {
        console.log(res);
        this.list = res.data.rows || []
      })
    },
    getList() {
      this.request({
        url: this.apis.spiderList,
        method: 'get'
      }).then(res => {
        console.log(res);
        this.list = res.data || []
      })
    }
  },
  mounted() {
    // this.getSpider()
    // this.getList()
  }
}
</script>

<style scoped>

</style>
