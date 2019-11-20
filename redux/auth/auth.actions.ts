import { AuthActionTypes, User } from './auth.types'

export const signinUser = (user: User) => {
  return {
    type: AuthActionTypes.SIGNIN_SUCCESS,
    user
  }
}

export const signinRequired = () => {
  return {
    type: AuthActionTypes.SIGNIN_REQUIRED,
    signinErrMsg: { type: 'warn', message: 'To continue, please sign in.' }
  }
}

export const getCurrentUser = (currentUser: { id: string; email: string }) => {
  return {
    type: AuthActionTypes.GET_CURRENT_USER,
    currentUser
  }
}

export const clearAlerts = () => {
  return {
    type: AuthActionTypes.CLEAR_ALERTS
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
    signoutSuccMsg: { type: 'success', message: 'Successfully signed out.' }
  }
}

export const signoutFail = () => {
  return {
    type: AuthActionTypes.SIGNOUT_FAIL
  }
}
