export enum UserActionTypes {
  SIGN_IN_START = 'SIGN_IN_START'
}

export interface SignInPayload {
  email: string
  password: string
}
