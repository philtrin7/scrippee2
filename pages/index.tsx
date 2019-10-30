import React, { useEffect } from 'react'
import Router from 'next/router'
import Head from 'next/head'

import {
  useUserQuery,
  useInboxOrdersQuery,
  useArchiveOrdersLazyQuery
} from '../generated/graphql'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { RootState } from '../redux/store'
import usePrevious from '../lib/usePreviousState'

import NavSideBar from '../components/navigation/nav-sidebar.component'
import Layout from '../components/Layout'
import { signinUser, signinRequired } from '../redux/auth/auth.actions'
import { AuthState, User } from '../redux/auth/auth.types'

import OrdersList from '../components/list/orders-list.tsx/orders-list.component'
import { fetchList } from '../redux/list/list.actions'
import { ListState, Order, LIST_TYPES } from '../redux/list/list.types'

interface IndexPageProps {
  signinUser: Function
  signinRedirect: Function
  fetchList: Function
  auth: AuthState
  list: ListState
}

const IndexPage: React.FC<IndexPageProps> = (props) => {
  const { data: userData } = useUserQuery()
  const { currentUser } = props.auth
  const { signinUser, signinRedirect } = props
  const prevCurrentUser: User | null | undefined = usePrevious(currentUser)

  const { orders, listType } = props.list
  const { fetchList } = props
  const { data: inboxOrders, loading: loadingInboxList } = useInboxOrdersQuery()
  const [
    getArchiveOrders,
    { data: archiveOrders, loading: loadingArchiveList }
  ] = useArchiveOrdersLazyQuery()

  useEffect(() => {
    if (userData && userData.user) {
      const { user } = userData
      if (currentUser !== null && currentUser.id === user.id) {
        return
      } else {
        signinUser(user)
      }
    } else if (prevCurrentUser) {
      Router.push('/signin')
    } else {
      signinRedirect()
      Router.push('/signin')
    }
  }, [userData])

  useEffect(() => {
    if (listType === LIST_TYPES.INBOX) {
      if (inboxOrders && inboxOrders.user) {
        fetchList(inboxOrders.user.inbox)
      }
    }
    if (listType === LIST_TYPES.ARCHIVE) {
      getArchiveOrders()
      if (archiveOrders && archiveOrders.user) {
        fetchList(archiveOrders.user.archive)
      }
    }
  }, [listType, inboxOrders, archiveOrders])

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
          <OrdersList
            orders={orders}
            loading={loadingInboxList || loadingArchiveList}
          />
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
  fetchList: (orders: Order[]) => dispatch(fetchList(orders))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPage)
