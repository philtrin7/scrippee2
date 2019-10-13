import { AuthActionTypes, SigninPayload } from './auth.types'

export const signinStart = (payload: SigninPayload) => {
  return {
    type: AuthActionTypes.SIGN_IN_START,
    payload
  }
}
