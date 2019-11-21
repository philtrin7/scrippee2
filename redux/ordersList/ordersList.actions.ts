import { OrdersListActionTypes, NewOrder } from './ordersList.types'
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

export const newOrder = () => {
  return {
    type: OrdersListActionTypes.NEW_ORDER
  }
}

export const setNewOrder = (
  field: keyof NewOrder,
  value: Order[keyof NewOrder]
) => {
  return {
    type: OrdersListActionTypes.SET_NEW_ORDER,
    field,
    value
  }
}

export const clearNewOrder = () => {
  return {
    type: OrdersListActionTypes.CLEAR_NEW_ORDER
  }
}

export const clearField = (field: keyof NewOrder) => {
  return {
    type: OrdersListActionTypes.CLEAR_FIELD,
    field
  }
}
