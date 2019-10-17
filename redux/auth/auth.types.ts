export enum AuthActionTypes {
  SIGNIN_SUCCESS = 'SIGNIN_SUCCESS',
  SIGNIN_FAIL = 'SIGNIN_FAIL'
}

export interface AuthState {
  currentUser: {
    id: String
    email: String
  } | null
}
