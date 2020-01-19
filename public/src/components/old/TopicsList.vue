<template>
  <div>
    <h5 class="title">Topics</h5>
    <transition-group
      name="fade"
      tag="ul"
      class="topics-list">
      <li
        v-for="topic in topics"
        :key="topic"
        class="topic-item"><topic-tag>{{ topic }}</topic-tag></li>
    </transition-group>
    <ul
      v-if="topics.length <= 0 && isLoading"
      class="topics-list">
      <li class="topic-item">
        <div class="loading-shimmer"/>
      </li>
      <li class="topic-item">
        <div class="loading-shimmer"/>
      </li>
      <li class="topic-item">
        <div class="loading-shimmer"/>
      </li>
    </ul>
    <p
      v-else-if="topics.length <= 0 && !isLoading"
      class="no-topics">No topics found.</p>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    isLoading: true
  }),
  computed: {
    topics: function () {
      const inputTopics = this.value || []
      const allTopics = inputTopics.reduce(
        (acc, topics) => acc.concat(topics),
        []
      )
      const uniqueTopics = Array.from(new Set(allTopics))

      // alphanumeric descending sort
      uniqueTopics.sort((topic1, topic2) => {
        if (topic1 < topic2) {
          return -1
        }
        if (topic1 > topic2) {
          return 1
        }
        return 0
      })

      return uniqueTopics.filter(t => t !== undefined)
    }
  },
  watch: {
    value: function () {
      this.isLoading = false
    }
  },
  mounted: function () {
    // currently should only happen when data is loaded via cache
    if (this.value && this.value.length <= 0) {
      this.isLoading = false
    }
  }
}
</script>

<style scoped lang="scss">
@include touch {
  .topic-item {
    display: inline-block;
    margin-right: 0.3em;
  }
}

.topics-list {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding-left: 0;

  .topic-item {
    margin-bottom: 0.6em;
    margin-right: 0.6em;
  }

  @include desktop {
    .topic-item {
      width: 100%;
    }
  }
}

.no-topics {
  font-size: 0.9em;
  color: #aaa;
}

.loading-shimmer {
  margin-bottom: 0;
  height: 1.5em;
  width: 100px;
}
</style>
