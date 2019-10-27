import { ListActionTypes, ListState } from './list.types'
import { Reducer } from 'redux'

const INITIAL_STATE: ListState = {
  orders: []
}

export const listReducer: Reducer<ListState, any> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case ListActionTypes.FETCH_ORDER_LIST:
      return {
        ...state,
        orders: action.payload
      }
    default:
      return state
  }
}
