import { ViewerState } from './viewer.types'
import { Reducer } from 'redux'

const INITIAL_STATE: ViewerState = {
  type: null
}

export const viewerReducer: Reducer<ViewerState, any> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    default:
      return state
  }
}
