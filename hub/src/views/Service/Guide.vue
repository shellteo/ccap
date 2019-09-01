<template>
  <div>
    <transition-group
      name="fade"
      tag="div"
      class="command"
    >
      <service-content
        :key="`container-${getHash}`"
        :action="getActionFromHash"
        :example="getExampleFromAction"
      />
    </transition-group>
  </div>
</template>

<script>
import ServiceContent from '@/components/ServiceContent'

export default {
  name: 'ServiceGuide',
  components: { ServiceContent },
  inject: ['commands', 'tags', 'serviceName', 'numCommands', 'alias', 'owner', 'repo'],
  computed: {
    getHash: function () {
      return this.$route.hash.split('#')[1]
    },
    getHashArray: function () {
      return this.$route.hash.split('#')[1].split('-')
    },
    getActionFromHash: function () {
      let action = this.commands()[this.getHashArray[0]]
      if (action && this.getHashArray.length > 1 && action.events) {
        action = action.events[this.getHashArray[1]]
      }
      if (action && this.getHashArray.length > 2 && action.output && action.output.actions) {
        action = action.output.actions[this.getHashArray[2]]
      }
      return action
    },
    getEventFromHash: function () {
      const action = this.commands()[this.getHashArray[0]]
      if (action && this.getHashArray.length > 1) {
        return action.events[this.getHashArray[1]]
      }
      return undefined
    },
    getActionName: function () {
      return this.getHashArray[this.getHashArray.length - 1]
    },
    getExampleFromAction: function () { // generating example content
      let action = this.getActionFromHash
      let ret = ''
      if (action && this.getHashArray.length === 2) { // it's an event
        ret += `${this.serviceName()} ${this.getHashArray[0]} as client\n  when client ${this.getActionName} `
        for (let arg in action.arguments) {
          ret += `${arg}:[${action.arguments[arg].type}] `
        }
        ret += 'as result\n    ...'
      } else if (this.getEventFromHash && this.getHashArray.length === 3) { // it's an action
        ret += `${this.serviceName()} ${this.getHashArray[0]} as client\n  when client ${this.getHashArray[1]} `
        for (let arg in this.getEventFromHash.arguments) {
          ret += `${arg}:[${this.getEventFromHash.arguments[arg].type}] `
        }
        ret += `as result\n    result ${this.getActionName} `
        for (let arg in action.arguments) {
          ret += `${arg}:[${action.arguments[arg].type}] `
        }
      } else if (action && typeof action === typeof {} && !('events' in action)) { // it's a command
        if (!action.run) {
          ret += 'result = '
        }
        ret += `${this.serviceName()} ${this.getActionName}`
        for (let arg in action.arguments) {
          if (action.arguments[arg].required) {
            ret += ` ${arg}:[${action.arguments[arg].type}]`
          }
        }
        if (action.run) {
          ret += ' as result\n  ...'
        }
      } else if (action && typeof action === typeof {}) { // it's an event-based
        ret += `${this.serviceName()} ${this.getActionName} as client `
        for (let event in action.events) {
          ret += `\n  when client ${event} `
          for (let arg in action.events[event].arguments) {
            ret += `${arg}:[${action.events[event].arguments[arg].type}] `
          }
          ret += `as result\n    ...`
        }
      }
      return ret
    }
  },
  watch: {
    '$route': 'checkHash'
  },
  methods: {
    openRepo: function () {
      window.open(`//github.com/${this.service().pullUrl}`, '_blank')
    },
    checkHash: function () {
      if (!this.$route.name.includes('guide')) return
      let hash = this.$route.hash || ''
      if (this.$route.hash.length < 2) {
        hash = `#${Object.keys(this.commands())[0]}`
        this.$nextTick(() => {
          this.$router.replace({ path: this.$route.path, hash })
        })
      }
      for (let name in this.commands()) {
        if (hash === `#${name}`) return
        if (this.commands()[name].events) {
          for (let event in this.commands()[name].events) {
            if (hash === `#${name}-${event}`) return
            if (this.commands()[name].events[event].output && this.commands()[name].events[event].output.actions) {
              for (let command in this.commands()[name].events[event].output.actions) {
                if (hash === `#${name}-${event}-${command}`) return
              }
            }
          }
        }
        if (Object.keys(this.commands()).indexOf(name) === (Object.keys(this.commands()).length - 1)) {
          hash = `#${Object.keys(this.commands())[0]}`
          this.$router.replace({ path: this.$route.path, hash })
        }
      }
    }
  }
}
</script>
