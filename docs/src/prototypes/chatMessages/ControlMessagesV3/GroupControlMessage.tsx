import * as React from 'react'
import {
  ListItemProps,
  chatBehavior,
  Accessibility,
  // Ref,
  List,
} from '@stardust-ui/react'

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
  expanded?: boolean
  items: ListItemProps[]
  focusMessage?: boolean
}

class GroupControlMessage extends React.Component<GroupControlMessageProps> {
  // messageRef = React.createRef<HTMLElement>()

  // componentDidUpdate() {
  //   const { expanded, focusMessage } = this.props

  //   if (!expanded && focusMessage && this.messageRef) {
  //     this.messageRef.current.focus()
  //   }
  // }

  render() {
    return <List accessibility={acceessibilityBehavior} items={this.props.items} />
  }
}

export default GroupControlMessage
