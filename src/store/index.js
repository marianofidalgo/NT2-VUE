import Vue from 'vue'
import Vuex from 'vuex'

import evento from './evento'
import entrada from './entrada'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    evento,
    entrada
  }
})
