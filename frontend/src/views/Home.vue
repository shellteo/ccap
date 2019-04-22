<template>
  <div class="home-page">
    <van-nav-bar title="list" @click-left="sidebarShow = true" @click-right="login" fixed :z-index="3">
      <van-icon name="wap-nav" slot="left" size="1.2rem"/>
      <span slot="right">
                <span v-if="!isLogin">登录</span>
                <van-icon v-else name="user-o" size="1.2rem"/>
            </span>
    </van-nav-bar>
    <div class="home-main">
      <section>
        <div class="tbl-header">
          <table cellpadding="0" cellspacing="0" border="0">
            <thead>
            <tr>
              <th style="width: 50%;text-align: left;">IEO名称</th>
              <th style="width: 30%;">起止时间</th>
              <th style="width: 20%;">评分</th>
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
    box-sizing: border-box;
    //background-color: #f2f3f5;
  }
  .sidebar {
    height: 100%;
    width: 50%;
    .container {
      margin-top: 30px;
    }
  }
  .home-main {
    position: relative;
    padding: 46px 0;
    box-sizing: border-box;
    .ieo-table-header {
      table-layout: fixed;
      margin-bottom: 0;
    }
    .ieo-table-body {
      table-layout: fixed
    }
  }
  .aTag {
    color: #1989fa;
    font-size: 12px;
  }
</style>
<style lang="scss">
  table{
    width:100%;
    table-layout: fixed;
  }
  .tbl-header{
    background-color: rgba(0,0,0,0.3);
  }
  .tbl-content{
    height:300px;
    overflow-x:auto;
    margin-top: 0;
  }
  th{
    padding: 20px 15px;
    font-weight: 500;
    font-size: 12px;
    color: #000;
    text-transform: uppercase;
    text-align: center;
  }
  td{
    padding: 15px;
    text-align: center;
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
