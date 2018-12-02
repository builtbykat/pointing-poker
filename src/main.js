// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueFire from 'vuefire'
import BootstrapVue from 'bootstrap-vue'

import Form from './components/Form'
import Entrance from './components/Entrance'

Vue.use(VueRouter)
Vue.use(VueFire)
Vue.use(BootstrapVue)

const routes = [
  { path: '/', component: Entrance },
  { path: '/:session', component: Form }
]

const router = new VueRouter({
  routes, // short for routes: routes
  mode: 'history'
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
}).$mount('#app') // mount the router on the app
