import {call, take, put, race} from 'redux-saga/effects'
import {Dictionary} from '../types'
import {StoriesAction} from './actions'

// const api = new Api('http://example.com/api');

type Query = Dictionary<string | number | Array<string>>

function* fetchStories(store) {
  const actionFilter = action => ['FILTER_BY_TAGS', 'FILTER_BY_SEASON'].includes(action.type);

  while (true) {
    const action: StoriesAction = yield take(actionFilter)
    let query: Query = {};

    if (action.type === 'FILTER_BY_TAGS') {
      query['tag'] = action.payload.tags
    }
    if (action.type === 'FILTER_BY_SEASON') {
      query['season'] = action.payload.season
    }

    // Fetch stories from API
    // api.get('/stories', {})
  }
}

export function* root({getState}) {}
