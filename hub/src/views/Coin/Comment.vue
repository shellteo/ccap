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
          @click="handleWriteComment">
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
        <md-field :class="getValidationClass('content')">
          <label>输入你的评论...</label>
          <md-textarea
            v-model="content"
            @blur="$v.content.$touch"/>
          <span class="md-helper-text">{{ content.length }}/300</span>
          <span
            v-if="!$v.content.required"
            class="md-error">请输入评论</span>
          <span
            v-else-if="!$v.content.minLength || !$v.content.maxLength"
            class="md-error">评论长度为6 ~ 300</span>
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
import gtMixin from '@/mixins/Geetest'
import { mapGetters } from 'vuex'
import { validationMixin } from 'vuelidate'
import {
  required,
  minLength,
  maxLength
} from 'vuelidate/lib/validators'

export default {
  name: 'Comment',
  components: {
    StarRating,
    CommentCard
  },
  mixins: [gtMixin, validationMixin],
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
  validations: {
    content: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(300)
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn']),
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
    confirmComment (gt) {
      const { symbol, rating, content } = this
      this.$axios.post(this.apis.comment, {
        symbol,
        rating,
        content,
        geetest_challenge: gt.geetest_challenge,
        geetest_validate: gt.geetest_validate,
        geetest_seccode: gt.geetest_seccode
      }).then((res) => {
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
      })
    },
    postComment () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.registerInitGT(this.confirmComment)
      }
    },
    async closeWriteDialog () {
      this.content = ''
      this.rating = 0
    },
    handleWriteComment () {
      if (!this.isLoggedIn) {
        this.$store.commit('setLoginModal', true)
      } else {
        this.showDialog = true
      }
    },
    getValidationClass (fieldName) {
      const field = this.$v[fieldName]
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
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
