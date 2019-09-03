import { Button, ChatMessage, ChatItem } from '@stardust-ui/react'

const classNames = {
  threadedMessage: {
    thread: `${ChatMessage.className}__thread`,
    threadBody: `${ChatMessage.className}__thread-body`,
    innerContent: `${ChatMessage.slotClassNames.content}-inner`,
    author: `${ChatMessage.slotClassNames.author}-inner`,
    timestamp: `${ChatMessage.slotClassNames.timestamp}-inner`,
  },
  threadReplies: {
    trigger: `${Button.className}__reply`,
    message: `${ChatMessage.className}__reply`,
    gutter: `${ChatItem.className}__reply__gutter`,
    chatItem: `${ChatItem.className}__reply`,
    chatItemMessage: `${ChatItem.slotClassNames.message}-reply`,
  },
  replyEditor: `${ChatMessage.className}__reply-editor`,
}

export default classNames
