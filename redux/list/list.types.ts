import { Order as _Order, Orders as _Orders } from '../../generated/graphql'

export interface Order extends _Order {}

export interface Orders extends _Orders {}

export enum ListActionTypes {
  FETCH_INBOX_LIST_START = 'FETCH_INBOX_LIST_START',
  FETCH_ARCHIVE_LIST_START = 'FETCH_ARCHIVE_LIST_START',
  FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS'
}

export interface ListState {
  orders: Orders
  listType: LIST_TYPES | null
  listIsLoading: Boolean
}

export enum LIST_TYPES {
  ARCHIVE = 'ARCHIVE',
  INBOX = 'INBOX'
}
