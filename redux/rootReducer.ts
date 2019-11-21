import { combineReducers } from 'redux'
import { authReducer } from './auth/auth.reducer'
import { ordersListReducer } from './ordersList/ordersList.reducer'
import { viewerReducer } from './viewer/viewer.reducer'
import { selectOrderReducer } from './selectOrder/selectOrder.reducer'

export default combineReducers({
  auth: authReducer,
  ordersList: ordersListReducer,
  viewer: viewerReducer,
  selectOrder: selectOrderReducer
})
