import { AuthPayload } from '../../generated/graphql'

export enum AuthActionTypes {
  SIGN_IN_START = 'SIGN_IN_START'
}

export interface SigninPayload {
  payload: {
    data: AuthPayload
  }
}
