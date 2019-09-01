<template>
  <s-container centered-h>
    <s-div size="full">
      <s-text
        head="3"
        alignment="centered"
      >Configure</s-text>
      <s-text
        p="2"
        alignment="centered"
      >
        <i class="mdi mdi-github-face" /> {{ installationName }}/{{ repo }}
      </s-text>
    </s-div>
    <s-div
      :padding="['normal', 'none']"
      size="half"
    >
      <s-container v-if="repository && !isInvalidYaml && repository.valid && !repository.entry">
        <s-div size="half">
          <div class="field">
            <label
              for="service-selector-owner"
              class="label"
            >Owner</label>
            <div>
              <s-select
                id="service-selector-owner"
                ref="selectInstallation"
                :avatar="getUserAvatarUrl"
                :value="getUserLogin"
                readonly
                disabled
              />
            </div>
          </div>
        </s-div>
        <s-div size="half">
          <s-input
            v-model="submit.name"
            :valid="isValidName"
            :help="isNameDuplicated === submit.name ? 'Already taken by one of your services' : !isValidName ? '2 characters required' : undefined"
            label="Name"
          />
        </s-div>
        <!-- <s-div
          :padding="['small', 'none']"
          size="full"
        > -->
        <!-- <s-text
            p="2"
            small
            span
          >
            You'll be able to call your microservice by typing <code>{{ getUserLogin }}/{{ submit.name }}</code>
          </s-text> -->
        <!-- <div class="field">
            <label
              for="service-selector-owner"
              class="label"
            >Example</label>
            <div class="control">
              <pre class="language-coffee"><code v-text="sample" /></pre>
            </div>
          </div> -->
        <!-- </s-div> -->
      </s-container>
    </s-div>
    <s-div
      size="full"
      class="hr-absolute"
    >
      <hr>
    </s-div>
    <s-div size="half">
      <template v-if="isInvalidYaml || !repository || !repository.valid || repository.entry">
        <s-text
          v-if="!repository"
          head="2"
          alignment="centered"
        ><i class="mdi mdi-spin mdi-loading" /></s-text>
        <template v-else>
          <s-text alignment="centered">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="29"
              height="35"
              viewBox="0 0 29 35"
            >
              <g
                fill="none"
                fill-rule="evenodd"
              >
                <path
                  fill="#FFA94D"
                  fill-rule="nonzero"
                  d="M16.952 28.69L13.9 34.765l-3.19-6.35C4.544 26.765 0 21.14 0 14.451 0 6.471 6.47 0 14.452 0s14.452 6.47 14.452 14.452c0 7.13-5.162 13.053-11.952 14.237z"
                />
                <path
                  fill="#FFF"
                  d="M14.453 6.338c-1.035 0-1.818.54-1.818 1.413v8.003c0 .873.783 1.412 1.818 1.412 1.01 0 1.818-.561 1.818-1.412V7.75c0-.852-.808-1.413-1.818-1.413zM14.453 18.969c-.994 0-1.804.809-1.804 1.804 0 .994.81 1.803 1.804 1.803.995 0 1.803-.81 1.803-1.803 0-.995-.808-1.804-1.803-1.804z"
                />
              </g>
            </svg>
          </s-text>
          <s-text alignment="centered">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="78"
              height="73"
              viewBox="0 0 78 73"
            >
              <g
                fill="#5C52FF"
                fill-rule="nonzero"
              >
                <path d="M78 3.144A3.143 3.143 0 0 0 74.864 0H3.136A3.143 3.143 0 0 0 0 3.144V18.25h3.9v49.001C3.9 70.421 6.473 73 9.633 73H68.367c3.162 0 5.733-2.58 5.733-5.749V18.25H78V3.144zM9.633 70.393A3.14 3.14 0 0 1 6.5 67.25v-7.214c5.415.603 9.727 4.926 10.327 10.356H9.633zM71.5 67.25a3.14 3.14 0 0 1-3.133 3.142h-7.194c.6-5.43 4.912-9.753 10.327-10.356v7.214zm0-9.827c-6.848.623-12.314 6.102-12.934 12.969H19.434c-.622-6.867-6.086-12.348-12.934-12.97V18.25h65v39.174zm3.9-41.781H2.6V3.144c0-.296.24-.537.536-.537h71.728c.295 0 .536.241.536.537v12.499z" />
                <ellipse
                  cx="11.7"
                  cy="9.125"
                  rx="1.3"
                  ry="1.304"
                />
                <ellipse
                  cx="7.8"
                  cy="5.214"
                  rx="1.3"
                  ry="1.304"
                />
                <ellipse
                  cx="15.6"
                  cy="5.214"
                  rx="1.3"
                  ry="1.304"
                />
                <ellipse
                  cx="7.8"
                  cy="13.036"
                  rx="1.3"
                  ry="1.304"
                />
                <ellipse
                  cx="15.6"
                  cy="13.036"
                  rx="1.3"
                  ry="1.304"
                />
                <ellipse
                  cx="19.5"
                  cy="9.125"
                  rx="1.3"
                  ry="1.304"
                />
                <ellipse
                  cx="27.3"
                  cy="9.125"
                  rx="1.3"
                  ry="1.304"
                />
                <ellipse
                  cx="23.4"
                  cy="5.214"
                  rx="1.3"
                  ry="1.304"
                />
                <ellipse
                  cx="31.2"
                  cy="5.214"
                  rx="1.3"
                  ry="1.304"
                />
                <ellipse
                  cx="23.4"
                  cy="13.036"
                  rx="1.3"
                  ry="1.304"
                />
                <ellipse
                  cx="31.2"
                  cy="13.036"
                  rx="1.3"
                  ry="1.304"
                />
                <ellipse
                  cx="35.1"
                  cy="9.125"
                  rx="1.3"
                  ry="1.304"
                />
                <ellipse
                  cx="42.9"
                  cy="9.125"
                  rx="1.3"
                  ry="1.304"
                />
                <ellipse
                  cx="39"
                  cy="5.214"
                  rx="1.3"
                  ry="1.304"
                />
                <ellipse
                  cx="46.8"
                  cy="5.214"
                  rx="1.3"
                  ry="1.304"
                />
                <ellipse
                  cx="39"
                  cy="13.036"
                  rx="1.3"
                  ry="1.304"
                />
                <ellipse
                  cx="46.8"
                  cy="13.036"
                  rx="1.3"
                  ry="1.304"
                />
                <ellipse
                  cx="50.7"
                  cy="9.125"
                  rx="1.3"
                  ry="1.304"
                />
                <ellipse
                  cx="58.5"
                  cy="9.125"
                  rx="1.3"
                  ry="1.304"
                />
                <ellipse
                  cx="54.6"
                  cy="5.214"
                  rx="1.3"
                  ry="1.304"
                />
                <ellipse
                  cx="62.4"
                  cy="5.214"
                  rx="1.3"
                  ry="1.304"
                />
                <ellipse
                  cx="54.6"
                  cy="13.036"
                  rx="1.3"
                  ry="1.304"
                />
                <ellipse
                  cx="62.4"
                  cy="13.036"
                  rx="1.3"
                  ry="1.304"
                />
                <ellipse
                  cx="66.3"
                  cy="9.125"
                  rx="1.3"
                  ry="1.304"
                />
                <ellipse
                  cx="70.2"
                  cy="5.214"
                  rx="1.3"
                  ry="1.304"
                />
                <ellipse
                  cx="70.2"
                  cy="13.036"
                  rx="1.3"
                  ry="1.304"
                />
                <path d="M31.857 37.804h14.287c2.512 0 4.556-2.05 4.556-4.57v-1.948a1.3 1.3 0 1 0-2.6 0v1.949a1.961 1.961 0 0 1-1.956 1.961H31.857a1.961 1.961 0 0 1-1.957-1.961v-1.95a1.3 1.3 0 1 0-2.6 0v1.95c0 2.52 2.044 4.569 4.556 4.569z" />
              </g>
            </svg>
          </s-text>
        </template>
        <s-text
          head="3"
          alignment="centered"
          padding="normal"
        >
          {{ !repository ? 'Fetching your content' : 'Whoops' }}
        </s-text>
        <s-text
          v-if="isInvalidYaml"
          alignment="centered"
          p="2"
        >The content of your
          <code class="has-text-dark-blue">microservice.yml</code> is invalid<br><br>
          <s-button
            icon-left="file-find"
            url="//microservice.guide/introduction/overview/"
          >Read the docs</s-button>
        </s-text>
        <s-text
          v-else-if="repository && repository.entry"
          alignment="centered"
          p="2"
        >This repository already exists in our database<br><br>
          <s-button
            :to="{ name: 'submit-service-choose', params: { ...$route.params } }"
            icon-left="chevron-left"
          >Go back</s-button>
        </s-text>
        <s-text
          v-else-if="repository && !repository.valid"
          alignment="centered"
          p="2"
        >No <code class="has-text-dark-blue">microservice.yml</code> found in this repository<br><br>
          <s-button
            icon-left="file-find"
            url="//microservice.guide/introduction/overview/"
          >Read the docs</s-button>
        </s-text>
      </template>
      <s-container
        v-else
        centered-h
      >
        <s-div
          padding="small"
          size="full"
        >
          <s-input
            :value="submit.description | emoji"
            label="Description"
          />
        </s-div>
        <s-div
          padding="small"
          size="full"
        >
          <div class="field">
            <label
              :for="`service-category-${_uid}`"
              class="label"
            >Category</label>
            <div>
              <s-select
                ref="selectCategory"
                :id="`service-category-${_uid}`"
                :value="submit.category"
                absolute
                class="category-list"
              >
                <li
                  v-for="(category, idx) of categories"
                  :key="`service-category-list-${idx}`"
                >
                  <a @click="selectCategory(category.title)">{{ category.title }}</a>
                </li>
              </s-select>
            </div>
          </div>
        </s-div>
        <s-div
          padding="small"
          size="full"
        >
          <div class="field">
            <div class="control">
              <label class="label">Topics <small>(separate with spaces)</small>
                <s-text
                  span
                  data-tooltip="Tag your microservice correctly so that other users can search and use your service"
                  data-tooltip-right
                >
                  <s-icon icon="question-mark" />
                </s-text>
              </label>
              <s-input
                :id="`input-${_uid}-topic`"
                :tags="submit.topics"
                is-grouped="multiline"
                type="tags"
                placeholder="Topic name"
                autocomplete="off"
              />
            </div>
          </div>
        </s-div>
        <s-div
          size="full"
          padding="small"
        >
          <s-input
            v-model.lazy="submit.pullUrl"
            :valid="isValidPullURL"
            :help="!isValidPullURL ? 'invalid pull URL' : undefined"
            :loading="isValidPullURL === undefined"
            placeholder="username/container"
            icon-left="docker"
            @blur="pullCheck"
          >
            <template slot="label">
              Docker pull URL
              <s-text
                span
                data-tooltip="The Docker Hub Url to your public repository. We only pull images with the 'latest' tag."
                data-tooltip-right
              >
                <s-icon icon="question-mark" />
              </s-text>
            </template>
        </s-input></s-div>
        <s-div
          size="full"
          padding="normal"
        >
          <s-container centered-h>
            <s-div size="2">
              <lock-svg />
            </s-div>
            <s-div size="10">
              <s-input
                :value="submit._public"
                class="has-padding-top-1x has-padding-bottom-min"
                type="radio"
                name="public"
                label="PUBLIC"
                @change="submit._public = true"
              />
              <s-text small>Your microservice will appear in the hub search results.</s-text>
            </s-div>
            <s-div size="2">
              <lock-svg lock />
            </s-div>
            <s-div size="10">
              <s-input
                :value="!submit._public"
                class="has-padding-top-1x has-padding-bottom-min"
                type="radio"
                name="public"
                label="PRIVATE"
                @change="submit._public = false"
              />
              <s-text small>Only you can view and use this microservice.</s-text>
            </s-div>
          </s-container>
        </s-div>
        <s-div
          :padding="['small', 'none']"
          size="two-thirds"
        >
          <s-button
            :disabled="!isValidPullURL || !isValidName"
            full
            @click="submitInfos"
          >Create Service</s-button>
        </s-div>
        <s-div
          v-if="generalError"
          :padding="['normal', 'none']"
          size="full"
        >
          <p class="is-size-8 has-text-danger has-text-centered">An error occured while submitting your service</p>
        </s-div>
      </s-container>
    </s-div>
  </s-container>
