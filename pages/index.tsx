import * as React from 'react'
import Head from 'next/head'
import Layout from '../components/Layout'
import { NextPage } from 'next'
import NavSideBar from '../components/navigation/nav-sidebar.component'

const IndexPage: NextPage = () => {
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
