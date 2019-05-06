<template>
  <el-table
    v-loading="listLoading"
    :data="list"
    element-loading-text="Loading"
    border
    fit
    highlight-current-row>
    <el-table-column label="项目Id" prop="ProjectId"/>
    <el-table-column label="用户ONTID" prop="ONTID"/>
    <el-table-column label="Action">
      <template slot-scope="scope">
        <span>{{ scope.row.Action === 'in' ? '获取糖果' : '提币' }}</span>
      </template>
    </el-table-column>
    <el-table-column label="金额" prop="Amount"/>
    <el-table-column label="提币地址" prop="Address"/>
    <el-table-column label="创建时间" prop="CreateDate"/>
    <el-table-column label="状态">
      <template slot-scope="scope">
        <span>{{ formatStatus(scope.row.Status) }}</span>
      </template>
    </el-table-column>
    <el-table-column label="IP" prop="IP"/>
    <el-table-column label="交易Hash" prop="Hash"/>
  </el-table>
</template>

<script>
export default {
  name: 'RpLog',
  props: {
    listLoading: {
      type: Boolean,
      default() {
        return false
      }
    },
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    formatStatus(status) {
      if (status === 1) return '进行中'
      if (status === 2) return '失败'
      if (status === 3) return '成功'
    }
  }
}
</script>

<style scoped>

</style>
