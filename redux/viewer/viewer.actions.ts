import { ViewerActionTypes, Order } from './viewer.types'

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

export const setOrderView = (order: Order) => {
  return {
    type: ViewerActionTypes.SET_ORDER_VIEW,
    order
  }
}
