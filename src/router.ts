import Vue from 'vue'
import Router from 'vue-router'
import WeeklyStat from '@/views/WeeklyStat.vue'
import Settings from '@/views/Settings.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: WeeklyStat,
    },
    {
      path: '/settings',
      component: Settings,
    },
  ],
})
