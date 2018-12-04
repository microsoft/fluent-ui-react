import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { ChatMessageProps } from '../../../../components/Chat/ChatMessage'
import { ChatMessageVariables } from './chatMessageVariables'
import { pxToRem } from '../../utils'

const px10asRem = pxToRem(10)

const chatMessageStyles: ComponentSlotStylesInput<ChatMessageProps, ChatMessageVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    position: 'relative',
    padding: pxToRem(14),
    borderRadius: '0.3rem',
    color: 'rgb(64, 64, 64)',
    backgroundColor: p.mine ? v.messageColorMine : v.messageColor,
    maxWidth: v.messageWidth,
    wordBreak: 'break-word',
    wordWrap: 'break-word',
    ':focus': {
      outline: `.2rem solid ${v.content.focusOutlineColor}`,
    },
  }),

  author: ({ props: p }): ICSSInJSStyle => ({
    display: p.mine ? 'none' : undefined,
    marginRight: px10asRem,
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
