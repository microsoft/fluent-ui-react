import { ICSSInJSStyle, ComponentSlotStylesInput } from '../../../types'
import { ChatItemVariables } from './chatItemVariables'
import { ChatItemProps } from '../../../../components/Chat/ChatItem'
import { pxToRem } from '../../../../lib'
import ChatMessage from '../../../../components/Chat/ChatMessage'

const chatMessageClassNameSelector = `& .${ChatMessage.className}`
const chatMessageAuthorClassNameSelector = `& .${ChatMessage.className}__author`
const chatMessageTimestampClassNameSelector = `& .${ChatMessage.className}__timestamp`

const chatItemStyles: ComponentSlotStylesInput<ChatItemProps, ChatItemVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    position: 'relative',
    ...((!p.grouped || p.grouped === 'start') && { marginTop: pxToRem(16) }),
    ...(p.grouped &&
      p.grouped !== 'start' && {
        marginTop: pxToRem(2),
        [chatMessageAuthorClassNameSelector]: {
          display: 'none',
        },
        [chatMessageTimestampClassNameSelector]: {
          display: 'none',
        },
      }),
    marginBottom: 0,
  }),

  gutter: ({ props: p, variables: v }): ICSSInJSStyle => ({
    position: 'absolute',
    marginTop: v.gutterMargin,
    [p.gutterPosition === 'end' ? 'right' : 'left']: 0,
    ...(p.grouped !== 'start' && {
      visibility: 'hidden',
    }),
  }),

  message: ({ props: p, variables: v }): ICSSInJSStyle => ({
    position: 'relative',
    marginLeft: v.messageMargin,
    marginRight: v.messageMargin,
    ...(p.grouped === 'middle' && {
      [chatMessageClassNameSelector]: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        paddingTop: pxToRem(5),
        paddingBottom: pxToRem(7),
      },
    }),
    ...(p.grouped === 'start' && {
      [chatMessageClassNameSelector]: {
        borderTopLeftRadius: pxToRem(3),
        borderBottomLeftRadius: 0,
      },
    }),
    ...(p.grouped === 'end' && {
      [chatMessageClassNameSelector]: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: pxToRem(3),
        paddingTop: pxToRem(5),
        paddingBottom: pxToRem(7),
      },
    }),
  }),
}

export default chatItemStyles
