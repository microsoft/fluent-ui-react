import * as React from 'react'
import { ListItemProps, chatBehavior, Accessibility, List, Chat } from '@stardust-ui/react'
import * as _ from 'lodash'

const acceessibilityBehavior: Accessibility<any> = props => {
  const behaviorData = chatBehavior(props)

  behaviorData.focusZone = {
    mode: behaviorData.focusZone.mode,
    props: {
      ...behaviorData.focusZone.props,
      shouldFocusOnMount: true,
      defaultTabbableElement: undefined,
    },
  }
  return behaviorData
}

interface GroupControlMessageProps {
  items: ListItemProps[]
}

class GroupControlMessage extends React.Component<GroupControlMessageProps> {
  renderItems = () => {
    return _.map(this.props.items, item => {
      return {
        content: (
          <Chat.Message
            {...item}
            styles={{ padding: 0, marginLeft: '10px', backgroundColor: '#f3f2f1' }}
          />
        ),
        styles: {
          padding: 0,
          display: 'block',
          minHeight: '25px',
        },
      }
    })
  }

  render() {
    return <List accessibility={acceessibilityBehavior} items={this.renderItems()} />
  }
}

export default GroupControlMessage
