import { OrdersListActionTypes } from './ordersList.types'
import { Orders } from '../../generated/graphql'

export const fetchInboxListStart = () => {
  return {
    type: OrdersListActionTypes.FETCH_INBOX_LIST_START
  }
}
export const fetchArchiveListStart = () => {
  return {
    type: OrdersListActionTypes.FETCH_ARCHIVE_LIST_START
  }
}
export const fetchList = (orders: Orders) => {
  return {
    type: OrdersListActionTypes.FETCH_LIST_SUCCESS,
    orders
  }
}
