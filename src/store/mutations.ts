import { MutationTree } from 'vuex'
import State from '@/store/State'
import { Settings } from '@/service/SettingsService'



export const mutations: MutationTree<State> = {
  setSettings(state: State, settings: Settings): void {
    state.settings = settings
  },
}
