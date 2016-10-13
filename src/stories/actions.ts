import {Action} from '../types'
import {Story} from './types'

export type StoriesAction =
    Action<'FETCH_STORIES', null>
  | Action<'RECEIVE_STORIES', {stories: Array<Story>}>
  | Action<'SHOW_STORY_DETAIL', {slug: string}>
  | Action<'CLEAR_STORY_DETAIL', null>
  | Action<'FILTER_BY_TAGS', {tags: Array<string>}>
  | Action<'FILTER_BY_SEASON', {season: number}>
  | Action<'SEARCH', {query: string}>

// Action functions
export const fetchStories = (): StoriesAction => {
  return {type: 'FETCH_STORIES', payload: null};
}
export const receiveStories = (stories: Array<Story>): StoriesAction => {
  return {type: 'RECEIVE_STORIES', payload: {stories}};
}
export const showStoryDetail = (slug: string): StoriesAction => {
  return {type: 'SHOW_STORY_DETAIL', payload: {slug}};
}
export const clearStoryDetail = (slug: string): StoriesAction => {
  return {type: 'CLEAR_STORY_DETAIL', payload: null};
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

export default {
  fetchStories, receiveStories, showStoryDetail, clearStoryDetail,
  filterByTag, filterBySeason, search
}