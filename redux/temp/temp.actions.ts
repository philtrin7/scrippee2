import { TempActionTypes } from './temp.types'

export const newTempOrder = () => {
  return {
    type: TempActionTypes.NEW_TEMP_ORDER
  }
}

export const setTempOrder = (object: { [key: string]: string }) => {
  return {
    type: TempActionTypes.SET_TEMP_ORDER,
    payload: object
  }
}

export const clearTempOrder = () => {
  return {
    type: TempActionTypes.CLEAR_TEMP_ORDER
  }
}
