import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import UpworkStatSocketService from '@/service/UpworkStatSocketService'

Vue.config.productionTip = false

const statService = new UpworkStatSocketService()
statService.start()

new Vue({
  router,
  store,
  render: (h) => h(App), // tslint:disable-line
}).$mount('#app')
