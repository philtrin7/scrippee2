import { combineReducers } from 'redux'
import { authReducer } from './auth/auth.reducer'
import { listReducer } from './list/list.reducer'

export default combineReducers({
  auth: authReducer,
  list: listReducer
})
