import { SigninMutationFn } from '../../generated/graphql'

export enum AuthActionTypes {
  SIGNIN_START = 'SIGNIN_START',
  SIGNIN_FAIL = 'SIGNIN_FAIL'
}

export interface SigninPayload {
  email: string
  password: string
  mutate: SigninMutationFn
}
