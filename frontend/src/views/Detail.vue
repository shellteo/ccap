<template>
  <div class="detail-page">
    <van-nav-bar title="BTT"
                 left-text="返回"
                 left-arrow fixed :z-index="3"
                 @click-left="$router.push({path: '/'})"/>
    <div class="detail-container">
      <!--<div class="image-container">
        <img :src="'https://crypto-ycy.oss-cn-shanghai.aliyuncs.com' + girl.imageLink" alt="" class="ycy">
      </div>-->
      <ve-line :data="chartData"></ve-line>
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
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
          { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
          { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
          { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
          { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
          { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
        ]
      }
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
        console.log(res);
      })
    },
    get_coin_history() {
      this.$axios.get(`${this.apis.get_coin_history}/BLOC/2019-04-22/2019-04-23/100`).then((res) => {
        console.log(res);
      })
    }
  },
  mounted() {
    this.ieoId = this.$route.params.id;
    this.get_coin('IZI');
    this.get_coin_history();
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
