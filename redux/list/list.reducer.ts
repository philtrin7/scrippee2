import { ListActionTypes, ListState, LIST_TYPES, Orders } from './list.types'
import { Reducer } from 'redux'
import { AuthActionTypes } from '../auth/auth.types'

interface ListActionPayload {
  type: ListActionTypes | AuthActionTypes.SIGNOUT_SUCCESS
  orders: Orders
}

const INITIAL_STATE: ListState = {
  orders: {},
  listType: null
}

export const listReducer: Reducer<ListState, ListActionPayload> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case ListActionTypes.FETCH_INBOX_LIST_START:
      return {
        ...state,
        listType: LIST_TYPES.INBOX
      }
    case ListActionTypes.FETCH_ARCHIVE_LIST_START:
      return {
        ...state,
        listType: LIST_TYPES.ARCHIVE
      }
    case ListActionTypes.FETCH_LIST_SUCCESS:
      if (state.listType === LIST_TYPES.INBOX && action.orders.inbox) {
        return {
          ...state,
          orders: { inbox: action.orders.inbox }
        }
      } else if (
        state.listType === LIST_TYPES.ARCHIVE &&
        action.orders.archive
      ) {
        return {
          ...state,
          orders: {
            archive: action.orders.archive
          }
        }
      } else {
        return state
      }

    case AuthActionTypes.SIGNOUT_SUCCESS:
      return {
        orders: {},
        listType: null
      }
    default:
      return state
  }
}
