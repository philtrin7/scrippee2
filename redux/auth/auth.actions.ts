import { AuthActionTypes, SigninPayload } from './auth.types'

export const signinStart = (payload: SigninPayload) => {
  return {
    type: AuthActionTypes.SIGNIN_START,
    payload
  }
}

export const signinFailure = (errors: any) => {
  return {
    type: AuthActionTypes.SIGNIN_FAIL,
    payload: errors
  }
}
