import { AuthActionTypes } from './auth.types'

const INITIAL_STATE = {
  currentUser: null,
  errors: []
}

export const authReducer = (state: any = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case AuthActionTypes.SIGNIN_FAIL:
      return {
        ...state,
        errors: action.payload
      }
    default:
      return state
  }
}
