import Vue from 'vue'
import Vuex, {Store} from 'vuex'
import SettingsService from '@/service/SettingsService'
import State from '@/store/State'
import {WebsocketStatus} from '@/service/ReconnectingWebsocket'

Vue.use(Vuex)

const vuexStore: Store<State> = new Vuex.Store({
  strict: true,
  state: new State(),
  mutations: {
      saveSettings(store: State, newSettings: ISettings): void {
          SettingsService.save(newSettings)
          store.settings = newSettings
      },

      updateUpworkStat(store: State, newStat: number[]): void {
          store.upworkStat = newStat
      },

      updateTogglStat(store: State, newStat: number[]): void {
        store.togglStat = newStat
      },

      updateNetworkStatus(store: State, status: WebsocketStatus): void {
        store.networkStatus = status
      },
  },
  getters: {
    stat(state: State): number[] {
      const out: number[] = []

      for (let i = 0; i < 7; i++) {
        out[i] = state.upworkStat[i] + state.togglStat[i]
      }

      return out
    },
  },
})

export default vuexStore
