<template>
  <div
    class="service-container"
  >
    <h1>测试2</h1>
    <section
      id="readme">
      <s-text head="3">
        Description
      </s-text>
      <div
        ref="readmeContainer"
        :class="{ full: showMore, 'loading-shimmer': !serviceName() }"
        class="readme-container card-bordered"
      >
        <div
          v-if="!serviceName()"
          class="readme-md"
        >
          <h5 class="is-size-7 has-text-centered has-text-gray-2">Loading content</h5>
        </div>
        <div
          v-if="tags() && tags().length > 0 && (tags()[0].readme === false || !tags()[0].readme)"
          class="readme-md"
        >
          <h5 class="is-size-7 has-text-centered has-text-gray-2">No Readme file found for this microservice</h5>
        </div>
        <vue-markdown
          v-else-if="tags() && tags().length > 0 && tags()[0].readme"
          class="readme-md"
        >{{ tags()[0].readme }}</vue-markdown>
        <div
          v-if="serviceName() && !showMore"
          class="readme-more"
        >
          <s-button
            link
            @click="showMore = true"
          >more</s-button>
        </div>
      </div>
    </section>

    <section id="actions">
      <div class="card-bordered">
        <div class="card-bordered-header">
          <s-text
            p="2"
            semi-bold>Actions</s-text>
        </div>
        <div class="card-bordered-content">
          <transition name="fade">
            <div
              v-if="serviceName() && numCommands() <= 0"
              class="columns is-centered"
            >
              <h5 class="has-text-centered has-text-gray-2 is-size-7 is-variable is-3">
                This service has no actions.
              </h5>
            </div>
          </transition>
          <template v-if="!serviceName()">
            <div
              v-for="i in 4"
              :key="i"
              class="columns is-vcentered is-mobile"
            >
              <div class="column is-one-quarter">
                <div class="columns is-paddingless is-variable is-1 is-vcentered is-mobile">
                  <div class="column has-padding-none">
                    <span class="tag is-secondary is-medium loading-shimmer" />
                  </div>
                  <div class="column">
                    <div class="is-divider" />
                  </div>
                </div>
              </div>
              <div class="column loading-shimmer" />
              <div class="column">
                <s-button
                  arrow
                  size="small"
                  state="light is-circle"
                  disabled
                >
                  Try now
                </s-button>
              </div>
            </div>
          </template>
          <template v-else>
            <div
              v-for="(command, name) in getFirstCommands"
              :key="`list-commands-${_uid}-${name}`"
              class="action-item"
              @click="$router.push({ path: `${$route.path}/guide`, hash: `#${name}` })"
            >
              <s-container
                clean
                centered-v
                class="is-variable is-2 is-mobile is-paddingless">
                <s-div size="one-third">
                  <s-container
                    clean
                    centered-v
                    class="is-paddingless is-variable is-1 is-mobile">
                    <s-div class="is-narrow">
                      <s-tag color="secondary">{{ name }}</s-tag>
                    </s-div>
                    <s-div>
                      <div class="is-divider" />
                    </s-div>
                  </s-container>
                </s-div>
                <s-div size="half">
                  <s-text
                    :color="!command.help ? 'gray-3' : undefined"
                    p="2"
                    class="is-text-ellipsed"
                  >
                    {{ command.help || '« No description »' }}
                  </s-text>
                </s-div>
                <s-div size="2 has-text-right">
                  <s-button
                    arrow
                    size="small"
                    link
                  />
                </s-div>
              </s-container>
            </div>
          </template>
        </div>
        <div
          v-if="serviceName() && numCommands() > 0"
          class="card-bordered-footer has-text-centered"
        >
          <s-button
            link
            @click="$router.push({ path: `${$route.path}/actions` })"
          >
            Show All Actions
          </s-button>
        </div>
      </div>
    </section>

    <section
      id="environment">
      <div class="card-bordered">
        <div class="card-bordered-header">
          <s-text
            p="2"
            semi-bold>Environment Variables</s-text>
        </div>
        <div class="card-bordered-content">
          <s-container
            class="is-mobile is-paddingless"
            clean
            centered-v
          >
            <template v-if="tags().length > 0 && tags()[0].configuration && tags()[0].configuration.environment">
              <s-div
                size="full"
                padding="small"
              >
                <s-media
                  v-for="(env, name) in tags()[0].configuration.environment"
                  :key="`list-env-${_uid}-${name}`"
                  centered
                >
                  <s-text
                    slot="left"
                    p="2"
                    span
                    color="dark-blue"
                  >{{ name }}</s-text>
                  <s-tag
                    outline
                    color="gray-3">{{ env.type }}</s-tag>
                  <s-text
                    slot="right"
                    p="2"
                    span
                    small
                  >{{ env.help }}{{ env.required ? ' - required': '' }}</s-text>
                </s-media>
              </s-div>
            </template>
            <template v-else>
              <s-div
                size="full"
                padding="none"
              >
                <s-media>
                  <s-text
                    p="2"
                    span
                  >No environment variables needed</s-text>
                </s-media>
              </s-div>
            </template>
          </s-container>
        </div>
      </div>
    </section>

    <section
      id="versions">
      <div class="card-bordered">
        <div class="card-bordered-header">
          <s-text
            p="2"
            semi-bold>Versions</s-text>
        </div>
        <div class="card-bordered-content">
          <s-container
            class="is-mobile is-paddingless"
            clean
            centered-v
          >
            <template >
              <s-div
                size="full"
                padding="small"
              >
                <s-media
                  v-for="(tag, idx) of tags()"
                  :key="`list-versions-${_uid}-${idx}`"
                  centered
                >
                  <s-text
                    slot="left"
                    p="2"
                    span
                    color="dark-blue"
                  >{{ tag.configuration && tag.configuration.info ? tag.configuration.info.version : 'UNKNOWN' }}</s-text>
                  <s-tag
                    outline
                    color="gray-3">{{ tag.tag ? tag.tag : 'undefined' }}</s-tag>
                  <s-text
                    slot="right"
                    p="2"
                    span
                    small
                  >{{ tag.changelog || 'No changelog provided.' }}</s-text>
                </s-media>
                <s-media
                  v-if="tags().length === 0"
                  centered>
                  <s-text
                    p="2"
                    span
                  >No versions found</s-text>
                </s-media>
              </s-div>
            </template>
          </s-container>
        </div>
      </div>
    </section>
    <!-- <section id="pricing">
      <h3 class="is-size-5 has-text-dark title has-text-uppercase">Pricing</h3>
      <h5 class="is-size-6 has-text-gray-2 subtitle">Select a plan to get started with {{ serviceName() }}</h5>
      <div class="image">
        <img
          src="@/assets/img/services/pricing.png"
          srcset="@/assets/img/services/pricing@2x.png 2x, @/assets/img/services/pricing@3x.png 3x"
          alt="pricing"
        >
        <figcaption class="overlay-space-evenly">
          <h5 class="is-size-7 has-text-dark has-text-weight-bold has-text-uppercase">Coming Soon!</h5>
          <s-button url="//storyscript.io/blog">Read our Blog</s-button>
        </figcaption>
      </div>
    </section> -->
  </div>
