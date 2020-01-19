<template>
  <div
    v-scroll-spy
    class="service-container">
    <section>
      <div class="card-bordered">
        <div class="card-bordered-header">
          <s-text
            p="2"
            semi-bold>News
          </s-text>
        </div>
        <div class="card-bordered-content">
          <s-container
            class="is-mobile is-paddingless"
            clean
            centered-v>
            <template>
              <s-div
                size="full"
                padding="none">
                <div
                  v-for="(item, i) in newsList"
                  :key="i"
                  class="main_project">
                  <div class="title">
                    {{ item.from }}
                  </div>
                  <div class="content">
                    <a
                      :href="item.link"
                      target="_blank">
                      {{ item.title }}
                    </a>
                    <span>{{ item.media }}</span>
                  </div>
                  <!--<div class="time">今天</div>-->
                </div>
                <div
                  v-if="newsList.length <= 0"
                  class="smb-no-data">
                  <div>No Data☹️</div>
                </div>
              </s-div>
            </template>
          </s-container>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'News',
  data () {
    return {
      newsList: []
    }
  },
  mounted () {
    this.getNews(this.$route.params.symbol)
  },
  methods: {
    async getNews (symbol) {
      this.$axios.get(`${this.apis.news}/${symbol}`).then((res) => {
        console.log(res)
        this.newsList = res.data || []
      })
    }
  }
}
</script>
<style scoped lang="scss">
.main_project {
  width: 100%;
  border-bottom: 1px solid #f0f2f9;
  padding: 10px 0;
  .title {
    height: 20px;
    margin-bottom: 2px;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 700;
    color: #333;
    span:first-child {
      display: inline-block;
      width: 16px;
      height: 16px;
      margin-right: 8px;
      img {
        width: 16px;
        height: 16px;
        font-size: 14px;
        line-height: 15px;
      }
    }
    span:last-child {
      color: #333;
      font-size: 14px;
      font-weight: 500;
      .social {
        color: #84929c;
        display: inline;
        font-size: 12px;
      }
    }
  }
  .content {
    width: 100%;
    margin: 5px 0;
    a {
      color: #333;
      font-size: 14px;
    }
    span {
      background: linear-gradient(225deg, rgb(156, 142, 164) 0%, rgb(117, 103, 123) 100%);
      display: inline-block;
      height: 18px;
      border-radius: 2px;
      padding: 0 6px;
      line-height: 16px;
      color: #fff;
      font-size: 12px;
    }
  }
  .time {
    color: #84929c;
    font-size: 12px;
    margin-top: 7px;
  }
}
</style>
