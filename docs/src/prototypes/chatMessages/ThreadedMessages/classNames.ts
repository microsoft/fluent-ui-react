import {
  Button,
  ChatMessage,
  ChatItem,
  ChatContent,
  ChatAuthor,
  ChatTimestamp,
} from '@stardust-ui/react'

const classNames = {
  threadedMessage: {
    thread: `${ChatMessage.className}__thread`,
    threadBody: `${ChatMessage.className}__thread-body`,
    innerContent: `${ChatContent.className}-inner`,
    author: `${ChatAuthor.className}-inner`,
    timestamp: `${ChatTimestamp.className}-inner`,
  },
  threadReplies: {
    trigger: `${Button.className}__reply`,
    message: `${ChatMessage.className}__reply`,
    gutter: `${ChatItem.className}__reply__gutter`,
    chatItem: `${ChatItem.className}__reply`,
    chatItemMessage: `${ChatMessage.className}-reply`,
  },
  replyEditor: `${ChatMessage.className}__reply-editor`,
}

export default classNames
