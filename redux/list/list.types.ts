import { Order as _Order } from '../../generated/graphql'
import { OrderList as _OrderList } from '../../generated/graphql'

export interface Order extends _Order {
  // Please refer to generated/graphql file
  // id: Scalars['ID'],
  // customerName: Scalars['String'],
  // item: Scalars['String'],
  // contactNum?: Maybe<Scalars['Int']>,
  // email?: Maybe<Scalars['String']>,
  // createdBy: User,
  // archive: Scalars['Boolean'],
  // createdAt: Scalars['DateTime'],
  // updatedAt: Scalars['DateTime']
}

export interface OrderList extends _OrderList {
  // Please refer to generated/graphql file
  // orders: Array<Order>,
  // listType: Scalars['String']
}

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
