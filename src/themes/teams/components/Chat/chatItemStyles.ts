import { ICSSInJSStyle, ComponentSlotStylesInput } from '../../../types'
import { ChatItemVariables } from './chatItemVariables'
import { ChatItemProps } from '../../../../components/Chat/ChatItem'
import { pxToRem } from '../../../../lib'
import ChatMessage from '../../../../components/Chat/ChatMessage'

const chatMessageClassNameSelector = `& .${ChatMessage.className}`
const chatMessageAuthorClassNameSelector = `& .${ChatMessage.className}__author`
const chatMessageTimestampClassNameSelector = `& .${ChatMessage.className}__timestamp`

const getPositionStyles = (props: ChatItemProps) => ({
  float: props.contentPosition === 'end' ? 'right' : 'left',
})

const getChatMessageEvaluatedStyles = (p: ChatItemProps) => ({
  ...(!p.grouped && { [chatMessageClassNameSelector]: getPositionStyles(p) }),
  ...(p.grouped === 'middle' && {
    [chatMessageClassNameSelector]: {
      [p.contentPosition === 'end' ? 'borderTopRightRadius' : 'borderTopLeftRadius']: 0,
      [p.contentPosition === 'end' ? 'borderBottomRightRadius' : 'borderBottomLeftRadius']: 0,
      paddingTop: pxToRem(5),
      paddingBottom: pxToRem(7),
      ...getPositionStyles(p),
    },
  }),
  ...(p.grouped === 'start' && {
    [chatMessageClassNameSelector]: {
      [p.contentPosition === 'end' ? 'borderBottomRightRadius' : 'borderBottomLeftRadius']: 0,
      ...getPositionStyles(p),
    },
  }),
  ...(p.grouped === 'end' && {
    [chatMessageClassNameSelector]: {
      [p.contentPosition === 'end' ? 'borderTopRightRadius' : 'borderTopLeftRadius']: 0,
      paddingTop: pxToRem(5),
      paddingBottom: pxToRem(7),
      ...getPositionStyles(p),
    },
  }),
})

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
    [p.contentPosition === 'end' ? 'right' : 'left']: 0,
    ...(p.grouped &&
      p.grouped !== 'start' && {
        visibility: 'hidden',
      }),
  }),

  message: ({ props: p, variables: v }): ICSSInJSStyle => ({
    position: 'relative',
    marginLeft: v.messageMargin,
    marginRight: v.messageMargin,
    ...getChatMessageEvaluatedStyles(p),
  }),
}

export default chatItemStyles
