<template>
  <div class="app-container">
    <el-form :inline="true">
      <el-form-item label="手机号">
        <el-input v-model="search.Mobile" placeholder="请输入手机号" clearable size="small"/>
      </el-form-item>
      <el-form-item label="用户状态">
        <el-select v-model="search.AuthFlag" placeholder="请选择用户状态" clearable size="small">
          <el-option v-for="item in AuthOptions" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
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
      <el-table-column label="ONTID" prop="ONTID" align="center" fixed/>
      <el-table-column label="认证状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="getAuth(scope.row.AuthFlag).type">{{ getAuth(scope.row.AuthFlag).text }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="最后登录IP" width="110" align="center" prop="LastLoginIP" />
      <el-table-column label="最后登录时间" width="110" align="center" prop="LastLoginDate" />
      <el-table-column label="创建时间" width="110" align="center" prop="CreateDate" />
      <el-table-column label="领取次数" width="110" align="center" prop="AP" />
      <el-table-column label="最大领取次数" width="110" align="center" prop="MaxAP" />
      <el-table-column label="领取次数回复速度(秒/点)" width="110" align="center" prop="APRecoverSpeed" />
      <el-table-column label="体力上次更新时间" width="110" align="center" prop="APUpdateDate" />
      <el-table-column label="手机号" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.NationalCode + ' ' + scope.row.Mobile }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邀请者ONTID" width="110" align="center" prop="InvitedONTID" />
      <el-table-column label="我已邀请用户数量" width="110" align="center" prop="InvitedCount" />
      <el-table-column label="我的红包数量" width="110" align="center" prop="RedpacketCount" />
      <el-table-column label="我已开的红包数量" width="110" align="center" prop="RedpacketOpenCount" />
      <el-table-column align="center" label="操作" width="100" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="toDetail(scope.row.ONTID)">详情</el-button>
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
      search: {
        Mobile: '',
        AuthFlag: ''
      },
      AuthOptions: [
        {
          value: '0',
          label: '认证中'
        }, {
          value: '1',
          label: '认证失败'
        }, {
          value: '2',
          label: '认证成功'
        }
      ]
    }
  },
  created() {
    //this.getList(1)
  },
  methods: {
    getAuth(flag) {
      flag = parseInt(flag)
      if (flag === 0) return { text: '认证中', type: 'warning' }
      if (flag === 1) return { text: '认证失败', type: 'danger' }
      if (flag === 2) return { text: '认证成功', type: 'success' }
      return { text: '未认证', type: 'info' }
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
    toDetail(id) {
      this.$router.push({
        path: `/user/detail/${id}`
      })
    },
    getList(pageIndex) {
      this.listLoading = true
      const search = {}
      for (const item in this.search) {
        if (!isNull(this.search[item])) {
          search[item] = this.search[item]
        }
      }
      this.request({
        url: this.apis.user,
        method: 'get',
        noLoading: true,
        params: {
          pageSize: this.pageSize,
          pageIndex: pageIndex || this.pageIndex,
          ...search
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
