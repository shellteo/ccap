<template>
  <div class="home">
    <s-layout
      background="light"
      foreground="white"
      rounded
      outside
      margin="large"
    >
      <s-container>
        <s-div
          size="full"
          padding="large"
        >
          <home-description-template
            v-for="(step, idx) of steps"
            :key="`step-${idx}`"
            :idx="idx"
            :name="step.name"
            :content="step.content"
            :link="step.link"
            :picture="step.picture"
            :picture2x="step.picture2x"
            :picture3x="step.picture3x"
          >
            <template slot="content">
              <template v-if="idx === 0">
                Explore services written in any programming<br>
                languages. From microservices to functions,<br>
                workflows and APIs; it’s all here.
              </template>
              <template v-else-if="idx === 1">
                Develop your own unique service and<br>
                function in any programming language.<br>
                <i>Share it, sell it, or keep it secret.</i>
              </template>
              <template v-else-if="idx === 2">
                Test services in a sandbox environment<br>
                before putting it into production.
              </template>
              <template v-else-if="idx === 3">
                Write your application combining many services, harmoniously.<br>
                We call this <b>microservice choreography.</b>
              </template>
            </template>
          </home-description-template>
          <s-boxed class="has-text-centered">
            <p class="is-size-8 boxed-top-text">Every application has a story of how data moves.</p>
            <h3 class="is-size-3 has-text-dark">Storytell your next feature with Storyscript.</h3>
          </s-boxed>
        </s-div>
      </s-container>
    </s-layout>
    <s-layout
      background="dark"
      margin="large"
    >
      <s-container row>
        <s-div class="has-text-centered">
          <h4 class="is-size-4 has-text-weight-bold has-text-white has-text-uppercase">List your service on Story Hub</h4>
          <s-button
            class="home-submit-btn"
            state="light"
            @click="$emit('open-modal')"
          >
            Submit a service
          </s-button>
        </s-div>
      </s-container>
    </s-layout>
    <s-layout padding="large">
      <s-container>
        <s-div size="full">
          <s-level>
            <h2
              slot="left"
              class="is-size-4 has-text-gray-2 title"
            >
              Find a service
            </h2>
            <s-button
              slot="right"
              :to="{ name: 'services' }"
              state="secondary"
              arrow
              size="small"
            >
              View More
            </s-button>
          </s-level>
        </s-div>
        <s-div size="full">
          <transition-group
            name="fade"
            tag="s-container"
          >
            <s-div
              v-for="(r, index) in data.recentServices.slice(0, 6)"
              :key="r.alias || index"
              size="one-third"
              padding="medium"
            >
              <service-summary
                :title="getTitle(r)"
                :is-alias="r.alias ? true : false"
                :description="r.description"
                :tags="r.topics"
              />
            </s-div>
          </transition-group>
        </s-div>
      </s-container>
    </s-layout>
    <s-join
      footer
      @showBetaModal="$emit('showBetaModal')"
    />
  </div>
</template>

<script>
import { IndexQuery } from '@/plugins/graphql'
import ServiceSummary from '@/components/ServiceSummary'
import HomeDescriptionTemplate from '@/components/templates/HomeDescription'
// import Picture1 from '@/assets/img/home/1.png'
// import Picture12x from '@/assets/img/home/1@2x.png'
// import Picture13x from '@/assets/img/home/1@3x.png'
// import Picture2 from '@/assets/img/home/2.png'
// import Picture22x from '@/assets/img/home/2@2x.png'
// import Picture23x from '@/assets/img/home/2@3x.png'
// import Picture3 from '@/assets/img/home/3.png'
// import Picture32x from '@/assets/img/home/3@2x.png'
// import Picture33x from '@/assets/img/home/3@3x.png'
// import Picture4 from '@/assets/img/home/4.png'
// import Picture42x from '@/assets/img/home/4@2x.png'
// import Picture43x from '@/assets/img/home/4@3x.png'

export default {
  name: 'Index',
  apollo: {
    data: {
      query: IndexQuery,
      update: data => ({
        recentServices: data.recentlyAddedServices.nodes
      })
    }
  },
  components: {
    ServiceSummary,
    HomeDescriptionTemplate
  },
  data: () => ({
    data: {
      recentServices: [{}, {}, {}, {}, {}, {}]
    }
    // steps: [{
    //   name: 'Discover it.',
    //   link: { name: 'services' },
    //   picture: Picture1,
    //   picture2x: Picture12x,
    //   picture3x: Picture13x
    // }, {
    //   name: 'Create it.',
    //   link: { href: '//storyscript.io/blog/designing-smarter-microservices' },
    //   picture: Picture2,
    //   picture2x: Picture22x,
    //   picture3x: Picture23x
    // }, {
    //   name: 'Try it.',
    //   picture: Picture3,
    //   picture2x: Picture32x,
    //   picture3x: Picture33x
    // }, {
    //   name: 'Launch it.',
    //   link: { href: '//storyscript.io/blog/story-telling' },
    //   picture: Picture4,
    //   picture2x: Picture42x,
    //   picture3x: Picture43x
    // }]
  }),
  computed: {
    topics: function () {
      return this.data.recentServices.map(s => s.topics)
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

<style lang="scss">
.boxed-top-text {
  color: nth($grays, 1);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-bottom: 0.5rem;
}

.home {
  .home-submit-btn {
    margin-top: 2rem;
    color: $primary !important;
  }
}
</style>
