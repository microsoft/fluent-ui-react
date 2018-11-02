import * as _ from 'lodash'
import * as React from 'react'

import { ChatMessageProps } from 'src/components/Chat/ChatMessage'
import { DividerProps } from 'src/components/Divider/Divider'
import { StatusProps } from 'src/components/Status/Status'
import { Extendable } from 'utils'
import { Menu, Popup } from '@stardust-ui/react'
import { ChatData, UserStatus, MessageData, UserData, areSameDay, getFriendlyDateString } from '.'

export enum ChatItemTypes {
  message,
  divider,
}

interface ChatItem {
  itemType: ChatItemTypes
}
interface ChatMessage extends ChatMessageProps, ChatItem {
  // tabIndex: number
}
interface Divider extends DividerProps, ChatItem {}

type ChatItemContentProps = ChatMessage | Divider
type StatusPropsExtendable = Extendable<StatusProps>

const statusMap: Map<UserStatus, StatusPropsExtendable> = new Map([
  ['Available', { color: 'green', icon: 'check', title: 'Available' }],
  ['DoNotDisturb', { color: 'red', icon: 'minus', title: 'Do not disturb' }],
  ['Away', { color: 'yellow', icon: 'clock', title: 'Away' }],
  ['Offline', { color: 'grey', title: 'Offline' }],
] as [UserStatus, StatusPropsExtendable][])

const renderMenuItem = (MenuItem, props) => {
  if (props.icon !== 'ellipsis horizontal') {
    return <MenuItem {...props} />
  }

  return (
    <Popup
      key={props.key}
      position="below"
      content={<div style={{ background: '#fff', boxShadow: '0 0.2rem 1.6rem 0 rgba(37,36,35,.3)', borderRadius: '.3rem', marginTop: '5px' }}>
      <Menu
        vertical
        pills
        className="actions"
        items={[
          { key: 'bookmark', icon: 'bookmark', content: 'Save this message', },
          { key: 'linkify', icon: 'linkify', content: 'Copy link', },
          { key: 'translate', icon: 'translate', content: 'Translate', },
        ]}
      /></div>}
    >
     <MenuItem {...props} />
    </Popup>
  )
}

function generateChatMsgProps(msg: MessageData, fromUser: UserData): ChatMessage {
  const { content, mine } = msg
  const msgProps: ChatMessage = {
    content: (
    <>
      <Menu
        iconOnly
        className="actions"
        items={[
          { key: 'a', icon: 'thumbs up' },
          { key: 'c', icon: 'ellipsis horizontal' },
        ]}
        renderItem={renderMenuItem}
      />
      <a href="/">Link</a> {content} <a href="/">Some Link</a>
    </>),
    mine,
    timestamp: { content: msg.timestamp, title: msg.timestampLong },
    author: fromUser && `${fromUser.firstName} ${fromUser.lastName}`,
    avatar: !msg.mine && { image: fromUser.avatar, status: statusMap.get(fromUser.status) },
    itemType: ChatItemTypes.message,
    styles: {
      position: 'relative',
      '& .actions': {
        transition: 'opacity 0.2s',
        position: 'absolute',
        top: '-20px',
        right: '5px',
        background: '#fff',
        boxShadow: '0px 2px 4px #ddd',
        borderRadius: '.3rem',
        // opacity: 0,
      },

      // ':hover': {
      //   '& .actions': { opacity: 1 },
      // },
      // ':focus': {
      //   '& .actions': { opacity: 1 },
      // },
    },
  }

  return msgProps
}

function generateDividerProps(props: DividerProps): Divider {
  const { content, important, type = 'secondary' } = props
  const dividerProps: Divider = { itemType: ChatItemTypes.divider, content, important, type }

  return dividerProps
}

export function generateChatProps(chat: ChatData): ChatItemContentProps[] {
  if (!chat || !chat.members || !chat.messages) {
    return []
  }

  const { messages, members } = chat
  const chatProps: ChatItemContentProps[] = []

  // First date divider
  chatProps.push(generateDividerProps({ content: getFriendlyDateString(messages[0].date) }))

  for (let i = 0; i < messages.length - 1; i++) {
    const [msg1, msg2] = [messages[i], messages[i + 1]]
    chatProps.push(generateChatMsgProps(msg1, members.get(msg1.from)))

    if (!areSameDay(msg1.date, msg2.date)) {
      // Generating divider when date changes
      chatProps.push(generateDividerProps({ content: getFriendlyDateString(msg2.date) }))
    }
  }

  const lastMsg = messages[messages.length - 1]
  chatProps.push(generateChatMsgProps(lastMsg, members.get(lastMsg.from)))

  // Last read divider
  const myLastMsgIndex: number = _.findLastIndex(chatProps, item => item.mine)
  if (myLastMsgIndex < chatProps.length - 1) {
    chatProps.splice(
      myLastMsgIndex + 1,
      0,
      generateDividerProps({ content: 'Last read', type: 'primary', important: true }),
    )
  }

  return chatProps
}
