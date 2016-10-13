import {Action} from '../types';

export type StoriesAction =
    Action<'FETCH_STORIES', null>
  | Action<'SHOW_STORY', {slug: string}>
  | Action<'FILTER_BY_TAGS', {tags: Array<string>}>
  | Action<'FILTER_BY_SEASON', {season: number}>
  | Action<'SEARCH', {query: string}>

// Action functions
export const loadStories = (): StoriesAction => {
  return {type: 'FETCH_STORIES', payload: null};
}
export const loadStory = (slug: string): StoriesAction => {
  return {type: 'SHOW_STORY', payload: {slug}};
}
export const filterByTag = (tags: Array<string>): StoriesAction => {
  return {type: 'FILTER_BY_TAGS', payload: {tags}};
}
export const filterBySeason = (season: number): StoriesAction => {
  return {type: 'FILTER_BY_SEASON', payload: {season}};
}
export const search = (query: string): StoriesAction => {
  return {type: 'SEARCH', payload: {query}};
}