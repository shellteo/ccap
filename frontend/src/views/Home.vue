<template>
  <div class="home-page">
    <van-nav-bar title="list" @click-left="sidebarShow = true" @click-right="login" fixed :z-index="3">
      <van-icon name="wap-nav" slot="left" size="1.2rem"/>
      <span slot="right">
                <span v-if="!isLogin">登录</span>
                <van-icon v-else name="user-o" size="1.2rem"/>
            </span>
    </van-nav-bar>
    <section class="home-main">
      <div class="tbl-header">
        <table cellpadding="0" cellspacing="0" border="0">
          <thead>
          <tr>
            <th style="width: 50%;">IEO名称</th>
            <th style="width: 30%;">起止时间</th>
            <th style="width: 20%;text-align: right;">评分</th>
          </tr>
          </thead>
        </table>
      </div>
      <div class="tbl-content">
        <table cellpadding="0" cellspacing="0" border="0">
          <tbody>
            <CoinCard></CoinCard>
            <CoinCard></CoinCard>
            <CoinCard></CoinCard>
            <CoinCard></CoinCard>
            <CoinCard></CoinCard>
            <CoinCard></CoinCard>
            <CoinCard></CoinCard>
            <CoinCard></CoinCard>
            <CoinCard></CoinCard>
            <CoinCard></CoinCard>
            <CoinCard></CoinCard>
            <CoinCard></CoinCard>
            <CoinCard></CoinCard>
            <CoinCard></CoinCard>
            <CoinCard></CoinCard>
            <CoinCard></CoinCard>
            <CoinCard></CoinCard>
          </tbody>
        </table>
      </div>
    </section>
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
    height: 100%;
    box-sizing: border-box;
    position: relative;
  }
  .home-main {
    height: 100%;
    position: relative;
    box-sizing: border-box;
    padding: 46px 0 0 0;
  }
  .aTag {
    color: #1989fa;
    font-size: 12px;
  }
  .sidebar {
    height: 100%;
    width: 50%;
    .container {
      margin-top: 50px;
    }
  }
</style>
<style lang="scss">
  table{
    width: 100%;
    table-layout: fixed;
  }
  .tbl-header{
    background-color: rgba(102,102,102,0.1);
    height: 32px;
  }
  .tbl-content{
    height: calc(100% - 32px);
    overflow-x: auto;
    margin-top: 0;
  }
  th{
    padding: 8px 15px;
    font-weight: 500;
    font-size: 12px;
    color: #999;
    text-align: left;
  }
  td{
    padding: 15px;
    text-align: left;
    vertical-align:middle;
    font-weight: 300;
    font-size: 12px;
    color: #000;
    border-bottom: solid 1px rgba(0,0,0,0.1);
  }

  /*body{
    background: -webkit-linear-gradient(left, #25c481, #25b7c4);
    background: linear-gradient(to right, #25c481, #25b7c4);
  }*/
</style>
