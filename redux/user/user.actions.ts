import { UserActionTypes, SignInPayload } from '../../types/user'

export const signInStart = (payload: SignInPayload) => {
  return {
    type: UserActionTypes.SIGN_IN_START,
    payload
  }
}
