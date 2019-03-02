import Vue, { CreateElement, VNode } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './icons'
import TogglService from '@/service/toggl'

Vue.config.productionTip = false

const toggl = new TogglService(process.env.VUE_APP_TOGGL_KEY || '')
toggl.start()

new Vue({
  router,
  store,
  render: (h: CreateElement): VNode => h(App),
}).$mount('#app')
