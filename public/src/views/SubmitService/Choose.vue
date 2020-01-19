<template>
  <s-container centered>
    <s-div size="full">
      <s-text
        head="3"
        alignment="centered"
      >Choose a repository</s-text>
      <s-text
        p="2"
        alignment="centered"
      >
        Choose the repository you want to submit as a microservice in the Hub.
      </s-text>
    </s-div>
    <s-div
      :padding="['normal', 'none']"
      size="full"
    >
      <s-level>
        <s-select
          slot="left"
          ref="selector"
          :avatar="getInstallation ? getInstallation.avatarUrl : undefined"
          :value="getInstallation ? getInstallation.login : ''"
          absolute
        >
          <s-text
            v-for="(installation, idx) of getInstallations"
            :key="`installation-list-${idx}`"
            class="list-with-avatar"
            li
            @click.native="changeInstallation(installation.id)"
          ><span class="avatar"><img :src="installation.avatarUrl"></span><span>{{ installation.login }}</span></s-text>
          <li>
            <a
              title="New installation"
              href="https://github.com/apps/storyscript/installations/new"
              style="width:100%"
              class="button is-link is-primary is-small"
            >
              Add an installation
            </a>
          </li>
        </s-select>
        <template slot="right">
          <s-input
            v-model="search"
            :icon-right="['s-icon', { icon: 'search' }]"
            placeholder="Search"
            class="is-hub-search"
            @keyup.enter="searchRepo"
          />
        </template>
      </s-level>
    </s-div>
    <s-div
      size="full"
      class="hr-absolute"
    >
      <hr>
    </s-div>
    <template v-if="(getInstallation && getInstallation.id === -1) || (searchResults.length === 0 && search.trim().length > 0)">
      <s-div size="full">
        <s-container centered-h>
          <s-div size="half">
            <s-container centered-h>
              <s-div
                size="full"
                padding="normal"
                class="has-text-centered"
              >
                <s-icon
                  v-if="!searchIsLoading"
                  icon="file-broken"
                />
                <i
                  v-else
                  class="is-size-3 has-text-gray-4 mdi mdi-spin mdi-loading"
                />
              </s-div>
              <s-div
                size="two-thirds"
                class="has-text-centered"
              >
                <h5 class="is-size-5 has-text-weight-semibold has-text-gray-2">{{ searchIsLoading ? 'Loading' : 'No results' }}</h5>
              </s-div>
            </s-container>
          </s-div>
        </s-container>
      </s-div>
    </template>
    <template v-else-if="searchResults.length === 0 && search.trim().length === 0">
      <s-div
        v-for="(repo, idx) of getRepositories"
        :key="`repo-list-${_uid}-${idx}`"
        padding="small"
        size="half"
      >
        <service-choose-template
          :id="idx"
          :disabled="repo.permissions ? !repo.permissions.admin : undefined"
          :title="repo.name"
          :description="repo.description"
          @select="setupRepo(repo)"
        />
      </s-div>
    </template>
    <template v-else>
      <s-div
        v-for="(repo, idx) of searchResults"
        :key="`repo-list-${_uid}-${idx}`"
        padding="small"
        size="half"
      >
        <service-choose-template
          :id="idx"
          :disabled="repo.permissions ? !repo.permissions.admin : undefined"
          :title="repo.name"
          :description="repo.description"
          @select="setupRepo(repo)"
        />
      </s-div>
    </template>
    <s-div
      v-if="searchResults.length === 0 && search.trim().length === 0"
      :padding="['medium', 'none']"
      size="full"
    >
      <nav
        class="pagination is-rounded is-centered"
        role="navigation"
        aria-label="pagination"
      >
        <ul class="pagination-list">
          <li
            v-if="hasPrevPage"
            @click="prevPage"
          ><a class="pagination-link"><i class="mdi mdi-chevron-left" /></a></li>
          <li
            v-for="(page, idx) in getCustomPages"
            :key="`pagination-list-page-${idx}`"
          >
            <span
              v-if="page === -1"
              class="pagination-ellipsis"
            >&hellip;</span>
            <a
              v-else
              :class="['pagination-link', {'is-current': page === getPage}]"
              :aria-label="`Goto page ${page}`"
              @click="fetchRepositories({ installationId: (getInstallation || {id: -1}).id, page })"
            >{{ page }}</a>
          </li>
          <li
            v-if="hasNextPage"
            @click="nextPage"
          ><a class="pagination-link"><i class="mdi mdi-chevron-right" /></a></li>
        </ul>
      </nav>
    </s-div>
    <s-div
      :padding="['medium', '']"
      size="full"
    >
      <s-text p="2">
        Missing a repository ?
        <a
          :href="`https://github.com/apps/storyscript/installations/${!getInstallation || getInstallation.id === -1 ? 'new' : getInstallation.id}`"
          title="Open Github Configuration"
        >Configure Storyscript</a>
      </s-text>
    </s-div>
  </s-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ServiceChooseTemplate from '@/components/ServiceChooseTemplate'

