import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import UpworkStatSocketService from '@/service/UpworkStatSocketService'

Vue.config.productionTip = false

// tslint:disable-next-line
new UpworkStatSocketService((response) => {
  store.commit('updateStat', JSON.parse(response.data))
})

new Vue({
  router,
  store,
  render: (h) => h(App), // tslint:disable-line
}).$mount('#app')
