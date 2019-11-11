import { ViewerState, ViewerActionTypes, VIEWER_TYPES } from './viewer.types'
import { Reducer } from 'redux'
import { TempActionTypes } from '../temp/temp.types'
import { Order, Convo } from '../../generated/graphql'

const INITIAL_STATE: ViewerState = {
  type: undefined,
  order: undefined,
  convo: undefined
}

interface ViewerPayload {
  type: ViewerActionTypes | TempActionTypes.CLEAR_TEMP_ORDER
  order: Order
  convo: Pick<Convo, 'id' | 'updatedAt' | 'createdAt'>
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
      return {
        ...state,
        type: undefined
      }
    default:
      return state
  }
}
