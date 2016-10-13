import {StoriesAction} from './actions';
import {Story} from './types';

const dummyStories = new Map<number, Story>(
  [
    [1, {title: 'Nice Story', slug: 'nice-story'}],
    [2, {title: 'Another Nice Story', slug: 'another-nice-story'}]
  ]
);

export type StoriesState = {
  entities: {
    stories: Map<number, Story>
  },
  detail: number | null
}

const DEFAULT_STATE = {
  entities: {
    stories: null
  },
  detail: null
}

export function root(state = DEFAULT_STATE, action: StoriesAction): StoriesState {
  switch (action.type) {

    case 'FETCH_STORIES': {
      return Object.assign({}, state, {
        entities: Object.assign({},
          state.entities,
          {stories: dummyStories}
        )
      })
    }

    case 'SHOW_STORY': {
      const {slug} = action.payload
      return Object.assign({}, state, {
        detail: slug
      })
    }

    default:
      return state
  }
}