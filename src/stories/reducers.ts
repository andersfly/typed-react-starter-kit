import {StoriesAction} from './actions';
import {Story} from './types';

export type StoriesState = {
  entities: {
    stories: Map<string, Story>
  },
  detail: number | null
}

const DEFAULT_STATE = {
  entities: {
    stories: new Map()
  },
  detail: null
}

export function root(state = DEFAULT_STATE, action: StoriesAction): StoriesState {

  switch (action.type) {
    case 'RECEIVE_STORIES': {
      const {stories} = action.payload
      return Object.assign({}, state, {
        entities: {stories: new Map(stories.map(s => [s.slug, s] as [string, any]))}
      })
    }

    case 'SHOW_STORY_DETAIL': {
      const {stories} = state.entities
      const {slug} = action.payload

      return Object.assign({}, state, {
        detail: stories.get(slug)
      })
    }

    case 'CLEAR_STORY_DETAIL': {
      return Object.assign({}, state, {
        detail: null
      })
    }

    default:
      return state
  }
}