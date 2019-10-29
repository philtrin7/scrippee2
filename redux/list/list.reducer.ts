import { ListActionTypes, ListState, LIST_TYPES } from './list.types'
import { Reducer } from 'redux'

const INITIAL_STATE: ListState = {
  orders: [],
  listType: LIST_TYPES.INBOX
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
    case ListActionTypes.FETCH_ARCHIVE_LIST_START:
      return {
        ...state,
        listType: LIST_TYPES.ARCHIVE
      }
    case ListActionTypes.CLEAR_ORDER_LIST:
      return {
        ...state,
        orders: []
      }
    default:
      return state
  }
}
