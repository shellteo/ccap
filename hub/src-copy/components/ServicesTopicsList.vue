<template>
  <div class="topics">
    <s-select
      ref="selector"
      :value="active || 'All Services'"
      class="is-hidden-tablet has-padding-top-normal"
    >
      <s-text
        v-if="getOwnerUuid !== ''"
        :bold="active === 'self'"
        class="is-link"
        li
        color="dark-blue"
        p="1"
        @click.native="active = 'self'"
      >
        My Services
      </s-text>
      <s-text
        :bold="active === ''"
        class="is-link"
        li
        color="dark-blue"
        p="1"
        @click.native="reset"
      >
        所有
      </s-text>
      <s-text
        v-for="topic in topics"
        :key="`list-select-${_uid}-${topic.name}`"
        :bold="topic.name === active"
        class="is-link"
        li
        color="dark-blue"
        p="1"
        @click.native="active = topic.name"
      >
        {{ topic.name }}
        <!-- <span
          v-if="topic.name === active"
          class="delete"
          @click.stop="active = ''"
        /> -->
      </s-text>
    </s-select>
    <transition-group
      name="fade"
      tag="ul"
      class="topics-list is-hidden-mobile"
    >
      <li
        v-if="getOwnerUuid !== ''"
        key="topic-my-services"
        :class="{ 'active': active === 'self' }"
        class="topic-item"
        @click="active = 'self'"
      >
        My Services
      </li>
      <li
        key="topic-all-services"
        :class="{ 'active': active === '' }"
        class="topic-item"
        @click="reset"
      >
        所有
        <!-- <div class="tags">
          <topic-tag
            v-for="t in tags"
            :key="t">{{ t }}</topic-tag>
        </div> -->
      </li>
      <li
        v-for="topic in topics"
        :key="topic.name"
        :class="{ 'active': topic.name === active }"
        class="topic-item"
        @click="active = topic.name"
      >
        {{ topic.name }}
        <!-- <span
          v-if="topic.name === active"
          class="delete"
          @click.stop="active = ''"
        /> -->
      </li>
    </transition-group>
    <ul
      v-if="topics.length <= 0 && isLoading"
      class="topics-list"
    >
      <li class="topic-item">
        <div class="loading-shimmer" />
      </li>
      <li class="topic-item">
        <div class="loading-shimmer" />
      </li>
      <li class="topic-item">
        <div class="loading-shimmer" />
      </li>
    </ul>
    <p
      v-else-if="topics.length <= 0 && !isLoading"
      class="no-topics"
    >No topics found.</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    category: {
      type: String,
      default: undefined
    }
  },
  data: () => ({
    isLoading: false,
    tags: ['microservice', 'cron', 'javascript', 'github'],
    active: ''
  }),
  computed: {
    ...mapGetters(['getOwnerUuid']),
    topics: function () {
      return [{
        name: 'ICOs',
        icon: 'ico'
      }, {
        name: 'STOs',
        icon: 'sto'
      }, {
        name: 'IEOs',
        icon: 'ieo'
      }]
      /* [{
        name: 'Authentication',
        icon: 'auth'
      }, {
        name: 'CMS',
        icon: 'cms'
      }, {
        name: 'Database',
        icon: 'db'
      }, {
        name: 'Logging',
        icon: 'log'
      }, {
        name: 'Memory Store',
        icon: 'memory'
      }, {
        name: 'Messaging',
        icon: 'messaging'
      }, {
        name: 'Monitoring',
        icon: 'monitoring'
      }, {
        name: 'Optimization',
        icon: 'optimization'
      }, {
        name: 'Search',
        icon: 'search'
      }, {
        name: 'Social Media',
        icon: 'social'
      }, {
        name: 'Video Processing',
        icon: 'videop'
      }, {
        name: 'Image Processing',
        icon: 'imagep'
      }, {
        name: 'Text Processing',
        icon: 'textp'
      }, {
        name: 'Machine Learning',
        icon: 'ml'
      }, {
        name: 'Programming Language',
        icon: 'lang'
      }, {
        name: 'Developer Tools',
        icon: 'devtool'
      }, {
        name: 'IoT',
        icon: 'iot'
      }, {
        name: 'Worker',
        icon: 'worker'
      }] */
      // }, {
      //   name: 'Sorting',
      //   icon: 'sorting'
      // }, {
      //   name: 'Filtering',
      //   icon: 'filtering'
      // }, {
      //   name: 'Strings',
      //   icon: 'strings'
      // }]
      // const inputTopics = this.value || []
      // const allTopics = inputTopics.reduce(
      //   (acc, topics) => acc.concat(topics),
      //   []
      // )
      // const uniqueTopics = Array.from(new Set(allTopics))

      // // alphanumeric descending sort
      // uniqueTopics.sort((topic1, topic2) => {
      //   if (topic1 < topic2) {
      //     return -1
      //   }
      //   if (topic1 > topic2) {
      //     return 1
      //   }
      //   return 0
      // })

      // return uniqueTopics.filter(t => t !== undefined)
    }
  },
  watch: {
    active: function (value) {
      this.$emit('select', value)
      this.$refs.selector.close()
    },
    getOwnerUuid: function () {
      if (this.getOwnerUuid === '' && this.category === 'self') {
        this.$router.replace({ name: 'services', query: {} })
      }
    },
    category: function () {
      // this.active = this.category || ''
    }
  },
  mounted: function () {
    if (this.topics.reduce((arr, v) => [...arr, v.name], []).includes(this.category) || (this.category === 'self' && this.getOwnerUuid !== '')) {
      this.active = this.category
    }
    if (this.getOwnerUuid === '' && this.category === 'self') {
      this.$router.replace({ name: 'services', query: {} })
    }
  },
  methods: {
    reset: function () {
      this.active = ''
      this.$router.replace({ name: 'services', query: {} })
    }
  }
}
</script>
