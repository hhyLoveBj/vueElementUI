import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import App from './App.vue'
//引用router.js
import router from './router/router.js'
import store from './store/store.js'

// 导入bootstrap
import "bootstrap"
import "bootstrap/dist/css/bootstrap.css"

Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$axios = axios

import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')