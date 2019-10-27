import { Order as _Order } from '../../generated/graphql'
export interface Order extends _Order {}

export enum ListActionTypes {
  FETCH_ORDER_LIST = 'FETCH_ORDER_LIST'
}

export interface ListState {
  orders: Order[] | []
}
