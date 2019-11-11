import { Order, Convo } from '../../generated/graphql'

export interface ViewerState {
  type?: VIEWER_TYPES
  order?: Order
  convo?: Pick<Convo, 'id' | 'updatedAt' | 'createdAt'>
}

export enum ViewerActionTypes {
  DEFAULT_VIEW = 'DEFAULT_VIEW',
  NEW_ORDER_VIEW = 'NEW_ORDER_VIEW',
  SET_ORDER_VIEW = 'SET_ORDER_VIEW',
  FETCH_CONVO = 'FETCH_CONVO'
}

export enum VIEWER_TYPES {
  NEW_ORDER = 'NEW_ORDER',
  ORDER = 'ORDER'
}
