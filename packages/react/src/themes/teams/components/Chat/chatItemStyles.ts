import { ICSSInJSStyle, ComponentSlotStylesInput } from '../../../types'
import { ChatItemVariables } from './chatItemVariables'
import { ChatItemProps } from '../../../../components/Chat/ChatItem'
import { pxToRem } from '../../../../lib'
import { default as ChatMessage } from '../../../../components/Chat/ChatMessage'
import { screenReaderContainerStyles } from '../../../../lib/accessibility/Styles/accessibilityStyles'

const chatMessageClassNameSelector = `& .${ChatMessage.className}`
const chatMessageAuthorClassNameSelector = `& .${ChatMessage.slotClassNames.author}`
const chatMessageTimestampClassNameSelector = `& .${ChatMessage.slotClassNames.timestamp}`

const getPositionStyles = (props: ChatItemProps) => ({
  float: props.contentPosition === 'end' ? 'right' : 'left',
})

const getChatMessageEvaluatedStyles = (p: ChatItemProps) => ({
  ...(!p.attached && { [chatMessageClassNameSelector]: getPositionStyles(p) }),
  ...(p.attached === true && {
    [chatMessageClassNameSelector]: {
      [p.contentPosition === 'end' ? 'borderTopRightRadius' : 'borderTopLeftRadius']: 0,
      [p.contentPosition === 'end' ? 'borderBottomRightRadius' : 'borderBottomLeftRadius']: 0,
      paddingTop: pxToRem(5),
      paddingBottom: pxToRem(7),
      ...getPositionStyles(p),
    },
  }),
  ...(p.attached === 'top' && {
    [chatMessageClassNameSelector]: {
      [p.contentPosition === 'end' ? 'borderBottomRightRadius' : 'borderBottomLeftRadius']: 0,
      ...getPositionStyles(p),
    },
  }),
  ...(p.attached === 'bottom' && {
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
    ...((!p.attached || p.attached === 'top') && { marginTop: pxToRem(16) }),
    ...((p.attached === 'bottom' || p.attached === true) && {
      marginTop: pxToRem(2),
      [chatMessageAuthorClassNameSelector]: screenReaderContainerStyles,
      [chatMessageTimestampClassNameSelector]: screenReaderContainerStyles,
    }),
    marginBottom: 0,
  }),

  gutter: ({ props: p, variables: v }): ICSSInJSStyle => ({
    position: 'absolute',
    marginTop: v.gutterMargin,
    [p.contentPosition === 'end' ? 'right' : 'left']: 0,
    ...((p.attached === 'bottom' || p.attached === true) && {
      display: 'none',
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
