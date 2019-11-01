import { ListActionTypes, OrderList } from './list.types'

export const fetchInboxListStart = () => {
  return {
    type: ListActionTypes.FETCH_INBOX_LIST_START
  }
}
export const fetchArchiveListStart = () => {
  return {
    type: ListActionTypes.FETCH_ARCHIVE_LIST_START
  }
}
export const fetchList = (orderList: OrderList) => {
  return {
    type: ListActionTypes.FETCH_LIST_SUCCESS,
    payload: orderList
  }
}
