import {call, take, put, race} from 'redux-saga/effects'
import {Dictionary} from '../types'
import {StoriesAction, receiveStories} from './actions'

class Api {
  static get(url: string, opts: RequestInfo): Promise<any> {
    return Api.fetch(url, 'GET', opts)
  }

  private static fetch(url, method, opts) {
    return window.fetch(url, Object.assign({}, opts, {method}))
      .then(resp => resp.json())
  }
}

type Query = Dictionary<string | number | Array<string>>

function* fetchStories(store): any {
  const actionFilter = action => ['FETCH_STORIES'].includes(action.type);

  while (true) {
    const action: StoriesAction = yield take(actionFilter)
    let query: Query = {};

    switch (action.type) {
      case 'FETCH_STORIES': {
        const stories = yield call(Api.get, '/api/stories.json')
        store.dispatch(receiveStories(stories))
      }
    }
  }
}

export function* root(store) {
  yield fetchStories(store)
}
