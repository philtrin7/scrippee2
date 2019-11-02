import { combineReducers } from 'redux'
import { authReducer } from './auth/auth.reducer'
import { listReducer } from './list/list.reducer'
import { viewerReducer } from './viewer/viewer.reducer'

export default combineReducers({
  auth: authReducer,
  list: listReducer,
  viewer: viewerReducer
})