</template>

<script>
import { AllServiceCategoriesQuery } from '@/plugins/graphql'
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'
import LockSvg from '@/components/svgs/Lock'

export default {
  name: 'SubmitService',
  components: { LockSvg },
  props: {
    installationName: {
      type: String,
      required: true
    },
    repo: {
      type: String,
      required: true
    }
  },
  data: () => ({
    repository: undefined,
    installationId: undefined,
    sample: '',
    submit: {
      name: '',
      description: '',
      category: '',
      pullUrl: '',
      topics: [],
      _public: true
    },
    topic: '',
    categories: [],
    isValidPullURL: false,
    isValidName: false,
    isInvalidYaml: false,
    generalError: false,
    isNameDuplicated: undefined
  }),
  apollo: {
    categories: {
      query: AllServiceCategoriesQuery,
      update: categories => ([
        ...categories.allServiceCategories.nodes
      ])
    }
  },
  computed: mapGetters(['getRepositories', 'getUserLogin', 'getUserAvatarUrl']),
  watch: {
    'submit.name': 'nameCheck',
    getUserLogin: 'nameCheck',
    'submit._public': function () {
      console.log(this.submit._public)
    }
  },
  mounted: function () {
    this.submit.name = this.repo
    this.getInstallationByName(this.installationName).then((installation) => {
      if (installation) {
        this.$router.replace({ ...this.$route, params: { ...this.$route.params, installationName: installation.login } })
        this.installationId = installation.id
        this.fetchRepository({ repoName: this.repo, installationId: installation.id }).then((repo) => {
          this.repository = repo
          this.submit.description = repo.description
          this.submit.topics = repo.topics
          this.submit.category = (this.categories || [{ title: '' }])[0].title
        }).catch((err) => {
          console.log(err, err.response.data)
          if (err.response.status === 422) {
            this.isInvalidYaml = true
            this.repository = true
          } else {
            this.$router.replace({ name: 'submit-service-choose', params: { installationName: this.installationName } })
          }
        })
      } else {
        this.$router.replace({ name: 'submit-service-choose', params: { installationName: this.installationName } })
      }
    })
  },
  methods: {
    ...mapActions(['fetchRepository', 'getInstallationByName', 'publishService']),
    selectCategory: function (category) {
      this.submit.category = category
      this.$refs.selectCategory.close()
    },
    pullCheck: function () {
      this.isValidPullURL = undefined
      if (!/[a-zA-Z0-9]+\/[a-zA-Z0-9]+/.test(this.submit.pullUrl)) {
        this.isValidPullURL = false
        return
      }
      axios.head(`https://cors-anywhere.herokuapp.com/https://hub.docker.com/v2/repositories/${this.submit.pullUrl}/tags/latest`, { crossdomain: true }).then(() => {
        this.isValidPullURL = true
      }).catch((err) => {
        err = undefined
        this.isValidPullURL = false
      })
    },
    nameCheck: function () {
      this.isValidName = /[a-zA-Z]+[a-zA-Z0-9]+/.test(this.submit.name) && this.isNameDuplicated !== this.submit.name
      this.sample = `value = ${this.getUserLogin}/${this.submit.name} action key:val`
      /* global Prism */
      this.$nextTick(Prism.highlightAll)
    },
    submitInfos: function () {
      if (!this.isValidPullURL || !this.isValidName || !this.categories.reduce((arr, c) => [...arr, c.title], []).includes(this.submit.category)) return
      this.publishService({ installationId: this.installationId, repoName: this.repo, ...this.submit }).then((res) => {
        this.$router.push({ path: `/r/${this.getUserLogin}/${this.submit.name}` })
      }).catch((err) => {
        const res = err.response.data
        this.isValidName = true
        this.isNameDuplicated = undefined
        if (res.status !== 409) { // if it's not a conflict, it should NEVER fall here
          this.generalError = true
        } else {
          switch (res.message) {
            case 'repo': // repo is duplicated, should move back to the list
              this.$router.replace({ name: 'submit-service-choose', params: { installationName: this.installationName } })
              break
            case 'name':
              this.isValidName = false
              this.isNameDuplicated = this.submit.name
              break
            default:
              break
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import "~@storyscript/vue/src/scss/variables/index";

.submission {
  .is-card {
    border: 1px solid #d0d0d0;
    border-radius: 0.4rem;
    overflow: hidden;
    padding-left: 4rem;
  }
}

.category-list {
  .selectable {
    max-height: 300px;
    overflow: auto;

    li a {
      font-weight: 500;
      color: nth($grays, 2);
    }
  }
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
