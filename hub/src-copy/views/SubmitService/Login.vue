<template>
  <s-container
    centered-v
    class="is-card"
  >
    <s-div size="7">
      <s-text head="3">Continuous Deployment</s-text>
      <s-text
        :padding="['1x', '2x']"
        p="1"
      >
        Connect to Github where your sources are hosted.<br>
        When you push to Git, we'll update your service on<br>
        our servers and deploy the result.
      </s-text>
      <s-button
        :url="{ href: loginUrl, target: '' }"
        icon-left="github-face"
      >Sign in with GitHub</s-button>
    </s-div>
    <s-div
      size="5"
      class="is-paddingless"
    >
      <figure class="image is-square is-hidden-mobile">
        <img
          src="~@/assets/img/bg/submit.jpg"
          alt="submit illustration"
          srcset="~@/assets/img/bg/submit@2x.jpg 2x, ~@/assets/img/bg/submit@3x.jpg 3x"
        >
      </figure>
    </s-div>
  </s-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SubmitServiceLogin',
  data: () => ({
    loginUrl: `${process.env.VUE_APP_API_BASEURL}auth`
  }),
  computed: mapGetters(['isUserLoggedIn']),
  watch: {
    isUserLoggedIn: function () {
      if (this.isUserLoggedIn) {
        this.$router.push({ name: 'submit-service-choose' })
      }
    }
  },
  mounted: function () {
    if (this.isUserLoggedIn) {
      this.$router.push({ name: 'submit-service-choose' })
    }
  }
}
</script>
