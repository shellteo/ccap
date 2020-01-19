<template>
  <div class="submission">
    <s-layout
      margin="normal"
      background="gray-4"
      foreground="white"
      rounded
      shadow
    >
      <s-container padding="2x">
        <s-div
          :padding="['2x', 'min']"
          size="full"
          class="is-hidden-mobile"
        >
          <ul class="steps is-hollow is-thin is-small has-gaps has-content-centered is-active-primary">
            <li :class="['steps-segment', {'is-active': $route.name === 'submit-service-login' }]">
              <span class="steps-marker">
                <i class="mdi mdi-github-face" />
              </span>
              <div class="steps-content">
                <span class="is-size-8 has-text-uppercase has-text-weight-semibold">
                  Connect to github
                </span>
              </div>
            </li>
            <router-link
              :to="{ name: 'submit-service-choose', params: { ...$route.params } }"
              :class="['steps-segment', 'has-cursor-pointer', {'is-active': $route.name === 'submit-service-choose' }]"
              tag="li"
            >
              <span class="steps-marker">
                <i class="mdi mdi-folder" />
              </span>
              <div class="steps-content">
                <span class="is-size-8 has-text-uppercase has-text-weight-semibold">
                  Choose a repository
                </span>
              </div>
            </router-link>
            <li :class="['steps-segment', {'is-active': $route.name === 'submit-service-infos' }]">
              <span class="steps-marker">
                <i class="mdi mdi-information" />
              </span>
              <div class="steps-content">
                <span class="is-size-8 has-text-uppercase has-text-weight-semibold">
                  Configure
                </span>
              </div>
            </li>
          </ul>
        </s-div>
        <s-div
          size="full"
          padding="2x"
        >
          <router-view />
        </s-div>
      </s-container>
    </s-layout>
    <s-join
      :join="false"
      :dark="['dark', 'light'].includes($route.meta.theme) ? $route.meta.theme === 'dark' : undefined"
      footer
      @showBetaModal="$emit('showBetaModal')"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SubmitService',
  computed: mapGetters(['isUserLoggedIn']),
  watch: {
    '$route': 'checkRouteValidity',
    isUserLoggedIn: 'checkRouteValidity'
  },
  mounted: function () {
    this.checkRouteValidity()
  },
  methods: {
    checkRouteValidity: function () {
      if (this.isUserLoggedIn && this.$route.name === 'submit-service-login') {
        this.$router.replace({ name: 'submit-service-choose' })
      } else if (!this.isUserLoggedIn && ['submit-service-choose', 'submit-service-infos'].includes(this.$route.name)) {
        this.$router.replace({ name: 'submit-service-login' })
      }
    }
  }
}
</script>

<style lang="scss">
@import "~@shellteo/vue-components/src/scss/variables/index";

.submission {
  .is-card {
    border: 1px solid #d0d0d0;
    border-radius: 0.4rem;
    overflow: hidden;
    @include desktop {
      padding-left: 4rem;
    }
    @include touch {
      padding: 1rem;
      margin: 1rem;
    }
  }
}

.has-cursor-pointer {
  cursor: pointer;
}
</style>
