import * as React from 'react'
import * as _ from 'lodash'

import { List, ChatMessageProps, chatBehavior, Accessibility } from '@stardust-ui/react'
import ControlMessage from './ControlMessage'

const overridenChatBehavior: Accessibility<any> = props => {
  const behaviorData = chatBehavior(props)

  behaviorData.attributes.root = {
    ...behaviorData.attributes.root,
    'data-is-focusable': true,
  }

  behaviorData.focusZone = {
    mode: behaviorData.focusZone.mode,
    props: {
      ...behaviorData.focusZone.props,
      shouldFocusOnMount: true,
      shouldFocusInnerElementWhenReceivedFocus: true,
      defaultTabbableElement: undefined,
    },
  }
  return behaviorData
}

interface GroupControlMessagesProps {
  items: ChatMessageProps[]
}

class GroupControlMessages extends React.Component<GroupControlMessagesProps> {
  renderItems = () => {
    return _.map(this.props.items, item => {
      return {
        content: <ControlMessage message={item} />,
        styles: {
          padding: 0,
          display: 'block',
          minHeight: '25px',
        },
      }
    })
  }

  render() {
    return <List accessibility={overridenChatBehavior} items={this.renderItems()} />
  }
}

export default GroupControlMessages
