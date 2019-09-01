<template>
  <section class="section">
    <div class="container">
      <h5 class="is-size-6 title has-text-centered">A step-by-step guide to adding the Asyncy webhook to your repository in Github.</h5>

      <div class="columns is-centered">
        <div class="column is-three-quarters">
          <ol type="1">
            <li>
              <p class="is-size-6">Navigate to your repository in Github, and go to the <b>Settings</b>.</p>
              <img :src="faq1">
            </li>
            <li>
              <p>Under settings, navigate to the <b>Webhooks</b> section in the left nav bar. Click <b>Add Webhook</b>.</p>
              <img :src="faq2">
            </li>
            <li>
              <p>
                Put <code>https://sync.asyncy.com/service/sync</code> as the payload URL. Set the Content type to <code>application/json</code>. Leave everything else as the default.<br>
                Click <b>Add Webhook</b> at the bottom of the page.
              </p>
              <img :src="faq3">
            </li>
            <li><p><b>You're done!</b></p></li>
          </ol>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import faq1 from '@/assets/faq/faq_1.jpg'
import faq2 from '@/assets/faq/faq_2.jpg'
import faq3 from '@/assets/faq/faq_3.jpg'

export default {
  name: 'Faq',
  data: () => ({
    faq1,
    faq2,
    faq3
  })
}
</script>
