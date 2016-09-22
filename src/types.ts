import React from 'react'
import {Store} from 'redux';

export type Dictionary<T> = {
  [key: string]: T
}

export type GenericAction<T,P> = {
  type: T,
  payload?: P | Error,
  error?: boolean
}

export type Domain = {
  saga: (store: Store<any>) => IterableIterator<any>,
  reducer: (state: Object, action: GenericAction<any, any>) => Object,
  getRoutes: (store: Object) => React.ReactElement<any>
}