import { ViewerState, ViewerActionTypes, VIEWER_TYPES } from './viewer.types'
import { Reducer } from 'redux'
import { TempActionTypes } from '../temp/temp.types'

const INITIAL_STATE: ViewerState = {
  type: null
}

export const viewerReducer: Reducer<ViewerState, any> = (
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
        type: null
      }
    case TempActionTypes.CLEAR_TEMP_ORDER:
      return {
        ...state,
        type: null
      }
    default:
      return state
  }
}
