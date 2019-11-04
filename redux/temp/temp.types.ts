import { Order } from '../list/list.types'

export interface TempState {
  orders: NewOrder[]
}

export enum TempActionTypes {
  SET_TEMP_ORDER = 'SET_TEMP_ORDER',
  NEW_TEMP_ORDER = 'NEW_TEMP_ORDER',
  CLEAR_TEMP_ORDER = 'CLEAR_TEMP_ORDER'
}

type NewOrder = Pick<Order, 'customerName' | 'item'>
