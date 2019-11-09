import { Reducer } from 'redux'
import { SelectOrderState, SelectOrderActionTypes } from './selectOrder.types'

interface SelectOrderPayload {
  type: SelectOrderActionTypes
  orderId: String
}

const INITIAL_STATE: SelectOrderState = {
  orderId: null
}

export const selectOrderReducer: Reducer<
  SelectOrderState,
  SelectOrderPayload
> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SelectOrderActionTypes.SELECT_ORDER:
      return {
        ...state,
        orderId: action.orderId
      }
    case SelectOrderActionTypes.SELECT_NEW_ORDER:
      return {
        ...state,
        orderId: 'NEW'
      }
    default:
      return state
  }
}
