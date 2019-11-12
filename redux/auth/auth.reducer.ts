import { AuthActionTypes, AuthState } from "./auth.types";
import { Reducer } from "redux";

const INITIAL_STATE: AuthState = {
  user: null,
  alerts: []
};

export const authReducer: Reducer<AuthState, any> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case AuthActionTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        user: action.payload
      };
    case AuthActionTypes.SIGNIN_FAIL:
      return {
        ...state
      };
    case AuthActionTypes.SIGNIN_REQUIRED:
      return {
        alerts: state.alerts.push(action.payload),
        ...state
      };
    case AuthActionTypes.CLEAR_ALERTS:
      return {
        ...state,
        alerts: []
      };
    case AuthActionTypes.SIGNOUT_SUCCESS:
      return {
        alerts: state.alerts.push(action.payload),
        ...state,
        user: null
      };
    default:
      return state;
  }
};
