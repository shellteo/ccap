<template>
  <div class="organization">
    <transition name="fade">
      <div
        v-if="!isLoading && username"
        :style="`background-image: url(https://avatars.githubusercontent.com/${username}?s=128`"
        class="organization-image" />
      <div
        v-else
        class="loading-shimmer organization-image"/>
    </transition>
    <transition name="fade">
      <h5
        v-if="!isLoading && username"
        class="organization-name">{{ username }}</h5>
      <div
        v-else
        class="loading-shimmer tag organization-name"/>
    </transition>
    <transition name="fade">
      <h6
        v-if="!isLoading && title"
        class="organization-title">{{ title }}</h6>
      <div
        v-else
        class="loading-shimmer tag organization-title"/>
    </transition>
    <!-- <transition-group name="fade" tag="ul" class="topics-list"> -->
    <!-- <li v-for="topic in topics" :key="topic" class="topic-item"><topic-tag>{{topic}}</topic-tag></li> -->
    <!-- </transition-group> -->
    <!-- <ul class="topics-list" v-if="topics.length <= 0 && isLoading">
        <li class="topic-item">
          <div class="loading-shimmer"></div>
        </li>
        <li class="topic-item">
          <div class="loading-shimmer"></div>
        </li>
        <li class="topic-item">
          <div class="loading-shimmer"></div>
        </li>
      </ul>
      <p v-else-if="topics.length <= 0 && !isLoading" class="no-topics">No topics found.</p> -->
  </div>
</template>

<script>
import md5 from 'crypto-js/md5'

export default {
  props: {
    title: {
      type: String,
      default: undefined
    },
    username: {
      type: String,
      default: undefined
    }
  },
  data: () => ({
    isLoading: true
  }),
  computed: {
    topics: function () {
      return this.value || []
    },
    color: function () {
      const randomNumFromTitle = md5(this.title).words[0]
      const numBetweenZeroAndOne = Math.abs(randomNumFromTitle) / 2147483647
      const hue = numBetweenZeroAndOne * 360
      return `hsla(${hue}, 45%, 65%, 1)`
    },
    firstLetterCapitalized: function () {
      return this.username && this.username.slice(0, 1).toUpperCase()
    }
  },
  watch: {
    title: function () {
      this.isLoading = false
    }
  },
  mounted: function () {
    // currently should only happen when data is loaded via cache
    if (this.title) {
      this.isLoading = false
    }
  }
}
</script>

<style scoped lang="scss">
.organization {
  text-align: center;
  margin: 0 auto;
}

.organization-name {
  margin-top: 10px;
  font-size: 1.5rem;
}

.organization-title {
  font-weight: 300;
}

.organization-image {
  margin: 0 auto;
  background-size: 100% 100%;
  width: 128px;
  height: 128px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6em;
  color: white;
}
</style>
