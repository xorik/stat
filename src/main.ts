import Vue, { CreateElement, VNode } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './icons'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h: CreateElement): VNode => h(App),
}).$mount('#app')
