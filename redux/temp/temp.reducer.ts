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
      let newState: any = { ...state }
      if (newState.orders.length > 0) {
        newState.orders[0][action.field] = action.value
      }

      return newState

    case TempActionTypes.CLEAR_FIELD:
      let tempState: any = { ...state }
      if (tempState.orders.length > 0) {
        tempState.orders[0][action.payload] = ''
      }

      return tempState

    case TempActionTypes.CLEAR_TEMP_ORDER:
      return {
        ...state,
        orders: []
      }
    default:
      return state
  }
}
