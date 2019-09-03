<template>
  <div class="coin-detail">
    <s-layout
      background="gray-4"
    >
      <s-container centered-h>
        <s-div
          size="three-quarters"
        >
          <s-layout
            background="gray-4"
            foreground="white"
            narrow
            rounded
            shadow
            margin="normal"
            class="top-left-div"
          >
            <s-container>
              <s-div
                size="full"
                padding="normal"
                class="bordered-bottom-light"
              >
                <s-breadcrumbs
                  :items="breadcrumbs"
                  class="always-clickable" />
              </s-div>
              <s-div
                :padding="['2x', '1x']"
                size="full"
              >
                <s-media class="has-content-centered">
                  <div
                    slot="left"
                    :class="['image', 'service-avatar', 'empty']"
                  >
                    <img
                      :src="coinLogo"
                      class="smb-logo"
                      alt="service icon"
                    >
                  </div>
                  <s-text
                    :class="['smb-break-all', {'loading-shimmer': !coinName}]"
                    head="3">
                    {{ coinName }}
                  </s-text>
                  <a
                    v-if="coinWebsite.link"
                    :href="coinWebsite.link"
                    :class="['has-text-weight-semibold', 'has-spans', {'loading-shimmer': !coinWebsite.host}]"
                    target="_blank"
                  >
                    <svg-icon
                      icon-class="link"
                      style="color: #50536b" />
                  <span class="has-text-gray-2 is-size-6">{{ coinWebsite.host }}</span></a>
                  <template slot="right">
                    <div class="smb-tags">
                      <span
                        v-for="(tag, i) in coinTags"
                        :key="i"
                        class="tags">
                        <s-tag
                          :color="tag.bgColor"
                          outline
                        >{{ tag.text }}</s-tag>
                      </span>
                    </div>
                  </template>
                </s-media>
              </s-div>
              <s-div
                size="full"
              >
                <div
                  class="is-divider contributors"
                  data-align="right"
                  data-content="CONTRIBUTOR">
                  <!--               v-for="i in 3"
                  :key="`contributor-${_uid}-${i}`" -->
                  <figure
                    class="image is-32x32 is-avatar">
                    <img
                      src="https://max-well.oss-cn-shanghai.aliyuncs.com/smbzdm/logo.jpg"
                      alt="">
                  </figure>
                </div>
              </s-div>
              <s-div
                :padding="['small', 'normal']"
                size="full"
              >
                <!--<p class="service-license">Version {{ latestVersion }} - License {{ license }}</p>-->
                <p
                  class="service-license"
                  v-html="coinDesc"/>
                <div class="smb-socials">
                  <s-tag
                    v-for="(link, social) in coinSocial"
                    :key="social"
                    outline>
                    <a
                      :href="link"
                      target="_blank"
                      class="smb-a">
                      <svg-icon
                        :icon-class="social"
                        class="smb-social-icon" />
                      <span>{{ social }}</span>
                    </a>
                  </s-tag>
                </div>
              </s-div>
            </s-container>
          </s-layout>

          <s-layout
            :margin="['normal']"
            rounded
            narrow
            shadow
            background="gray-4"
            foreground="white"
            class="bottom-left-div"
          >
            <s-container>
              <s-div
                size="one-quarter"
                padding="normal"
                class="has-background-lighter sticky left-sidebar"
              >
                <ul
                  v-scroll-spy-active
                  v-scroll-spy-link
                  class="topics-list"
                >
                  <li
                    :class="['topic-item', {active: moduleActive === 'overview'}]"
                    @click="moduleActive='overview'">概览</li>
                  <li
                    :class="['topic-item', {active: moduleActive === 'stage'}]"
                    @click="moduleActive='stage'">过程</li>
                  <li
                    :class="['topic-item', {active: moduleActive === 'news'}]"
                    @click="moduleActive='news'">新闻资讯</li>
                </ul>
              </s-div>

              <s-div
                size="three-quarters"
                padding="medium"
              >
                <s-container
                  clean
                  centered-h>
                  <s-div size="10">
                    <Overview
                      ref="overview"
                      :coin="coin"/>
                    <Stage style="margin-top: 32px;" />
                    <News style="margin-top: 32px;" />
                  </s-div>
                </s-container>
              </s-div>
            </s-container>
          </s-layout>
        </s-div>
        <s-div
          size="one-quarter"
        >
          <s-layout
            background="gray-4"
            foreground="white"
            narrow
            rounded
            shadow
            margin="normal"
            class="right-full-div"
          >
            <s-container>
              <s-div
                size="full"
                padding="normal"
                class="bordered-bottom-light"
              >
                <Comment :coin="coin" />
              </s-div>
            </s-container>
          </s-layout>
        </s-div>
      </s-container>
    </s-layout>
  </div>
