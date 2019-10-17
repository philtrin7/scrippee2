export enum AuthActionTypes {
  SIGNIN_SUCCESS = 'SIGNIN_SUCCESS',
  SIGNIN_FAIL = 'SIGNIN_FAIL',
  SIGNIN_REQUIRED = 'SIGNIN_REQUIRED',
  CLEAR_ERRORS = 'CLEAR_ERRORS',
  SIGNOUT_SUCCESS = 'SIGNOUT_SUCCESS'
}

export interface AuthState {
  currentUser: User | null
  errors: ErrorArray
}

export interface User {
  id: String
  email: String
}

export type ErrorArray = String[]
