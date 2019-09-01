<template>
  <section class="service-content-container">
    <div
      v-tags="{ addons: true, size: 'large' }"
      class="action-tag">
      <s-tag
        outline
        color="name">{{ getAction ? getAction : getEvent ? getEvent : getCommand }}</s-tag>
      <s-tag outline><s-tag :color="`${getTagColor} is-normal`">{{ getTagName }}</s-tag></s-tag>
    </div>
    <div class="card-bordered">
      <div class="card-bordered-header">
        <s-text
          p="2"
          semi-bold>Description</s-text>
        <s-text
          p="2"
          small>
          {{ isActionString ? action : action.help }}
        </s-text>
      </div>
      <div
        class="card-bordered-content"
      >
        <s-text
          :padding="['none', '1x']"
          p="2"
          semi-bold>Example</s-text>
        <s-window
          v-if="example"
          lang="coffeescript"
        >{{ example }}</s-window>
      </div>
    </div>
    <div
      v-if="!isActionString && action.arguments"
      class="card-bordered">
      <div class="card-bordered-header">
        <s-text
          p="2"
          semi-bold>Arguments</s-text>
      </div>
      <div class="card-bordered-table">
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(arg, name) in action.arguments"
              :key="`${getHash}-arguments-${name}`"
            >
              <td>
                <s-tag
                  outline
                  color="name"
                  v-text="name" />
              </td>
              <td>
                <s-tag
                  outline
                  color="name"
                  v-text="arg.type" />
              </td>
              <td>
                <span
                  v-if="arg.required"
                  class="required"
                >Required. </span>
                <span v-if="arg.default">(Default: <code class="arg">{{ arg.default }}</code>) </span>
                <span v-if="arg.help">{{ arg.help }}</span>
                <span v-if="arg.type === 'enum'">values({{ arg.enum.join(', ') }})</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <template v-if="!isActionString && action.output">
      <div class="card-no-bordered">
        <div class="card-no-bordered-header">
          <s-text
            p="2"
            semi-bold>Output</s-text>
          <p v-if="action.output.help"> {{ action.output.help }}</p>
          <p v-if="action.output.type">Returns output of type <s-tag
            outline
            color="secondary inline">{{ action.output.type }}</s-tag>.</p>
        </div>
      </div>
      <div
        v-if="action.output.properties"
        class="card-bordered">
        <div class="card-bordered-header">
          <s-text
            p="2"
            semi-bold>Properties</s-text>
        </div>
        <div class="card-bordered-table">
          <table class="table is-fullwidth">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(property, name) in action.output.properties"
                :key="`${getHash}-properties-${name}`"
              >
                <td>
                  <s-tag
                    outline
                    color="name"
                    v-text="name" />
                </td>
                <td>
                  <s-tag
                    outline
                    color="name"
                    v-text="property.type" />
                </td>
                <td>
                  <span
                    v-if="property.required"
                    class="required"
                  >Required. </span>
                  <span v-if="property.default">(Default: <code class="arg">{{ property.default }}</code>) </span>
                  <span v-if="property.help">{{ property.help }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div
        v-if="action.output.actions"
        class="card-bordered">
        <div class="card-bordered-header">
          <s-media centered>
            <s-text
              p="2"
              semi-bold>Actions</s-text>
            <s-input
              slot="right"
              v-model="searchActions"
              :icon-right="['s-icon', {icon: 'search'}]"
              class="search-form no-bordered"
              placeholder="Search any action..."
            />
          </s-media>
        </div>
        <div class="card-bordered-content">
          <s-div
            v-for="(action, name) in getActions"
            :key="`${getHash}-action-${name}`"
            size="full"
            class="action-item"
            @click.native="$router.push({ path: $route.path, hash: `#${getHash}-${name}`})"
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
                  :color="!action.help ? 'gray-3' : undefined"
                  p="2"
                  class="is-text-ellipsed"
                >
                  {{ action.help || '« No description »' }}
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
            v-if="Object.keys(getActions).length === 0"
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
        </div>
      </div>
    </template>
    <div
      v-if="!isActionString && action.events"
      class="card-bordered">
      <div class="card-bordered-header">
        <s-media centered>
          <s-text
            slot="left"
            p="2"
            semi-bold>Events</s-text>
          <div/>
          <template slot="right">
            <s-input
              v-model="searchEvents"
              :icon-right="['s-icon', {icon: 'search'}]"
              class="search-form no-bordered"
              placeholder="Search any event..."
            />
          </template>
        </s-media>
      </div>
      <div class="card-bordered-content">
        <s-div
          v-for="(event, name) in getEvents"
          :key="`${getHash}-events-${name}`"
          size="full"
          class="action-item"
          @click.native="$router.push({ path: $route.path, hash: `#${getHash}-${name}`})"
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
                :color="!event.help ? 'gray-3' : undefined"
                p="2"
                class="is-text-ellipsed"
              >
                {{ event.help || '« No description »' }}
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
          v-if="Object.keys(getEvents).length === 0"
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
                class="is-text-ellipsed">No events found</s-text>
            </s-div>
          </s-container>
        </s-div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ServiceContent',
  props: {
    action: {
      type: [Object, String],
      default: () => ({}),
      required: true,
      description: 'The action to display as a content'
    },
    example: {
      type: String,
      default: undefined,
      description: 'The action example'
    }
  },
  data: () => ({ searchEvents: '', searchActions: '' }),
  computed: {
    isActionString: function () {
      return typeof this.action === typeof ''
    },
    getHash: function () {
      return this.$route.hash.split('#')[1]
    },
    getHashArray: function () {
      return this.$route.hash.split('#')[1].split('-')
    },
    getCommand: function () {
      return this.getHashArray[0]
    },
    getEvent: function () {
      return this.getHashArray.length > 1 ? this.getHashArray[1] : undefined
    },
    getAction: function () {
      return this.getHashArray.length > 2 ? this.getHashArray[2] : undefined
    },
    getTagColor: function () {
      return this.getAction ? 'dark' : this.getEvent ? 'primary' : this.action.events ? 'dark-blue' : 'gray-3'
    },
    getTagName: function () {
      return this.getAction ? 'action' : this.getEvent ? 'event' : this.action.events ? 'event-based' : 'command'
    },
    getEvents: function () {
      let curEvents = {}
      if (!this.isActionString && this.action.events) {
        for (let key of Object.keys(this.action.events)) {
          if (key.toLowerCase().includes(this.searchEvents.trim().toLowerCase()) ||
              (this.action.events[key].help || '').toLowerCase().includes(this.searchEvents.trim().toLowerCase())) {
            curEvents[key] = this.action.events[key]
          }
        }
      }
      return curEvents
    },
    getActions: function () {
      let curActions = {}
      if (!this.isActionString && this.action.output && this.action.output.actions) {
        for (let key of Object.keys(this.action.output.actions)) {
          if (key.toLowerCase().includes(this.searchActions.trim().toLowerCase()) ||
              (this.action.output.actions[key].help || '').toLowerCase().includes(this.searchActions.trim().toLowerCase())) {
            curActions[key] = this.action.output.actions[key]
          }
        }
      }
      return curActions
    }
  }
}
</script>
