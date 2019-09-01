<template>
  <div class="service-new">
    <div class="section">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-four-fifths">
            <a-steps
              ref="steps"
              lock-headers>
              <form
                slot-scope="stepsProps"
                class="column is-full"
                action=""
                @submit.prevent="submitSteps">
                <a-step class="column is-full">
                  <span slot="header">
                    1. <span><font-awesome-icon :icon="['fab', 'github']" /> Connect to Github</span>
                  </span>
                  <a-card>
                    <h2 class="title is-3">Continuous Deployment</h2>
                    <p class="subtitle">Connect to Github where your sources are hosted. When you push to Git, we'll update your service on our servers and deploy the result.</p>
                    <a-button
                      type="button"
                      state="neutral"
                      @click="login"><font-awesome-icon :icon="['fab', 'github']" /> Signin with Github</a-button>
                  </a-card>
                </a-step>
                <a-step>
                  <span slot="header">
                    2. <span><font-awesome-icon icon="code-branch" /> Choose a repository</span>
                  </span>
                  <div
                    v-if="getUser"
                    class="tile is-parent is-vertical">
                    <div class="search level">
                      <div class="level-left">
                        <h3><img
                          :src="`https://avatars.githubusercontent.com/${getUser.username}?s=64`"
                          class="avatar"
                          alt="user" > {{ getUser.username }}</h3>
                      </div>
                      <div class="level-right">
                        <a-input
                          v-model="search"
                          addon-left-icon="search"
                          placeholder="Search a repository" />
                      </div>
                    </div>
                    <transition-group
                      tag="div"
                      name="fade">
                      <div
                        v-for="(r, index) in searchedRepos"
                        :key="`repos-on-list-item-${index}`"
                        class="tile is-child repo">
                        <div class="level">
                          <div class="level-left">
                            <service-summary
                              :title="r.name"
                              :is-alias="false"
                              :description="emojify(r.description)"
                              :tags="r.topics" />
                          </div>
                          <div class="level-right">
                            <a-button
                              v-if="r.microservice"
                              type="button"
                              state="primary"
                              @click="choose(r)">Choose</a-button>
                            <a-button
                              v-else
                              type="button"
                              state="secondary"
                              outline
                              disabled>Choose</a-button>
                          </div>
                        </div>
                      </div>
                      <div
                        v-show="searchedRepos.length === 0"
                        key="repos-on-list-no-items"
                        class="repo">
                        <div class="text--center">
                          <h3 class="subtitle is-4">No repositories found</h3>
                        </div>
                      </div>
                    </transition-group>
                  </div>
                </a-step>
                <a-step>
                  <span slot="header">
                    3. <span><font-awesome-icon icon="file-signature" /> Additional informations</span>
                  </span>
                  <div
                    v-if="service.repo && getUser"
                    class="form">
                    <div class="form-section">
                      <h2>Repository</h2>
                      <div class="inputs">
                        <a-input
                          :value="getUser.username"
                          :options="[]"
                          label="Owner"
                          disabled>
                          <small slot="infoBlock">Teams and Organizations coming soon</small>
                        </a-input>
                        <a-input
                          :valid="/^[\w[\-]*]*\w+$/g.test(service.name)"
                          v-model="service.name"
                          error="The name can only contains letters, numbers, underscores and dashes. It can't end with a dash"
                          label="Service name" />
                        <div class="select-group">
                          <a-window
                            :copy="false"
                            :code="serviceCodeContent" />
                        </div>
                      </div>
                      <h2>Hub search informations</h2>
                      <div class="inputs">
                        <a-input
                          :valid="service.title.length > 2 && service.title.length < 70"
                          v-model="service.title"
                          label="Title"
                          error="Title length must be between 3 and 70 characters" />
                        <a-input
                          :valid="service.description.length > 0"
                          v-model="service.description"
                          label="Description"
                          textarea
                          error=" "
                          area />
                        <a-input
                          v-model="service.category"
                          :options="categoriesList"
                          label="Category" />
                        <a-input
                          v-model="service.tags"
                          :options="tagsbyCategoryList"
                          label="Tags"
                          multiple />
                      </div>
                      <h2>Container location</h2>
                      <div class="inputs">
                        <a-input
                          v-model="service.containerProvider"
                          :options="['Docker', 'Custom']"
                          label="Provider" />
                        <a-input
                          :placeholder="service.containerProvider === 'Docker' ? 'owner/microservice' : 'https://registry.domain.tld/pull/microservice'"
                          :valid="validPull"
                          v-model="service.pullUrl"
                          label="Pull url"
                          error="Please, provide a valid pull URL"
                          @blur="pullCheck">
                          <span
                            v-if="service.containerProvider === 'Docker'"
                            slot="addonLeft"
                            class="text--dark"><font-awesome-icon :icon="['fab', 'docker']" /></span>
                        </a-input>
                      </div>
                    </div>
                    <div class="submit">
                      <a-button
                        type="button"
                        state="neutral"
                        outline
                        size="l"
                        @click="stepsProps.prev()">Change repository</a-button>
                      <a-button
                        :disabled="!validPull"
                        type="submit"
                        state="primary"
                        size="l">Submit service</a-button>
                    </div>
                  </div>
                </a-step>
              </form>
            </a-steps>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import repos from '@/assets/repos.json'
