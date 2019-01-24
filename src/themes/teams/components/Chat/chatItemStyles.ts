import { ICSSInJSStyle, ComponentSlotStylesInput } from '../../../types'
import { ChatItemVariables } from './chatItemVariables'
import { ChatItemProps } from '../../../../components/Chat/ChatItem'
import { pxToRem } from '../../../../lib'
import ChatMessage from '../../../../components/Chat/ChatMessage'

const chatMessageClassname = `& .${ChatMessage.className}`
const chatMessageAuthorClassname = `& .${ChatMessage.className}__author`
const chatMessageTimestampClassname = `& .${ChatMessage.className}__timestamp`

const chatItemStyles: ComponentSlotStylesInput<ChatItemProps, ChatItemVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    const { grouped } = p
    return {
      position: 'relative',
      ...((!grouped || grouped === 'start') && { marginTop: pxToRem(16) }),
      ...(grouped &&
        grouped !== 'start' && {
          marginTop: pxToRem(2),
          [chatMessageAuthorClassname]: {
            display: 'none',
          },
          [chatMessageTimestampClassname]: {
            display: 'none',
          },
        }),
      marginBottom: 0,
    }
  },

  gutter: ({ props: p, variables: v }): ICSSInJSStyle => {
    const { grouped } = p
    return {
      position: 'absolute',
      marginTop: v.gutterMargin,
      [p.gutterPosition === 'end' ? 'right' : 'left']: 0,
      ...(grouped &&
        grouped !== 'start' && {
          visibility: 'hidden',
        }),
    }
  },

  message: ({ props: p, variables: v }): ICSSInJSStyle => {
    const { grouped } = p
    return {
      position: 'relative',
      marginLeft: v.messageMargin,
      marginRight: v.messageMargin,
      ...(grouped === 'middle' && {
        [chatMessageClassname]: {
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          paddingTop: pxToRem(5),
          paddingBottom: pxToRem(7),
        },
      }),
      ...(grouped === 'start' && {
        [chatMessageClassname]: {
          borderTopLeftRadius: pxToRem(3),
          borderBottomLeftRadius: 0,
        },
      }),
      ...(grouped === 'end' && {
        [chatMessageClassname]: {
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: pxToRem(3),
          paddingTop: pxToRem(5),
          paddingBottom: pxToRem(7),
        },
      }),
    }
  },
}

export default chatItemStyles
