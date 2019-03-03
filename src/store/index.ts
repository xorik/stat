import Vue from 'vue'
import Vuex from 'vuex'
import { getModule } from 'vuex-module-decorators'
import AppModule from '@/store/AppModule'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  modules: {
    AppModule,
  },
})
const app = getModule(AppModule, store)

export default store

export {
  app,
}
