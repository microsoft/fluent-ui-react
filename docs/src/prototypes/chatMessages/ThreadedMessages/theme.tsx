import { ThemeInput, ChatItem, Input } from '@stardust-ui/react'
import classNames from './classNames'

const customizedTheme: ThemeInput = {
  componentStyles: {
    ChatItem: {
      root: ({ props: p, theme: { siteVariables } }) => ({
        [`& .${ChatItem.slotClassNames.message}`]: {
          width: '100%',
        },
        [`&.${classNames.threadReplies.chatItem}`]: {
          padding: 0,
          backgroundColor: siteVariables.colors.grey[50],
        },
        [`& .${classNames.threadReplies.chatItemMessage}`]: {
          margin: 0,
        },
        [`& .${classNames.threadReplies.gutter}`]: {
          left: '15px',
          zIndex: '1111',
        },
      }),
    },
    ChatMessage: {
      root: ({ props: p, theme: { siteVariables } }) => ({
        [`&.${classNames.threadedMessage.thread}`]: {
          padding: 0,
          width: '100%',
        },
        [`&.${classNames.threadedMessage.threadBody}`]: {
          width: '100%',
          minWidth: '100%',
          padding: 0,
          margin: 0,
          borderBottom: `1px solid ${siteVariables.colors.grey[100]}`,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,

          [`& .${classNames.threadedMessage.innerContent}`]: {
            padding: '8px 16px',
          },
          [`& .${classNames.threadedMessage.author}`]: {
            padding: '5px 5px 5px 0',
          },
          [`& .${classNames.threadedMessage.timestamp}`]: {
            padding: '5px',
            color: siteVariables.colors.grey[350],
          },
        },
        [`&.${classNames.threadReplies.message}`]: {
          width: '100%',
          minWidth: '100%',
          margin: '1px 0',
          paddingLeft: '60px',
          backgroundColor: siteVariables.colors.grey[50],
        },
        [`&.${classNames.replyEditor}`]: {
          width: '100%',
          minWidth: '100%',
          padding: 0,
          margin: 0,
          backgroundColor: siteVariables.colors.grey[100],
        },
      }),
    },
    Button: {
      root: ({ props: p, theme: { siteVariables } }) => ({
        [`&.${classNames.threadReplies.trigger}`]: {
          border: 'none',
          justifyContent: 'start',
          marginBottom: '1px',
          boxShadow: 'none',
          textDecoration: 'none',

          '&:focus': {
            backgroundColor: siteVariables.colors.grey[0],
          },

          '&:hover': {
            backgroundColor: siteVariables.colors.grey[0],
          },

          '&:active': {
            backgroundColor: siteVariables.colors.grey[0],
          },
        },
      }),
    },
    Input: {
      root: ({ props: p, theme: { siteVariables } }) => ({
        [`& .${Input.slotClassNames.input}`]: {
          height: '50px',
          backgroundColor: siteVariables.colors.grey[0],
        },
      }),
    },
    Attachment: {
      root: ({ props: p, theme: { siteVariables } }) => ({
        width: '100%',
        minWidth: '100%',
        boxShadow: 'none',
        border: 0,
        backgroundColor: siteVariables.colors.brand[600],
        borderRadius: 'unset',
        marginBottom: 0,

        '&:focus': {
          backgroundColor: siteVariables.colors.brand[600],
        },

        '&:hover': {
          backgroundColor: siteVariables.colors.brand[600],
        },
      }),
      header: ({ props: p, theme: { siteVariables } }) => ({
        color: siteVariables.colors.grey[0],
      }),
      description: ({ props: p, theme: { siteVariables } }) => ({
        color: siteVariables.colors.grey[0],
      }),
      icon: ({ props: p, theme: { siteVariables } }) => ({
        color: siteVariables.colors.grey[0],
      }),
    },
  },
}

export default customizedTheme
