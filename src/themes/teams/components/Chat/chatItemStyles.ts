import { ICSSInJSStyle, ComponentSlotStylesInput } from '../../../types'
import { ChatItemVariables } from './chatItemVariables'
import { ChatItemProps } from '../../../../components/Chat/ChatItem'
import { pxToRem } from '../../../../lib'
import ChatMessage from '../../../../components/Chat/ChatMessage'

const chatMessageClassname = `& .${ChatMessage.className}`
const chatMessageAuthorClassname = `& .${ChatMessage.className}__author`
const chatMessageTimestampClassname = `& .${ChatMessage.className}__timestamp`

const chatItemStyles: ComponentSlotStylesInput<ChatItemProps, ChatItemVariables> = {
  root: ({ props: { consecutive }, variables: v }): ICSSInJSStyle => ({
    position: 'relative',
    ...(!consecutive && { marginTop: pxToRem(16) }),
    ...(consecutive && {
      marginTop: pxToRem(2),
      [chatMessageAuthorClassname]: {
        display: 'none',
      },
      [chatMessageTimestampClassname]: {
        display: 'none',
      },
    }),
    marginBottom: 0,
  }),

  gutter: ({ props: p, variables: v }): ICSSInJSStyle => ({
    position: 'absolute',
    [p.gutterPosition === 'end' ? 'right' : 'left']: 0,
    ...(p.consecutive && {
      visibility: 'hidden',
    }),
  }),

  message: ({ props: { consecutive }, variables: v }): ICSSInJSStyle => ({
    position: 'relative',
    marginLeft: v.messageMargin,
    marginRight: v.messageMargin,
    ...(consecutive && {
      [chatMessageClassname]: {
        paddingTop: pxToRem(5),
        paddingBottom: pxToRem(7),
      },
    }),
    ...(!consecutive && {
      [chatMessageClassname]: {
        paddingTop: pxToRem(8),
        paddingBottom: pxToRem(10),
      },
    }),
  }),
}

export default chatItemStyles
