import { AuthActionTypes, AuthState, User } from './auth.types'
import { Reducer } from 'redux'

const INITIAL_STATE: AuthState = {
  user: null,
  alerts: []
}

interface AuthPayload {
  type: AuthActionTypes
  currentUser: { id: string; email: string }
  user: User
  signinErrMsg: { type: string; message: string }
  signoutSuccMsg: { type: string; message: string }
}

export const authReducer: Reducer<AuthState, AuthPayload> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case AuthActionTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        user: action.user
      }
    case AuthActionTypes.SIGNIN_FAIL:
      return {
        ...state
      }
    case AuthActionTypes.GET_CURRENT_USER:
      const { id, email } = action.currentUser
      return {
        ...state,
        user: {
          id,
          email
        }
      }
    case AuthActionTypes.SIGNIN_REQUIRED:
      return {
        alerts: state.alerts.push(action.signinErrMsg),
        ...state
      }
    case AuthActionTypes.CLEAR_ALERTS:
      return {
        ...state,
        alerts: []
      }
    case AuthActionTypes.SIGNOUT_SUCCESS:
      return {
        alerts: state.alerts.push(action.signoutSuccMsg),
        ...state,
        user: null
      }
    default:
      return state
  }
}