</template>

<script>
import { ServiceQuery, ServiceByOwnerAndRepoQuery, ServiceRepositoryQuery } from '@/plugins/graphql'
import moment from 'moment'
import { getHost } from '@/utils'
import Overview from './Overview'
import Stage from './Stage'
import News from './News'
import Comment from './Comment'

export default {
  name: 'Coin',
  components: {
    Overview,
    Stage,
    News,
    Comment
  },
  provide () {
    return {
      commands: () => this.commands,
      tags: () => this.tags,
      serviceName: () => this.serviceName,
      numCommands: () => this.numCommands,
      alias: () => this.alias,
      owner: () => this.owner,
      repo: () => this.repo
    }
  },
  props: {
    repo: {
      type: String,
      default: undefined
    },
    alias: {
      type: String,
      default: undefined
    },
    owner: {
      type: String,
      default: undefined
    }
  },
  apollo: {
    serviceByAlias: {
      query: ServiceQuery,
      skip: function () {
        return !this.alias
      },
      variables: function () {
        return {
          where: this.alias
        }
      },
      update: function (data) {
        return data.serviceByAlias
      }
    },
    getServiceRepository: {
      query: ServiceRepositoryQuery,
      skip: function () {
        return !this.serviceByAlias && !this.serviceByOwnerAndRepo
      },
      variables: function () {
        return {
          uuid: this.service.uuid
        }
      },
      update: function (data) {
        return data.getServiceRepository
      }
    },
    serviceByOwnerAndRepo: {
      query: ServiceByOwnerAndRepoQuery,
      skip: function () {
        return !this.owner && !this.repo
      },
      variables: function () {
        return {
          owner: this.owner,
          repo: this.repo
        }
      },
      update: function (data) {
        return (
          data.allOwners.nodes.length > 0 &&
          data.allOwners.nodes[0].services.nodes.length > 0 &&
          data.allOwners.nodes[0].services.nodes[0]
        )
      }
    }
  },
  data: () => ({
    serviceByAlias: undefined,
    serviceByOwnerAndRepo: undefined,
    getServiceRepository: undefined,
    coin: {},
    symbol: '',
    moduleActive: 'overview'
  }),
  computed: {
    service: function () {
      return this.serviceByAlias || this.serviceByOwnerAndRepo || {}
    },
    getServiceURI: function () {
      return !this.getServiceRepository ? '' : `${this.getServiceRepository.ownerName}/${this.getServiceRepository.repoName}`
    },
    getServicePath: function () {
      const slice = this.$route.name === 'service' ? 0 : -(this.$route.name.length + 1)
      return this.$route.path.slice(0, slice)
    },
    getServiceBaseURI: function () {
      const services = { GITHUB: 'github.com' }
      let uri = this.getServiceRepository && Object.keys(services).includes(this.getServiceRepository.service) ? services[this.getServiceRepository.service] : ''
      return uri
    },
    getHashArray: function () {
      return (((this.$route.hash[0] === '#' ? this.$route.hash : `#${this.$route.hash}`) || '').split('#') || ['', ''])[1].split('-')
    },
    serviceName: function () {
      if (
        !this.service.alias &&
        (!this.service || !this.service.owner)
      ) {
        return ''
      }
      return (
        this.service.alias ||
        `${this.service.owner.username}/${this.service.name}`
      )
    },
    numCommands: function () {
      return Object.keys(this.commands).length
    },
    commands: function () {
      return (
        (this.service &&
          this.service.serviceTags &&
          this.service.serviceTags.nodes &&
          this.service.serviceTags.nodes.length > 0 &&
          this.service.serviceTags.nodes[0].configuration.actions) ||
        {}
      )
    },
    tags: function () {
      return (
        (this.service &&
          this.service.serviceTags &&
          this.service.serviceTags.nodes) ||
        []
      )
    },
    license: function () {
      return ((this.tags && this.tags.length > 0 &&
                this.tags[0].configuration &&
                this.tags[0].configuration.info &&
                this.tags[0].configuration.info.license &&
                this.tags[0].configuration.info.license.name) || undefined)
    },
    latestVersion: function () {
      return ((this.tags && this.tags.length > 0 &&
          this.tags[0].configuration &&
          this.tags[0].configuration.info &&
          this.tags[0].configuration.info.version) || undefined)
    },
    breadcrumbs: function () {
      let arr = [{ name: '首页', to: { name: 'services' } }, { name: 'ICO' }, { name: this.symbol }]
      return arr
    },
    coinLogo () {
      return `${this.apis.IMG_URL}${this.coin.logo}?x-oss-process=image/resize,w_80`
    },
    coinName () {
      return this.coin.coin_name || 'ZZZ'
    },
    coinTags () {
      const now = moment().unix()
      const { start, end } = this.coin
      let status = 'n/a'
      const statusOptions = {
        ongoing: {
          text: '进行中',
          bgColor: 'success',
          color: 'success'
        },
        upcoming: {
          text: '未开始',
          bgColor: 'primary',
          color: 'primary'
        },
        ended: {
          text: '已结束',
          bgColor: 'danger',
          color: 'danger'
        }
      }
      if (now < start) status = statusOptions.upcoming
      if (now > start && now < end) status = statusOptions.ongoing
      if (now > end) status = statusOptions.ended
      return [status]
    },
    coinDesc () {
      return this.coin.description
    },
    coinSocial () {
      const { social } = this.coin
      if (social === '[]') {
        return {}
      } else {
        let result = {}
        try {
          result = JSON.parse(social)
        } catch (e) {
          result = {}
        }
        return result
      }
    },
    coinWebsite () {
      return {
        link: this.coin.website,
        host: getHost(this.coin.website)
      }
    }
  },
  watch: {
    '$route': 'onMounted',
    serviceByAlias: function (newValue) {
      if (!newValue) this.$router.push('/404')
    },
    serviceByOwnerAndRepo: function (newValue) {
      if (!newValue) this.$router.push('/404')
    }
  },
  mounted: function () {
    // this.onMounted()
    const symbol = this.$route.params.symbol
    this.symbol = symbol
    this.getCoinDetail(symbol)
  },
  methods: {
    async getCoinDetail (symbol) {
      this.$axios.get(`${this.apis.coin}/${symbol}`, { loading: true }).then((res) => {
        this.coin = res.data || {}
        this.$refs.overview.drawPie(this.coin.distribution)
      })
    },
    onMounted: function () {
      if (!this.alias && !this.owner && !this.repo) {
        this.$router.push('/404')
      }
    },
    getHash: function (idx) {
      let hash = ((this.$route.hash || '').split('#') || ['', ''])[1].split('-')
      hash.splice(idx + 1)
      return hash.join('-')
    }
  }
}
</script>
<style lang="scss" scoped>
.smb-logo {
  border-radius: 10px;
}
</style>
<style lang="scss">
@import "~@storyscript/vue/src/scss/variables/index";

