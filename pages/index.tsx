import React, { useEffect } from 'react'
import Router from 'next/router'
import Head from 'next/head'
import usePrevious from '../lib/usePreviousState'

import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { RootState } from '../redux/store'
import { signinRequired, getCurrentUser } from '../redux/auth/auth.actions'
import { AuthState, User } from '../redux/auth/auth.types'
import {
  fetchList,
  fetchInboxListStart,
  fetchArchiveListStart
} from '../redux/list/list.actions'
import { ListState, LIST_TYPES } from '../redux/list/list.types'

import { useCurrentUserQuery, Orders } from '../generated/graphql'

import NavSideBar from '../components/navigation/nav-sidebar.component'
import Layout from '../components/Layout'
import OrdersList from '../components/list/orders-list.tsx/orders-list.component'
import Viewer from '../components/viewer/viewer.component'

interface IndexPageProps {
  getCurrentUser: Function
  signinRedirect: Function
  fetchList: Function
  fetchInboxListStart: Function
  fetchArchiveListStart: Function
  auth: AuthState
  list: ListState
}

const IndexPage: React.FC<IndexPageProps> = (props) => {
  const { data: currentUserData, loading } = useCurrentUserQuery()
  const { user } = props.auth
  const { getCurrentUser, signinRedirect } = props
  const prevCurrentUser: User | null | undefined = usePrevious(user)

  const { listType, orders } = props.list
  const { fetchInboxListStart, fetchList } = props

  useEffect(() => {
    if (currentUserData && currentUserData.currentUser) {
      const { currentUser } = currentUserData

      // Post signin
      if (user !== null && user.id === currentUser.id) {
        fetchInboxListStart()
        return
      }

      // Page refresh
      if (user === null && currentUser) {
        const { id, email } = currentUser
        getCurrentUser({ id, email })
        fetchInboxListStart()
      }
    } else if (prevCurrentUser) {
      Router.push('/signin')
    } else {
      signinRedirect()
      Router.push('/signin')
    }
  }, [currentUserData])

  useEffect(() => {
    if (listType === LIST_TYPES.INBOX || listType === LIST_TYPES.ARCHIVE) {
      if (currentUserData && currentUserData.currentUser) {
        const { currentUser } = currentUserData
        fetchList(currentUser.orders)
      }
    }
  }, [listType])

  return (
    <div>
      <Head>
        <script src="../static/js/eva.min.js"></script>
      </Head>
      <Layout title="Scrippee 2.0">
        <div className="layout">
          <nav className="navigation">
            <NavSideBar currentUser={user} />
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
  getCurrentUser: (currentUser: { id: string; email: string }) =>
    dispatch(getCurrentUser(currentUser)),
  signinRedirect: () => dispatch(signinRequired()),
  fetchInboxListStart: () => dispatch(fetchInboxListStart()),
  fetchArchiveListStart: () => dispatch(fetchArchiveListStart()),
  fetchList: (orders: Orders) => dispatch(fetchList(orders))
})

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)
