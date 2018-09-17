import { ICSSInJSStyle } from '../../../../../types/theme'
import { IChatMessageProps } from '../../../../components/Chat/ChatMessage'
import { IChatMessageVariables } from './chatMessageVariables'
import { pxToRem } from '../../../../lib'

const rem10 = pxToRem(10)
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
    marginTop: rem10,
    marginBottom: rem10,
    marginLeft: p.mine ? rem10 : 0,
    marginRight: p.mine ? 0 : rem10,
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
}

export default chatMessageStyles
