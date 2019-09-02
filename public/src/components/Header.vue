<template>
  <s-layout :background="$route.meta.light ? 'gray-4' : 'light'">
    <template
      v-if="$route.meta.light"
      slot="absolute"
    >
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
        </div>
      </s-navbar>
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
        </div>
      </s-navbar>
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
    </s-jumbo>
  </s-layout>
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
      title: 'CCAP',
      small: 'open source and transparent cryptocurrency analysis platform'
    }, {
      name: 'services',
      size: 'medium',
      title: `CCAP`,
      small: 'open source and transparent cryptocurrency analysis platform'
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
        { name: 'HOME', route: { name: 'services' } },
        { name: 'About', route: { name: 'about' } }
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
      } else {
        menu.push({ name: 'Login', id: 'login', button: {}, icon: 'account-circle' })
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
