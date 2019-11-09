import { ViewerActionTypes } from './viewer.types'

export const setNewOrderView = () => {
  return {
    type: ViewerActionTypes.NEW_ORDER_VIEW
  }
}

export const setViewerToDefault = () => {
  return {
    type: ViewerActionTypes.DEFAULT_VIEW
  }
}

export const setOrderView = () => {
  return {
    type: ViewerActionTypes.SET_ORDER_VIEW
  }
}
