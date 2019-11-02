export interface ViewerState {
  type: VIEWER_TYPES | null
}

export enum ViewerActionTypes {
  NEW_ORDER_VIEW = 'NEW_ORDER_VIEW'
}

export enum VIEWER_TYPES {
  NEW_ORDER = 'NEW_ORDER'
}
