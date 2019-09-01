<template>
  <div class="service">
    <s-layout
      background="gray-4"
      foreground="white"
      narrow
      rounded
      shadow
      margin="normal"
    >
      <s-container>
        <s-div
          size="full"
          padding="normal"
          class="bordered-bottom-light"
        >
          <s-breadcrumbs
            :items="breadcrumbs"
            class="always-clickable" />
        </s-div>
        <s-div
          :padding="['2x', '1x']"
          size="full"
        >
          <s-media class="has-content-centered">
            <div
              slot="left"
              :class="['image', 'service-avatar', 'empty']"
            >
              <img
                src="~@/assets/img/services/default.svg"
                alt="service icon"
              >
            </div>
            <s-text
              :class="{'loading-shimmer': !serviceName}"
              head="3">
              {{ serviceName || '' }}
            </s-text>
            <a
              v-if="service && service.owner && service.owner.username && service.name"
              :href="`//${getServiceBaseURI}/${getServiceURI}`"
              :class="['has-text-weight-semibold', 'has-spans', {'loading-shimmer': !serviceName}]"
              target="_blank"
            ><i class="mdi mdi-github-face has-text-primary" /><span class="has-text-gray-2 is-size-6">{{ getServiceURI }}</span></a>
            <template slot="right">
              <span class="tags">
                <s-tag
                  :color="service.public ? 'success' : 'danger'"
                  outline
                >{{ service.public ? 'PUBLIC' : 'PRIVATE' }}</s-tag>
              </span>
            </template>
          </s-media>
        </s-div>
        <s-div
          size="full"
        >
          <div
            class="is-divider contributors"
            data-align="right"
            data-content="CONTRIBUTOR">
            <!--               v-for="i in 3"
              :key="`contributor-${_uid}-${i}`" -->
            <figure
              class="image is-32x32 is-avatar">
              <img
                src="//storage.googleapis.com/storyscriptapp.com/http_assets/favicon.ico"
                alt="">
            </figure>
          </div>
        </s-div>
        <s-div
          :padding="['small', 'normal']"
          size="full"
        >
          <p class="service-license">Version {{ latestVersion }} - License {{ license }}</p>
        </s-div>
      </s-container>
    </s-layout>

    <s-layout
      :margin="['normal', 'large']"
      rounded
      narrow
      shadow
      background="gray-4"
      foreground="white"
    >
      <s-container>
        <s-div
          size="one-quarter"
          padding="normal"
          class="has-background-lighter sticky left-sidebar"
        >
          <ul
            v-scroll-spy-active
            v-scroll-spy-link
            v-show="$route.name === 'service'"
            class="topics-list"
          >
            <li class="topic-item"><router-link :to="{ path: getServicePath, hash: 'readme' }">Description</router-link></li>
            <li :class="['topic-item', {active: $route.name === 'actions'}]"><router-link :to="{ path: getServicePath, hash: 'actions' }">Actions</router-link></li>
            <!-- <li><a href="#similars">Similar apps</a></li> -->
            <li class="topic-item"><router-link :to="{ path: getServicePath, hash: 'environment' }">Environment variables</router-link></li>
            <li class="topic-item"><router-link :to="{ path: getServicePath, hash: 'versions' }">Versions</router-link></li>
            <!-- <li class="topic-item"><a href="#pricing">Pricing</a></li> -->
          </ul>
          <ul
            v-show="$route.name === 'actions' || $route.name === 'guide'"
            class="topics-list"
          >
            <li class="topic-item"><router-link :to="{ path: getServicePath, hash: 'readme' }">Description</router-link></li>
            <li class="topic-item active"><router-link :to="{ path: `${getServicePath}/actions` }">Actions</router-link></li>
            <li
              v-if="$route.name === 'guide'"
              :class="['topic-item', 'sub']"
            >
              <s-tag
                outline
                color="name is-topic-item"
                @click.native="$router.push({ path: $route.path, hash: getHashArray[0] })">{{ getHashArray[0] }}</s-tag>
            </li>
            <li
              v-if="$route.name === 'guide' && commands.hasOwnProperty(getHashArray[0]) && commands[getHashArray[0]].events && $route.hash.includes(`#${getHashArray[0]}-`)"
              :class="['topic-item', 'sub']"
            >
              <a>Events</a>
              <ul>
                <template
                  v-for="(v, name) in commands[getHashArray[0]].events">
                  <li
                    v-if="$route.hash.includes(`#${getHashArray[0]}-${name}`)"
                    :key="`list-subcommand-${name}`"
                    :class="['topic-item', 'sub-sub']"
                    @click="$router.push({ path: $route.path, hash: `${getHashArray[0]}-${name}` })"
                  >
                    <s-tag
                      outline
                      color="name is-topic-item">{{ name }}</s-tag>
                  </li>
                  <li
                    v-if="$route.name === 'guide' && v.output && v.output.actions && $route.hash.includes(`#${getHashArray[0]}-${name}-`)"
                    :key="`list-subcommand-${name}-events`"
                    :class="['topic-item', 'sub-sub']"
                  >
                    <a>Actions</a>
                    <ul>
                      <template v-for="(a, aname) in v.output.actions">
                        <li
                          v-if="$route.hash.includes(`#${getHashArray[0]}-${name}-${aname}`)"
                          :key="`list-subcommand-${name}-${aname}`"
                          :class="['topic-item', 'sub-sub', {active: $route.hash.includes(`#${getHashArray[0]}-${name}-${aname}`)}]"
                          @click="$router.push({ path: $route.path, hash: `${getHashArray[0]}-${name}-${aname}` })"
                        >
                          <s-tag
                            outline
                            color="name is-topic-item">{{ aname }}</s-tag>
                        </li>
                      </template>
                    </ul>
                  </li>
                </template>
              </ul>
            </li>
            <!-- <li><a href="#similars">Similar apps</a></li> -->
            <li class="topic-item"><router-link :to="{ path: getServicePath, hash: 'environment' }">Environment variables</router-link></li>
            <li class="topic-item"><router-link :to="{ path: getServicePath, hash: 'versions' }">Versions</router-link></li>
            <!-- <li class="topic-item"><a href="#pricing">Pricing</a></li> -->
          </ul>
        <!-- <ul
            v-show="$route.name === 'guide'"
            class="topics-list"
          >
            <template v-for="(command, name) in commands">
              <li
                :key="`list-command-${name}`"
                :class="['topic-item', { active: $route.hash === `#${name}`}]"
              >
                <a
                  :href="`#${name}`"
                  :title="name"
                >{{ name }}</a>
              </li>
              <template v-if="command.events">
                <li
                  v-for="(event, ename) in command.events"
                  :key="`list-subcommand-${ename}`"
                  :class="['topic-item', 'sub', {active: $route.hash.includes(`#${name}-${ename}`)}]"
                >
                  <a
                    :href="`#${name}-${ename}`"
                    :title="ename"
                  >{{ ename }}</a>
                </li>
              </template>
            </template>
          </ul> -->
        </s-div>

        <s-div
          size="three-quarters"
          padding="medium"
        >
          <s-container
            v-if="service"
            clean
            centered-h>
            <s-div size="10">
              <transition name="fade">
                <router-view />
              </transition>
            </s-div>
          </s-container>
        </s-div>
      </s-container>
    </s-layout>
  </div>
