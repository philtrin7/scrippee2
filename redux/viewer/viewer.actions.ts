import { ViewerActionTypes, Comments } from './viewer.types'
import { Order, Convo } from '../../generated/graphql'

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

export const fetchConvo = (
  convo: Pick<Convo, 'id' | 'updatedAt' | 'createdAt'>
) => {
  return {
    type: ViewerActionTypes.FETCH_CONVO,
    convo
  }
}

export const fetchComments = (comments: Comments) => {
  return {
    type: ViewerActionTypes.FETCH_COMMENTS,
    comments
  }
}
