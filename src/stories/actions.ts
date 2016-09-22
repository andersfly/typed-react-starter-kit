import {GenericAction} from '../types';

type StoryActionType =
  'loadStories' |
  'loadStory'

export type Action<T> = GenericAction<StoryActionType, T>

// Action functions
export const loadStories = (): Action<any> => {
  return {type: 'loadStories'};
}
export const loadStory = (id: number): Action<{id: number}> => {
  return {type: 'loadStory', payload: {id}};
}