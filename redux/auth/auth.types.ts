export enum AuthActionTypes {
  SIGNIN_SUCCESS = 'SIGNIN_SUCCESS',
  SIGNIN_FAIL = 'SIGNIN_FAIL',
  SIGNIN_REQUIRED = 'SIGNIN_REQUIRED',
  CLEAR_ERRORS = 'CLEAR_ERRORS',
  SIGNOUT_SUCCESS = 'SIGNOUT_SUCCESS'
}

export interface AuthState {
  currentUser: {
    id: String
    email: String
  } | null
  errors: Error[]
}

type Error = String
