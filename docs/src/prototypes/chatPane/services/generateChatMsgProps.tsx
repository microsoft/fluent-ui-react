import * as _ from 'lodash'
import * as React from 'react'

import { ChatMessageProps } from 'src/components/Chat/ChatMessage'
import { StatusProps } from 'src/components/Status/Status'
import { Extendable } from 'utils'
import { Menu, Popup, ChatMessage as ChatMessageComponent } from '@stardust-ui/react'
import { UserStatus, MessageData, UserData } from '.'

export enum ChatItemTypes {
  message,
  divider,
}

interface ChatItem {
  itemType: ChatItemTypes
}

export interface ChatMessage extends ChatMessageProps, ChatItem {
  onFocus?: (e: Event) => void
  onBlur?: (e: Event) => void
  ref?: (component: ChatMessageComponent) => void
}

type StatusPropsExtendable = Extendable<StatusProps>

const statusMap: Map<UserStatus, StatusPropsExtendable> = new Map([
  ['Available', { color: 'green', icon: 'check', title: 'Available' }],
  ['DoNotDisturb', { color: 'red', icon: 'minus', title: 'Do not disturb' }],
  ['Away', { color: 'yellow', icon: 'clock', title: 'Away' }],
  ['Offline', { color: 'grey', title: 'Offline' }],
] as [UserStatus, StatusPropsExtendable][])

export function generateChatMsgProps(msg: MessageData, fromUser: UserData): ChatMessage {
  const { content, mine } = msg
  const msgProps: ChatMessage = {
    content: messageContent(content),
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
        opacity: 0,
      },

      '& .smile-emoji': {
        display: 'none',
      },

      '&.focused .actions': {
        opacity: 1,
      },

      '& .actions.focused': {
        '& .smile-emoji': {
          display: 'block',
        },
      },

      ':hover .actions': {
        opacity: 1,
      },

      '& .actions:hover': {
        '& .smile-emoji': {
          display: 'block',
        },
      },
    },
    onFocus: handleFocus,
    onBlur: handleBlur,
  }

  return msgProps
}

const handleFocus = e => {
  const currentTarget = e.currentTarget
  const target = e.target

  if (currentTarget === target || currentTarget.contains(target)) {
    currentTarget.classList.add('focused')
  } else {
    currentTarget.classList.remove('focused')
  }
}

const handleBlur = e => {
  const currentTarget = e.currentTarget
  const relatedTarget = e.relatedTarget

  if (currentTarget.contains(relatedTarget)) {
    if (!currentTarget.classList.contains('focused')) {
      currentTarget.classList.add('focused')
    }
  } else {
    currentTarget.classList.remove('focused')
  }
}

const messageContent = initialContent => {
  return (
    <>
      <Menu
        onFocus={handleFocus}
        onBlur={handleBlur}
        iconOnly
        className="actions"
        items={[
          { key: 'smile', icon: 'smile', className: 'smile-emoji' },
          { key: 'smile2', icon: 'smile', className: 'smile-emoji' },
          { key: 'smile3', icon: 'smile', className: 'smile-emoji' },
          { key: 'a', icon: 'thumbs up' },
          { key: 'c', icon: 'ellipsis horizontal' },
        ]}
        renderItem={renderPopover}
      />
      <a href="/">Link</a> {initialContent} <a href="/">Some Link</a>
    </>
  )
}

const renderPopover = (MenuItem, props) => {
  if (props.icon !== 'ellipsis horizontal') {
    return <MenuItem {...props} />
  }

  return (
    <Popup
      key={props.key}
      position="below"
      content={
        <div
          style={{
            background: '#fff',
            boxShadow: '0 0.2rem 1.6rem 0 rgba(37,36,35,.3)',
            borderRadius: '.3rem',
            marginTop: '5px',
          }}
        >
          <Menu
            vertical
            pills
            className="actions"
            items={[
              { key: 'bookmark', icon: 'bookmark', content: 'Save this message' },
              { key: 'linkify', icon: 'linkify', content: 'Copy link' },
              { key: 'translate', icon: 'translate', content: 'Translate' },
            ]}
          />
        </div>
      }
    >
      <MenuItem {...props} />
    </Popup>
  )
}
