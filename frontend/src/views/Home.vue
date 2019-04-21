<template>
  <div class="home-page">
    <van-nav-bar title="加密❤少女" @click-left="sidebarShow = true" @click-right="login" fixed :z-index="3">
      <van-icon name="wap-nav" slot="left" size="1.2rem"/>
      <span slot="right">
                <span v-if="!isLogin">登录</span>
                <van-icon v-else name="user-o" size="1.2rem"/>
            </span>
    </van-nav-bar>
    <div class="home-main">
      <table>
        <tbody>
          <CoinCard></CoinCard>
        </tbody>
      </table>
      <div class="home-main-top">
        <div class="bg-inner">
          <p>加密少女是一款运行在区块链上的集换式卡片游戏。</p>
          <p>采用ERC-721标准，现已上线以太坊测试网Ropsten。</p>
          <router-link to="play" class="aTag">查看玩法 ></router-link>
        </div>
      </div>
      <div><van-button type="warning" plain size="large" @click="$router.push({path: '/girls'})">浏览更多</van-button></div>
    </div>
    <van-popup v-model="sidebarShow" position="left" class="sidebar">
      <div class="container">
        <van-cell title="👉 IEO列表" is-link to="/"/>
        <van-cell title="📖 什么是IEO?" is-link to="girls"/>
        <van-cell title="🙋 关于&提交" is-link to="about"/>
      </div>
    </van-popup>
    <van-dialog
            v-model="registerShow"
            title="第一次登录"
            @confirm="register">
      <van-field
              v-model="nickname"
              required
              clearable
              label="用户名"
              placeholder="请输入用户名"/>
    </van-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import CoinCard from '@/components/CoinCard.vue'

export default {
  name: 'home',
  components: {
    CoinCard
  },
  data() {
    return {
      sidebarShow: false,
      registerShow: false,
      isLogin: false,
      nickname: '',
    }
  }
}
</script>

<style lang="scss" scoped>
  .home-page {
    min-height: 100%;
    background-color: #f2f3f5;
  }
  .sidebar {
    height: 100%;
    width: 50%;
    .container {
      margin-top: 30px;
    }
  }
  .home-main {
    padding: 20px 0;
    margin-top: 46px;
    .home-main-top {
      color: #fff;
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      margin-bottom: 20px;
      height: 200px;
      background: url("https://crypto-ycy.oss-cn-shanghai.aliyuncs.com/2/1.jpg") no-repeat;
      background-size: cover;
      .bg-inner {
        color: #000;
        width: 50%;
      }
    }
  }
  .aTag {
    color: #1989fa;
    font-size: 12px;
  }
</style>
