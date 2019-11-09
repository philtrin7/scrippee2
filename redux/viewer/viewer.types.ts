import { Order as _Order } from '../../generated/graphql'

export interface Order extends _Order {}

export interface ViewerState {
  type?: VIEWER_TYPES
  order?: Order
}

export enum ViewerActionTypes {
  DEFAULT_VIEW = 'DEFAULT_VIEW',
  NEW_ORDER_VIEW = 'NEW_ORDER_VIEW',
  SET_ORDER_VIEW = 'SET_ORDER_VIEW'
}

export enum VIEWER_TYPES {
  NEW_ORDER = 'NEW_ORDER',
  ORDER = 'ORDER'
}
