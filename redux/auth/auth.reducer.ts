import { AuthActionTypes, AuthState } from './auth.types'
import { Reducer } from 'redux'

const INITIAL_STATE: AuthState = {
  currentUser: null,
  errors: []
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
        ...state,
        currentUser: null
      }
    case AuthActionTypes.SIGNIN_FAIL:
      return {
        ...state
      }
    case AuthActionTypes.SIGNIN_REQUIRED:
      return {
        errors: state.errors.push(action.payload),
        ...state
      }
    case AuthActionTypes.CLEAR_ERRORS:
      return {
        ...state,
        errors: []
      }
    default:
      return state
  }
}
