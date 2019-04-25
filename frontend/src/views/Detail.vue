<template>
  <div class="detail-page">
    <div>

    </div>
    <van-nav-bar title="BTT"
                 left-text="返回"
                 left-arrow fixed :z-index="3"
                 @click-left="$router.push({path: '/'})"/>
    <div class="detail-container">
      <!--<div class="image-container">
        <img :src="'https://crypto-ycy.oss-cn-shanghai.aliyuncs.com' + girl.imageLink" alt="" class="ycy">
      </div>-->
      <!--<ve-line :data="chartData" :settings="{}"></ve-line>-->
      <div id="myChart" :style="{width: '100%', height: '400px'}"></div>
      <div class="box-container">
        <van-cell title="币种名称" label="BlockCloud" value="BLOC"/>
        <van-cell title="上线交易所" is-link>
          <template slot="right-icon">
            <a href="https://okex.com">OKEX</a>
          </template>
        </van-cell>
        <van-cell title="交易所平台" is-link>
          <template slot="right-icon">
            <a href="https://www.okex.com/activity/jumpstart">jumpstart</a>
          </template>
        </van-cell>
        <van-cell title="官网" is-link>
          <template slot="right-icon">
            <a href="https://www.jimyun.com/">https://www.jimyun.com/</a>
          </template>
        </van-cell>
        <van-cell title="所有者" label="" />
        <van-cell title="简介" label="" />
      </div>
      <div class="box-container">
        <van-cell>
          <template slot="title">
            <span class="custom-text">村民说(112)</span>
          </template>
          <van-button slot="right-icon" plain hairline type="danger" size="small" @click="commentShow = true">查看全部</van-button>
        </van-cell>
        <div class="comments-wrap">
          <CommentCard v-for="(item, i) in commentList" :key="i" :comment="item"></CommentCard>
        </div>
      </div>
    </div>
    <van-goods-action>
      <van-goods-action-mini-btn
              :info="girl.likeCount"
              icon="like-o"
              text="喜欢"
      />
      <van-goods-action-mini-btn
              :info="commentCount"
              icon="comment-o"
              text="村民说"
              @click="editCommentShow = true"
      />
      <van-goods-action-mini-btn
              icon="share"
              text="分享"
      />
      <van-goods-action-big-btn
              text="燃烧卡路里"
      />
      <van-goods-action-big-btn
              primary
              text="领养"
      />
    </van-goods-action>
    <van-popup v-model="commentShow" position="bottom" class="sidebar">

      <van-nav-bar title="村民说(1212)" @click-left="commentShow = false">
        <van-icon name="cross" slot="left" size="1.2rem"/>
      </van-nav-bar>
      <div class="comment-outer">
        <div class="comments-wrap">
          <CommentCard v-for="(item, i) in commentList" :key="i" :comment="item"></CommentCard>
        </div>
      </div>
    </van-popup>
    <van-dialog
            v-model="editCommentShow"
            title="评论"
            showCancelButton
            @confirm="addComment">
      <van-field
              v-model="comment"
              clearable
              type="textarea"
              autosize
              rows="2"
              placeholder="请输入评论"/>
    </van-dialog>
  </div>
</template>

<script>
import { ImagePreview } from 'vant';
import CommentCard from '@/components/CommentCard'

// 引入基本模板
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

export default {
  name: "Detail",
  components: {
    CommentCard
  },
  data() {
    return{
      commentShow: false,
      ieoId: null,
      girl: {},
      editCommentShow: false,
      comment: '',
      commentCount: 0,
      commentList: [],
      chartData: {
        rows: [1393, 3530, 3530, 2923, 3792]
      },
      coinInfo: {}
    }
  },
  methods: {
    async addComment() {
      this.axios.request({
        url: `${this.apis.comment}/${this.girlId}`,
        method: 'post',
        data: {
          content: this.comment
        }
      }).then(res => {
      })
    },
    get_coin(symbol) {
      this.$axios.get(`${this.apis.get_coin}/${symbol}`).then((res) => {
        console.log(res);
      })
    },
    get_markets(symbol) {
      this.$axios.get(`${this.apis.get_markets_by_coin}/${symbol}`).then((res) => {
        this.coinInfo = res.data;
      })
    },
    get_coin_history(symbol) {
      this.$axios.get(`${this.apis.get_coin_history}/${symbol}/2019-04-23 18:54:00/2019-04-24 18:54:00/100`).then((res) => {
        console.log(res);
        let xData = [];
        let yData = [];
        const data = res.data.BTT;
        for (let i = 0; i < data.length; i++) {
          xData.push(data[i][0]);
          yData.push(data[i][1]*10000);
        }
        this.drawLine(xData, yData);
        console.log(xData, yData);
      })
    },
    drawLine(xData, yData) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        xAxis: {
          type: 'category',
          data: xData,
          //show: false
        },
        yAxis: {
          type: 'value',
          //show: false
        },
        /*grid: {
          top: '0',
          right: '0',
          bottom: '0',
          left: '0',
        },*/
        series: [{
          data: yData,
          type: 'line',
          symbol: 'none',
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgb(255, 158, 68)'
            }, {
              offset: 1,
              color: 'rgb(255, 70, 131)'
            }])
          }
        }]
      });
    }
  },
  mounted() {
    this.ieoId = this.$route.params.id;
    this.get_coin('BTT');
    this.get_coin_history('BTT');
  }
}
</script>

<style lang="scss" scoped>
  .detail-page {
    color: #2a2825;
    .detail-container {
      background-color: #f2f3f5;
      margin-top: 46px;
      margin-bottom: 80px;
      min-height: 100%;
    }
    .image-container {
      height: 300px;
      position: relative;
      overflow: hidden;
      .ycy {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: auto;
        z-index: 1;
        transition-duration: .3s;
        transition-property: all;
        transition-timing-function: ease-out;
        transform: translateZ(0);
      }
    }
    .box-container {
      background-color: #fff;
      margin-top: 10px;
    }
    .comment-container {
      background-color: #fff;
      margin-top: 10px;
    }
    .comment-outer {
      overflow-y: auto;
      height: 100%;
      margin-bottom: 100px;
    }
    .comments-wrap {
      padding-left: 18px;
      padding-right: 18px;
      margin-bottom: 50px;
    }
    .sidebar {
      height: 80%;
      width: 100%;
      overflow: hidden;
    }
    .comment-header {
      padding: 10px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ccc;
      position: absolute;
      width: 100%;
    }
  }
</style>
