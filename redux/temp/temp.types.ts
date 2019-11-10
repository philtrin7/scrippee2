import { Order } from '../../generated/graphql'

export interface TempState {
  orders: NewOrder[]
}

export enum TempActionTypes {
  SET_TEMP_ORDER = 'SET_TEMP_ORDER',
  NEW_TEMP_ORDER = 'NEW_TEMP_ORDER',
  CLEAR_TEMP_ORDER = 'CLEAR_TEMP_ORDER',
  CLEAR_FIELD = 'CLEAR_FIELD'
}

type NewOrder = Pick<Order, 'customerName' | 'item'>
