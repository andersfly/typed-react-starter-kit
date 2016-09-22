import React from 'react'
import {createStore, applyMiddleware, compose, combineReducers, ReducersMapObject} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {Provider} from 'react-redux'
import {Router, Route, IndexRedirect, hashHistory} from 'react-router'
import {Dictionary, Domain} from './types'
import App from './app/containers/App'

function createRootSaga(domains: Dictionary<Domain>) {
  const sagas = Object.keys(domains).reduce((list, k) => {
    if (domains[k].saga) {
      list.push(domains[k].saga)
    }
    return list
  }, [])

  return function* mainSaga(store) {
    yield sagas.map(s => s(store))
  }
}

function createRootReducer(domains: Dictionary<Domain>) {
  const reducers: {[key: string]: any} = Object.keys(domains).reduce((dict, k) => {
    if (domains[k].reducer) {
      dict[k] = domains[k].reducer
    }
    return dict
  }, {})

  return combineReducers(reducers)
}

export function configureStore(domains: Dictionary<Domain>) {
  const reducer = createRootReducer(domains)
  const saga = createRootSaga(domains)
  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    reducer,
    compose(
      applyMiddleware(sagaMiddleware),
      window['devToolsExtension'] ? window['devToolsExtension']() : () => {}
    )
  )
  sagaMiddleware.run(saga, store)

  return store
}

export function configureRouter(store, domains, defaultPath = '/') {
  const routes = Object.keys(domains).reduce((list, k) => {
    if (domains[k].getRoutes) {
      // We're rendering through a list - so we need to supply an unique key
      list.push(React.cloneElement(domains[k].getRoutes(store), {key: k}))
    }
    return list
  }, [])

  return (
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={App} onEnter={() => console.log('loading...')}>
          {routes}
          <IndexRedirect to={defaultPath} />
        </Route>
      </Router>
    </Provider>
  )
}
