<template>
  <div class="app-container">
    <BaseInfo :project-obj="newProjectObj"/>
    <el-button type="success" style="margin-top: 20px;" @click="updateDetail">更新</el-button>
  </div>
</template>

<script>
import { isNull } from '@/utils/validate'
import BaseInfo from './components/BaseInfo'
export default {
  name: 'Detail',
  components: {
    BaseInfo,
  },
  data() {
    return {
      oldProjectObj: {},
      newProjectObj: {},
      symbol: null
    }
  },
  mounted() {
    const symbol = this.$route.params.symbol
    if (!isNull(symbol)) {
      this.symbol = symbol
      this.getDetail(symbol)
    }
  },
  methods: {
    // return moment(this.fromUnixTimestamp(t)).format('YYYY-MM-DD hh:mm:ss')
    formatTime(t) {
      if (t) {
        return this.utils.parseTime(t)
      } else {
        return t
      }
    },
    fromUnixTimestamp(v) {
      return parseInt(v) * 1000
    },
    toUnixTimestamp(v) {
      if(this.utils.isNull(v)) {
        return v;
      }
      let result = new Date(v);
      return Math.round(result / 1000)
    },
    getDetail(symbol) {
      this.request({
        url: `${this.apis.coin}/${symbol}`,
        method: 'get'
      }).then(res => {
        const projectObj = res.data
        const trading_since = this.formatTime(projectObj.trading_since)
        const release_date = this.formatTime(projectObj.release_date)
        const stages_start = this.formatTime(projectObj.stages_start)
        const stages_end = this.formatTime(projectObj.stages_end)
        const start = this.formatTime(projectObj.start)
        const end = this.formatTime(projectObj.end)
        const oldProjectObj = {
          ...projectObj
        }
        const newProjectObj = {
          ...projectObj,
          trading_since,
          release_date,
          stages_start,
          stages_end,
          start,
          end
        }
        this.oldProjectObj = oldProjectObj;
        this.newProjectObj = newProjectObj;
      })
    },
    updateDetail() {
      const { oldProjectObj, newProjectObj } = this
      const trading_since = this.toUnixTimestamp(newProjectObj.trading_since)
      const release_date = this.toUnixTimestamp(newProjectObj.release_date)
      const stages_start = this.toUnixTimestamp(newProjectObj.stages_start)
      const stages_end = this.toUnixTimestamp(newProjectObj.stages_end)
      const start = this.toUnixTimestamp(newProjectObj.start)
      const end = this.toUnixTimestamp(newProjectObj.end)
      const newProjectObjCopy = {
        ...newProjectObj,
        trading_since,
        release_date,
        stages_start,
        stages_end,
        start,
        end
      }

      let requestData = {}
      let keys = Object.keys(newProjectObj)
      keys.forEach((item) => {
        if (oldProjectObj[item] !== newProjectObjCopy[item]) {
          requestData[item] = newProjectObjCopy[item];
        }
      });
      this.request({
        url: `${this.apis.coin}/${this.symbol}`,
        method: 'put',
        data: requestData
      }).then(res => {
        this.$message({
          type: 'success',
          message: '更新成功!'
        })
        this.getDetail(this.symbol)
      })
    }
  }
}
</script>

<style scoped>

</style>
