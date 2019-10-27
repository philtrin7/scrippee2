import React, { useEffect } from 'react'
import Router from 'next/router'
import Head from 'next/head'

import { useUserQuery, useOrdersQuery } from '../generated/graphql'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { RootState } from '../redux/store'
import usePrevious from '../lib/usePreviousState'

import NavSideBar from '../components/navigation/nav-sidebar.component'
import Layout from '../components/Layout'
import { signinUser, signinRequired } from '../redux/auth/auth.actions'
import { AuthState, User } from '../redux/auth/auth.types'

import OrdersList from '../components/orders/orders-list.tsx/orders-list.component'
import { fetchOrderList } from '../redux/list/list.actions'
import { ListState, Order } from '../redux/list/list.types'

interface IndexPageProps {
  signinUser: Function
  signinRedirect: Function
  fetchOrderList: Function
  auth: AuthState
  list: ListState
}

const IndexPage: React.FC<IndexPageProps> = (props) => {
  const { currentUser } = props.auth
  const { signinUser, signinRedirect } = props
  const { data: userData } = useUserQuery()

  const { orders } = props.list
  const { fetchOrderList } = props
  const { data: ordersData, loading: loadingOrders } = useOrdersQuery()

  const prevCurrentUser: User | null | undefined = usePrevious(currentUser)

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
    if (ordersData && ordersData.user) {
      fetchOrderList(ordersData.user.orders)
    }
  }, [ordersData])

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
          <OrdersList orders={orders} loading={loadingOrders} />
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
  fetchOrderList: (orders: Order[]) => dispatch(fetchOrderList(orders))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPage)
