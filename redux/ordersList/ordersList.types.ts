import { Order, Orders } from '../../generated/graphql'

export enum OrdersListActionTypes {
  FETCH_INBOX_LIST_START = 'FETCH_INBOX_LIST_START',
  FETCH_ARCHIVE_LIST_START = 'FETCH_ARCHIVE_LIST_START',
  FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS',
  SET_NEW_ORDER = 'SET_NEW_ORDER',
  NEW_TEMP_ORDER = 'NEW_TEMP_ORDER',
  CLEAR_TEMP_ORDER = 'CLEAR_TEMP_ORDER',
  CLEAR_FIELD = 'CLEAR_FIELD'
}

export interface OrdersListState {
  orders: Orders
  listType: ORDERS_LIST_TYPES | null
  listIsLoading: Boolean
  new: NewOrder[]
}

export enum ORDERS_LIST_TYPES {
  ARCHIVE = 'ARCHIVE',
  INBOX = 'INBOX'
}

export type NewOrder = Pick<Order, 'customerName' | 'item'>
