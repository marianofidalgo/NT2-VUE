import { AGREGAR_EVENTO, FECHA_TENTATIVA } from './types'

export default {
  [AGREGAR_EVENTO]: (state, item) => {
    state.registro.push(item)
  },
  [FECHA_TENTATIVA]: (state, fecha) => {
    state.tentativo.fecha = fecha
  }
}
