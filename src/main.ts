import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import UpworkStatSocketService from '@/service/UpworkStatSocketService'
import TogglStatService from '@/service/toggl/TogglStatService'

Vue.config.productionTip = false

const statService = new UpworkStatSocketService()
statService.start()

if (process.env.VUE_APP_TOGGL_KEY) {
  const toggl = new TogglStatService(process.env.VUE_APP_TOGGL_KEY)
  toggl.start()
}

new Vue({
  router,
  store,
  render: (h) => h(App), // tslint:disable-line
}).$mount('#app')
