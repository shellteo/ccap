<template>
  <div :class="{ disabled: !title, summary: true }">
    <a @click="redirectToService">
      <s-media v-if="!isLoading && title">
        <template slot="left">
          <div
            :style="{ backgroundColor: color }"
            class="service-image"
          >{{ firstLetterCapitalized }}</div>
        </template>
        <s-text
          p="1"
          bold
          color="dark-blue"
        >{{ title }}</s-text>
        <s-text p="2">{{ (description || title) | emoji }}</s-text>
        <div
          v-tags
          v-if="tags"
        >
          <topic-tag
            v-for="t in tags"
            :key="t"
            @click.native.stop="changeSearch(t)"
          >{{ t }}</topic-tag>
        </div>
      </s-media>
      <s-media v-else-if="isLoading">
        <template slot="left">
          <div class="loading-shimmer service-image" />
        </template>
        <div class="loading-shimmer title" />
        <div class="loading-shimmer description" />
        <div class="loading-shimmer tags" />
      </s-media>
    </a>
  </div>
</template>

<script scoped>
import md5 from 'crypto-js/md5'

export default {
  props: {
    title: {
      type: String,
      default: undefined
    },
    description: {
      type: String,
      default: undefined
    },
    tags: {
      type: Array,
      default: undefined
    },
    isAlias: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    color: function () {
      const randomNumFromTitle = md5(this.title).words[0]
      const numBetweenZeroAndOne = Math.abs(randomNumFromTitle) / 2147483647
      const hue = numBetweenZeroAndOne * 360
      return `hsla(${hue}, 45%, 65%, 1)`
    },
    firstLetterCapitalized: function () {
      return this.title && this.title.slice(0, 1).toUpperCase()
    },
    isLoading: function () {
      return !this.title
    }
  },
  methods: {
    redirectToService: function () {
      if (this.title) {
        this.$router.push({ path: (this.isAlias ? `/service/` : '/r/') + this.title })
      }
    },
    changeSearch: function (text) {
      this.$router.push({ name: 'services', query: { search: text, c: undefined } })
    }
  }
}
</script>

<style scoped lang="scss">
.service-image {
  min-width: 4.5rem;
  height: 4.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6em;
  color: white;
}

.tags {
  margin-top: 0.75rem;
}

.loading-shimmer {
  margin-bottom: 0.8em;

  &.service-image {
    border-color: transparent;
  }

  &.title {
    width: 200px;
    height: 16px;
  }

  &.description {
    width: 250px;
    height: 11px;
  }

  &.tags {
    margin-top: 1.4em;
    width: 100px;
    height: 1em;
  }
}
</style>
