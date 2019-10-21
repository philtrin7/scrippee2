import React, { useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'

import { useMeQuery } from '../generated/graphql'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { RootState } from '../redux/store'
import usePrevious from '../lib/usePreviousState'

import NavSideBar from '../components/navigation/nav-sidebar.component'
import Layout from '../components/Layout'
import { signinUser, signinRequired } from '../redux/auth/auth.actions'
import { AuthState, User } from '../redux/auth/auth.types'

interface IndexPageProps {
  signinCurrentUser: Function
  signinRedirect: Function
  auth: AuthState
}

const IndexPage: React.FC<IndexPageProps> = (props) => {
  const { currentUser } = props.auth
  const { signinCurrentUser, signinRedirect } = props
  const { data } = useMeQuery()

  const prevCurrentUser: User | null | undefined = usePrevious(currentUser)

  useEffect(() => {
    // Prisma query for user
    if (data && data.me) {
      const { me } = data
      signinCurrentUser(me)
      return
      // State contains currentUser
    } else if (currentUser !== null && currentUser.id) {
      return
      // Sign out success without signing required warning
    } else if (currentUser === null && prevCurrentUser) {
      Router.push('/signin')
      // Fallback to forced signin
    } else {
      signinRedirect()
      Router.push('/signin')
    }
  }, [currentUser])

  return (
    <div>
      <Head>
        <script src="../static/js/eva.min.js"></script>
      </Head>
      <Layout title="Scrippee 2.0">
        <div className="layout">
          <nav className="navigation">
            <NavSideBar currentUser={currentUser} />
          </nav>
        </div>
      </Layout>
    </div>
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signinCurrentUser: (currentUser: User) => dispatch(signinUser(currentUser)),
  signinRedirect: () => dispatch(signinRequired())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPage)
