// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'
import 'iview/dist/styles/iview.css';
Vue.config.productionTip = false;
import {Message} from 'iview'
Vue.prototype.$Message = Message;

/* eslint-disable no-new */
const V = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
export default V
