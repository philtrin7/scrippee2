import { ListActionTypes, Order } from './list.types'

export const fetchOrderList = (orders: Order[]) => {
  return {
    type: ListActionTypes.FETCH_ORDER_LIST,
    payload: orders
  }
}
