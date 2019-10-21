import { AuthActionTypes, AuthState } from './auth.types'
import { Reducer } from 'redux'

const INITIAL_STATE: AuthState = {
  currentUser: null,
  alerts: []
}

export const authReducer: Reducer<AuthState, any> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case AuthActionTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload
      }
    case AuthActionTypes.SIGNOUT_SUCCESS:
      return {
        alerts: state.alerts.push(action.payload),
        ...state,
        currentUser: null
      }
    case AuthActionTypes.SIGNIN_FAIL:
      return {
        ...state
      }
    case AuthActionTypes.SIGNIN_REQUIRED:
      return {
        alerts: state.alerts.push(action.payload),
        ...state
      }
    case AuthActionTypes.CLEAR_ERRORS:
      return {
        ...state,
        alerts: []
      }
    default:
      return state
  }
}
