import { TempState, TempActionTypes } from './temp.types'
import { Reducer } from 'redux'

const INITIAL_STATE: TempState = {
  orders: []
}

export const tempReducer: Reducer<TempState, any> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case TempActionTypes.NEW_TEMP_ORDER:
      return {
        ...state,
        orders: [
          {
            customerName: '',
            item: ''
          }
        ]
      }
    case TempActionTypes.SET_TEMP_ORDER:
      let newState = { ...state }

      if (action.payload.customerName) {
        newState.orders[0].customerName = action.payload.customerName
      }
      if (action.payload.item) {
        newState.orders[0].item = action.payload.item
      }
      return newState
    default:
      return state
  }
}
