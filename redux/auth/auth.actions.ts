import { AuthActionTypes } from './auth.types'

export const signinUser = (currentUser: any) => {
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