export default {
  name: 'SubmitServiceChoose',
  components: { ServiceChooseTemplate },
  props: {
    installationName: {
      type: String,
      default: ''
    },
    page: {
      type: [String, Number],
      default: 1
    }
  },
  data: () => ({ search: '', searchResults: [], searchIsLoading: false }),
  computed: {
    ...mapGetters(['getRepositories', 'getInstallation', 'getInstallations', 'getPage', 'getPages', 'hasNextPage', 'hasPrevPage', 'getPerPage']),
    getCustomPages: function () {
      let arr = []
      if (this.getPage - 2 > 0 && this.getPages > 3) arr.push(1)
      if (this.getPage - 3 > 0 && this.getPages > 4) arr.push(this.getPage === 4 || (this.getPage === 5 && this.getPages === 5) ? 2 : -1)
      if (this.getPage - 2 > 0 && this.getPage === this.getPages) arr.push(this.getPage - 2)
      if (this.getPage - 1 > 0 && this.getPages > 1) arr.push(this.getPage - 1)
      arr.push(this.getPage)
      if (this.getPage + 1 <= this.getPages) arr.push(this.getPage + 1)
      if (this.getPage + 2 <= this.getPages && this.getPage === 1) arr.push(this.getPage + 2)
      if (this.getPage + 3 <= this.getPages && this.getPages > 4) arr.push(this.getPage + 3 >= this.getPages || (this.getPage === 1 && this.getPages === 5) ? this.getPages - 1 : -1)
      if (this.getPage + 2 <= this.getPages && this.getPages > 3) arr.push(this.getPages)
      return arr
    }
  },
  watch: {
    '$route': function () {
      this.$nextTick().then(() => {
        if (this.getInstallation.login.toLowerCase() !== this.installationName.toLowerCase()) {
          this.$router.replace({ ...this.$route, params: { ...this.$route.params, installationName: this.getInstallation.login } })
        }
      })
    },
    getPage: function () {
      this.$router.replace({ ...this.$route, query: { ...this.$route.query, page: this.getPage } })
    },
    getInstallation: function () {
      this.$router.replace({ ...this.$route, params: { ...this.$route.params, installationName: this.getInstallation.login } })
    },
    search: 'searchRepo'
  },
  mounted: function () {
    this.fetchInstallations().then(installations => {
      const installation = installations.find(i => i.login.toLowerCase() === this.installationName.toLowerCase())
      if (installation) {
        this.setupInstallation({ installationId: installation.id, page: parseInt(this.page) })
      } else {
        this.setupInstallation({ installationId: installations[0].id, page: parseInt(this.page) })
      }
    })
    if (this.getInstallation && this.getInstallation.login.toLowerCase() !== this.installationName.toLowerCase()) {
      this.$router.replace({ ...this.$route, params: { ...this.$route.params, installationName: this.getInstallation.login } })
    }
  },
  methods: {
    ...mapActions(['fetchInstallations', 'setupInstallation', 'fetchRepositories', 'fetchRepository', 'prevPage', 'nextPage', 'searchRepository', 'clearSearch']),
    changeInstallation: function (id) {
      this.setupInstallation({ installationId: id })
      this.searchResults = []
      this.search = ''
      this.$refs.selector.open = false
    },
    searchRepo: function () {
      if (this.search.trim().length > 0) {
        this.searchIsLoading = true
        this.searchRepository(this.search.trim()).then(results => {
          if (results) {
            this.searchResults = results
            this.searchIsLoading = false
          }
        })
      } else {
        this.searchResults = []
      }
    },
    setupRepo: function (repo) {
      if (repo && repo.name) {
        this.$router.push({ name: 'submit-service-infos', params: { installationName: this.installationName, repo: repo.name.toLowerCase() } })
      }
    }
  }
}
</script>

<style lang="scss">
@import "~@shellteo/vue-components/src/scss/variables/index";

.repositories {
  border-top: 1px solid $light;
  margin-top: 2rem;
}

.list-with-avatar {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: left;
  span {
    display: block;
    &.avatar {
      width: 2rem;
      height: 2rem;
      overflow: hidden;
      display: block;
      border-radius: 2rem;
      margin-right: 0.75rem;
    }
  }
}

.per-page-container {
  margin-right: 0.5rem;
}

.is-hub-search {
  width: 16rem;
}

.hr-absolute {
  & > div {
    height: calc(3rem + 1px);
    hr {
      height: 1px;
      background: #d0d0d0;
      position: absolute;
      left: 0;
      right: 0;
    }
  }
}
</style>
