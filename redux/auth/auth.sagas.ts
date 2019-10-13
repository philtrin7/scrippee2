import { takeLatest, all, call } from 'redux-saga/effects'
import { AuthActionTypes, SigninPayload } from '../../redux/auth/auth.types'

export function* onEmailSignInStart() {
  yield takeLatest(AuthActionTypes.SIGN_IN_START, signInStart)
}

export function* signInStart({
  payload
}: {
  type: typeof AuthActionTypes.SIGN_IN_START
  payload: SigninPayload
}) {
  try {
    // console.log('saga')
    console.log(`Saga: ${payload}`)
  } catch (error) {
    console.log(error)
  }
}

export function* authSagas() {
  yield all([call(onEmailSignInStart)])
}
