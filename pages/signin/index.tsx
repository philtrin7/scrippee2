import React from 'react'
import { connect } from 'react-redux'
import ReactSVG from 'react-svg'
// import { useSigninMutation, MeQuery, MeDocument } from '../../generated/graphql'
// import { setAccessToken } from '../../lib/accessToken'
// import Router from 'next/router'

import { signInStart } from '../../redux/user/user.actions'

import './signin.scss'

class SigninPage extends React.Component<any, any> {
  // const [email, setEmail] = React.useState('')
  // const [password, setPassword] = React.useState('')
  // const [login] = useSigninMutation()

  constructor(props: any) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }
  }

  handleSubmit = (e: any) => {
    e.preventDefault()

    const { signInStart } = this.props
    const { email, password } = this.state

    signInStart(email, password)
    // const response = await login({
    //   variables: {
    //     email,
    //     password
    //   },
    //   update: (store, { data }) => {
    //     if (!data) {
    //       return null
    //     }
    //     // Update Apollo cache with newly signed-in user
    //     store.writeQuery<MeQuery>({
    //       query: MeDocument,
    //       data: {
    //         me: data.signin.user
    //       }
    //     })
    //   }
    // })

    // if (response && response.data) {
    //   setAccessToken(response.data.signin.accessToken)
    // }

    // Router.push('/')
  }

  handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value, name } = event.currentTarget
    // Use Pick to ensure that you're setting a key
    // that has been defined in your state interface
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

const mapDispatchToProps = (dispatch: any) => {
  return {
    signInStart: (email: string, password: string) =>
      dispatch(signInStart({ email, password }))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SigninPage)
