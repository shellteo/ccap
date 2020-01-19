<template>
  <li class="">
    <div class="desc">
      <a href="/people/49290419/">
        <img
          :onerror="defaultAvatar"
          :src="avatar"
          :alt="username">
      </a>
      <div class="user-info">
        <span
          :title="username"
          class="user-name">{{ username }}</span>
      </div>
      <div class="user-info">
        <star-rating
          v-model="rating"
          :show-rating="false"
          :read-only="true"
          :star-size="14"
          inactive-color="#DADADA"
          active-color="#FFB42D"/>
        <span class="date">{{ friendlyDate }}</span>
      </div>
    </div>
    <div class="comment-content">
      <p class="LinesEllipsis">{{ isExpand ? content : ellipsisContent }}<span
        v-if="isLong && !isExpand"
        class="LinesEllipsis-ellipsis">... </span><span
          v-if="isLong && !isExpand"
          class="LinesEllipsis-readmore"
          @click="isExpand = true">展开</span>
      </p>
    </div>
    <div class="btn-info">
      <!--<div class="like-div">
        <md-button
          class="md-icon-button md-dense"
          @click="isLiked = true">
          <svg-icon
            :class="isLiked ? 'blue' : 'gray'"
            icon-class="like"/>
        </md-button>
        <span :class="[ 'text', isLiked ? 'blue' : 'gray']" >123</span>
      </div>-->
      <div class="smb-like-btn">
        <span @click="likeComment">
          <svg-icon
            :class="isLiked ? 'blue' : 'gray'"
            icon-class="like"/>
          <span :class="[ 'text', isLiked ? 'blue' : 'gray']">{{ likeNum }}</span>
        </span>
      </div>
      <!--<div class="ic-btn ic-btn-more   right"/>-->
    </div>
  </li>
</template>

<script>
import StarRating from 'vue-star-rating'
import moment from 'moment'
import { isNDaysAgo } from '@/utils'
import { mapGetters } from 'vuex'
export default {
  name: 'CommentCard',
  components: {
    StarRating
  },
  props: {
    comment: {
      type: Object,
      default: () => {
      }
    }
  },
  data () {
    return {
      defaultAvatar: `this.src="${'https://max-well.oss-cn-shanghai.aliyuncs.com/avatar.svg'}"`,
      isExpand: false
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn']),
    isLiked: {
      get () {
        return this.comment.islike
      },
      set (v) {
        this.comment.islike = v
      }
    },
    likeNum: {
      get () {
        return this.comment.liked
      },
      set () {
        this.comment.liked += 1
      }
    },
    friendlyDate () {
      const time = moment(this.comment.createTime * 1000)
      // const time = moment(newTime.getTime() - newTime.getTimezoneOffset()
      //              * 60000);// 返回的数据带了时区
      return isNDaysAgo(2, time) ? time.format('MMMDo HH:mm') : time.fromNow()
    },
    avatar () {
      return `${this.apis.IMG_URL}${this.comment.avatar}`
    },
    username () {
      return this.comment.nickname || this.comment.email
    },
    content () {
      return this.comment.content
    },
    rating () {
      return this.comment.rating
    },
    ellipsisContent () {
      return this.content.substr(0, 56)
    },
    isLong () {
      return this.content.length > 56
    }
  },
  mounted () {

  },
  methods: {
    async likeComment () {
      if (!this.isLoggedIn) {
        this.$store.commit('setLoginModal', true)
        return
      }
      if (this.isLiked) {
        this.$notify({
          group: 'smb',
          type: 'warning',
          title: `你已经点过赞了`
        })
        return
      }
      const res = await this.$axios.post(`${this.apis.likeComment}/${this.comment.id}`)
      if (res.code === 0) {
        this.likeNum += 1
        this.isLiked = true
      } else {
        this.$notify({
          group: 'smb',
          type: 'error',
          title: `点赞失败`
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
/*@import '~vue-material/dist/vue-material.min.css';
@import '~vue-material/dist/theme/default.css';*/

li {
  position: relative;
  word-wrap: break-word;
  overflow: hidden;
  .desc {
    font-size: 0;
    line-height: normal;
    margin-bottom: 5px;
    color: #494949;
    position: relative;
    z-index: 1;
    >a {
      display: inline;
      overflow: hidden;
      text-decoration: none;
      color: #494949;
      img {
        width: 30px;
        border-radius: 50%;
        vertical-align: text-top;
        margin-right: 10px;
        background-color: #cccccc;
        float: left;
      }
    }
    .user-info {
      margin-left: 30px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .user-name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 15px;
        display: inline-block;
        vertical-align: middle;
        margin-right: 5px;
        line-height: 21px;
      }
      .rating-stars {
        vertical-align: middle;
        line-height: 1;
      }
      .date {
        font-size: 11px;
        color: #c0c0c0;
        display: inline-block;
        vertical-align: middle;
        position: relative;
        z-index: 1;
        top: 2px;
        margin-left: 5px;
        line-height: 21px;
      }
    }
  }
  .comment-content {
    margin-left: 40px;
    p {
      line-height: 21px;
      color: #494949;
      white-space: pre-wrap;
      padding-right: 0;
      font-size: 15px;
    }
  }
  .btn-info {
    height: 22px;
    margin-top: 10px;
    margin-left: 40px;
    font-size: 15px;
    // margin-left: 12px;
    .ic-btn.left {
      float: left;
    }
    .ic-btn.right {
      float: right;
    }
    .ic-btn .text {
      color: #ccc;
      margin-left: 3px;
      position: relative;
      left: 0;
      top: -3px;
      font-size: 14px;
    }
    .smb-like-btn {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      cursor: pointer;
      .gray {
        color: #ccc;
      }
      .blue {
        color: #42bd56
      }
      .text {
        margin-left: 5px;
      }
    }
    /*.ic-btn-like::before {
      background-image: url(../../../src/assets/ic_like_gray.svg);
    }
    .ic-btn::before {
      content: '';
      width: 20px;
      height: 20px;
      background-position: center center;
      background-repeat: no-repeat;
      display: inline-block;
      margin-bottom: -2px;
    }
    .ic-btn-more::before {
      background-image: url(../../../src/assets/more.svg);
    }*/
  }
}
.like-div {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .gray {
    color: #828AA1;
  }
  .blue {
    color: #42bd56
  }
  .text {
    margin-left: -5px;
  }
}
.LinesEllipsis-readmore {
  color: rgb(66, 189, 86);
  cursor: pointer;
}
</style>
