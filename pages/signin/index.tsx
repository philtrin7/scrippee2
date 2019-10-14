import React from 'react'
import { connect } from 'react-redux'
import ReactSVG from 'react-svg'
import { graphql } from 'react-apollo'
import { SigninDocument } from '../../generated/graphql'
import { signinStart } from '../../redux/auth/auth.actions'

// import Router from 'next/router'

import './signin.scss'

class SigninPage extends React.Component<any, any> {
  constructor(props: any) {
    super(props)

    this.state = {
      email: '',
      password: '',
      errors: []
    }
  }

  handleSubmit = async (e: any) => {
    e.preventDefault()

    const { signinStartDispatcher, mutate } = this.props
    const { email, password } = this.state

    signinStartDispatcher(email, password, mutate)

    // if (response && response.data) {
    //   setAccessToken(response.data.signin.accessToken)
    // }

    // Router.push('/')
  }

  handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value, name } = event.currentTarget
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div className="sign">
        <div className="container">
          <div className="item">
            <form onSubmit={this.handleSubmit}>
              <h2>Sign in</h2>
              <div className="form-group">
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={this.handleChange}
                  value={this.state.email}
                  required
                  autoFocus
                />
                <button className="btn prepend">
                  <ReactSVG src="../../static/img/svg/person-icon.svg" />
                </button>
              </div>
              <div className="form-group">
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleChange}
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
}

const SigninWtihData = graphql(SigninDocument)(SigninPage)

const mapDispatchToProps = (dispatch: any) => {
  return {
    signinStartDispatcher: (email: string, password: string, mutate: any) =>
      dispatch(signinStart({ email, password, mutate }))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SigninWtihData)
