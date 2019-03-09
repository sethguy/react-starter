import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import { rootReducer } from '../reducers/'

const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk, createLogger()),
    )
  )

  return store
}

var preloadedState = {
  user: {
    name: "seth"
  }
}

export const store = configureStore(preloadedState);