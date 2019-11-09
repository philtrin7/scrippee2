import React, { useEffect } from 'react'
import Router from 'next/router'
import Head from 'next/head'

import { useUserQuery } from '../generated/graphql'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { RootState } from '../redux/store'
import usePrevious from '../lib/usePreviousState'

import NavSideBar from '../components/navigation/nav-sidebar.component'
import Layout from '../components/Layout'
import { signinUser, signinRequired } from '../redux/auth/auth.actions'
import { AuthState, User } from '../redux/auth/auth.types'

import OrdersList from '../components/list/orders-list.tsx/orders-list.component'
import {
  fetchList,
  fetchInboxListStart,
  fetchArchiveListStart
} from '../redux/list/list.actions'
import { ListState, LIST_TYPES, Orders } from '../redux/list/list.types'

import Viewer from '../components/viewer/viewer.component'

interface IndexPageProps {
  signinUser: Function
  signinRedirect: Function
  fetchList: Function
  fetchInboxListStart: Function
  fetchArchiveListStart: Function
  auth: AuthState
  list: ListState
}

const IndexPage: React.FC<IndexPageProps> = (props) => {
  const { data: userData, loading } = useUserQuery()
  const { currentUser } = props.auth
  const { signinUser, signinRedirect } = props
  const prevCurrentUser: User | null | undefined = usePrevious(currentUser)

  const { listType, orders } = props.list
  const { fetchInboxListStart, fetchList } = props

  useEffect(() => {
    if (userData && userData.user) {
      const { user } = userData
      if (currentUser !== null && currentUser.id === user.id) {
        return
      } else {
        signinUser(user)
        fetchInboxListStart()
        fetchList(user.orders)
      }
    } else if (prevCurrentUser) {
      Router.push('/signin')
    } else {
      signinRedirect()
      Router.push('/signin')
    }
  }, [userData])

  useEffect(() => {
    if (userData && userData.user) {
      const { user } = userData

      if (listType === LIST_TYPES.INBOX || listType === LIST_TYPES.ARCHIVE) {
        fetchList(user.orders)
      }
    }
  }, [listType, userData])

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
          <OrdersList orders={orders} loading={loading} />

          <Viewer />
        </div>
      </Layout>
    </div>
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    auth: state.auth,
    list: state.list
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signinUser: (user: User) => dispatch(signinUser(user)),
  signinRedirect: () => dispatch(signinRequired()),
  fetchInboxListStart: () => dispatch(fetchInboxListStart()),
  fetchArchiveListStart: () => dispatch(fetchArchiveListStart()),
  fetchList: (orders: Orders) => dispatch(fetchList(orders))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPage)
