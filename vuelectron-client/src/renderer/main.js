import Vue from 'vue'
import axios from 'axios'
import VueSocketio from 'vue-socket.io'
import App from './App'
import router from './router'
import store from './store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.prototype.API_BASE_URL = process.env.API === 'local' ? 'http://localhost:5000' : 'https://lupin-catcher-node-server.herokuapp.com'
Vue.prototype.COOKIE_DOMAIN = process.env.API === 'local' ? 'localhost' : 'https://lupin-catcher-node-server.herokuapp.com'
Vue.use(VueSocketio, 'https://lupin-catcher-node-server.herokuapp.com')
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
