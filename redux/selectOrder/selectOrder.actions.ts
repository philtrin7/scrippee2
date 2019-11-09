import { SelectOrderActionTypes } from './selectOrder.types'

export const selectOrder = (orderId: string) => {
  return {
    type: SelectOrderActionTypes.SELECT_ORDER,
    orderId
  }
}
