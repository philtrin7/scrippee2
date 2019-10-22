import React, { useState, useEffect } from 'react'
import ReactSVG from 'react-svg'
import { toast } from 'react-toastify'
import Router from 'next/router'
import { setAccessToken } from '../../lib/accessToken'

import { useSigninMutation, MeQuery, MeDocument } from '../../generated/graphql'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { RootState } from '../../redux/store'
import { User, AlertsArray } from '../../redux/auth/auth.types'
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
  alerts: AlertsArray
}

const SigninPage: React.FC<SigninPagePropTypes> = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alerts, setAlerts] = useState(props.alerts)

  const [signin, { loading }] = useSigninMutation()

  const { clearErrorsArr, signinCurrentUser, signinFailed } = props

  useEffect(() => {
    if (alerts.length > 0) {
      alerts.map((alert) => {
        const { type, message } = alert
        if (type === 'warn') {
          toast.warn(message)
          clearErrorsArr()
        } else if (type === 'error') {
          toast.error(message)
          clearErrorsArr()
        } else if (type === 'success') {
          toast.success(message)
          clearErrorsArr()
        }
      })
    }
  }, [alerts])

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    try {
      const response = await signin({
        variables: {
          email,
          password
        },
        update: (store, { data }) => {
          if (!data) {
            return null
          }
          store.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              me: data.signin.user
            }
          })
        }
      })
      if (response && response.data) {
        const { user } = response.data.signin
        setAccessToken(response.data.signin.accessToken)
        signinCurrentUser(user)

        Router.push('/')
      }
    } catch (err) {
      setAlerts([
        {
          type: 'error',
          message: err.graphQLErrors[0].message
        }
      ])
      signinFailed()
    }
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
    alerts: state.auth.alerts
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
