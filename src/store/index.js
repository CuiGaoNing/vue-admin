import Vue from 'vue'
import Vuex from 'vuex'
import base from './modules/base'
import getters from './getters'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    base
  },
  getters
})

export default store
