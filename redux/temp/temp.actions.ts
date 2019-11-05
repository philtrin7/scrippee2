import { TempActionTypes } from './temp.types'

export const newTempOrder = () => {
  return {
    type: TempActionTypes.NEW_TEMP_ORDER
  }
}

export const setTempOrder = (field: string, value: string) => {
  return {
    type: TempActionTypes.SET_TEMP_ORDER,
    field,
    value
  }
}

export const clearTempOrder = () => {
  return {
    type: TempActionTypes.CLEAR_TEMP_ORDER
  }
}

export const clearField = (field: string) => {
  return {
    type: TempActionTypes.CLEAR_FIELD,
    payload: field
  }
}
