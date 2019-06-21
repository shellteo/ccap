import Vue from "vue";
import {
  Table,
  TableColumn,
  Loading
} from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';

Vue.component("elTable", Table);
Vue.component("elTableColumn", TableColumn);
Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;
