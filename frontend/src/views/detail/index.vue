<template>
  <div class="detail-page">
    <van-nav-bar title="BTT"
                 left-text="返回"
                 left-arrow fixed :z-index="3"
                 @click-left="$router.push({path: '/'})"/>
    <div class="detail-container">
      <!--红跌绿涨，参考：https://coinmarketcap.com/currencies/bitcoin/、https://m.feixiaohao.com/currencies/topnetwork/-->
      <div>
        <h1></h1>
        <p>最新价：${{coinInfo.last_price_usd}}</p>
        <p>24H跌涨：{{parseFloat(coinInfo.price_change_1D_percent)}}%</p>
        <p>24H高：${{coinInfo.price_high_24_usd}}</p>
        <p>24H低：${{coinInfo.price_low_24_usd}}</p>
        <p>24H额：${{coinInfo.volume_24_usd}}</p>
      </div>
      <div id="myChart" :style="{width: '100%', height: '100px'}"></div>
      <van-tabs v-model="active">
        <van-tab title="简况">
          <div class="box-container">
            <div class="cell-container">
              积木云是全球首个基于区块链技术的互联网底层协议体系，致力于升级和改造现有互联网，让生活更美好。 积木云于2018年7月获得全球28个国家和地区的100余家知名投资机构投资。由科学家级的团队组成，团队成员来自普林斯顿、清华、北大等高校，成员超过50%拥有博士学位，并且拥有诺贝尔经济学奖得主Oliver Hart担任经济顾问和白宫经济顾问委员会经济学家Hoan Soo Lee作为项目顾问。
            </div>
            <van-cell-group>
              <van-cell title="币种名称" label="BlockCloud" value="BLOC"/>
              <van-cell title="上线交易所">
                <template slot="right-icon">OKEX</template>
              </van-cell>
              <van-cell title="交易所平台" is-link>
                <template slot="right-icon">jumpstart</template>
              </van-cell>
              <van-cell title="IEO时间">
                <template slot="label">2019.03.27 21:00:00- 2019.03.27 22:00:00</template>
              </van-cell>
            </van-cell-group>
          </div>
          <div class="box-container">
            <van-cell>
              <template slot="title">
                <b>相关连接</b>
              </template>
            </van-cell>
            <div class="cell-container">
              <van-button plain type="default">
                  <van-icon class-prefix="my-icon" name="home"/>官网
              </van-button>
              <van-button plain type="default">
                  <van-icon class-prefix="my-icon" name="rocket"/>发售平台
              </van-button>
              <van-button plain type="default">
                  <van-icon class-prefix="my-icon" name="book"/>白皮书
              </van-button>
              <van-button plain type="default">
                  <van-icon class-prefix="brand" name="telegram"/>电报群
              </van-button>
            </div>
          </div>
        </van-tab>
        <van-tab title="评论">
          <div class="box-container">
            <van-cell>
              <template slot="title">
                <span class="custom-text">评论(112)</span>
              </template>
              <van-button slot="right-icon" plain hairline type="danger" size="small" @click="commentShow = true">查看全部</van-button>
            </van-cell>
            <div class="comments-wrap">
              <CommentCard v-for="(item, i) in commentList" :key="i" :comment="item"></CommentCard>
            </div>
          </div>
        </van-tab>
        <van-tab title="资讯">
          <div class="box-container">
            <van-cell>
              <template slot="title">
                <span class="custom-text">资讯(112)</span>
              </template>
              <van-button slot="right-icon" plain hairline type="danger" size="small" @click="commentShow = true">查看全部</van-button>
            </van-cell>
            <div class="comments-wrap">
              <CommentCard v-for="(item, i) in commentList" :key="i" :comment="item"></CommentCard>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <van-goods-action>
      <van-goods-action-mini-btn
              :info="girl.likeCount"
              icon="like"
              info="5"
              text="已喜欢"
      />
      <van-goods-action-big-btn
              text="查看IEO规则"
      />
      <van-goods-action-big-btn
              primary
              disabled
              text="未开始"
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
      coinInfo: {},
      xData: [],
      yData: [],
      symbol: 'TOP2'
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
    async get_coin(symbol) {
      await this.$axios.get(`${this.apis.get_coin}/${symbol}`).then((res) => {
        this.coinInfo = res.data;
      })
    },
    async get_coin_history(symbol) {
      await this.$axios.get(`${this.apis.get_coin_history}/${symbol}/2019-04-25/2019-04-26/1000`).then((res) => {
        console.log(res);
        let xData = [];
        let yData = [];
        const data = res.data[this.symbol];
        for (let i = 0; i < data.length; i++) {
          xData.push(data[i][0]);
          yData.push(data[i][1]);
        }
        this.xData = xData;
        this.yData = yData;
      })
    },
    drawLine(xData, yData) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        xAxis: {
          type: 'category',
          data: this.xData,
          show: false
        },
        yAxis: {
          type: 'value',
          show: false,
          min: this.coinInfo.price_low_24_usd,
          max: this.coinInfo.price_high_24_usd
        },
        grid: {
          top: '0',
          right: '0',
          bottom: '0',
          left: '0',
        },
        series: [{
          data: this.yData,
          type: 'line',
          symbol: 'none',
          itemStyle: {
            normal: {
              color: '#ccc',
              lineStyle:{
                width: 1
              }
            }
          },
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
  async mounted() {
    this.ieoId = this.$route.params.id;
    await this.get_coin(this.symbol);
    await this.get_coin_history(this.symbol);
    this.drawLine();
  }
}
</script>

<style lang="scss" scoped>
  .detail-page {
    color: #2a2825;
    .cell-container {
      padding: 10px 15px;
      font-size: 14px;
    }
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
