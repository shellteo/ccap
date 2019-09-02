<template>
  <s-layout :background="$route.meta.light ? 'gray-4' : 'light'">
    <template
      v-if="$route.meta.light"
      slot="absolute"
    >
      <!--<s-navbar
        :items="menu"
        class="hub-navbar"
        @click="processClick"
        @logo="goToHome"
      />-->
      <s-navbar
        :items="menu"
        class="hub-navbar"
        @click="processClick"
        @logo="$router.push({ name: 'services' })">
        <div
          slot="logo"
          class="smb-logo">
          <img
            src="https://max-well.oss-cn-shanghai.aliyuncs.com/smbzdm/logo.jpg"
            alt="logo">
          <img
            src="https://max-well.oss-cn-shanghai.aliyuncs.com/smbzdm/logo-text2.png"
            class="smb-logo-text"
            alt="什么币值得买">
        </div>
      </s-navbar>
      <!--<s-navbar
        :items="[
          { name: 'Home', active: true },
          { name: 'Examples' },
          { name: 'Documentation' },
          { name: 'Sign in', button: {}, icon: 'account-circle' },
          { avatar: { icon: 'arrow-down' }, name: 'More', children: [{ name: 'submit a service' }] },
          { name: 'Jean Barriere', avatar: 'https://avatars2.githubusercontent.com/u/11390722?v=4', children: [{ spans: ['Jean Barrière', 'jean@barriere.io'], hiddenTouch: true }, { divider: true }, { name: 'My account' }, { name: 'My services' }, { divider: true }, { name: 'Logout' }], mobileFirst: true }
        ]"
        class="hub-navbar"
        @click="processClick"
        @logo="goToHome"
      />-->
    </template>
    <s-jumbo
      v-else
      slot="absolute"
      :size="current.size"
      :into="current.into"
      :small="current.small"
      :title="current.title"
      dark
      background
    >
      <s-navbar
        slot="header"
        :items="menu"
        class="hub-navbar"
        dark
        @click="processClick"
        @logo="$router.push({ name: 'services' })">
        <div
          slot="logo"
          class="smb-logo">
          <img
            src="https://max-well.oss-cn-shanghai.aliyuncs.com/smbzdm/logo.jpg"
            alt="logo">
          <img
            src="https://max-well.oss-cn-shanghai.aliyuncs.com/smbzdm/logo-text.png"
            class="smb-logo-text"
            alt="什么币值得买">
        </div>
      </s-navbar>
      <!-- <template v-if="current.name === 'home'">
        <p class="is-size-6 has-text-centered has-text-light jumbo-p">
          Connect microservices and functions in an intuitive serverless fashion.<br>
          The story of your data creates and manages Kubernetes clusters.
        </p>
      </template> -->
      <template v-if="current.name === 'loading'">
        <s-container
          :padding="['none', 'large']"
          centered-h
        >
          <s-div size="1">
            <s-text
              slot="title"
              head="1"
              alignment="centered"
            >
              <i class="mdi mdi-spin mdi-loading" />
            </s-text>
          </s-div>
        </s-container>
      </template>
      <!-- <template v-else-if="current.name === 'services'">
        <s-container centered-h>
          <s-div
            :padding="['normal', 'large']"
            size="two-fifths"
          >
            <s-input
              v-model="search"
              :icon-right="['s-icon', {icon: 'search'}]"
              placeholder="Search anything..."
              @keyup.enter.native="$emit('search', { search, submit: true })"
            />
          </s-div>
        </s-container>
      </template> -->
    </s-jumbo>
  </s-layout>

  <!-- <div :class="['has-background-light', {'section': ['service', 'guide'].includes($route.name)}]"> -->

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Header',
  data: () => ({
    search: '',
    noredirect: false,
    jumbos: [{
      name: 'home',
      size: 'normal',
      title: '什么币值得买',
      small: '透明公正的数字货币平台'
    }, {
      name: 'services',
      size: 'medium',
      title: `什么币值得买`,
      small: '一切以用户为本，透明公正的数字货币分析平台'
    }, {
      name: 'coin',
      size: 'normal',
      title: 'Coin',
      small: 'Service Discovery and Marketplace'
    }, {
      name: 'functions',
      size: 'large',
      title: 'Coming soon',
      small: 'Functions'
    }, {
      name: 'apps',
      size: 'large',
      title: 'Coming soon',
      small: 'Applications'
    }, {
      name: 'faq',
      size: 'normal',
      title: 'Service submission',
      small: 'FAQ'
    }],
    visible: false
  }),
  computed: {
    ...mapGetters(['userInfo', 'isLoggedIn', 'isUserLoggedIn', 'getUser']),
    menu: function () {
      let menu = [
        // { name: '博客', link: 'https://shellteo.top' },
        { name: '首页', route: { name: 'services' } },
        { name: '币百科', route: { name: 'document' } },
        { name: '关于', route: { name: 'about' } }
      ]
      if (this.isLoggedIn) {
        menu.push({
          name: this.userInfo.nickname || 'smbzdm',
          avatar: this.tranImg(this.userInfo.avatar) || 'https://max-well.oss-cn-shanghai.aliyuncs.com/avatar.svg',
          children: [
            {
              name: 'My account',
              spans: [this.userInfo.nickname, this.userInfo.email],
              hiddenTouch: true },
            { divider: true },
            { name: '个人中心', id: 'user' },
            { name: '提交新项目', id: 'submit' },
            { divider: true },
            { name: '退出', id: 'logout' }
          ],
          mobileFirst: true
        })
        // menu.push({ name: 'More', avatar: { mdi: 'github-face' }, children: [{ name: '个人中心' }, { name: '提交Coin' }, { divider: true }, { name: 'Sign in' }, { name: 'Logout' }] })
      } else {
        // menu.push({ name: 'More', avatar: { mdi: 'github-face' }, children: [{ name: 'Submit a service' }, { name: 'Contribute' }, { divider: true }, { name: 'Sign in' }] })
        menu.push({ name: '登录', id: 'login', button: {}, icon: 'account-circle' })
      }
      return menu
    },
    current: function () {
      return (
        !this.visible
          ? { name: 'loading', size: 'fullheight' }
          : this.jumbos.filter(j => j.name === this.$route.name)[0] ||
            {
              name: 'not-found',
              size: 'fullheight',
              title: '404',
              small: 'Lost in space ?',
              into: 'chevron'
            }
      )
    }
  },
  watch: {
    '$route': function () {
      this.visible = true
      this.noredirect = this.search !== this.$route.query.search
      this.search = this.$route.query.search || ''
    },
    'search': function () {
      if (!this.noredirect) {
        this.$emit('search', { search: this.search, submit: this.search.trim().length === 0 })
      }
      this.noredirect = false
    }
  },
  mounted: function () {
    this.search = this.$route.query.search || ''
    if (this.$route.name) {
      this.visible = true
    }
  },
  methods: {
    ...mapActions(['logout']),
    tranImg (url) {
      if (url) {
        return `${this.apis.IMG_URL}${url}`
      } else {
        return null
      }
    },
    /* goToHome: function () {
      window.location = '//storyscript.io'
    }, */
    processClick: function (event) {
      // console.log(event)
      const id = event.item.id
      if (id === 'login') {
        this.$store.commit('setLoginModal', true)
      } else if (id === 'logout') {
        this.logout()
        window.location.reload()
      } else if (id === 'user') {
        this.$router.push({ name: 'user' })
      } if (id === 'submit') {
        this.$router.push({ name: 'submit' })
      }
      /* if (event.item.name === 'Sign in') {
        window.location = `${process.env.VUE_APP_API_BASEURL}auth`
      } else if (event.item.name === 'Contribute') {
        window.location = `//github.com/storyscript`
      } else if (event.item.name === 'Logout') {
        this.logout()
        onLogout(this.$apollo.provider.defaultClient)
      } else if (event.item.name === 'Submit a service') {
        this.$router.push({ name: 'submit-service-login' })
      } else if (event.item.name === 'My account') {
        // this.$router.push('/user')
      } else if (event.item.name === 'My services') {
        this.$router.push({ name: 'services', query: { c: 'self' } })
        // this.$router.push({ name: 'user', hash: 'services' })
      } */
    }
  }
}
</script>

<style lang="scss">
.smb-logo {
  .smb-logo-text {
    margin-left: 10px;
    height: 20px;
  }
}
.jumbo {
  &.is-hub {
    background: transparent !important;
  }

  &,
  & > * {
    transition: all 0.3s ease-in-out;
  }

  .jumbo-p {
    margin-top: -2rem;
  }
}
</style>
