<template>
  <div class="app-container">
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
    <BaseInfo :project-obj="projectObj" :is-create="true"/>
    <el-button type="primary" style="margin-top: 20px;" @click="createProject">创建项目</el-button>
  </div>
</template>

<script>
import BaseInfo from './components/BaseInfo'
export default {
  name: 'Create',
  components: {
    BaseInfo,
  },
  data() {
    return {
      projectObj: {
        logo: '',
        symbol: '',
        coin_name: '',
        shortname: '',
        slug: '',
        display_symbol: '',
        display: '',
        release_date: '',
        ico_price: '',
        today_open: '',
        description: '',
        start: '',
        end: '',
        is_promoted: '',
        message: '',
        website: '',
        whitepaper: '',
        total_supply: '',
        supply: '',
        platform: '',
        how_to_buy_url: '',
        trading_since: '',
        stages_start: '',
        stages_end: '',
        belong: '',
        rating: null,
      },
      projectId: null,
      symbol: null,
      crawler: null
    }
  },
  mounted() {
  },
  methods: {
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
    searchCoin() {
      this.request({
        url: `${this.apis.get_coin}/${this.symbol}`,
        method: 'get',
      }).then(res => {
        let keys = Object.keys(this.projectObj);
        let coin = res.data || {}
        keys.forEach((item) => {
          if(coin[item] !== undefined) {
            this.projectObj[item] = coin[item];
          }
        });
        console.log(res);
      })
    },
    fromUnixTimestamp(v) {
      return v * 1000
    },
    toUnixTimestamp(v) {
      if(this.utils.isNull(v)) {
        return v;
      }
      let result = new Date(v);
      return Math.round(result / 1000)
    },
    createProject() {
      const trading_since = this.toUnixTimestamp(this.projectObj.trading_since)
      const release_date = this.toUnixTimestamp(this.projectObj.release_date)
      const stages_start = this.toUnixTimestamp(this.projectObj.stages_start)
      const stages_end = this.toUnixTimestamp(this.projectObj.stages_end)
      const start = this.toUnixTimestamp(this.projectObj.start)
      const end = this.toUnixTimestamp(this.projectObj.end)
      const requestData = {
        ...this.projectObj,
        trading_since,
        release_date,
        stages_start,
        stages_end,
        start,
        end
      }
      this.request({
        url: this.apis.coin,
        method: 'post',
        data: requestData
      }).then(res => {
        this.$message({
          type: 'success',
          message: '创建成功!'
        })
        /*const id = res.data.projectObj.ProjectId
        this.$router.push({
          path: `/projects/detail/${id}`
        })*/
      })
    }
  }
}
</script>

<style scoped>
.search-list {
  background-color: #cccccc;
  margin-bottom: 20px;
}
</style>
