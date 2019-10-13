export enum AuthActionTypes {
  SIGN_IN_START = 'SIGN_IN_START'
}

export interface SigninPayload {
  email: string
  password: string
}
