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
              placeholder="Search anything..."
              @keyup.enter.native="$emit('search', { search: searchInput, submit: true })"
            />
          </s-div>
          <s-container clean>
            <!--<s-div
              v-if="!search && (!category || category === 'All Services')"
              size="full"
              padding="normal"
            >
              <s-text
                head="3"
                padding="normal"
              >Featured services</s-text>
              <div class="featured-services">
                <s-container clean>
                  <s-div
                    size="one-third"
                    padding="small"
                  >
                    <router-link
                      :to="`/service/slack`"
                      class="feature tile is-child"
                    >
                      <div class="image">
                        <img
                          src="@/assets/img/services/featured/slack.png"
                          srcset="@/assets/img/services/featured/slack@2x.png 2x,
                                  @/assets/img/services/featured/slack@3x.png 3x"
                          alt="Slack"
                        >
                      </div>
                    </router-link>
                  </s-div>
                  <s-div
                    size="one-third"
                    padding="small"
                  >
                    <router-link
                      :to="`/service/twitter`"
                      class="feature tile is-child"
                    >
                      <div class="image">
                        <img
                          src="@/assets/img/services/featured/twitter.png"
                          srcset="@/assets/img/services/featured/twitter@2x.png 2x,
                                  @/assets/img/services/featured/twitter@3x.png 3x"
                          alt="Twitter"
                        >
                      </div>
                    </router-link>
                  </s-div>
                  <s-div
                    size="one-third"
                    padding="small"
                  >
                    <router-link
                      :to="`/service/twilio`"
                      class="feature tile is-child"
                    >
                      <div class="image">
                        <img
                          src="@/assets/img/services/featured/twilio.png"
                          srcset="@/assets/img/services/featured/twilio@2x.png 2x,
                                  @/assets/img/services/featured/twilio@3x.png 3x"
                          alt="Twilio"
                        >
                      </div>
                    </router-link>
                  </s-div>
                </s-container>
              </div>
            </s-div>-->
            <s-div
              v-if="!search && (!category || category === 'All Services')"
              size="11"
              padding="normal"
            >
              <s-text
                padding="normal"
                p="0"
                color="dark-blue has-text-weight-semibold"
              >Recently Added</s-text>
              <div class="section-body">
                <div class="tile is-ancestor">
                  <transition-group
                    name="fade"
                    tag="div"
                    class="tile is-parent is-vertical"
                  >
                    <div
                      v-for="(r, index) in data.recentServices.slice(0, 3)"
                      :key="r.alias || index"
                      class="tile is-child"
                    >
                      <service-summary
                        :title="getTitle(r)"
                        :is-alias="r.alias ? true : false"
                        :description="r.description"
                        :tags="r.topics"
                      />
                    </div>
                  </transition-group>
                  <transition-group
                    name="fade"
                    tag="div"
                    class="tile is-parent is-vertical"
                  >
                    <div
                      v-for="(r, index) in data.recentServices.slice(3, 6)"
                      :key="r.alias || index"
                      class="tile is-child"
                    >
                      <service-summary
                        :title="getTitle(r)"
                        :is-alias="r.alias ? true : false"
                        :description="r.description"
                        :tags="r.topics"
                      />
                    </div>
                  </transition-group>
                </div>
              </div>
            </s-div>
            <s-div
              v-if="!search && (!category || category === 'All Services')"
              padding="normal"
              size="11"
            >
              <s-text
                padding="normal"
                p="0"
                color="dark-blue has-text-weight-semibold"
              >Most Used</s-text>
              <div class="section-body">
                <div class="tile is-ancestor">
                  <transition-group
                    name="fade"
                    tag="div"
                    class="tile is-parent is-vertical"
                  >
                    <div
                      v-for="(r, index) in data.recentServices.slice(0, 3)"
                      :key="r.alias || index"
                      class="tile is-child"
                    >
                      <service-summary
                        :title="getTitle(r)"
                        :is-alias="r.alias ? true : false"
                        :description="r.description"
                        :tags="r.topics"
                      />
                    </div>
                  </transition-group>
                  <transition-group
                    name="fade"
                    tag="div"
                    class="tile is-parent is-vertical"
                  >
                    <div
                      v-for="(r, index) in data.recentServices.slice(3, 6)"
                      :key="r.alias || index"
                      class="tile is-child"
                    >
                      <service-summary
                        :title="getTitle(r)"
                        :is-alias="r.alias ? true : false"
                        :description="r.description"
                        :tags="r.topics"
                      />
                    </div>
                  </transition-group>
                </div>
              </div>
            </s-div>
            <s-div
              v-else-if="(!category || category === 'All Services')"
              size="11"
              padding="normal"
            >
              <transition-group
                v-if="!isSearchLoading"
                tag="div"
                name="fade"
              >
                <div
                  v-if="searchTotalItems === 0"
                  key="no-results"
                  class="no-results"
                >
                  <div class="columns is-centered">
                    <div class="column is-half has-text-centered">
                      <s-icon icon="file-broken" />
                      <h5 class="is-size-5 has-text-weight-semibold has-text-gray-2">We couldn't find any service matching « {{ search }} »</h5>
                    </div>
                  </div>
                </div>
              </transition-group>
              <div>
                <div class="tile is-ancestor">
                  <div class="tile is-parent is-vertical">
                    <transition-group
                      tag="div"
                      name="fade"
                    >
                      <div
                        v-for="(r, index) in searchResults"
                        :key="r.alias || index"
                        class="tile search-result"
                      >
                        <service-summary
                          :title="getTitle(r)"
                          :is-alias="r.alias ? true : false"
                          :description="r.description"
                          :tags="r.topics"
                        />
                      </div>
                    </transition-group>
                  </div>
                </div>
              </div>
            </s-div>
            <s-div v-else-if="category && category === 'self'">
              <transition-group
                tag="div"
                name="fade"
              >
                <!-- <div key="results" v-if="searchCatTotalItems > 0">
                  <h2 class="title is-3">{{searchCatTotalItems}} service results</h2>
                </div> -->
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
                        v-for="(r, index) in userServices"
                        :key="r.alias || index"
                        class="tile search-result"
                      >
                        <service-summary
                          :title="getTitle(r)"
                          :is-alias="r.alias ? true : false"
                          :description="r.description"
                          :tags="r.topics"
                        />
                      </div>
                    </transition-group>
                  </div>
                </div>
                <div
                  v-if="!isUserServicesLoading && userServicesTotal === 0"
                  key="no-results"
                  class="no-results"
                >
                  <div class="columns is-centered">
                    <div class="column is-half has-text-centered">
                      <s-icon icon="file-broken" />
                      <h5 class="is-size-5 has-text-weight-semibold has-text-gray-2 has-padding-bottom-normal">You haven’t submitted any services to the Storyscript Hub yet.</h5>
                      <s-button size="small">Submit a service now</s-button>
                    </div>
                  </div>
                </div>
              </transition-group>
            </s-div>
            <s-div v-else>
              <transition-group
                tag="div"
                name="fade"
              >
                <!-- <div key="results" v-if="searchCatTotalItems > 0">
                  <h2 class="title is-3">{{searchCatTotalItems}} service results</h2>
                </div> -->
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
                        v-for="(r, index) in searchResultsByCategory"
                        :key="r.alias || index"
                        class="tile search-result"
                      >
                        <service-summary
                          :title="getTitle(r)"
                          :is-alias="r.alias ? true : false"
                          :description="r.description"
                          :tags="r.topics"
                        />
                      </div>
                    </transition-group>
                  </div>
                </div>
                <div
                  v-if="!isSearchCategoryLoading && searchResultsByCategoryTotal === 0"
                  key="no-results"
                  class="no-results"
                >
                  <div class="columns is-centered">
                    <div class="column is-half has-text-centered">
                      <s-icon icon="file-broken" />
                      <h5 class="is-size-5 has-text-weight-semibold has-text-gray-2">We couldn't find any service in the category « {{ category }} »</h5>
                    </div>
                  </div>
                </div>
              </transition-group>
            </s-div>
            <s-div
              size="11"
              padding="normal"
            >
              <s-div size="full">
                <s-container
                  clean
                  class="has-background-light contribute-services"
                >
                  <s-div size="half is-hidden-mobile">
                    <span class="tag is-danger has-text-weight-semibold">Public</span>
                    <p class="is-size-7 has-text-gray-3 has-text-weight-semibold">Let's go crazy!</p>
                    <h5 class="is-size-5 has-text-gray-2 has-text-weight-bold">Create your service !</h5>
                    <s-button
                      state="secondary"
                      size="small"
                      url="//storyscript.io/blog/designing-smarter-microservices"
                      arrow
                      @click.native="clickOnContribute(false)"
                    >
                      Learn More
                    </s-button>
                  </s-div>
                  <s-div size="half">
                    <span class="tag is-success has-text-weight-semibold">Public</span>
                    <p class="is-size-7 has-text-gray-3 has-text-weight-semibold">Let's go crazy!</p>
                    <h5 class="is-size-5 has-text-gray-2 has-text-weight-bold">Contribute a service !</h5>
                    <s-button
                      state="secondary"
                      size="small"
                      url="//storyscript.io/blog/designing-smarter-microservices"
                      arrow
                      @click.native="clickOnContribute(true)"
                    >
                      Learn More
                    </s-button>
                  </s-div>
                </s-container>
              </s-div>
            </s-div>
          </s-container>
        </s-div>
      </s-container>
    </s-layout>
    <s-join
      :dark="false"
      footer
      @showBetaModal="$emit('showBetaModal')"
    />
  </div>
</template>

<script>
import { IndexQuery, SearchQuery, UserQuery } from '@/plugins/graphql'
import ServiceSummary from '@/components/ServiceSummary'
import ServicesTopicsList from '@/components/ServicesTopicsList'
import { mapGetters } from 'vuex'

export default {
  name: 'Index',
  components: {
    ServicesTopicsList,
    ServiceSummary
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
        console.log('更新:::', data)
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
        console.log('更新:::', data)
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
    isSearchCategoryLoading: true
  }),
  computed: {
    ...mapGetters(['getOwnerUuid']),
    topics: function () {
      return this.data.recentServices.map(s => s.topics)
    }
  },
  watch: {
    '$route': function () {
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
    this.getCoinList()
  },
  methods: {
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
    async getCoinList () {
      await this.$axios.get(this.apis.coin, {
        params: {
          pageSize: 10,
          pageIndex: 1
        }
      }).then((res) => {
        console.log(res)
      })
    },
    imgUrl (url) {
      return `${this.apis.IMG_URL}${url}?x-oss-process=image/resize,w_72`
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
