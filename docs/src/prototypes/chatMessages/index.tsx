import * as React from 'react'
import { PrototypeSection, ComponentPrototype } from '../Prototypes'
import MessageReactionsWithPopup from './MessageReactionsWithPopup'
import ImportantAndMentionMessages from './ImportantAndMentionMessages'
import ChatMessageWithPopover from './ChatMessageWithPopover'

export default () => (
  <PrototypeSection title="Chat messages">
    <ComponentPrototype
      title="Chat message with popover"
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
    <ComponentPrototype
      title="Message reactions with popup"
      description="The reactions can show popup with the list of users who reacted with that rection."
    >
      <MessageReactionsWithPopup />
    </ComponentPrototype>
  </PrototypeSection>
)
