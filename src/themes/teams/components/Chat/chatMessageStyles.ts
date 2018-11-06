import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { ChatMessageProps } from '../../../../components/Chat/ChatMessage'
import { ChatMessageVariables } from './chatMessageVariables'
import { teamsPxToRem } from '../../utils'

const px10asRem = teamsPxToRem(10)
const chatMessageStyles: ComponentSlotStylesInput<ChatMessageProps, ChatMessageVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'inline-block',
    position: 'relative',
    marginTop: '1rem',
    marginBottom: '1rem',
    ...(p.mine && {
      float: 'right',
    }),
    maxWidth: v.messageWidth,
    wordBreak: 'break-word',
    wordWrap: 'break-word',
  }),

  avatar: ({ props: p }: { props: ChatMessageProps }): ICSSInJSStyle => ({
    display: p.mine ? 'none' : undefined,
    marginTop: px10asRem,
    marginBottom: px10asRem,
    marginLeft: p.mine ? px10asRem : 0,
    marginRight: p.mine ? 0 : px10asRem,
  }),

  content: ({ props: p, variables: v }): ICSSInJSStyle => ({
    padding: '1rem',
    color: 'rgb(64, 64, 64)',
    backgroundColor: p.mine ? v.messageColorMine : v.messageColor,
    borderRadius: '0.3rem',
  }),

  author: ({ props: p }): ICSSInJSStyle => ({
    display: p.mine ? 'none' : undefined,
    marginRight: px10asRem,
  }),
}

export default chatMessageStyles
