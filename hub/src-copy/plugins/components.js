import Vue from 'vue'
import StoryVue from '@storyscript/vue'
import Clipboard from 'vue-clipboard2'
import TopicTag from '@/components/TopicTag'
import Window from '@/components/Window'

Vue.use(StoryVue)
Vue.use(Clipboard)

Vue.component('topic-tag', TopicTag)
Vue.component('s-window', Window)
