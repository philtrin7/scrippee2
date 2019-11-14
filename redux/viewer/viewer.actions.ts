import { ViewerActionTypes, OrderConvo } from './viewer.types'
import { Order } from '../../generated/graphql'

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

export const fetchConvo = (convo: OrderConvo) => {
  return {
    type: ViewerActionTypes.FETCH_CONVO,
    convo
  }
}
