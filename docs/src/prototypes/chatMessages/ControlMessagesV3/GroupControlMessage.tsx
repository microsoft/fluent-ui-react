import * as React from 'react'
import * as _ from 'lodash'

import { ListItemProps, chatBehavior, Accessibility, List } from '@stardust-ui/react'
import ControlMessage from './ControlMessage'

const acceessibilityBehavior: Accessibility<any> = props => {
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
      defaultTabbableElement: undefined,
      shouldFocusInnerElementWhenReceivedFocus: true,
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
    return <List accessibility={acceessibilityBehavior} items={this.renderItems()} />
  }
}

export default GroupControlMessage
