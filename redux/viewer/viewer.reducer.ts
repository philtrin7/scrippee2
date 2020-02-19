import {
  ViewerState,
  ViewerActionTypes,
  VIEWER_TYPES,
  OrderConvo
} from './viewer.types'
import { Reducer } from 'redux'
import { Order } from '../../generated/graphql'
import { AuthActionTypes } from '../auth/auth.types'
import { OrdersListActionTypes } from '../ordersList/ordersList.types'

const INITIAL_STATE: ViewerState = {
  type: undefined,
  order: undefined,
  convo: undefined
}

interface ViewerPayload {
  type:
    | ViewerActionTypes
    | OrdersListActionTypes.CLEAR_NEW_ORDER
    | AuthActionTypes.SIGNOUT_SUCCESS
  order: Order
  convo: OrderConvo
}

export const viewerReducer: Reducer<ViewerState, ViewerPayload> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case ViewerActionTypes.NEW_ORDER_VIEW:
      return {
        ...state,
        type: VIEWER_TYPES.NEW_ORDER
      }
    case ViewerActionTypes.DEFAULT_VIEW:
      return {
        ...state,
        type: undefined
      }
    case ViewerActionTypes.SET_ORDER_VIEW:
      return {
        ...state,
        type: VIEWER_TYPES.ORDER,
        order: action.order
      }
    case ViewerActionTypes.FETCH_CONVO:
      return {
        ...state,
        convo: action.convo
      }

    case OrdersListActionTypes.CLEAR_NEW_ORDER:
    case AuthActionTypes.SIGNOUT_SUCCESS:
      return {
        type: undefined,
        order: undefined,
        convo: undefined
      }
    default:
      return state
  }
}
