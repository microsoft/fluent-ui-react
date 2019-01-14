import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { ChatMessageProps } from '../../../../components/Chat/ChatMessage'
import { ChatMessageVariables } from './chatMessageVariables'

const chatMessageStyles: ComponentSlotStylesInput<ChatMessageProps, ChatMessageVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'inline-block',
    padding: v.padding,
    borderRadius: v.borderRadius,
    border: v.border,
    color: v.color,
    backgroundColor: p.mine ? v.backgroundColorMine : v.backgroundColor,
    maxWidth: v.width,
    wordBreak: 'break-word',
    wordWrap: 'break-word',
    outline: 0,
    ...(p.mine && { float: 'right' }),
    ...(p.isFromKeyboard && {
      ':focus': {
        outline: `.2rem solid ${v.contentFocusOutlineColor}`,
      },
    }),
  }),

  author: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: p.mine ? 'none' : undefined,
    marginRight: v.authorMargin,
  }),

  content: ({ variables: v }): ICSSInJSStyle => ({
    display: 'block',
    '& a:focus': {
      outline: 'none',
      color: v.contentFocusOutlineColor,
      textDecoration: 'underline',
    },
  }),
}

export default chatMessageStyles
