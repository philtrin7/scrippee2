import { ListActionTypes, Order } from './list.types'

export const fetchOrderList = (orders: Order[]) => {
  return {
    type: ListActionTypes.FETCH_ORDER_LIST,
    payload: orders
  }
}

export const clearOrderList = () => {
  return {
    type: ListActionTypes.CLEAR_ORDER_LIST
  }
}

export const fetchArchiveListStart = () => {
  return {
    type: ListActionTypes.FETCH_ARCHIVE_LIST_START
  }
}