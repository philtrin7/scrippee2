import {
  ViewerState,
  ViewerActionTypes,
  VIEWER_TYPES,
  OrderConvo
} from './viewer.types'
import { Reducer } from 'redux'
import { TempActionTypes } from '../temp/temp.types'
import { Order } from '../../generated/graphql'
import { AuthActionTypes } from '../auth/auth.types'

const INITIAL_STATE: ViewerState = {
  type: undefined,
  order: undefined,
  convo: undefined
}

interface ViewerPayload {
  type:
    | ViewerActionTypes
    | TempActionTypes.CLEAR_TEMP_ORDER
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
    case TempActionTypes.CLEAR_TEMP_ORDER:
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
