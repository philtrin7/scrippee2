import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { NextPage } from 'next'

import { useMeQuery } from '../generated/graphql'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'

import { AuthActionTypes } from '../redux/auth/auth.types'

import NavSideBar from '../components/navigation/nav-sidebar.component'
import Layout from '../components/Layout'

const IndexPage: NextPage = () => {
  const auth = useSelector((state: RootState) => state.auth)
  const [currentUser] = useState(auth.currentUser)
  const dispatch = useDispatch()
  const { data } = useMeQuery()

  useEffect(() => {
    if (data && data.me) {
      const { me } = data
      dispatch({ type: AuthActionTypes.SIGNIN_SUCCESS, payload: me })
    } else if (currentUser) {
      return
    } else {
      dispatch({ type: AuthActionTypes.SIGNIN_REQUIRED })
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
            <NavSideBar />
          </nav>
        </div>
      </Layout>
    </div>
  )
}

export default IndexPage
