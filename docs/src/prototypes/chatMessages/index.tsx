import * as React from 'react'
import { PrototypeSection, ComponentPrototype } from '../Prototypes'
import ImportantAndMentionMessages from './ImportantAndMentionMessages'
import ChatMessageWithPopover from './ChatMessageWithPopover'
import ControlMessages from './ControlMessages'
import ControlMessagesV2 from './ControlMessagesV2'
import ControlMessagesV3 from './ControlMessagesV3'

export default () => (
  <PrototypeSection title="Chat messages">
    <ComponentPrototype
      title="Chat message with popover and reactions"
      description="The Popover can be use together with the chat messages."
    >
      <ChatMessageWithPopover />
    </ComponentPrototype>
    <ComponentPrototype
      title="Important and mention messages"
      description="Important and mention messages support in Teams theme."
    >
      <ImportantAndMentionMessages />
    </ComponentPrototype>
    <ComponentPrototype title="Control messages" description="Control messages example">
      <ControlMessages />
    </ComponentPrototype>
    <ComponentPrototype title="Control messagesV2" description="Control messages example">
      <ControlMessagesV2 />
    </ComponentPrototype>
    <ComponentPrototype title="Control messagesV3" description="Control messages example">
      <ControlMessagesV3 />
    </ComponentPrototype>
  </PrototypeSection>
)
