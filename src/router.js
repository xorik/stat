import Vue from "vue";
import Router from "vue-router";
import WeeklyStat from "./views/WeeklyStat";
import Settings from "./views/Settings";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      component: WeeklyStat
    },
    {
      path: "/settings",
      component: Settings
    }
  ]
});
