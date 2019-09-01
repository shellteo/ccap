<template>
  <div class="services">
    <s-layout
      background="gray-4"
      foreground="white"
      margin="normal"
      rounded
      narrow
      shadow
      outside
    >
      <s-container>
        <s-div
          size="one-quarter"
          class="has-background-lighter sticky left-sidebar"
        >
          <services-topics-list
            v-model="topics"
            :category="category"
            @select="selectCategory"
          />
        </s-div>
        <s-div
          :padding="['none', 'normal']"
          size="three-quarters"
        >
          <s-div
            :padding="['1x', 'none']"
            size="full"
            class="search-form"
          >
            <s-input
              v-model="searchInput"
              :icon-left="['s-icon', {icon: 'search'}]"
              placeholder="按照项目简称、名称搜索..."
              @keyup.enter.native="$emit('search', { search: searchInput, submit: true })"
            />
          </s-div>
          <s-container clean>
            <s-div>
              <transition-group
                tag="div"
                name="fade"
              >
                <div
                  key="category-results"
                  class="tile is-ancestor"
                >
                  <div class="tile is-parent is-vertical">
                    <transition-group
                      tag="div"
                      name="fade"
                    >
                      <div
                        v-for="(r, index) in coinList"
                        :key="r.id || index"
                        class="tile search-result"
                      >
                        <CoinCard
                          :coin="r"
                        />
                      </div>
                    </transition-group>
                    <div
                      v-if="showLoadMore"
                      style="text-align: center">
                      <s-button
                        state="secondary"
                        style="width: 200px"
                        size="small"
                        @click="loadMore">查看更多</s-button>
                    </div>
                  </div>
                </div>
                <div
                  v-if="coinList.length === 0"
                  key="no-results"
                  class="no-results">
                  <div class="columns is-centered">
                    <div class="column is-half has-text-centered">
                      <s-icon icon="file-broken" />
                      <h5 class="is-size-5 has-text-weight-semibold has-text-gray-2">找不到你想要的数据🙁</h5>
                    </div>
                  </div>
                </div>
              </transition-group>
            </s-div>
          </s-container>
        </s-div>
      </s-container>
    </s-layout>
    <s-layout
      :class="['join-beta']"
      background="gray-4"
    >
      <s-container
        :padding="['none', 'large']"
        centered-vh
        class="story"
      >
        <s-div size="half">
          <s-text
            alignment="left"
            head="2"
            padding="2x"
          >
            提交新项目或新数字货币？
          </s-text>
        </s-div>
        <s-div
          size="half"
          class="has-text-centered"
        >
          <s-button @click="$emit('showBetaModal')">
            &nbsp;&nbsp;&nbsp; 去提交 &nbsp;&nbsp;&nbsp;
          </s-button>
        </s-div>
      </s-container>
    </s-layout>
    <!--<s-join
      :dark="false"
      footer
      @showBetaModal="$emit('showBetaModal')"
    />-->
  </div>
</template>

<script>
import { IndexQuery, SearchQuery, UserQuery } from '@/plugins/graphql'
import ServiceSummary from '@/components/ServiceSummary'
import CoinCard from '@/components/CoinCard'
import ServicesTopicsList from '@/components/ServicesTopicsList'
import { mapGetters } from 'vuex'

