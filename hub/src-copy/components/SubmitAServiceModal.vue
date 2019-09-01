<template>
  <div
    :class="['modal', {'is-active': visible}]">
    <div class="modal-background" />
    <div
      v-click-outside="hide"
      class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Submit a service</p>
        <button
          class="delete"
          aria-label="close"
          @click="hide"
        />
      </header>
      <section class="modal-card-body has-text-centered">
        <p class="is-size-6 has-text-gray-2">The service submission feature is coming soon</p>
        <!-- <p>To submit a service, add this webhook to your Github repository:</p>
        <pre class="language-bash"><code class="language-bash">https://sync.asyncy.com/service/sync</code></pre>
        <p>To add a webhook, go to the settings page of your repository. From there, click Webhooks, then Add webhook.</p> -->
      </section>
      <!-- <footer class="modal-card-foot has-text-right">
        <a-button
          :to="{ name: 'faq' }"
          link
          @click.native="hide"
        >
          Read more
        </a-button>
      </footer> -->
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({ visible: false, lock: false }),
  watch: {
    visible: function () {
      document.documentElement.classList[this.visible ? 'add' : 'remove']('is-clipped')
    },
    lock: function () {
      setTimeout(() => (this.lock = false), 100)
    }
  },
  methods: {
    show: function () {
      this.visible = true
      this.lock = true
    },
    hide: function () {
      this.visible = this.lock
    }
  }
}
</script>
