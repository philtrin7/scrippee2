import App from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import { ApolloProvider } from '@apollo/react-hooks'
import { withApollo } from '../lib/apollo'
import withReduxSaga from 'next-redux-saga'
import withRedux from 'next-redux-wrapper'
import createStore from '../redux/store'

import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalStyles from './GlobalStyles'

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

export default withRedux(createStore)(withReduxSaga(withApollo(MyApp)))
