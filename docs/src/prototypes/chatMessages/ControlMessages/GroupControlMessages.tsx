import * as React from 'react'
import * as _ from 'lodash'
import * as keyboardKey from 'keyboard-key'

import { List, chatBehavior, Accessibility, Flex, Icon } from '@stardust-ui/react'
import ControlMessage from './ControlMessage'

const controlMessagesGroupBehavior: Accessibility<any> = props => {
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

const GroupControlMessages = () => {
  const [expanded, setExpanded] = React.useState(false)
  const [focused, setFocused] = React.useState(false)

  const renderItems = () => {
    return _.map(groupControlMessageItems, item => {
      return {
        content: <ControlMessage message={item} />,
        styles: { padding: 0, display: 'block', minHeight: '25px' },
      }
    })
  }

  return (
    <Flex
      onKeyDown={e => {
        const eventCode = keyboardKey.getCode(e)
        if (eventCode === keyboardKey.Enter) {
          setExpanded(true)
        }
        if (eventCode === keyboardKey.Escape) {
          setExpanded(false)
          setFocused(true)
        }
      }}
    >
      <Icon
        name={expanded ? 'stardust-arrow-down' : 'stardust-arrow-end'}
        onClick={() => setExpanded(!expanded)}
      />
      <Icon name="participant-add" />
      {expanded ? (
        <List
          accessibility={controlMessagesGroupBehavior}
          items={renderItems()}
          aria-label={'control messages'}
        />
      ) : (
        <ControlMessage focused={focused} message={controlMessage} />
      )}
    </Flex>
  )
}

export default GroupControlMessages

const groupControlMessageItems = [
  {
    key: 'joe-doe1',
    content: (
      <div>
        <a href="/">John Doe</a> has added <a href="/">Jane Doe1</a> to the team
      </div>
    ),
  },
  {
    key: 'joe-doe2',
    content: (
      <div>
        <a href="/">John Doe</a> has added <a href="/">Jane Doe2</a> to the team
      </div>
    ),
  },
  {
    key: 'joe-doe3',
    content: (
      <div>
        <a href="/">John Doe</a> has added <a href="/">Jane Doe3</a> to the team
      </div>
    ),
  },
]

const controlMessage = {
  content: (
    <div>
      <a href="/">John Doe</a> has added <a href="/">Jane Doe1</a> and 2 other to the team
    </div>
  ),
}
