import { AuthActionTypes, AuthState } from './auth.types'

const INITIAL_STATE = {
  currentUser: null
}

export const authReducer = (state: AuthState = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case AuthActionTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload
      }
    default:
      return state
  }
}
