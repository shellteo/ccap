<template>
  <s-container
    id="actions"
    clean
    class="is-paddingless"
  >
    <s-div
      class="is-paddingless"
      size="full"
    >
      <s-media
        class="has-padding-bottom-medium"
      >
        <template slot="left">
          <s-text head="3">Actions</s-text>
          <s-text p="2">There is {{ numCommands() }} actions for this service.</s-text>
        </template>
        <div/>
        <template slot="right">
          <s-input
            v-model="searchInput"
            :icon-left="['s-icon', {icon: 'search'}]"
            class="search-form"
            placeholder="Search action..."
          />
        </template>
      </s-media>
    </s-div>
    <s-div
      size="full"
      class="is-paddingless">
      <div class="card-bordered card-bordered-padded">
        <s-container clean>
          <s-div
            v-for="(command, name) in getCommands"
            :key="`list-commands-${_uid}-${name}`"
            size="full"
            class="action-item"
            @click.native="$router.push({ path: `${$route.path.slice(0, -8)}/guide`, hash: `${name}` })"
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
          </s-div>
          <s-div
            v-if="Object.keys(getCommands).length === 0"
            size="full"
            class="action-item">
            <s-container
              clean
              centered-v
              class="is-paddingless is-variable is-1 is-mobile">
              <s-div>
                <s-text
                  p="2"
                  alignment="centered"
                  class="is-text-ellipsed">No actions found</s-text>
              </s-div>
            </s-container>
          </s-div>
        </s-container>
      </div>
    </s-div>
  </s-container>
</template>

<script>
export default {
  name: 'ServiceActions',
  inject: ['commands', 'numCommands'],
  data: () => ({ searchInput: '', curCommands: {} }),
  computed: {
    getCommands: function () {
      let curCommands = {}
      for (let key of Object.keys(this.commands())) {
        if (key.toLowerCase().includes(this.searchInput.trim().toLowerCase()) ||
            (this.commands()[key].help || '').toLowerCase().includes(this.searchInput.trim().toLowerCase())) {
          curCommands[key] = this.commands()[key]
        }
      }
      return curCommands
    }
  }
}
</script>
