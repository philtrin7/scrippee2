import {
  OrdersListActionTypes,
  OrdersListState,
  ORDERS_LIST_TYPES
} from './ordersList.types'
import { Reducer } from 'redux'
import { AuthActionTypes } from '../auth/auth.types'
import { Orders } from '../../generated/graphql'

interface ListActionPayload {
  type: OrdersListActionTypes | AuthActionTypes.SIGNOUT_SUCCESS
  orders: Orders
}

const INITIAL_STATE: OrdersListState = {
  orders: {},
  listType: null,
  listIsLoading: false
}

export const ordersListReducer: Reducer<OrdersListState, ListActionPayload> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case OrdersListActionTypes.FETCH_INBOX_LIST_START:
      return {
        ...state,
        listType: ORDERS_LIST_TYPES.INBOX,
        listIsLoading: true,
        orders: {}
      }
    case OrdersListActionTypes.FETCH_ARCHIVE_LIST_START:
      return {
        ...state,
        listType: ORDERS_LIST_TYPES.ARCHIVE,
        listIsLoading: true,
        orders: {}
      }
    case OrdersListActionTypes.FETCH_LIST_SUCCESS:
      if (state.listType === ORDERS_LIST_TYPES.INBOX && action.orders.inbox) {
        return {
          ...state,
          listIsLoading: false,
          orders: { inbox: action.orders.inbox }
        }
      } else if (
        state.listType === ORDERS_LIST_TYPES.ARCHIVE &&
        action.orders.archive
      ) {
        return {
          ...state,
          listIsLoading: false,
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
        listIsLoading: false,
        listType: null
      }
    default:
      return state
  }
}
