import * as React from 'react'
import Layout from '../components/Layout'
import { NextPage } from 'next'
import NavSideBar from '../components/navigation/nav-sidebar.component'

const IndexPage: NextPage = () => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Hello Next.js 👋</h1>
      <div className="layout">
        <NavSideBar />
      </div>
    </Layout>
  )
}

export default IndexPage