</template>

<script>
import { ServiceQuery, ServiceByOwnerAndRepoQuery, ServiceRepositoryQuery } from '@/plugins/graphql'

export default {
  name: 'OneServicePage',
  provide () {
    return {
      commands: () => this.commands,
      tags: () => this.tags,
      serviceName: () => this.serviceName,
      numCommands: () => this.numCommands,
      alias: () => this.alias,
      owner: () => this.owner,
      repo: () => this.repo
    }
  },
  props: {
    repo: {
      type: String,
      default: undefined
    },
    alias: {
      type: String,
      default: undefined
    },
    owner: {
      type: String,
      default: undefined
    }
  },
  apollo: {
    serviceByAlias: {
      query: ServiceQuery,
      skip: function () {
        return !this.alias
      },
      variables: function () {
        return {
          where: this.alias
        }
      },
      update: function (data) {
        return data.serviceByAlias
      }
    },
    getServiceRepository: {
      query: ServiceRepositoryQuery,
      skip: function () {
        return !this.serviceByAlias && !this.serviceByOwnerAndRepo
      },
      variables: function () {
        return {
          uuid: this.service.uuid
        }
      },
      update: function (data) {
        return data.getServiceRepository
      }
    },
    serviceByOwnerAndRepo: {
      query: ServiceByOwnerAndRepoQuery,
      skip: function () {
        return !this.owner && !this.repo
      },
      variables: function () {
        return {
          owner: this.owner,
          repo: this.repo
        }
      },
      update: function (data) {
        return (
          data.allOwners.nodes.length > 0 &&
          data.allOwners.nodes[0].services.nodes.length > 0 &&
          data.allOwners.nodes[0].services.nodes[0]
        )
      }
    }
  },
  data: () => ({
    serviceByAlias: undefined,
    serviceByOwnerAndRepo: undefined,
    getServiceRepository: undefined
  }),
  computed: {
    service: function () {
      return this.serviceByAlias || this.serviceByOwnerAndRepo || {}
    },
    getServiceURI: function () {
      return !this.getServiceRepository ? '' : `${this.getServiceRepository.ownerName}/${this.getServiceRepository.repoName}`
    },
    getServicePath: function () {
      const slice = this.$route.name === 'service' ? 0 : -(this.$route.name.length + 1)
      return this.$route.path.slice(0, slice)
    },
    getServiceBaseURI: function () {
      const services = { GITHUB: 'github.com' }
      let uri = this.getServiceRepository && Object.keys(services).includes(this.getServiceRepository.service) ? services[this.getServiceRepository.service] : ''
      return uri
    },
    breadcrumbs: function () {
      let arr = [{ name: 'Hub', to: { name: 'services' } }, { name: 'Services', to: { name: 'services' } }]
      if (this.$route.name.includes('service')) arr.push({ name: this.serviceName })
      else {
        arr.push({ name: this.serviceName, to: { path: this.getServicePath, hash: '' } })
        // arr.push({ name: 'Actions', to: { path: this.$route.path.slice(0, -6), hash: '#actions' } })
        // for (let i = 0; i < this.getHashArray.length; i++) {
        //   arr.push({ name: this.getHashArray[i], to: { path: this.$route.path, hash: `#${this.getHash(i)}` } })
        // }
      }
      return arr
    },
    getHashArray: function () {
      return (((this.$route.hash[0] === '#' ? this.$route.hash : `#${this.$route.hash}`) || '').split('#') || ['', ''])[1].split('-')
    },
    serviceName: function () {
      if (
        !this.service.alias &&
        (!this.service || !this.service.owner)
      ) {
        return ''
      }
      return (
        this.service.alias ||
        `${this.service.owner.username}/${this.service.name}`
      )
    },
    numCommands: function () {
      return Object.keys(this.commands).length
    },
    commands: function () {
      return (
        (this.service &&
          this.service.serviceTags &&
          this.service.serviceTags.nodes &&
          this.service.serviceTags.nodes.length > 0 &&
          this.service.serviceTags.nodes[0].configuration.actions) ||
        {}
      )
    },
    tags: function () {
      return (
        (this.service &&
          this.service.serviceTags &&
          this.service.serviceTags.nodes) ||
        []
      )
    },
    license: function () {
      return ((this.tags && this.tags.length > 0 &&
                this.tags[0].configuration &&
                this.tags[0].configuration.info &&
                this.tags[0].configuration.info.license &&
                this.tags[0].configuration.info.license.name) || undefined)
    },
    latestVersion: function () {
      return ((this.tags && this.tags.length > 0 &&
          this.tags[0].configuration &&
          this.tags[0].configuration.info &&
          this.tags[0].configuration.info.version) || undefined)
    }
  },
  watch: {
    '$route': 'onMounted',
    serviceByAlias: function (newValue) {
      if (!newValue) this.$router.push('/404')
    },
    serviceByOwnerAndRepo: function (newValue) {
      if (!newValue) this.$router.push('/404')
    }
  },
  mounted: function () {
    this.onMounted()
  },
  methods: {
    onMounted: function () {
      if (!this.alias && !this.owner && !this.repo) {
        this.$router.push('/404')
      }
    },
    getHash: function (idx) {
      let hash = ((this.$route.hash || '').split('#') || ['', ''])[1].split('-')
      hash.splice(idx + 1)
      return hash.join('-')
    }
  }
}
</script>

<style lang="scss">
@import "~@storyscript/vue/src/scss/variables/index";

.service-license {
  font-size: nth($sizes, 7);
  color: nth($grays, 2);
  font-weight: 600;
}

.service-stats {
  p {
    margin-bottom: 0.5rem;
  }
}

.overlay-space-evenly {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
}

.service-avatar {
  width: 5rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  &:not(.empty) {
    background-color: $light;
    border-radius: 0.625rem;
    border: 1px solid nth($grays, 4);
    padding: 1rem;
    object-fit: contain;
  }
}
</style>
