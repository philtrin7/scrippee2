import { Order as _Order } from '../../generated/graphql'
export interface Order extends _Order {}

export enum ListActionTypes {
  FETCH_ORDER_LIST = 'FETCH_ORDER_LIST',
  FETCH_ARCHIVE_LIST_START = 'FETCH_ARCHIVE_LIST_START'
}

export interface ListState {
  listType: LIST_TYPES
  orders: Order[] | []
}

export enum LIST_TYPES {
  ARCHIVE = 'ARCHIVE',
  INBOX = 'INBOX'
}
