import { Order, Convo, Comment } from '../../generated/graphql'

export type Comments = Pick<
  Comment,
  'id' | 'text' | 'updatedAt' | 'createdAt'
>[]

export type OrderConvo = Pick<Convo, 'id' | 'updatedAt' | 'createdAt'>

export interface ViewerState {
  type?: VIEWER_TYPES
  order?: Order
  convo?: OrderConvo
  comments?: Comments
}

export enum ViewerActionTypes {
  DEFAULT_VIEW = 'DEFAULT_VIEW',
  NEW_ORDER_VIEW = 'NEW_ORDER_VIEW',
  SET_ORDER_VIEW = 'SET_ORDER_VIEW',
  FETCH_CONVO = 'FETCH_CONVO',
  FETCH_COMMENTS = 'FETCH_COMMENTS'
}

export enum VIEWER_TYPES {
  NEW_ORDER = 'NEW_ORDER',
  ORDER = 'ORDER'
}
