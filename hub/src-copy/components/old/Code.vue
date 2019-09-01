<template>
  <div class="code-container">
    <prism
      :language="lang"
      class="snippet"><slot/></prism>
    <button
      class="clippy-btn"
      @click="copyText"><img
        :src="clippy"
        class="clippy"
        width="13"
        alt="Copy to clipboard"></button>
    <div class="copied"/>
  </div>
</template>

<script>
import clippy from '@/assets/clippy.svg'

export default {
  props: {
    lang: {
      type: String,
      default: 'coffeescript'
    }
  },
  data: function () {
    return {
      clippy
    }
  },
  methods: {
    copyText: function (e) {
      this.$copyText(
        e.srcElement.parentElement && e.srcElement.parentElement.textContent
      )
    }
  }
}
</script>

<style lang="scss">
.code-container {
  width: calc(100% - 24px);
  overflow: auto;
  position: relative;
  &:hover .clippy-btn {
    opacity: 1;
  }
}

.snippet {
  position: relative;
  margin: 10px 0px;
  font-size: 0.9em;
  padding: 10px 22px;
  border-radius: 3px;
}

.copied {
  pointer-events: none;
  opacity: 0;
  font-size: 0.8em;
  padding: 1px 5px;
  border-radius: 3px;
  background-color: white;
  position: absolute;
  right: 8px;
  top: 17px;
  transition: opacity 1s ease 0.5s;

  &::before {
    content: "Copied";
  }
}

.clippy-btn {
  transition: opacity 0.3s ease-in-out;
  opacity: 0;
  padding: 3px 6px;
  position: absolute;
  right: 8px;
  top: 18px;
  cursor: pointer;
  background-color: #eee;
  border-radius: 3px;
  outline: none;

  &:active {
    background-color: #dcdcdc;
    background-image: none;
    border-color: #b5b5b5;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15);

    & ~ .copied {
      transition: opacity 0s step-start 0s;
      opacity: 1;
    }
  }

  &:hover {
    text-decoration: none;
    background-color: #ddd;
    border-color: #ccc;
  }

  .clippy {
    pointer-events: none;
    position: relative;
    top: 1px;
  }
}
</style>
