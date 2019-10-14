import { takeLatest, all, call, put } from 'redux-saga/effects'
import { AuthActionTypes, SigninPayload } from '../../redux/auth/auth.types'

import { signinFailure } from './auth.actions'

export function* onEmailSignInStart() {
  yield takeLatest(AuthActionTypes.SIGNIN_START, signInStart)
}

export function* signInStart({
  payload
}: {
  type: typeof AuthActionTypes.SIGNIN_START
  payload: SigninPayload
}) {
  try {
    const { email, password, mutate } = payload
    const response = yield mutate({
      variables: {
        email,
        password
      }
    })
    console.log(response)
  } catch (error) {
    yield put(signinFailure(error.graphQLErrors))
  }
}

export function* authSagas() {
  yield all([call(onEmailSignInStart)])
}
