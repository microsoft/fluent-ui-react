import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { ChatMessageProps } from '../../../../components/Chat/ChatMessage'
import { ChatMessageVariables } from './chatMessageVariables'

const chatMessageStyles: ComponentSlotStylesInput<ChatMessageProps, ChatMessageVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'inline-block',
    padding: v.message.padding,
    borderRadius: v.message.borderRadius,
    color: v.message.color,
    backgroundColor: p.mine ? v.message.backgroundColorMine : v.message.backgroundColor,
    maxWidth: v.message.width,
    wordBreak: 'break-word',
    wordWrap: 'break-word',
    ...(p.mine && { float: 'right' }),
    ':focus': {
      outline: `.2rem solid ${v.content.focusOutlineColor}`,
    },
  }),

  author: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: p.mine ? 'none' : undefined,
    marginRight: v.author.margin,
  }),

  content: ({ variables: v }): ICSSInJSStyle => ({
    display: 'block',
    '& a:focus': {
      outline: 'none',
      color: v.content.focusOutlineColor,
      textDecoration: 'underline',
    },
  }),
}

export default chatMessageStyles
