import React from 'react'
import {Route} from 'react-router'
import {fetchStories} from './actions';
import {Stories} from './containers'

export const getRoutes = store => {
  return (
    <Route path="stories" component={Stories} onEnter={() => store.dispatch(fetchStories())} />
  );
}
