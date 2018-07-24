import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import UpworkStatSocketService from "./service/UpworkStatSocketService";

Vue.config.productionTip = false;

/* eslint-disable no-new */
new UpworkStatSocketService(response => {
  store.commit("updateStat", JSON.parse(response.data));
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
