import App from 'next/app'
import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { withApollo } from '../lib/apollo'

import GlobalStyles from './GlobalStyles'

class MyApp extends App<any> {
  render() {
    const { Component, pageProps, apolloClient } = this.props
    return (
      <ApolloProvider client={apolloClient}>
        <GlobalStyles />
        <Component {...pageProps} />
      </ApolloProvider>
    )
  }
}

export default withApollo(MyApp)
