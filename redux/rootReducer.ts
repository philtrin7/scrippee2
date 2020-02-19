import { combineReducers } from 'redux'
import { authReducer } from './auth/auth.reducer'
import { ordersListReducer } from './ordersList/ordersList.reducer'
import { viewerReducer } from './viewer/viewer.reducer'

export default combineReducers({
  auth: authReducer,
  ordersList: ordersListReducer,
  viewer: viewerReducer
})
