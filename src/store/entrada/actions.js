import { VENDER_ENTRADAS } from './types'

export default {
  [VENDER_ENTRADAS]: ({ commit }, item) => {
    // validar datos
    commit(VENDER_ENTRADAS, item)
  }
}
