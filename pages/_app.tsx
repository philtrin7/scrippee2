import App from 'next/app'
import React from 'react'

import { ApolloProvider } from '@apollo/react-hooks'
import { withApollo } from '../lib/apollo'

import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import createStore from '../redux/store'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalStyles from './GlobalStyles'

toast.configure()

class MyApp extends App<any> {
  render() {
    const { Component, pageProps, apolloClient, store } = this.props
    return (
      <ApolloProvider client={apolloClient}>
        <Provider store={store}>
          <GlobalStyles />
          <Component {...pageProps} />
        </Provider>
      </ApolloProvider>
    )
  }
}

export default withRedux(createStore)(withApollo(MyApp))
