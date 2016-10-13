import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Story} from './types'
import actions from './actions'
import {StoriesState} from './reducers'

interface StoryListProps {
  stories: Map<string, Story>
  onItemClick: (slug: string) => void
}

class StoryList extends React.Component<StoryListProps, {}> {
  render() {
    const {stories, onItemClick} = this.props;

    return (
      <ul>
        {Array.from(stories).map(([slug, story]) => (
          <li key={slug}>
            <a href="javascript:;" onClick={() => onItemClick(slug)}>{story.title}</a>
          </li>
        ))}
      </ul>
    )
  }
}

const StoryDetail = ({story, onClose = () => {}}) => {
  return (
    <article>
      <span onClick={() => onClose()}>×</span>
      <h3>{story.title}</h3>
      <p>{story.body}</p>
    </article>
  )
}

const _Stories = ({entities, detail, actions}) => {
  return (
    <div>
      Some nice stories!
      <StoryList stories={entities.stories} onItemClick={slug => actions.showStoryDetail(slug)} />
      {detail && (
        <StoryDetail story={detail} onClose={() => actions.clearStoryDetail()} />
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return state.stories;
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export const Stories = connect(mapStateToProps, mapDispatchToProps)(_Stories);