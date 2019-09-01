<template>
  <div class="smb-comment">
    <section class="smb-rating">
      <h3>{{ coin.rating || 'n/a' }}</h3>
      <star-rating
        v-model="displayRating"
        :round-start-rating="false"
        :show-rating="false"
        :read-only="true"
        :star-size="20"
        inactive-color="#DADADA"
        active-color="#FFB42D"/>
    </section>
    <div
      class="is-divider"
      data-align="right"/>
    <section class="smb-comment-list">
      <h2>
        评论
        <a
          class="write-comment"
          @click="showDialog = true">
          <svg-icon
            icon-class="pen"
            class="smb-icon" />
          写评论
        </a>
      </h2>
      <ul>
        <CommentCard
          v-for="item in commentList"
          :key="item.id"
          :comment="item"
          class="smb-comment-card"/>
        <div
          v-if="showLoadMore"
          style="text-align: center;margin-top: 20px;">
          <s-button
            state="secondary"
            size="small"
            @click="loadMore">查看更多</s-button>
        </div>
        <div
          v-if="commentList.length <= 0"
          class="smb-no-data">
          <div>暂无评论☹️</div>
        </div>
      </ul>
    </section>
    <md-dialog
      :md-active.sync="showDialog"
      :md-fullscreen="false"
      @md-closed="closeWriteDialog">
      <md-dialog-title><svg-icon
        icon-class="pen"
        class="smb-icon" /> 写评论</md-dialog-title>
      <div class="comment-textarea">
        <star-rating
          :show-rating="false"
          v-model="rating"
          :round-start-rating="false"
          :star-size="24"
          inactive-color="#DADADA"
          active-color="#FFB42D"/>
        <md-field>
          <label>输入你的评论...</label>
          <md-textarea v-model="content" />
          <span class="md-helper-text">{{ content.length }}/300</span>
          <span class="md-error">There is an error</span>
        </md-field>
      </div>
      <md-dialog-actions>
        <md-button
          class="md-raised md-primary"
          @click="postComment">提交</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'
import CommentCard from './CommentCard'

export default {
  name: 'Comment',
  components: {
    StarRating,
    CommentCard
  },
  props: {
    coin: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      commentList: [],
      showDialog: false,
      content: '',
      symbol: '',
      rating: 0,
      showLoadMore: false,
      count: 0,
      pageIndex: 1
    }
  },
  computed: {
    displayRating () {
      const { rating } = this.coin
      if (!rating || rating === 'n/a') {
        return 0
      }
      return Number(rating)
    }
  },
  mounted () {
    const symbol = this.$route.params.symbol
    this.symbol = symbol
    this.getComments(symbol)
  },
  methods: {
    async getComments (symbol, pageIndex = 1) {
      const pageSize = 10
      this.$axios.get(this.apis.comment, {
        params: {
          pageSize,
          pageIndex,
          symbol
        }
      }).then((res) => {
        if (res.code === 0) {
          const { count, rows } = res.data
          this.showLoadMore = pageIndex * pageSize < count
          if (pageIndex === 1) {
            this.count = res.data.count
            this.commentList = rows || []
          } else {
            this.commentList.push(...rows)
          }
        }
      })
    },
    async loadMore () {
      this.pageIndex += 1
      this.getComments(this.symbol, this.pageIndex)
    },
    async postComment () {
      const { symbol, rating, content } = this
      const res = await this.$axios.post(this.apis.comment, {
        symbol,
        rating,
        content
      })
      if (res.code === 0) {
        this.$notify({
          group: 'smb',
          type: 'success',
          title: '评论发表成功'
        })
        this.showDialog = false
        this.getComments(this.symbol)
      } else {
        this.$notify({
          group: 'smb',
          type: 'error',
          title: `评论发表失败`
        })
      }
    },
    async closeWriteDialog () {
      this.content = ''
      this.rating = 0
    }
  }
}
</script>
<style lang="scss" scoped>
.comment-textarea {
  padding: 0 10px;
}
.smb-rating {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.smb-comment {
  .smb-comment-card:not(:last-of-type) {
    margin-bottom: 10px;
  }
}
.smb-comment-list {
  h2 {
    color: #818181;
    margin: 0 0 15px;
    font-size: 15px;
    line-height: 24px;
    font-weight: 700;
  }
  .write-comment {
    float: right;
    color: #C0C0C0;
    font-size: 13px;
    line-height: 21px;
    display: flex;
    align-items: center;
    font-weight: 400;
    .smb-icon {
      margin-right: 5px;
    }
  }
}
</style>
