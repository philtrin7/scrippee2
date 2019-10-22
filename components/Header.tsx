import React from 'react'
import { useMeQuery, useLogoutMutation } from '../generated/graphql'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import { setAccessToken } from '../lib/accessToken'
import { AuthActionTypes } from '../redux/auth/auth.types'

interface Props {}

export const Header: React.FC<Props> = () => {
  const { data, loading } = useMeQuery()
  const [logout, { client }] = useLogoutMutation()
  const dispatch = useDispatch()

  let body: any = null

  if (loading) {
    body = null
  } else if (data && data.me) {
    body = <div>you are logged in as: {data.me.email}</div>
  } else {
    body = <div>not logged in</div>
  }

  return (
    <header>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>{' '}
        |{' '}
        <Link href="/signup">
          <a>Sign up</a>
        </Link>{' '}
        |{' '}
        <Link href="/signin">
          <a>Sign in</a>
        </Link>{' '}
        |{' '}
        <Link href="/bye">
          <a>bye</a>
        </Link>{' '}
        |{' '}
        {!loading && data && data.me ? (
          <button
            onClick={async () => {
              await logout()
              setAccessToken('')
              await client!.resetStore()
              dispatch({ type: AuthActionTypes.SIGNOUT_SUCCESS })
            }}
          >
            logout
          </button>
        ) : null}
      </nav>
      {body}
    </header>
  )
}