</template>

<script>
export default {
  name: 'ServiceHome',
  data: () => ({ showMore: true }),
  inject: ['commands', 'tags', 'serviceName', 'numCommands', 'alias', 'owner', 'repo'],
  computed: {
    getFirstCommands: function () {
      const keys = Object.keys(this.commands())
      if (keys.length > 0) {
        let ret = {}
        for (let i = 0; i < 4 && i < keys.length; i++) {
          ret = { ...ret, [keys[i]]: this.commands()[keys[i]] }
        }
        return ret
      }
      return {}
    },
    readme: function () {
      return this.tags() && this.tags().length > 0 ? this.tags()[0].readme : undefined
    }
  },
  watch: {
    'readme': {
      deep: true,
      handler: function (value) {
        if (this.tags().length > 0 && this.tags()[0].readme) {
          /* global Prism */
          this.$nextTick(Prism.highlightAll)
          // this.$nextTick(() => {
          //   this.showMore = (this.$refs.readmeContainer.clientHeight < 300)
          // })
        }
      }
    }
  },
  mounted: function () {
    /* global Prism */
    this.$nextTick(Prism.highlightAll)
    // this.$nextTick(() => {
    //   this.showMore = (this.$refs.readmeContainer.clientHeight < 300)
    // })
  }
}
</script>
