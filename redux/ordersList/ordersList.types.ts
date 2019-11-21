import { Orders } from '../../generated/graphql'

export enum OrdersListActionTypes {
  FETCH_INBOX_LIST_START = 'FETCH_INBOX_LIST_START',
  FETCH_ARCHIVE_LIST_START = 'FETCH_ARCHIVE_LIST_START',
  FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS'
}

export interface OrdersListState {
  orders: Orders
  listType: ORDERS_LIST_TYPES | null
  listIsLoading: Boolean
}

export enum ORDERS_LIST_TYPES {
  ARCHIVE = 'ARCHIVE',
  INBOX = 'INBOX'
}
