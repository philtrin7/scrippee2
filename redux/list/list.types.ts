import { Order as _Order } from '../../generated/graphql'
import { OrderList as _OrderList } from '../../generated/graphql'

export interface Order extends _Order {}

export interface OrderList extends _OrderList {}

export enum ListActionTypes {
  FETCH_INBOX_LIST_START = 'FETCH_INBOX_LIST_START',
  FETCH_ARCHIVE_LIST_START = 'FETCH_ARCHIVE_LIST_START',
  FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS'
}

export interface ListState extends OrderList {}

export enum LIST_TYPES {
  ARCHIVE = 'ARCHIVE',
  INBOX = 'INBOX'
}
