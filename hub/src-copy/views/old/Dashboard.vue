<template>
  <div
    v-if="!isUserRefreshing"
    class="dashboard">
    <div class="section">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-half">
            <h3>{{ getUser.name }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: mapGetters(['getUser', 'isUserLoggedIn', 'isUserRefreshing']),
  watch: {
    'isUserRefreshing': function (refreshing) {
      if (!refreshing && !this.isUserLoggedIn) {
        this.$router.push({ name: 'hub' })
      }
    }
  }
}
</script>