export default {
  name: 'Index',
  components: {
    ServicesTopicsList,
    ServiceSummary,
    CoinCard
  },
  props: {
    search: {
      type: String,
      default: ''
    },
    category: {
      type: String,
      default: undefined
    }
  },
  apollo: {
    data: {
      query: IndexQuery,
      update: data => ({
        recentServices: data.recentlyAddedServices.nodes
      })
    },
    userServices: {
      query: UserQuery,
      skip () { this.isUserServicesLoading = true; this.userServices = [{}, {}, {}]; return this.getOwnerUuid === '' || !this.category || this.category !== 'self' },
      variables: function () {
        return {
          uuid: this.getOwnerUuid
        }
      },
      update: function (data) {
        this.isUserServicesLoading = false
        if (data.ownerByUuid.services) {
          this.userServicesTotal = data.ownerByUuid.services.totalCount
          return data.ownerByUuid.services.nodes
        }
        this.userServicesTotal = 0
        return []
      }
    },
    searchResultsByCategory: {
      query: SearchQuery,
      skip () { this.isSearchCategoryLoading = true; this.searchResultsByCategory = [{}, {}, {}]; return !this.category || this.category === 'self' },
      variables: function () {
        return {
          searchTerm: this.category || ' '
        }
      },
      update: function (data) {
        this.isSearchCategoryLoading = false
        if (data.searchServices) {
          this.searchResultsByCategoryTotal = data.searchServices.totalCount
          return data.searchServices.edges.map(e => e.node)
        } else {
          this.searchResultsByCategoryTotal = 0
        }
        return []
      }
    },
    searchResults: {
      query: SearchQuery,
      skip () { this.isSearchLoading = true; this.searchResults = [{}, {}, {}]; return !this.search },
      variables: function () {
        return {
          searchTerm: this.search || ' '
        }
      },
      update: function (data) {
        this.isSearchLoading = false
        if (data.searchServices) {
          this.searchTotalItems = data.searchServices.totalCount
          return data.searchServices.edges.map(e => e.node)
        } else {
          this.searchTotalItems = 0
        }
        return []
      }
    }
  },
  data: () => ({
    data: {
      recentServices: [{}, {}, {}, {}, {}, {}]
    },
    searchInput: '',
    noredirect: false,
    searchResults: [{}, {}, {}],
    searchResultsByCategory: [{}, {}, {}],
    userServices: [{}, {}, {}],
    searchTotalItems: 0,
    userServicesTotal: 0,
    searchResultsByCategoryTotal: 0,
    isUserServicesLoading: false,
    isSearchLoading: true,
    isSearchCategoryLoading: true,
    coinList: [],
    coinCount: 0,
    showLoadMore: false,
    pageIndex: 1
  }),
  computed: {
    ...mapGetters(['getOwnerUuid']),
    topics: function () {
      return this.data.recentServices.map(s => s.topics)
    }
  },
  watch: {
    '$route': function (route) {
      console.log(route)
      this.getCoinList(this.parseRouteQuery(route.query))
      this.noredirect = this.searchInput !== this.$route.query.search
      this.searchInput = this.$route.query.search || ''
      // this.isSearchLoading = true
    },
    'searchInput': function () {
      if (!this.noredirect) {
        this.$emit('search', { search: this.searchInput, submit: this.searchInput.trim().length === 0 })
      }
      this.noredirect = false
    }
  },
  mounted: function () {
    this.searchInput = this.$route ? (this.$route.query.search || '') : ''
    this.getNews()
    this.getCoinList(this.parseRouteQuery(this.$route.query || {}))
  },
  methods: {
    parseRouteQuery (query) {
      const { search, status, c } = query
      let params = {}
      if (status !== undefined) params.status = status
      if (search !== undefined) params.name = search
      if (c !== undefined) params.belong = c
      return params
    },
    getTitle: function (r) {
      if (!r.alias && (!r.owner || !r.owner.username)) {
        return ''
      }
      return r.alias || `${r.owner.username}/${r.name}`
    },
    selectCategory: function (cat) {
      this.$router.push({ name: 'services', query: { search: cat === '' || !cat ? this.$route.query.search : undefined, c: cat || undefined } })
    },
    clickOnContribute: function (contribute) {
      console.log('user clicked on ', contribute ? 'contribute' : 'create')
    },
    async getNews () {
      await this.$axios.get(`${this.apis.news}/EVA`).then((res) => {
        console.log(res)
      })
    },
    async getCoinList ({ status, name, belong }, pageIndex = 1) {
      const ixoOptions = {
        'ICOs': 0,
        'STOs': 1,
        'IEOs': 2
      }
      let params = {}
      if (status !== undefined) params.status = status
      if (name !== undefined) params.name = name
      if (belong !== undefined) params.belong = ixoOptions[belong]
      const pageSize = 10
      await this.$axios.get(this.apis.coin, {
        params: {
          pageSize,
          pageIndex,
          ...params
        }
      }).then((res) => {
        if (res.code === 0) {
          const { count, rows } = res.data
          this.showLoadMore = pageIndex * pageSize < count
          if (pageIndex === 1) {
            this.coinCount = res.data.count
            this.coinList = rows
          } else {
            this.coinList.push(...rows)
          }
        }
      })
    },
    loadMore () {
      this.pageIndex += 1
      this.getCoinList(this.parseRouteQuery(this.$route.query || {}), this.pageIndex)
    }
  }
}
</script>

<style lang="scss">
@import "~@storyscript/vue/src/scss/variables/index";

.feature {
  img {
    transition: all 0.2s ease-in;
    border-radius: 0.75rem;
    box-shadow: 0 0 0 0 rgba($black, 0.6);
  }
  &:hover {
    img {
      transform: translateY(-0.5rem);
      box-shadow: 0 1.5rem 3.5rem -1rem rgba($black, 0.6);
    }
  }
}

.no-results {
  margin: 10rem 0;
  h5 {
    margin-top: 2rem;
  }
}

.search-result {
  margin: 2rem 0 !important;
}

.contribute-services {
  border-radius: 1rem;
  padding: 2.5rem 0;
  position: relative;
  .column {
    padding: 0 3.25rem;

    p {
      margin-top: 0.5rem;
    }

    .button {
      margin-top: 1rem;
    }
  }
  .column + .column {
    &:before {
      @include mobile {
        display: none;
      }
      content: "";
      position: absolute;
      top: 0;
      left: 50%;
      bottom: 0;
      width: 0.1rem;
      background-color: darken($light, 10%);
    }
  }
}
</style>