.service-license {
  font-size: nth($sizes, 7);
  color: nth($grays, 2);
  font-weight: 600;
}

.service-stats {
  p {
    margin-bottom: 0.5rem;
  }
}

.overlay-space-evenly {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
}

.service-avatar {
  width: 5rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  &:not(.empty) {
    background-color: $light;
    border-radius: 0.625rem;
    border: 1px solid nth($grays, 4);
    padding: 1rem;
    object-fit: contain;
  }
}
@media screen and (min-width: 1024px) {
  .top-left-div, .bottom-left-div {
    .container.has-padding-none {
      padding-left: 0;
    }
  }
  /* .top-left-div, .bottom-left-div, .right-full-div {
    padding-top: 1.5rem;
  }*/
  .bottom-left-div {
    padding-bottom: 5rem;
  }
  .right-full-div {
    .container.has-padding-none {
      padding-left: 0;
      padding-right: 0;
    }
  }
}

.smb-tags {
  display: flex;
  .tags {
    margin-bottom: 0;
  }
}

.smb-socials {
  .tag{
    margin-right: 10px;
    margin-top: 10px;
    a {
      color: #4a90e2;
      display: flex;
      font-weight: 400;
      .smb-social-icon {
        margin-right: 5px;
        color: #50536b;
        font-size: 16px;
      }
    }
  }
}
</style>
