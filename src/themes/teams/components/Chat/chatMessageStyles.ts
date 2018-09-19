import { ICSSInJSStyle } from '../../../../../types/theme'
import { IChatMessageProps } from '../../../../components/Chat/ChatMessage'
import { IChatMessageVariables } from './chatMessageVariables'
import { pxToRem } from '../../../../lib'

const px10asRem = pxToRem(10)
const chatMessageStyles = {
  root: ({
    props: p,
    variables: v,
  }: {
    props: IChatMessageProps
    variables: IChatMessageVariables
  }): ICSSInJSStyle => ({
    position: 'relative',
    marginTop: '1rem',
    marginBottom: '1rem',
    ...(p.mine
      ? {
          marginLeft: 'auto',
        }
      : {
          marginRight: 'auto',
        }),
    maxWidth: v.messageWidth,
  }),

  avatar: ({ props: p }: { props: IChatMessageProps }): ICSSInJSStyle => ({
    marginTop: px10asRem,
    marginBottom: px10asRem,
    marginLeft: p.mine ? px10asRem : 0,
    marginRight: p.mine ? 0 : px10asRem,
  }),

  content: ({
    props: p,
    variables: v,
  }: {
    props: IChatMessageProps
    variables: IChatMessageVariables
  }): ICSSInJSStyle => ({
    padding: '1rem',
    color: 'rgb(64, 64, 64)',
    backgroundColor: p.mine ? v.messageColorMine : v.messageColor,
    borderRadius: '0.3rem',
  }),
  author: {
    marginRight: px10asRem,
  },
  timestamp: {
    marginRight: px10asRem,
  },
}

export default chatMessageStyles
