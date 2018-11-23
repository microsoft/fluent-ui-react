import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { ChatMessageProps } from '../../../../components/Chat/ChatMessage'
import { ChatMessageVariables } from './chatMessageVariables'
import { pxToRem } from '../../../../lib'

const px10asRem = pxToRem(10)

const chatMessageStyles: ComponentSlotStylesInput<ChatMessageProps, ChatMessageVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'inline-flex',
    position: 'relative',
    marginTop: '1rem',
    marginBottom: '1rem',
    ...(p.mine && {
      float: 'right',
    }),
    maxWidth: v.messageWidth,
    wordBreak: 'break-word',
    wordWrap: 'break-word',
    ':focus': {
      outline: 'none',
      messageBody: {
        outline: `.2rem solid ${v.messageBody.focusOutlineColor}`,
      },
    },
  }),

  avatar: ({ props: p }: { props: ChatMessageProps }): ICSSInJSStyle => ({
    flex: 'none',
    display: p.mine ? 'none' : undefined,
    marginTop: px10asRem,
    marginBottom: px10asRem,
    marginLeft: p.mine ? px10asRem : 0,
    marginRight: p.mine ? 0 : px10asRem,
  }),

  messageBody: ({ props: p, variables: v }): ICSSInJSStyle => ({
    padding: '1rem',
    color: 'rgb(64, 64, 64)',
    backgroundColor: p.mine ? v.messageColorMine : v.messageColor,
    borderRadius: '0.3rem',
  }),

  author: ({ props: p }): ICSSInJSStyle => ({
    display: p.mine ? 'none' : undefined,
    marginRight: px10asRem,
  }),

  content: ({ variables: v }): ICSSInJSStyle => ({
    display: 'block',
    '& a:focus': {
      outline: 'none',
      color: v.messageBody.focusOutlineColor,
      textDecoration: 'underline',
    },
  }),
}

export default chatMessageStyles
