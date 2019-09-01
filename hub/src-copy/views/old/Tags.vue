<template>
  <div class="index section">
    <div class="container columns">
      <div class="column is-full body">
        <div
          v-if="prevPage.name === 'hub'"
          class="breadcrumb"><router-link :to="prevPage.path">{{ prevPage.name | capitalize }}</router-link> / {{ topic | from-topic }}</div>

        <div class="level name-container is-mobile">
          <div class="level-left">
            <h2>{{ topic | from-topic }}</h2>
          </div>
        </div>
        <div class="results-container">
          <div class="tile is-ancestor">
            <transition-group
              class="tile is-parent is-vertical"
              tag="div"
              name="fade">
              <div
                v-for="(r, index) in results"
                :key="`tags-list-${_uid}-${index}`"
                class="tile is-parent">
                <div class="tile is-child is-6">
                  <service-summary
                    :title="getTitle(r[0])"
                    :is-alias="r[0].alias ? true: false"
                    :description="r[0].description"
                    :tags="r[0].topics"/>
                </div>
                <div
                  v-if="r.length > 1"
                  class="tile is-child is-6">
                  <service-summary
                    :title="getTitle(r[1])"
                    :is-alias="r[1].alias ? true: false"
                    :description="r[1].description"
                    :tags="r[1].topics"/>
                </div>
              </div>
            </transition-group>
            <div v-if="results.length === 0">
              <p>No services found.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import chunk from 'chunk'
import { SearchQuery } from '@/plugins/graphql'
import ServiceSummary from '@/components/ServiceSummary'

export default {
  components: {
    ServiceSummary
  },
  props: {
    topic: {
      type: String,
      default: undefined
    }
  },
  data: () => ({
    totalItems: 0,
    results: [[{}, {}], [{}, {}]],
    prevPage: {
      name: '',
      path: ''
    }
  }),
  apollo: {
    results: {
      query: SearchQuery,
      variables: function () {
        return {
          searchTerm: this.topic || 'microservice'
        }
      },
      update: function (data) {
        this.totalItems = data.searchServices.totalCount
        return chunk(data.searchServices.edges.map(e => e.node))
      }
    }
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      // eslint-disable-next-line
      vm.prevPage.name = from.name
      // eslint-disable-next-line
      vm.prevPage.path = from.path
    })
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
.index {
  min-height: 580px;
}

h2 {
  font-weight: normal;
  font-size: 1.8em;
  margin: 0;
}

.breadcrumb {
  color: #7e7e7e;
  font-size: 0.9em;
  margin-bottom: 2.2em;
}

.results-container {
  width: 100%;
}
</style>
