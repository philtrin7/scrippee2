import { AuthActionTypes, User } from './auth.types'

export const signinUser = (currentUser: User) => {
  return {
    type: AuthActionTypes.SIGNIN_SUCCESS,
    payload: currentUser
  }
}

export const signinRequired = () => {
  return {
    type: AuthActionTypes.SIGNIN_REQUIRED,
    payload: 'Please sign in'
  }
}

export const clearErrors = () => {
  return {
    type: AuthActionTypes.CLEAR_ERRORS
  }
}

export const signinFail = () => {
  return {
    type: AuthActionTypes.SIGNIN_FAIL
  }
}
