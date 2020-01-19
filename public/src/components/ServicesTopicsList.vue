<template>
  <div class="topics">
    <s-select
      ref="selector"
      :value="active || 'All'"
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
        All
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
        All
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
        name: '🐰',
        icon: '🐰'
      }, {
        name: '🐷',
        icon: '🐷'
      }, {
        name: '🦊',
        icon: '🦊'
      }]
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
