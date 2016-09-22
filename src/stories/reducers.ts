import {Action} from './actions';
import {Story} from './types';

const dummyStories = new Map<number, Story>(
  [
    [1, {title: 'Nice Story', slug: 'nice-story'}],
    [2, {title: 'Another Nice Story', slug: 'another-nice-story'}]
  ]
);

export type StoriesState = {
  entities: {
    stories: Map<string, Story>
  }
}

const DEFAULT_STATE = {
  entities: {
    stories: null
  }
}

export function root(state = DEFAULT_STATE, action: Action<any>) {
  switch (action.type) {
    case 'loadStories': {
      return {
        entities: Object.assign({},
          state.entities,
          {stories: dummyStories}
        )
      }
    }
  }

  return state
}
