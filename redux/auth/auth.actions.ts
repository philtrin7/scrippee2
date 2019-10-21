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
    payload: { type: 'warn', message: 'To continue, please sign in.' }
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

export const signoutSuccess = () => {
  return {
    type: AuthActionTypes.SIGNOUT_SUCCESS,
    payload: { type: 'success', message: 'Successfully signed out.' }
  }
}

export const signoutFail = () => {
  return {
    type: AuthActionTypes.SIGNOUT_FAIL
  }
}
