<template>
  <div class="index">
    <section class="hero bg--dark is-medium">
      <div class="hero-body">
        <div class="container">
          <stars-particles />
          <div class="title-container">
            <div class="columns">
              <div class="column is-one-fifth avatar-container">
                <div class="avatar">
                  <div
                    :style="`background-image: url(https://avatars.githubusercontent.com/${serviceUserName}?s=128`"
                    class="picture" />
                </div>
              </div>
              <div class="column is-four-fifths main-head">
                <h1
                  v-if="serviceUserName"
                  class="title is-1 text--light">{{ serviceUserName | capitalize }}</h1>
                <h1
                  v-else
                  class="title is-1 text--light">...</h1>
                <transition name="fade">
                  <h3
                    v-if="serviceName"
                    class="subtitle is-4 text--light">{{ serviceName }}</h3>
                  <h3
                    v-else
                    class="subtitle is-4 description">...</h3>
                </transition>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="section">
      <div class="container">
        <transition name="fade">
          <div
            v-if="results.length > 0"
            class="level is-mobile service-result-title-container">
            <div class="level-left">
              <transition name="fade">
                <span
                  v-if="serviceName"
                  class="title is-4">{{ totalItems || '' }} services</span>
                <div
                  v-else
                  class="loading-shimmer title tag"/>
              </transition>
            </div>
            <div
              v-if="isUser"
              class="level-right">
              <a-button
                state="primary"
                @click="$router.push({ name: 'new-service' })"><font-awesome-icon icon="plus" /> New microservice</a-button>
            </div>
          </div>
        </transition>

        <div>
          <div class="tile is-ancestor">
            <div class="tile is-parent is-vertical">
              <transition-group
                tag="div"
                name="fade">
                <div
                  v-for="(r, index) in results"
                  :key="`organization-list-item-${index}`"
                  class="tile is-child search-result">
                  <service-summary
                    :title="getTitle(r)"
                    :is-alias="r.alias ? true : false"
                    :description="r.description"
                    :tags="r.topics"/>
                </div>
              </transition-group>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ServiceByOwnerQuery } from '@/plugins/graphql'
import { mapGetters } from 'vuex'

import ServiceSummary from '@/components/ServiceSummary'
import OrganizationInfos from '@/components/OrganizationInfos'

export default {
  name: 'SearchResults',
  components: {
    ServiceSummary,
    OrganizationInfos
  },
  props: {
    owner: {
      type: String,
      default: undefined
    }
  },
  apollo: {
    results: {
      query: ServiceByOwnerQuery,
      skip: function () {
        return !this.owner
      },
      variables: function () {
        return {
          owner: this.owner
        }
      },
      update: function (data) {
        if (data.allOwners.nodes.length > 0) {
          this.serviceName = data.allOwners.nodes[0].name
          this.serviceUserName = data.allOwners.nodes[0].username
          this.totalItems = data.allOwners.nodes[0].services.totalCount
        }
        return (
          data.allOwners.nodes.length > 0 &&
          data.allOwners.nodes[0].services.nodes.length > 0 &&
          data.allOwners.nodes[0].services.nodes
        )
      }
    }
  },
  data: () => ({
    isLoading: true,
    orderBy: 'NATURAL',
    totalItems: 3,
    serviceName: undefined,
    serviceUserName: undefined,
    results: [{}, {}, {}],
    serviceByOwner: undefined
  }),
  computed: {
    ...mapGetters(['isUserLoggedIn', 'getUser']),
    isUser: function () {
      return this.isUserLoggedIn && this.getUser.username === this.serviceUserName
    },
    topics: function () {
      return this.results.map(r => r.topics)
    },
    service: function () {
      return this.serviceByOwner || {}
    }
  },
  watch: {
    results: function (newValue) {
      if (!newValue) this.$router.push('/404')
    }
  },
  methods: {
    getTitle: function (r) {
      if (!r.alias && (!r.owner || !r.owner.username)) {
        return ''
      }
      return r.alias || `${r.owner.username}/${r.name}`
    }
  }
}
</script>

<style scoped lang="scss">
h2 {
  font-weight: normal;
  font-size: 1.8em;
  line-height: 1.8em;
  margin-top: 1em;
}

.body {
  padding-bottom: 2em;
}

.link {
  cursor: pointer;
}

.search-icon {
  margin-right: 15px;
  filter: brightness(70%);
}

.search-bar-container {
  margin-bottom: 1em;
}

.help-text {
  color: #727272;
}

.service-result-title-container {
  margin-top: 1em;
  margin-bottom: 0.8em;
}

.search-result {
  padding-top: 1.5em;
  padding-bottom: 1em;
  border-top: 1px solid #c7c7c7;

  &:last-child {
    border-bottom: 1px solid #c7c7c7;
  }
}
</style>
