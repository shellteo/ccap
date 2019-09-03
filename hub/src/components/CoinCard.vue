<template>
  <div :class="{ disabled: !coinName, summary: true }">
    <a @click="redirectToService">
      <s-media v-if="!isLoading && coinName">
        <template slot="left">
          <div
            :style="{ backgroundImage: `url(${logo})`, backgroundColor: color }"
            class="service-image"
          ><!--{{ firstLetterCapitalized }}--></div>
        </template>
        <s-text
          p="1"
          bold
          color="dark-blue smb-break-all"
        >{{ coinName }}</s-text>
        <s-text p="2">
          <span><svg-icon
            icon-class="date"
            style="color: #17181e" /> {{ period }}</span>
          <span style="margin-left: 20px;"><svg-icon
            icon-class="star"
            style="color: #17181e" /> {{ rating }}</span>
        </s-text>
        <div
          v-tags
          v-if="tags"
        >
          <topic-tag
            v-for="(t, i) in tags"
            :key="i"
            :style="{ backgroundColor: t.bgColor, color: t.color }"
            @click.native.stop="changeSearch(t.param, t.data)"
          >{{ t.text }}</topic-tag>
        </div>
      </s-media>
      <s-media v-else-if="isLoading">
        <template slot="left">
          <div class="loading-shimmer service-image" />
        </template>
        <div class="loading-shimmer title" />
        <div class="loading-shimmer description" />
        <div class="loading-shimmer tags" />
      </s-media>
    </a>
  </div>
</template>

<script scoped>
import md5 from 'crypto-js/md5'
import { beautyTime } from '@/utils'
import moment from 'moment'

export default {
  props: {
    /* title: {
      type: String,
      default: undefined
    },
    description: {
      type: String,
      default: undefined
    },
    tags: {
      type: Array,
      default: undefined
    }, */
    coin: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    logo () {
      return `${this.apis.IMG_URL}${this.coin.logo}?x-oss-process=image/resize,w_72`
    },
    rating () {
      return this.coin.rating || 'n/a'
    },
    coinName () {
      return this.coin.coin_name
    },
    description () {
      return this.coin.init_price
    },
    period () {
      let start = beautyTime(this.coin.start)
      let end = beautyTime(this.coin.end)
      return `${start} - ${end}`
    },
    tags () {
      const now = moment().unix()
      const { start, end, belong, launchpad, platform } = this.coin
      let status = 'n/a'
      let statusParams = {
        param: 'status'
      }
      const statusOptions = {
        ongoing: {
          text: '进行中',
          bgColor: '#00C697',
          color: '#FFFFFF',
          data: 'ongoing',
          ...statusParams
        },
        upcoming: {
          text: '未开始',
          bgColor: '#FFA94D',
          color: '#FFFFFF',
          data: 'upcoming',
          ...statusParams
        },
        ended: {
          text: '已结束',
          bgColor: '#88CA7',
          color: '#888CA7',
          data: 'ended',
          ...statusParams
        }
      }
      let ixoParams = {
        param: 'c'
      }
      const ixoOptions = [{
        text: 'ICO',
        bgColor: '#f5f5f5',
        color: '#888CA7',
        data: 'ICOs',
        ...ixoParams
      }, {
        text: 'STO',
        bgColor: '#f5f5f5',
        color: '#888CA7',
        data: 'STOs',
        ...ixoParams
      }, {
        text: 'IEO',
        bgColor: '#f5f5f5',
        color: '#888CA7',
        data: 'IEOs',
        ...ixoParams
      }]
      if (now < start) status = statusOptions.upcoming
      if (now > start && now < end) status = statusOptions.ongoing
      if (now > end) status = statusOptions.ended
      let pl = belong === 2 ? launchpad || platform || 'n/a' : platform || launchpad || 'n/a'
      return [status, { text: pl, bgColor: '#f5f5f5', color: '#888CA7' }, ixoOptions[belong]]
    },
    color: function () {
      const randomNumFromTitle = md5(this.coinName).words[0]
      const numBetweenZeroAndOne = Math.abs(randomNumFromTitle) / 2147483647
      const hue = numBetweenZeroAndOne * 360
      return `hsla(${hue}, 45%, 65%, 1)`
    },
    firstLetterCapitalized: function () {
      return this.coinName && this.coinName.slice(0, 1).toUpperCase()
    },
    isLoading: function () {
      return !this.coinName
    }
  },
  methods: {
    redirectToService: function () {
      console.log(this.coin)
      if (this.coin.symbol) {
        this.$router.push({
          name: 'coin', params: { symbol: this.coin.symbol }
        })
      }
      /* if (this.coinName) {
        this.$router.push({ path: (this.isAlias ? `/service/` : '/r/') + this.title })
      } */
    },
    changeSearch: function (param, data) {
      console.log(param, data)
      if (param) {
        if (this.$route.query[param] !== data) {
          this.$router.push({ name: 'services', query: { [param]: data } })
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.service-image {
  min-width: 4.5rem;
  height: 4.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6em;
  color: white;
}

.tags {
  margin-top: 0.75rem;
}

.loading-shimmer {
  margin-bottom: 0.8em;

  &.service-image {
    border-color: transparent;
  }

  &.title {
    width: 200px;
    height: 16px;
  }

  &.description {
    width: 250px;
    height: 11px;
  }

  &.tags {
    margin-top: 1.4em;
    width: 100px;
    height: 1em;
  }
}
</style>
