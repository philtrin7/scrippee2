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

export const newOrderStart = () => {
  return {
    type: OrdersListActionTypes.NEW_ORDER_START
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

export const selectOrder = (orderId: string) => {
  return {
    type: OrdersListActionTypes.SELECT_ORDER,
    orderId
  }
}

export const selectNewOrder = () => {
  return {
    type: OrdersListActionTypes.SELECT_NEW_ORDER
  }
}
