import React, { useState, useEffect } from 'react'
import ReactSVG from 'react-svg'
import { toast } from 'react-toastify'
import Router from 'next/router'

import { useSigninMutation } from '../../generated/graphql'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { RootState } from '../../redux/store'
// import { setAccessToken } from '../../lib/accessToken'
import { User, ErrorArray } from '../../redux/auth/auth.types'
import {
  clearErrors,
  signinUser,
  signinFail
} from '../../redux/auth/auth.actions'

import PulseLoader from 'react-spinners/PulseLoader'
import './signin.scss'

interface SigninPagePropTypes {
  clearErrorsArr: Function
  signinCurrentUser: Function
  signinFailed: Function
  errors: ErrorArray
}

const SigninPage: React.FC<SigninPagePropTypes> = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState(props.errors)

  const [signin, { loading }] = useSigninMutation()

  const { clearErrorsArr, signinCurrentUser, signinFailed } = props

  useEffect(() => {
    if (errors.length > 0) {
      errors.map((error) => {
        toast.error(error)
        clearErrorsArr()
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
        signinCurrentUser(user)

        Router.push('/')
      }
    } catch (err) {
      setErrors([err.graphQLErrors[0].message])
      signinFailed()
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
              {loading ? (
                <PulseLoader margin={'2px'} color={'white'} size={8} />
              ) : (
                'Sign In'
              )}
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

const mapStateToProps = (state: RootState) => {
  return {
    errors: state.auth.errors
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signinCurrentUser: (currentUser: User) => dispatch(signinUser(currentUser)),
  signinFailed: () => dispatch(signinFail()),
  clearErrorsArr: () => dispatch(clearErrors())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SigninPage)
