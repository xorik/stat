import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home.vue'
import Settings from '@/pages/Settings.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/settings',
      component: Settings,
    },
  ],
})


// component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
