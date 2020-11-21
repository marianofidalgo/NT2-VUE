import { AGREGAR_EVENTO, FECHA_TENTATIVA } from './types'

export default {
  [AGREGAR_EVENTO]: ({ commit }, item) => {
    // validar datos
    commit(AGREGAR_EVENTO, item)
  },
  [FECHA_TENTATIVA]: ({ commit }, fecha) => {
    // validar datos
    commit(FECHA_TENTATIVA, fecha)
  }
}