import axios from 'axios'
import emoji from 'node-emoji'
import { mapGetters } from 'vuex'
import ServiceSummary from '@/components/ServiceSummary'
const tagsList = {
  'Service': ['Authentication', 'CMS', 'Database', 'Logging', 'Memory Store', 'Messaging', 'Monitoring', 'Optimization', 'Search', 'Social Media', 'Video Processing', 'Image Processing', 'Text Processing', 'Machine Learning', 'Programming Languages', 'Developer Tools', 'IoT', 'Worker'],
  'Function': ['Sorting', 'Filtering', 'Strings']
}

export default {
  name: 'NewService',
  components: { ServiceSummary },
  filters: {
    spliceSearch: function (arr) {
      return arr.splice().filter(a => a.name.includes(this.search))
    }
  },
  data: () => ({ tagsList, repos: [], validPull: undefined, serviceRepo: undefined, search: '', service: { repo: undefined, branches: [], name: '', version: '', icon: '', containerProvider: 'Docker', pullUrl: '', tags: '', category: 'Service', branch: 'master', title: '', description: '', public: true } }),
  computed: {
    ...mapGetters(['getUser', 'isUserLoggedIn', 'isUserRefreshing']),
    searchedRepos: function () {
      return this.repos.filter(r => r.name.toLowerCase().includes(this.search.toLowerCase()) || (r.description && r.description.toLowerCase().includes(this.search.toLowerCase())))
    },
    serviceCodeContent: function () {
      return `output = ${this.getUser.username}/${this.service.name || this.service.repo.name} action param:value ...`
    },
    categoriesList: function () {
      return Object.keys(this.tagsList)
    },
    tagsbyCategoryList: function () {
      return ['Service', 'Function'].includes(this.service.category) ? this.tagsList[this.service.category] : []
    }
  },
  watch: {
    'isUserRefreshing': function (refreshing) {
      if (!refreshing && this.isUserLoggedIn && this.$refs.steps.steps[0].active) {
        this.$nextTick(this.$refs.steps.nextStep)
      } else if (!refreshing && !this.isUserLoggedIn) {
        this.$nextTick(() => {
          this.$refs.steps.goToStepIndex(0)
          // this.$refs.steps.prevStep()
        })
      }
    },
    'service.containerProvider': function (value) {
      this.service.pullUrl = value === 'Docker' ? this.service.repo.full_name : ''
    },
    'service.category': function (value) {
      this.service.tags = []
    }
  },
  mounted: function () {
    this.repos = repos
    this.$nextTick(() => {
      if (this.isUserLoggedIn) {
        this.$refs.steps.nextStep()
      }
    })
    for (let repo of this.repos) {
      if (['jwt', 'twitter', 'slack'].includes(repo.name)) {
        const idx = this.repos.indexOf(repo)
        repo.microservice = true
        this.repos.splice(idx, 1, repo)
      }
      // axios.get('https://api.github.com/repos/JeanBarriere/' + repo.name + '/contents/microservice.yml').then((res) => {
      //   if (res.data.name) {
      //     const idx = this.repos.indexOf(repo)
      //     repo.microservice = true
      //     this.repos.splice(idx, 1, repo)
      //   }
      // })
    }
  },
  methods: {
    emojify: function (description) {
      return emoji.emojify(description, () => '🐙')
    },
    login: function () {
      this.$api.dummyUser()
    },
    pullCheck: function () {
      const url = this.service.containerProvider === 'Docker' ? `https://hub.docker.com/v2/repositories/${this.service.pullUrl}/tags/latest` : this.service.pullUrl
      axios.head(`https://cors-anywhere.herokuapp.com/${url}/`, { crossdomain: true }).then((res) => {
        this.validPull = true
      }).catch(() => {
        this.validPull = false
      })
    },
    submitSteps: function (e) {
      console.log('submitting', e)
    },
    choose: function (r) {
      this.service.serviceName = r.full_name
      this.service.name = r.name
      this.service.pullUrl = r.full_name
      this.service.branches = [r.default_branch]
      this.service.repo = r
      axios.get(`https://api.github.com/repos/${this.service.repo.full_name}/branches`).then((res) => {
        this.service.branches = res.data.reduce((arr, b) => [...arr, b.name], [])
      })
      this.$refs.steps.nextStep()
    }
  }
}
</script>

<style lang="scss">
.repo {
  padding-top: 1.5rem;
  padding-bottom: 1rem;
  border-top: 1px solid #c7c7c7;

  .level-left {
    max-width: 85%;
  }

  &:last-child {
    border-bottom: 1px solid #c7c7c7;
  }
}

.search {
  margin: 2rem 0;

  h3 {
    align-items: center;
    display: flex;
  }
}

.avatar {
  width: 3rem;
  height: 3rem;
  margin-right: 1rem;
  border-radius: 1.5rem;
  border: .2rem solid gray(100);
}

.select-group {
  margin: 1rem 0;
}

.form {
  .submit {
    margin-left: auto;
    float: right;
    margin-top: 2rem;
  }
}
</style>
