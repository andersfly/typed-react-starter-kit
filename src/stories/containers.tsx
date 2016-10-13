import React from 'react'
import {connect} from 'react-redux'
import {Story} from './types'
import {loadStory} from './actions'
import {StoriesState} from './reducers'

interface StoryListProps {
  stories: Map<number, Story>
}

class StoryList extends React.Component<StoryListProps, {}> {
  render() {
    const {stories} = this.props;

    return (
      <ul>
        {Array.from(stories).map(([id, story]) => (
          <li key={id}>
            {story.title}
          </li>
        ))}
      </ul>
    )
  }
}

const _Stories = (props: StoriesState & {actions: {[key: string]: any}}) => {
  const {stories} = props.entities;
  const {loadStory} = props.actions;

  return (
    <div>
      Some nice stories!
      <StoryList stories={stories} />
      <button onClick={() => loadStory('some-story')}>Load story</button>
    </div>
  )
}

const mapStateToProps = state => {
  return state.stories;
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      loadStory: (slug: string) => dispatch(loadStory(slug))
    }
  };
};

export const Stories = connect(mapStateToProps, mapDispatchToProps)(_Stories);