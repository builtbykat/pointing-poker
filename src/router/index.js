import Vue from 'vue';
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'Home', component: () => import('../components/Entrance.vue') },
  { path: '/:session', name: 'Poker', component: () => import('../components/Form.vue') }
];

const router = new VueRouter({
  mode: 'history',
  routes // short for routes: routes
});

export default router;
