<template>
  <two-column-sidebar class="index">
    <div slot="sidebar">
      <transition name="fade">
        <topics-list
          v-if="isLoading || totalItems > 0"
          v-model="topics"/>
      </transition>
    </div>
    <div
      slot="body"
      class="body">
      <div class="search-bar-container">
        <search-bar
          ref="searchBar"
          :value="search" />
      </div>
      <div>
        <transition name="fade">
          <div
            v-if="!isLoading && totalItems > 0"
            class="level is-mobile service-result-title-container">
            <div class="level-left"><h2 class="is-marginless">{{ totalItems }} service results</h2></div>
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
                  :key="r.alias || index"
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

      <div
        v-if="totalItems === 0"
        class="level-left">
        <img
          class="search-icon"
          width="15"
          src="@/assets/search.svg"><span>We couldn't find any services matching `{{ search }}`</span>
      </div>
    </div>
  </two-column-sidebar>
</template>

<script>
import { SearchQuery } from '@/plugins/graphql'

import ServiceSummary from '@/components/ServiceSummary'
import SearchBar from '@/components/SearchBar'
import TopicsList from '@/components/TopicsList'
import TwoColumnSidebar from '@/components/TwoColumnSidebar'

export default {
  name: 'SearchResults',
  components: {
    ServiceSummary,
    SearchBar,
    TopicsList,
    TwoColumnSidebar
  },
  props: {
    search: {
      type: String,
      default: ''
    }
  },
  apollo: {
    results: {
      query: SearchQuery,
      variables: function () {
        return {
          searchTerm: this.search || 'microservice'
        }
      },
      update: function (data) {
        this.isLoading = false
        this.totalItems = data.searchServices.totalCount
        return data.searchServices.edges.map(e => e.node)
      }
    }
  },
  data: function () {
    return {
      q: this.search,
      isLoading: true,
      orderBy: 'NATURAL',
      totalItems: 3,
      results: [{}, {}, {}]
    }
  },
  computed: {
    topics: function () {
      return this.results.map(r => r.topics)
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
.index {
  background-color: $white;
}
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
