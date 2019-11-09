import { Reducer } from 'redux'
import { SelectOrderState, SelectOrderActionTypes } from './selectOrder.types'

interface SelectOrderPayload {
  type: SelectOrderActionTypes
}

const INITIAL_STATE: SelectOrderState = {
  orderId: null
}

export const viewerReducer: Reducer<SelectOrderState, SelectOrderPayload> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    default:
      return state
  }
}
