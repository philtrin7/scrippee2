import { OrdersListActionTypes } from './ordersList.types'
import { Orders, Order } from '../../generated/graphql'

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

export const newTempOrder = () => {
  return {
    type: OrdersListActionTypes.NEW_TEMP_ORDER
  }
}

export const setTempOrder = <D extends keyof Order>(
  field: Pick<Order, D>,
  value: Order[D]
) => {
  return {
    type: OrdersListActionTypes.SET_TEMP_ORDER,
    field,
    value
  }
}

export const clearTempOrder = () => {
  return {
    type: OrdersListActionTypes.CLEAR_TEMP_ORDER
  }
}

export const clearField = <D extends keyof Order>(field: Pick<Order, D>) => {
  return {
    type: OrdersListActionTypes.CLEAR_FIELD,
    field
  }
}
