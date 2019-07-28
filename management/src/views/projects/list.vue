<template>
  <div class="app-container">
    <el-form :inline="true">
      <el-form-item label="coin symbol">
        <el-input v-model="search.symbol" placeholder="coin symbol" clearable size="small"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchList">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column label="Coin ID" width="95" prop="id" />
      <el-table-column label="symbol" width="95" prop="symbol" />
      <el-table-column label="coin_name" width="95" prop="coin_name" />
      <el-table-column label="display_symbol" width="150" prop="display_symbol" />
      <el-table-column label="开始时间" align="center">
        <template slot-scope="scope">
          <span :title="scope.row.start">{{ formatTime(scope.row.start) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开始时间" align="center">
        <template slot-scope="scope">
          <span :title="scope.row.end">{{ formatTime(scope.row.end) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="belong" align="center">
        <template slot-scope="scope">
          <el-tag>{{ belongOptions[scope.row.belong] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="100" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="toDetail(scope.row.symbol)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :total="count"
      background
      layout="prev, pager, next"
      @current-change="handleCurrentChange"/>
  </div>
</template>

<script>
import { isNull } from '@/utils/validate'
import moment from 'moment'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      count: 0,
      listLoading: true,
      pageSize: 10,
      pageIndex: 1,
      createDate: null,
      search: {
        symbol: ''
      },
      belongOptions: {
        0: 'IEOs',
        1: 'STOs',
        2: 'ICOs'
      }
    }
  },
  watch: {
    createDate(val) {
      if (isNull(val)) {
        this.search.StartDate = ''
        this.search.EndDate = ''
      } else {
        this.search.StartDate = this.toUnixTimestamp(val[0])
        this.search.EndDate = this.toUnixTimestamp(val[1])
      }
    }
  },
  created() {
    this.getList(1)
  },
  methods: {
    formatTime(t) {
      if (t) {
        return this.utils.parseTime(t)
      } else {
        return t
      }
    },
    fromUnixTimestamp(v) {
      return v * 1000
    },
    toUnixTimestamp(v) {
      return Math.round(v / 1000)
    },
    searchList() {
      this.getList(1)
    },
    handleCurrentChange(v) {
      this.getList(v)
    },
    toDetail(symbol) {
      this.$router.push({
        path: `/projects/detail/${symbol}`
      })
    },
    getList(pageIndex) {
      this.listLoading = true
      this.request({
        url: this.apis.coin,
        method: 'get',
        noLoading: true,
        params: {
          pageSize: this.pageSize,
          pageIndex: pageIndex || this.pageIndex,
          ...this.search
        }
      }).then(res => {
        this.listLoading = false
        this.list = res.data.rows
        this.count = res.data.count
      })
    }
  }
}
</script>

<style scoped>

</style>
