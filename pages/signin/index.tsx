import React, { useState, useEffect } from 'react'
import ReactSVG from 'react-svg'
import { toast } from 'react-toastify'
import Router from 'next/router'

import { useSigninMutation } from '../../generated/graphql'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
// import { setAccessToken } from '../../lib/accessToken'
import { AuthActionTypes } from '../../redux/auth/auth.types'

import './signin.scss'

const SigninPage: React.FC = () => {
  const errorsInit = useSelector((state: RootState) => state.auth.errors)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState(errorsInit)

  const [signin] = useSigninMutation()
  const dispatch = useDispatch()

  useEffect(() => {
    if (errors.length > 0) {
      errors.map((error) => {
        toast.error(error)
        dispatch({ type: AuthActionTypes.CLEAR_ERRORS })
      })
    }
  }, [errors])

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    try {
      const response = await signin({
        variables: {
          email,
          password
        }
      })
      if (response && response.data) {
        const { user } = response.data.signin
        dispatch({ type: AuthActionTypes.SIGNIN_SUCCESS, payload: user })

        Router.push('/')
      }
    } catch (err) {
      dispatch({ type: AuthActionTypes.SIGNIN_FAIL })
      setErrors([err.graphQLErrors[0].message])
    }

    // if (response && response.data) {
    //   setAccessToken(response.data.signin.accessToken)
    // }
  }

  return (
    <div className="sign">
      <div className="container">
        <div className="item">
          <form onSubmit={handleSubmit}>
            <h2>Sign in</h2>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
              <button className="btn prepend">
                <ReactSVG src="../../static/img/svg/person-icon.svg" />
              </button>
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button className="btn prepend">
                <ReactSVG src="../../static/img/svg/lock-icon.svg" />
              </button>
            </div>
            <a href="/">Forgot Password?</a>
            <button type="submit" className="btn primary">
              Sign In
            </button>
            <span>
              Don't have account? <a href="/">Create Account.</a>
            </span>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SigninPage
