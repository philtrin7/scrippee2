import { applyMiddleware, createStore } from 'redux'

import rootReducer from './rootReducer'

const bindMiddleware = (middleware: any) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

function configureStore(initialState: any) {
  const store: any = createStore(
    rootReducer,
    initialState,
    bindMiddleware([
      /* Add middleware here */
    ])
  )

  return store
}

export default configureStore
