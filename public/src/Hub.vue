<template>
  <div id="hub">
    <!-- <a-cookie /> -->
    <s-header
      @search="onSearch"
      @open-modal="openSubmitAServiceModal"
    />
    <div class="main-container">
      <transition
        name="view-fade"
        mode="out-in"
      >
        <router-view
          v-if="loaded"
          ref="routerView"
          @search="onSearch"
          @showBetaModal="showBetaModal"
          @open-modal="openSubmitAServiceModal"
        />
      </transition>
    </div>
    <!--<s-footer :dark="['dark', 'light'].includes($route.meta.theme) ? $route.meta.theme === 'dark' : false" />-->
    <Footer :dark="['dark', 'light'].includes($route.meta.theme) ? $route.meta.theme === 'dark' : false" />
    <submit-service-modal
      id="submit-service-modal"
      ref="submitAServiceModal"
    />
    <s-modal-beta
      ref="joinBeta"
      blur />
    <AuthModal v-model="loginModalShow" />
    <notifications
      :duration="1500"
      position="top center"
      group="smb" />
  </div>
</template>

<script>
import Footer from '@/components/Footer'
import SubmitServiceModal from '@/components/SubmitAServiceModal'
import AuthModal from '@/components/Auth'
import SHeader from '@/components/Header'
import { mapGetters, mapActions } from 'vuex'
// import { onLogin } from '@/plugins/vue-apollo'

export default {
  name: 'Hub',
  components: {
    Footer,
    SubmitServiceModal,
    SHeader,
    AuthModal
  },
  data: () => ({
    search: '',
    submit: false,
    loaded: false,
    loginDialog: false
  }),
  computed: {
    ...mapGetters(['getUser', 'isUserLoggedIn']),
    loginModalShow: {
      get () {
        return this.$store.state.Smb.loginModalShow
      },
      set (v) {
        this.$store.commit('setLoginModal', v)
      }
    }
  },
  watch: {
    'isUserLoggedIn': function (value) {
      console.log(`User is${value ? ' ' : ' not '}logged in`)
    }
  },
  created: function () {
    this.loaded = true
    /* this.setupGraphQLAuth().then((token) => {
      if (token) {
        onLogin(this.$apollo.provider.defaultClient, token)
      }
      this.loaded = true
    }).catch(() => {
      this.loaded = true
    }) */
    /* this.fetchUser().then((res) => {
      console.log('logged in', res.email)
    }).catch((err) => {
      console.log('not logged in', err)
    }) */
    this.fetchUserInfo()
  },
  mounted: function () {
    // this.$api.dummyUser()
  },
  methods: {
    ...mapActions(['fetchUser', 'setupGraphQLAuth', 'fetchUserInfo']),
    openSubmitAServiceModal: function () {
      this.$refs.submitAServiceModal.show()
    },
    onSearch: function ({ search, submit }) {
      this.search = search
      if (submit && this.search.trim().length === 0) {
        this.$router.push({ name: 'services' })
      } else if (submit && this.search.trim().length > 0) {
        this.$router.push({ name: 'services', query: { search: this.search.trim() } })
      }
    },
    showBetaModal () {
      this.$router.push({ name: 'submit' })
      // this.$refs.joinBeta.show()
    }
  }
}
</script>

<style lang="scss" src="./assets/base.scss" />
