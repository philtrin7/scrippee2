import { Order as _Order } from '../../generated/graphql'
export interface Order extends _Order {}

export enum ListActionTypes {
  FETCH_INBOX_LIST_START = 'FETCH_INBOX_LIST_START',
  FETCH_ARCHIVE_LIST_START = 'FETCH_ARCHIVE_LIST_START',
  FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS'
}

export interface ListState {
  listType: LIST_TYPES | null
  orders: Order[] | []
}

export enum LIST_TYPES {
  ARCHIVE = 'ARCHIVE',
  INBOX = 'INBOX'
}
