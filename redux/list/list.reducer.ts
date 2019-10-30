import { ListActionTypes, ListState, LIST_TYPES } from './list.types'
import { Reducer } from 'redux'
import { AuthActionTypes } from '../auth/auth.types'

const INITIAL_STATE: ListState = {
  orders: [],
  listType: LIST_TYPES.INBOX
}

export const listReducer: Reducer<ListState, any> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case ListActionTypes.FETCH_INBOX_LIST_START:
      return {
        ...state,
        // orders: action.payload
        listType: LIST_TYPES.INBOX
      }
    case ListActionTypes.FETCH_ARCHIVE_LIST_START:
      return {
        ...state,
        listType: LIST_TYPES.ARCHIVE
      }
    case ListActionTypes.FETCH_LIST_SUCCESS:
      return {
        ...state,
        orders: action.payload
      }
    case AuthActionTypes.SIGNOUT_SUCCESS:
      return {
        orders: [],
        listType: null
      }
    default:
      return state
  }
}
