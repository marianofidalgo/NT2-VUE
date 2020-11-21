import { VENDER_ENTRADAS } from './types'

export default {
  [VENDER_ENTRADAS]: (state, item) => {
    state.registro.push(item)
  }
}
