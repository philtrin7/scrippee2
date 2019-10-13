import { graphql } from 'react-apollo'
import { takeLatest, all, call } from 'redux-saga/effects'
import { UserActionTypes, SignInPayload } from '../../types/user'

import { SigninDocument } from '../../generated/graphql'

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.SIGN_IN_START, signInStart)
}

export function* signInStart({
  payload
}: {
  type: typeof UserActionTypes.SIGN_IN_START
  payload: SignInPayload
}) {
  try {
    const { email, password } = payload
    yield graphql({
      email,
      password
    })
    // yield signin({
    //   variables: {
    //     email,
    //     password
    //   }
    // })
    console.log(email, password)
  } catch (error) {
    console.log(error)
  }
}

export function* userSagas() {
  yield all([call(onEmailSignInStart)])
}
