import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '../components/Layout'
import { NextPage } from 'next'
import NavSideBar from '../components/navigation/nav-sidebar.component'
import { useMeQuery } from '../generated/graphql'
import { useDispatch, useSelector } from 'react-redux'
import { AuthActionTypes } from '../redux/auth/auth.types'
import { RootState } from '../redux/store'
import Router from 'next/router'

const IndexPage: NextPage = () => {
  const auth = useSelector((state: RootState) => state.auth)
  const [currentUser] = useState(auth.currentUser)
  const dispatch = useDispatch()
  const { data } = useMeQuery()

  useEffect(() => {
    if (data && data.me) {
      const { me } = data
      dispatch({ type: AuthActionTypes.SIGNIN_SUCCESS, payload: me })
    } else {
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
