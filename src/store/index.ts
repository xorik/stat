import Vue from 'vue'
import Vuex from 'vuex'
import State from '@/store/State'
import { mutations } from '@/store/mutations'

Vue.use(Vuex)

export default new Vuex.Store<State>({
  state: new State(),
  mutations,
})
