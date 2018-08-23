import Vue from 'vue'
import Vuex, {Module, MutationTree} from 'vuex'
import SettingsService from '@/service/SettingsService'
import State from '@/store/State'
import {WebsocketStatus} from '@/service/ReconnectingWebsocket'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: new State(),
  mutations: {
      saveSettings(store: State, newSettings: ISettings): void {
          SettingsService.save(newSettings)
          store.settings = newSettings
      },

      updateStat(store: State, newStat: number[]): void {
          store.stat = newStat
      },

      updateNetworkStatus(store: State, status: WebsocketStatus): void {
        store.networkStatus = status
      },
  },
})
