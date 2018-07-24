import Vue from "vue";
import Vuex from "vuex";
import SettingsService from "@/service/SettingsService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    settings: SettingsService.get(),
    stat: []
  },
  mutations: {
    saveSettings(store, newSettings) {
      SettingsService.save(newSettings);
      store.settings = newSettings;
    },

    updateStat(store, newStat) {
      store.stat = newStat;
    }
  },
  actions: {}
});
