import {
  OrdersListActionTypes,
  OrdersListState,
  ORDERS_LIST_TYPES,
  NewOrder
} from './ordersList.types'
import { Reducer } from 'redux'
import { AuthActionTypes } from '../auth/auth.types'
import { Orders, Order } from '../../generated/graphql'

interface ListActionPayload {
  type: OrdersListActionTypes | AuthActionTypes.SIGNOUT_SUCCESS
  orders: Orders
  field: keyof NewOrder
  value: Order[keyof NewOrder]
}

const INITIAL_STATE: OrdersListState = {
  orders: {},
  listType: null,
  listIsLoading: false,
  newOrder: null
}

export const ordersListReducer: Reducer<OrdersListState, ListActionPayload> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    // ORDERS LIST
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

    // NEW ORDER
    case OrdersListActionTypes.NEW_ORDER_START:
      return {
        ...state,
        newOrder: {
          customerName: '',
          item: ''
        }
      }
    case OrdersListActionTypes.SET_NEW_ORDER:
      let setStateWithNewOrder: OrdersListState = { ...state }
      if (setStateWithNewOrder.newOrder) {
        setStateWithNewOrder.newOrder[action.field] = action.value
      }
      return setStateWithNewOrder

    case OrdersListActionTypes.CLEAR_FIELD:
      let stateWithNewOrder: OrdersListState = { ...state }
      if (stateWithNewOrder.newOrder) {
        stateWithNewOrder.newOrder[action.field] = ''
      }

      return stateWithNewOrder
    case OrdersListActionTypes.CLEAR_NEW_ORDER:
      return {
        ...state,
        newOrder: null
      }

    // SIGN OUT
    case AuthActionTypes.SIGNOUT_SUCCESS:
      return {
        orders: {},
        listIsLoading: false,
        listType: null,
        newOrder: null
      }
    default:
      return state
  }
}
