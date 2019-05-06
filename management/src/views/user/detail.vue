<template>
  <div class="app-container">
    <el-card>
      <div slot="header">
        <span>用户基础数据</span>
      </div>
      <div>
        <p>ONTID: {{ u.ONTID }}</p>
        <p>认证状态:  <el-tag :type="getAuth(u.AuthFlag).type">{{ getAuth(u.AuthFlag).text }}</el-tag></p>
        <p>最后登录IP: {{ u.LastLoginIP }}</p>
        <p>最后登录时间: {{ u.LastLoginDate }}</p>
        <p>创建时间: {{ u.CreateDate }}</p>
        <p>领取次数: {{ u.AP }}</p>
        <p>最大领取次数: {{ u.MaxAP }}</p>
        <p>领取次数回复速度: {{ u.APRecoverSpeed }} 秒/点</p>
        <p>体力上次更新时间: {{ u.APUpdateDate }}</p>
        <p>手机号: <span>{{ u.NationalCode + ' ' + u.Mobile }}</span></p>
        <p>邀请者ONTID: {{ u.InvitedONTID }}</p>
        <p>我已邀请用户数量: {{ u.InvitedCount }}</p>
        <p>我的红包数量: {{ u.RedpacketCount }}</p>
        <p>我已开的红包数量: {{ u.RedpacketOpenCount }}</p>
      </div>
    </el-card>
    <el-card style="margin-top: 20px;">
      <div slot="header">
        <span>用户开红包数据</span>
      </div>
    </el-card>
    <el-card style="margin-top: 20px;">
      <div slot="header">
        <span>用户糖果的加减明细列表</span>
      </div>
      <TokenList :list="tokenList" />
    </el-card>
  </div>
</template>

<script>
import TokenList from './components/tokenList'
export default {
  name: 'Detail',
  components: {
    TokenList
  },
  data() {
    return {
      u: {},
      rpList: [],
      tokenList: []
    }
  },
  mounted() {
    const ontId = this.$route.params.ontId
    //this.getDetail(ontId)
  },
  methods: {
    getAuth(flag) {
      flag = parseInt(flag)
      if (flag === 0) return { text: '认证中', type: 'warning' }
      if (flag === 1) return { text: '认证失败', type: 'danger' }
      if (flag === 2) return { text: '认证成功', type: 'success' }
      return { text: '未认证', type: 'info' }
    },
    getDetail(id) {
      this.request({
        url: `${this.apis.user}/${id}`,
        method: 'get'
      }).then(res => {
        this.u = res.data.userObj
        this.rpList = res.data.redPacket
        this.tokenList = res.data.tokenList
      })
    }
  }
}
</script>

<style scoped>

</style>
