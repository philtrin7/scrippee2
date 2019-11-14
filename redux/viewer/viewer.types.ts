import { Order, Convo } from '../../generated/graphql'

export type OrderConvo = Pick<
  Convo,
  'id' | 'updatedAt' | 'createdAt' | 'comments'
>

export interface ViewerState {
  type?: VIEWER_TYPES
  order?: Order
  convo?: OrderConvo
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
