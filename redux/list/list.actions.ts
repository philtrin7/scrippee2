import { ListActionTypes } from './list.types'
import { Orders } from '../../generated/graphql'

export const fetchInboxListStart = () => {
  return {
    type: ListActionTypes.FETCH_INBOX_LIST_START
  }
}
export const fetchArchiveListStart = () => {
  return {
    type: ListActionTypes.FETCH_ARCHIVE_LIST_START
  }
}
export const fetchList = (orders: Orders) => {
  return {
    type: ListActionTypes.FETCH_LIST_SUCCESS,
    orders
  }
}
