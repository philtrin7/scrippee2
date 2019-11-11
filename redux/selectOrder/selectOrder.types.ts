export enum SelectOrderActionTypes {
  SELECT_ORDER = 'SELECT_ORDER',
  SELECT_NEW_ORDER = 'SELECT_NEW_ORDER'
}

export interface SelectOrderState {
  orderId: String | 'NEW' | null
}
